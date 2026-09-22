#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { createReadStream } from 'node:fs';
import { readdir, stat, writeFile } from 'node:fs/promises';
import { basename, extname, join, relative, resolve, sep } from 'node:path';

const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
};

const sourceArg = valueFor('--source');
const prefixArg = valueFor('--prefix');
const bucket = valueFor('--bucket') || 'question-assets';
const apply = args.includes('--apply');
const overwrite = args.includes('--overwrite');

if (!sourceArg || !prefixArg) {
  console.error('Usage: node scripts/upload-object-assets.mjs --source <dir> --prefix <path> [--bucket question-assets] [--apply] [--overwrite]');
  process.exit(1);
}

const sourceDir = resolve(sourceArg);
const prefix = prefixArg.replace(/^\/+|\/+$/g, '');
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (apply && (!supabaseUrl || !serviceRoleKey)) {
  console.error('SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY are required with --apply.');
  process.exit(1);
}

const contentTypeFor = (path) => {
  const ext = extname(path).toLowerCase();
  return {
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.json': 'application/json',
  }[ext] || 'application/octet-stream';
};

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
};

const files = await walk(sourceDir);
const manifest = [];
const client = apply
  ? createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;

for (const file of files) {
  const info = await stat(file);
  const relativePath = relative(sourceDir, file).split(sep).join('/');
  const storagePath = `${prefix}/${relativePath}`;
  const row = {
    source: file,
    storageBucket: bucket,
    storagePath,
    bytes: info.size,
    contentType: contentTypeFor(file),
    uploaded: false,
    objectRef: `${bucket}/${storagePath}`,
  };

  if (apply && client) {
    const chunks = [];
    for await (const chunk of createReadStream(file)) chunks.push(chunk);
    const body = Buffer.concat(chunks);
    const { error } = await client.storage.from(bucket).upload(storagePath, body, {
      upsert: overwrite,
      contentType: row.contentType,
      cacheControl: bucket === 'question-assets' ? '31536000' : '3600',
    });

    if (error) {
      console.error(`Failed: ${relativePath}: ${error.message}`);
      process.exitCode = 1;
    } else {
      row.uploaded = true;
      console.log(`Uploaded: ${relativePath} -> ${bucket}/${storagePath}`);
    }
  } else {
    console.log(`DRY RUN: ${relativePath} -> ${bucket}/${storagePath}`);
  }

  manifest.push(row);
}

const output = resolve(`asset-upload-manifest-${basename(sourceDir)}.json`);
await writeFile(output, JSON.stringify({
  generatedAt: new Date().toISOString(),
  mode: apply ? 'apply' : 'dry-run',
  bucket,
  prefix,
  sourceDir,
  fileCount: manifest.length,
  totalBytes: manifest.reduce((sum, item) => sum + item.bytes, 0),
  assets: manifest,
}, null, 2));

console.log(`Manifest: ${output}`);
console.log(`${apply ? 'Processed' : 'Planned'} ${manifest.length} files.`);
