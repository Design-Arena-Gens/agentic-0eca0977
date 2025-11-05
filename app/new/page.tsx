"use client";
import { useState } from 'react';
import { ImagePicker } from '@/components/ImagePicker';
import { addPost } from '@/lib/storage';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const router = useRouter();
  const [imageDataUrl, setImageDataUrl] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onPick = (_file: File, dataUrl: string) => setImageDataUrl(dataUrl);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageDataUrl) return;
    setSubmitting(true);
    try {
      await addPost({ caption, imageDataUrl });
      router.push('/');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container px-4 py-6">
      <form onSubmit={onSubmit} className="card p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Image</label>
          <div className="flex items-center gap-3">
            <ImagePicker onPick={onPick} />
            {imageDataUrl && (
              <img src={imageDataUrl} className="h-16 w-16 object-cover rounded border" alt="preview" />
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Caption</label>
          <textarea className="input min-h-[100px]" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Write a caption..." />
        </div>
        <div>
          <button className="btn-primary" disabled={!imageDataUrl || submitting}>
            {submitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
