"use client";
import { useEffect, useState } from 'react';
import { getFeed, getCommentsCount, StoredPost } from '@/lib/storage';
import { PostCard } from '@/components/PostCard';

export default function FeedPage() {
  const [posts, setPosts] = useState<StoredPost[]>([]);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    (async () => {
      const base = await getFeed();
      const withCounts = await Promise.all(
        base.map(async (p) => ({ ...p, commentsCount: await getCommentsCount(p.id) }))
      );
      setPosts(withCounts);
    })();
  }, [refreshTick]);

  return (
    <div className="container px-4 py-6 space-y-4">
      {posts.length === 0 && (
        <div className="text-center text-gray-500 text-sm">No posts yet. Create your first one!</div>
      )}
      <div className="space-y-6">
        {posts.map((p) => (
          <PostCard key={p.id} post={{ ...p, commentsCount: (p as any).commentsCount ?? 0 }} onLike={() => setRefreshTick((t) => t + 1)} />
        ))}
      </div>
    </div>
  );
}
