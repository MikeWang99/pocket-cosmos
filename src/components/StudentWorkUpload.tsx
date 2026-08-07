import React, { useCallback, useRef, useState } from 'react';
import { Camera, Upload, X, CheckCircle2, Loader2 } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabaseClient';
import { useAuth } from '../auth/AuthContext';

interface StudentWorkUploadProps {
  practiceSetId: string;
  questionId: string;
  existingImageUrl?: string | null;
  onUploadComplete: (imageUrl: string) => void;
  onClear: () => void;
  language: 'en' | 'zh';
  /** Fires while the file is compressing/uploading so parents can explain why submit stays disabled. */
  onBusyChange?: (busy: boolean) => void;
}

const MAX_UPLOAD_SIZE = 2 * 1024 * 1024; // 2MB target after compression
const MAX_DIMENSION = 2048; // max width/height in pixels
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

/** Compress image via Canvas: resize + JPEG quality reduction */
const compressImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      // Calculate target dimensions (keep aspect ratio)
      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const scale = MAX_DIMENSION / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas not supported'));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to JPEG with quality reduction
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Compression failed'));
            return;
          }
          resolve(blob);
        },
        'image/jpeg',
        0.82,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image'));
    };
    img.src = objectUrl;
  });
};

export const StudentWorkUpload: React.FC<StudentWorkUploadProps> = ({
  practiceSetId,
  questionId,
  existingImageUrl,
  onUploadComplete,
  onClear,
  language,
  onBusyChange,
}) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(existingImageUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [pendingRetry, setPendingRetry] = useState<File | null>(null);

  const setBusyState = (compressingNext: boolean, uploadingNext: boolean) => {
    setCompressing(compressingNext);
    setUploading(uploadingNext);
    onBusyChange?.(compressingNext || uploadingNext);
  };

  const t = language === 'zh'
    ? {
        uploadTitle: '上传你的答案',
        uploadHint: '拍照或上传手写答案的图片，大图片会自动压缩',
        takePhoto: '拍照',
        uploadFile: '上传图片',
        compressing: '压缩中...',
        uploading: '上传中...',
        uploaded: '已上传',
        clear: '清除',
        retry: '重试上传',
        errorType: '请选择图片文件（JPG、PNG 或 WebP）',
        errorUpload: '上传失败，请重试',
        replace: '重新上传',
      }
    : {
        uploadTitle: 'Upload your answer',
        uploadHint: 'Take a photo or upload an image of your written work. Large images are auto-compressed.',
        takePhoto: 'Take photo',
        uploadFile: 'Upload image',
        compressing: 'Compressing...',
        uploading: 'Uploading...',
        uploaded: 'Uploaded',
        clear: 'Clear',
        retry: 'Retry upload',
        errorType: 'Please select an image file (JPG, PNG, or WebP)',
        errorUpload: 'Upload failed, please try again',
        replace: 'Re-upload',
      };

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setPendingRetry(null);

    if (!file.type.startsWith('image/')) {
      setError(t.errorType);
      return;
    }

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setFileName(file.name);

    // Prepare upload payload (compress if needed)
    let uploadBlob: Blob = file;
    const needsCompression = file.size > MAX_UPLOAD_SIZE;

    if (needsCompression) {
      setBusyState(true, false);
      try {
        uploadBlob = await compressImage(file);
      } catch (err) {
        console.error('Compression error:', err);
        // Fall back to original file if compression fails
        uploadBlob = file;
      }
      setBusyState(false, false);
    }

    // Upload to Supabase Storage
    setBusyState(false, true);
    const supabase = getSupabaseClient();
    if (!supabase || !user) {
      setError(t.errorUpload);
      setPendingRetry(file);
      setBusyState(false, false);
      return;
    }

    const path = `${user.id}/${practiceSetId}/${questionId}-${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from('student-work')
      .upload(path, uploadBlob, { upsert: true, contentType: 'image/jpeg' });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      setError(t.errorUpload);
      setPendingRetry(file);
      setBusyState(false, false);
      return;
    }

    const { data: urlData } = supabase.storage.from('student-work').getPublicUrl(path);
    const publicUrl = urlData.publicUrl;

    onUploadComplete(publicUrl);
    setBusyState(false, false);
  }, [user, practiceSetId, questionId, onUploadComplete, t, setBusyState]);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void handleFile(file);
    // Reset input so same file can be re-selected
    event.target.value = '';
  };

  const handleClear = () => {
    setPreview(null);
    setFileName(null);
    setError(null);
    setPendingRetry(null);
    onClear();
  };

  return (
    <div className="rounded-xl border border-line bg-surface-muted p-4">
      <div className="mb-3 flex items-center gap-2">
        <Upload className="h-4 w-4 text-nebula" />
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          {t.uploadTitle}
        </span>
      </div>
      <p className="mb-4 text-xs text-slate-500">{t.uploadHint}</p>

      {!preview ? (
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center gap-2 rounded-lg border border-nebula/40 bg-nebula/5 px-4 py-2.5 text-sm font-medium text-nebula transition-colors hover:bg-nebula/10"
            >
              <Camera className="h-4 w-4" />
              {t.takePhoto}
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-nebula/40 hover:text-nebula"
            >
              <Upload className="h-4 w-4" />
              {t.uploadFile}
            </button>
          </div>

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileInput}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_TYPES.join(',')}
            className="hidden"
            onChange={handleFileInput}
          />

          {error && (
            <p className="text-xs text-rose-600">{error}</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-lg border border-line">
            <img
              src={preview}
              alt={fileName ?? 'Student work'}
              className="max-h-[400px] w-full object-contain"
            />
            {(compressing || uploading) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
                <span className="ml-2 text-sm text-white">{compressing ? t.compressing : t.uploading}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              {compressing || uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : error ? (
                <X className="h-3.5 w-3.5 text-rose-600" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              )}
              <span className={error ? 'text-rose-600' : undefined}>
                {compressing ? t.compressing : uploading ? t.uploading : error ? error : t.uploaded}
              </span>
            </div>
            <div className="flex gap-2">
              {pendingRetry && !compressing && !uploading && (
                <button
                  type="button"
                  onClick={() => void handleFile(pendingRetry)}
                  className="rounded-md border border-rose-400/40 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-400/10"
                >
                  {t.retry}
                </button>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-md border border-line px-3 py-1.5 text-xs text-ink-soft hover:border-nebula/40 hover:text-nebula"
              >
                {t.replace}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1 rounded-md border border-rose-400/30 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-400/10"
              >
                <X className="h-3 w-3" />
                {t.clear}
              </button>
            </div>
          </div>

          {/* Hidden inputs for re-upload */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileInput}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_TYPES.join(',')}
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      )}
    </div>
  );
};
