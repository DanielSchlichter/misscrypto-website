'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PreviewModal from '../../components/PreviewModal';

interface NewsfeedPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published' | 'scheduled';
  publishedAt?: string;
  scheduledAt?: string;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
  likes?: number;
  category: string;
  slug?: string;
  author?: string;
  featuredImage?: string;
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export default function NewsfeedOverview() {
  const [posts, setPosts] = useState<NewsfeedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(0);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [previewPost, setPreviewPost] = useState<NewsfeedPost | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      
      console.log('🚀 Lade Newsfeed Posts...');
      
      // Echte Posts von der API laden (mit Timeout)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s Timeout
      
      const response = await fetch('/api/newsfeed-v2?limit=50', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.posts) {
        // Firebase-Posts in das erwartete Format konvertieren
        const convertedPosts = data.posts.map((post: any) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          status: post.status,
          publishedAt: post.publishedAt,
          scheduledAt: post.scheduledAt,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          views: post.views || 0,
          likes: post.likes || 0,
          category: post.category || 'Bitcoin',
          slug: post.slug,
          author: post.author,
          featuredImage: post.featuredImage,
          seo: post.seo
        }));
        
        console.log(`✅ ${convertedPosts.length} Posts geladen`);
        setPosts(convertedPosts);
      } else {
        console.error('Fehler beim Laden der Posts:', data.error);
        setPosts([]);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Posts:', error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleView = (post: NewsfeedPost) => {
    if (post.status === 'published' && post.slug) {
      window.open(`/newsfeed/${post.slug}`, '_blank');
    } else {
      // Öffne Preview Modal für Entwürfe
      setPreviewPost(post);
      setIsPreviewOpen(true);
    }
  };

  const handlePublish = async (postId: string) => {
    try {
      console.log('🚀 Veröffentliche Post:', postId);
      
      // Zuerst den aktuellen Post laden, um alle Daten zu haben
      if (!previewPost) {
        throw new Error('Post-Daten nicht verfügbar');
      }
      
      // Exakt der gleiche API-Call wie im Create/Edit Bereich
      const response = await fetch(`/api/newsfeed-v2/single?id=${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: previewPost.title,
          content: previewPost.content,
          category: previewPost.category,
          status: 'published',
          metaTitle: previewPost.seo?.metaTitle || previewPost.title,
          metaDescription: previewPost.seo?.metaDescription || previewPost.excerpt
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Post erfolgreich veröffentlicht');
        alert('Post erfolgreich veröffentlicht!');
        // Modal schließen und Posts neu laden
        setIsPreviewOpen(false);
        setPreviewPost(null);
        await fetchPosts();
      } else {
        console.error('Fehler beim Veröffentlichen:', result.error);
        alert('Fehler beim Veröffentlichen des Posts: ' + result.error);
      }
    } catch (error) {
      console.error('Fehler beim Veröffentlichen des Posts:', error);
      alert('Ein unerwarteter Fehler ist aufgetreten.');
    }
  };

  const handleEdit = (post: NewsfeedPost) => {
    router.push(`/admin/newsfeed/create?edit=${post.id}`);
  };

  const handleDelete = async (post: NewsfeedPost) => {
    if (!confirm(`Sind Sie sicher, dass Sie "${post.title}" löschen möchten?`)) {
      return;
    }

    setIsDeleting(post.id);
    
    try {
      const response = await fetch(`/api/newsfeed-v2?id=${post.id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        // Post aus der Liste entfernen
        setPosts(posts.filter(p => p.id !== post.id));
        alert('Post erfolgreich gelöscht!');
      } else {
        console.error('Fehler beim Löschen:', result.error);
        alert('Fehler beim Löschen des Posts: ' + result.error);
      }
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      alert('Fehler beim Löschen des Posts');
    } finally {
      setIsDeleting(null);
    }
  };

  const isMobile = screenWidth < 768;

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontFamily: 'Raleway, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(248, 223, 165, 0.3)',
            borderTop: '3px solid #f8dfa5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <span>Lade Newsfeed...</span>
        </div>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return '#10b981';
      case 'draft': return '#f59e0b';
      case 'scheduled': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Veröffentlicht';
      case 'draft': return 'Entwurf';
      case 'scheduled': return 'Geplant';
      default: return status;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
      color: '#ffffff',
      fontFamily: 'Raleway, sans-serif',
      padding: isMobile ? '20px' : '40px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '20px' : '0'
        }}>
          <div>
            <h1 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 10px 0'
            }}>
              Newsfeed Verwaltung
            </h1>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0'
            }}>
              Verwalte und erstelle Newsfeed-Beiträge
            </p>
          </div>

          <Link
            href="/admin/newsfeed/create"
            style={{
              background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
              color: '#000000',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(248, 223, 165, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: '18px' }}>✏️</span>
            Neuen Beitrag erstellen
          </Link>
        </div>

        {/* Posts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '20px'
        }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(248, 223, 165, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.2)';
              }}
            >
              {/* Status Badge */}
              <div style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: getStatusColor(post.status),
                color: '#ffffff',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                {getStatusText(post.status)}
              </div>

              {/* Category */}
              <div style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: 'rgba(248, 223, 165, 0.2)',
                color: '#f8dfa5',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500',
                marginBottom: '16px',
                marginLeft: '8px'
              }}>
                {post.category}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff',
                margin: '0 0 12px 0',
                lineHeight: '1.4'
              }}>
                {post.title}
              </h3>

              {/* Content Preview */}
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: '0 0 16px 0',
                lineHeight: '1.5'
              }}>
                {post.content.substring(0, 120)}...
              </p>

              {/* Stats */}
              {post.status === 'published' && (
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    👁️ {post.views} Aufrufe
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    ❤️ {post.likes} Likes
                  </span>
                </div>
              )}

              {/* Date */}
              {post.publishedAt && (
                <p style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  margin: '0 0 16px 0'
                }}>
                  Veröffentlicht: {new Date(post.publishedAt).toLocaleDateString('de-DE')}
                </p>
              )}

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                {/* Ansehen Button */}
                <button 
                  onClick={() => handleView(post)}
                  style={{
                    background: 'rgba(34, 197, 94, 0.2)',
                    color: '#22c55e',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)';
                  }}
                >
                  👁️ Ansehen
                </button>

                {/* Bearbeiten Button */}
                <button 
                  onClick={() => handleEdit(post)}
                  style={{
                    background: 'rgba(248, 223, 165, 0.2)',
                    color: '#f8dfa5',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(248, 223, 165, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(248, 223, 165, 0.2)';
                  }}
                >
                  ✏️ Bearbeiten
                </button>

                {/* Löschen Button */}
                <button 
                  onClick={() => handleDelete(post)}
                  disabled={isDeleting === post.id}
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    cursor: isDeleting === post.id ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: isDeleting === post.id ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (isDeleting !== post.id) {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isDeleting !== post.id) {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                    }
                  }}
                >
                  {isDeleting === post.id ? '⏳ Löschen...' : '🗑️ Löschen'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📰</div>
            <h3 style={{ margin: '0 0 10px 0' }}>Keine Beiträge vorhanden</h3>
            <p style={{ margin: '0' }}>Erstelle deinen ersten Newsfeed-Beitrag!</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PreviewModal
        post={previewPost}
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewPost(null);
        }}
        onPublish={handlePublish}
      />
    </div>
  );
} 