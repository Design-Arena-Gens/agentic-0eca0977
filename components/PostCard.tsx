"use client";
import { useState } from 'react';
import Link from 'next/link';
import { likePost } from '@/lib/storage';

export type Post = {
  id: string;
  author: string;
  caption: string;
  imageDataUrl: string; // base64 data URL
  createdAt: number;
  likes: number;
  commentsCount: number;
};

export function PostCard({ post, onLike }: { post: Post; onLike?: (id: string) => void }) {
  const [liking, setLiking] = useState(false);

  const handleLike = async () => {
    if (liking) return;
    setLiking(true);
    try {
      await likePost(post.id);
      onLike?.(post.id);
    } finally {
      setLiking(false);
    }
  };

  return (
    <article className="card overflow-hidden">
      <header className="px-4 py-3 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
        <div className="text-sm">
          <Link href={`/profile/${encodeURIComponent(post.author)}`} className="font-medium hover:underline">
            {post.author}
          </Link>
          <div className="text-gray-500 text-xs">{new Date(post.createdAt).toLocaleString()}</div>
        </div>
      </header>
      <div className="bg-black">
        <img src={post.imageDataUrl} alt={post.caption} className="w-full h-auto object-contain" />
      </div>
      <div className="px-4 py-3 space-y-3">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} disabled={liking} className="text-sm btn-primary px-3 py-1">
            ? Like {post.likes > 0 && `(${post.likes})`}
          </button>
          <Link href={`/post/${post.id}`} className="text-sm hover:underline">
            Comments {post.commentsCount > 0 && `(${post.commentsCount})`}
          </Link>
        </div>
        {post.caption && (
          <p className="text-sm">
            <span className="font-medium mr-2">{post.author}</span>
            {post.caption}
          </p>
        )}
      </div>
    </article>
  );
}
