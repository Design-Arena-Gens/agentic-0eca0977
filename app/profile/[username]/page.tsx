"use client";
import { useEffect, useMemo, useState } from 'react';
import { getCurrentUser, getUserPosts, StoredPost } from '@/lib/storage';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const params = useParams<{ username: string }>();
  const [user, setUser] = useState<string>('');
  const [posts, setPosts] = useState<StoredPost[]>([]);

  const username = useMemo(() => (params.username === 'me' ? user : String(params.username)), [params.username, user]);

  useEffect(() => {
    (async () => {
      const me = await getCurrentUser();
      setUser(me);
    })();
  }, []);

  useEffect(() => {
    if (!username) return;
    (async () => {
      setPosts(await getUserPosts(username));
    })();
  }, [username]);

  return (
    <div className="container px-4 py-6">
      <div className="card p-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
          <div>
            <div className="text-xl font-semibold">{username || '...'}</div>
            {params.username === 'me' && (
              <div className="text-sm text-gray-500">This is your local profile</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-1">
        {posts.map((p) => (
          <Link key={p.id} href={`/post/${p.id}`}>
            <img src={p.imageDataUrl} alt={p.caption} className="aspect-square object-cover w-full h-full" />
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center text-sm text-gray-500 mt-6">No posts yet.</div>
      )}
    </div>
  );
}
