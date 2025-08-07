'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  status: string;
  publishedAt: string;
  author: string;
  views: number;
  likes: number;
  featuredImage?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/newsfeed-v2?status=published&limit=20');
        const data = await response.json();
        
        if (data.posts) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: {[key: string]: string} = {
      'Bitcoin': '#f59e0b',
      'Ethereum': '#6366f1',
      'DeFi': '#10b981',
      'NFTs': '#ec4899',
      'Trading': '#ef4444',
      'Regulierung': '#8b5cf6',
      'Technologie': '#06b6d4',
      'Marktanalyse': '#f97316',
      'Altcoins': '#84cc16'
    };
    return colors[category] || '#f8dfa5';
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          color: '#f8dfa5'
        }}>
          <svg 
            style={{ 
              animation: 'spin 1s linear infinite',
              width: '24px',
              height: '24px'
            }} 
            viewBox="0 0 24 24"
          >
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none" 
              strokeDasharray="32" 
              strokeDashoffset="32"
              style={{ animation: 'spin 1s linear infinite' }}
            />
          </svg>
          <span>Lade Artikel...</span>
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
      color: '#ffffff'
    }}>
      {/* Header */}
      <header style={{
        padding: isMobile ? '1rem' : '2rem',
        borderBottom: '1px solid rgba(248, 223, 165, 0.2)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link href="/" style={{
            color: '#f8dfa5',
            textDecoration: 'none',
            fontSize: isMobile ? '1.25rem' : '1.5rem',
            fontWeight: '700'
          }}>
            MissCrypto
          </Link>
          
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/" style={{
              color: '#d1d5db',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              ← Startseite
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: '700',
            lineHeight: '1.2',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            📰 MissCrypto Blog
          </h1>
          
          <p style={{
            fontSize: isMobile ? '1.125rem' : '1.25rem',
            color: '#d1d5db',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Aktuelle News, Analysen und Insights aus der Welt der Kryptowährungen. 
            Verständlich erklärt für Einsteiger und Profis.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section style={{
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        paddingBottom: isMobile ? '4rem' : '6rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {posts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '1rem',
              border: '1px solid rgba(248, 223, 165, 0.3)'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>📝</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#f8dfa5',
                marginBottom: '1rem'
              }}>
                Noch keine Artikel veröffentlicht
              </h3>
              <p style={{
                color: '#d1d5db',
                fontSize: '1rem'
              }}>
                Die ersten Artikel sind bereits in Arbeit und werden bald hier erscheinen.
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: isMobile ? '1.5rem' : '2rem'
            }}>
              {posts.map((post) => (
                <article key={post._id} style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1rem',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <Link href={`/newsfeed/${post.slug}`} style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}>
                    {/* Featured Image */}
                    {post.featuredImage ? (
                      <div style={{
                        height: '200px',
                        backgroundImage: `url(${post.featuredImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          background: getCategoryColor(post.category),
                          color: '#000000',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {post.category}
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        height: '200px',
                        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        <div style={{
                          fontSize: '3rem',
                          opacity: 0.5
                        }}>
                          📰
                        </div>
                        <div style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          background: getCategoryColor(post.category),
                          color: '#000000',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {post.category}
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div style={{
                      padding: '1.5rem'
                    }}>
                      {/* Meta Info */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1rem',
                        fontSize: '0.875rem',
                        color: '#9ca3af'
                      }}>
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>•</span>
                        <span>👁️ {post.views}</span>
                      </div>

                      {/* Title */}
                      <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#ffffff',
                        lineHeight: '1.4',
                        marginBottom: '0.75rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p style={{
                        color: '#d1d5db',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginBottom: '1rem'
                      }}>
                        {post.excerpt}
                      </p>

                      {/* Author */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem'
                        }}>
                          👩‍💼
                        </div>
                        <div>
                          <div style={{
                            color: '#ffffff',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                          }}>
                            {post.author}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 