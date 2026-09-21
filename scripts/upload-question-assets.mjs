import { createClient } from '@supabase/supabase-js';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ALLOWED_BUCKETS = new Set(['question-assets', 'source-documents']);

const contentTypeByExtension = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const usage = () => {
  console.error('Usage: pnpm assets:upload <manifest.json> [--upsert]');
  console.error('');
  console.error('Manifest format:');
  console.error(JSON.stringify({
    assets: [{
      localPath: 'staging/question-assets/ap1/u1/q1.webp',
      storagePath: 'ap-physics-1/unit-1/q1.webp',
      bucket: 'question-assets',
      contentType: 'image/webp',
      cacheControl: '31536000',
    }],
  }, null, 2));
};

const args = process.argv.slice(2);
const manifestArg = args.find((arg) => !arg.startsWith('--'));
const upsert = args.includes('--upsert');

if (!manifestArg) {
  usage();
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
  process.exit(1);
}

const manifestPath = path.resolve(process.cwd(), manifestArg);
const manifestJson = JSON.parse(await readFile(manifestPath, 'utf8'));
const assets = Array.isArray(manifestJson) ? manifestJson : manifestJson.assets;

if (!Array.isArray(assets) || assets.length === 0) {
  console.error('Manifest must contain a non-empty assets array.');
  process.exit(1);
}

const client = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const results = [];

for (const [index, asset] of assets.entries()) {
  const bucket = asset.bucket ?? 'question-assets';
  if (!ALLOWED_BUCKETS.has(bucket)) {
    throw new Error(`Asset #${index + 1} uses unsupported bucket "${bucket}".`);
  }

  if (!asset.localPath || !asset.storagePath) {
    throw new Error(`Asset #${index + 1} requires localPath and storagePath.`);
  }

  const localPath = path.resolve(process.cwd(), asset.localPath);
  const bytes = await readFile(localPath);
  const extension = path.extname(localPath).toLowerCase();
  const contentType = asset.contentType ?? contentTypeByExtension[extension] ?? 'application/octet-stream';
  const cacheControl = asset.cacheControl ?? (bucket === 'question-assets' ? '31536000' : '3600');

  const { error } = await client.storage
    .from(bucket)
    .upload(asset.storagePath, bytes, {
      contentType,
      cacheControl,
      upsert,
    });

  if (error) {
    throw new Error(`Upload failed for ${asset.localPath}: ${error.message}`);
  }

  const result = {
    bucket,
    storagePath: asset.storagePath,
    localPath: asset.localPath,
    contentType,
  };

  if (bucket === 'question-assets') {
    const { data } = client.storage.from(bucket).getPublicUrl(asset.storagePath);
    result.publicUrl = data.publicUrl;
  }

  results.push(result);
  console.log(`[${index + 1}/${assets.length}] uploaded ${bucket}/${asset.storagePath}`);
}

console.log('');
console.log(JSON.stringify({ uploaded: results.length, assets: results }, null, 2));
