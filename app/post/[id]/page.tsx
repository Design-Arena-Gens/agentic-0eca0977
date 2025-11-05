"use client";
import { useEffect, useState } from 'react';
import { addComment, getComments, getPost, likePost, StoredComment, StoredPost } from '@/lib/storage';
import { useParams, useRouter } from 'next/navigation';

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<StoredPost | null>(null);
  const [comments, setComments] = useState<StoredComment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const p = await getPost(params.id);
      if (!p) return;
      setPost(p);
      setComments(await getComments(p.id));
    })();
  }, [params.id]);

  if (!post) {
    return (
      <div className="container px-4 py-6 text-sm text-gray-500">Post not found.</div>
    );
  }

  const onLike = async () => {
    setBusy(true);
    try {
      await likePost(post.id);
      setPost({ ...post, likes: post.likes + 1 });
    } finally {
      setBusy(false);
    }
  };

  const onAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setBusy(true);
    try {
      await addComment(post.id, commentText.trim());
      setCommentText('');
      setComments(await getComments(post.id));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container px-4 py-6 space-y-4">
      <button onClick={() => router.back()} className="text-sm text-gray-600 hover:underline">? Back</button>
      <article className="card overflow-hidden">
        <header className="px-4 py-3 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
          <div className="text-sm">
            <div className="font-medium">{post.author}</div>
            <div className="text-gray-500 text-xs">{new Date(post.createdAt).toLocaleString()}</div>
          </div>
        </header>
        <div className="bg-black">
          <img src={post.imageDataUrl} alt={post.caption} className="w-full h-auto object-contain" />
        </div>
        <div className="px-4 py-3 space-y-3">
          <div className="flex items-center gap-3">
            <button onClick={onLike} disabled={busy} className="btn-primary px-3 py-1">? Like {post.likes > 0 && `(${post.likes})`}</button>
          </div>
          {post.caption && (
            <p className="text-sm">
              <span className="font-medium mr-2">{post.author}</span>
              {post.caption}
            </p>
          )}
        </div>
      </article>

      <section className="card p-4">
        <h3 className="font-medium mb-3">Comments</h3>
        <div className="space-y-3">
          {comments.length === 0 && (
            <div className="text-sm text-gray-500">Be the first to comment.</div>
          )}
          {comments.map((c) => (
            <div key={c.id} className="text-sm">
              <span className="font-medium mr-2">{c.author}</span>
              {c.text}
              <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <form onSubmit={onAddComment} className="mt-4 flex items-center gap-2">
          <input
            className="input"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="btn-primary" disabled={busy || !commentText.trim()}>Post</button>
        </form>
      </section>
    </div>
  );
}
