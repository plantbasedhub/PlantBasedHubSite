import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getCurrentUser, logout } from '../lib/auth';
import { Models } from 'appwrite';

interface Post {
  id: string;
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
}

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [posts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/auth');
        return;
      }
      setUser(currentUser);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Cabeçalho do Perfil */}
        <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-6">
            <Image
              src={user.prefs?.avatar || '/images/avatar-default.svg'}
              alt={user.name}
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Posts do Usuário */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-card rounded-lg shadow-sm p-6">
              <p className="text-foreground mb-4">{post.content}</p>
              {post.image && (
                <Image
                  src={post.image}
                  alt="Post"
                  width={800}
                  height={400}
                  className="rounded-lg mb-4 w-full h-64 object-cover"
                />
              )}
              <div className="flex items-center space-x-4 text-muted-foreground">
                <span>{post.likes} curtidas</span>
                <span>{post.comments} comentários</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 