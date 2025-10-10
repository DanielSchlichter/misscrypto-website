'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Author {
  id: string;
  name: string;
  photo?: string;
}

interface NewsfeedPost {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  category: string;
  status: string;
  authorId?: string;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
}

const NewsfeedSlider = () => {
  const [posts, setPosts] = useState<NewsfeedPost[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  // Posts pro Slide basierend auf Bildschirmgröße
  const postsPerSlide = isMobile ? 1 : isTablet ? 2 : 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Lade Posts und Autoren parallel
        const [postsResponse, authorsResponse] = await Promise.all([
          fetch('/api/newsfeed-v2?status=published&limit=9'),
          fetch('/api/authors')
        ]);

        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          if (postsData.success) {
            setPosts(postsData.posts || []);
          }
        }

        if (authorsResponse.ok) {
          const authorsData = await authorsResponse.json();
          if (authorsData.success) {
            setAuthors(authorsData.authors || []);
          }
        }
      } catch (error) {
        console.error('Fehler beim Laden der Newsfeed-Daten:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAuthor = (authorId?: string) => {
    if (!authorId) return null;
    return authors.find(author => author.id === authorId);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return 'Heute';
    }
  };

  const maxSlides = Math.max(0, Math.ceil(posts.length / postsPerSlide) - 1);

  const nextSlide = () => {
    setCurrentIndex(prev => prev >= maxSlides ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => prev <= 0 ? maxSlides : prev - 1);
  };

  const getCurrentPosts = () => {
    const startIndex = currentIndex * postsPerSlide;
    return posts.slice(startIndex, startIndex + postsPerSlide);
  };

  if (isLoading) {
    return (
      <section style={{
        padding: isMobile ? '3rem 0' : '4rem 0',
        background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #111111 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            color: '#d1d5db'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                border: '2px solid rgba(248, 223, 165, 0.3)',
                borderTop: '2px solid #f8dfa5',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Lade neueste Artikel...
            </div>
          </div>
          <style jsx>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section style={{
        padding: isMobile ? '3rem 0' : '4rem 0',
        background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #111111 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.75rem' : '2.25rem',
            fontWeight: '500',
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Neueste Artikel
          </h2>
          <p style={{
            color: '#9ca3af',
            fontSize: '1rem'
          }}>
            Noch keine Artikel verfügbar.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{
      padding: isMobile ? '3rem 0' : '4rem 0',
      background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #111111 100%)',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '0 1rem' : '0 2rem'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <div>
            <h2 style={{
              fontSize: isMobile ? '1.75rem' : '2.25rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#ffffff'
            }}>
              Neueste Artikel
            </h2>
            <p style={{
              color: '#9ca3af',
              fontSize: isMobile ? '0.875rem' : '1rem'
            }}>
              Aktuelle Insights und Analysen aus der Krypto-Welt
            </p>
          </div>

          {/* Navigation */}
          {posts.length > postsPerSlide && (
            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              <button
                onClick={prevSlide}
                style={{
                  background: 'rgba(248, 223, 165, 0.1)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  color: '#f8dfa5',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                }}
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                style={{
                  background: 'rgba(248, 223, 165, 0.1)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  color: '#f8dfa5',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                }}
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* Posts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {getCurrentPosts().map((post) => {
            const author = getAuthor(post.authorId);

            return (
              <Link
                key={post.id}
                href={`/newsfeed/${post.slug}`}
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.2)';
                }}
              >
                {/* Featured Image */}
                {post.featuredImage && (
                  <div style={{
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                    background: '#1a1a1a'
                  }}>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                )}

                <div style={{ padding: '1.5rem' }}>
                  {/* Category */}
                  <div style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    color: '#000000',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>
                    {post.category}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: isMobile ? '1.125rem' : '1.25rem',
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '0.75rem',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p style={{
                      color: '#d1d5db',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {post.excerpt}
                    </p>
                  )}

                  {/* Footer */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(248, 223, 165, 0.1)'
                  }}>
                    {/* Author */}
                    {author ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        {author.photo ? (
                          <img
                            src={author.photo}
                            alt={author.name}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            color: '#000'
                          }}>
                            ✍️
                          </div>
                        )}
                        <span style={{
                          color: '#9ca3af',
                          fontSize: '0.75rem'
                        }}>
                          {author.name}
                        </span>
                      </div>
                    ) : (
                      <div></div>
                    )}

                    {/* Date */}
                    <span style={{
                      color: '#9ca3af',
                      fontSize: '0.75rem'
                    }}>
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Dots Indicator */}
        {posts.length > postsPerSlide && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            {Array.from({ length: maxSlides + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === currentIndex
                    ? '#f8dfa5'
                    : 'rgba(248, 223, 165, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        )}

        {/* Link to all articles */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem'
        }}>
          <Link
            href="/newsfeed"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#f8dfa5',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#f8dfa5';
            }}
          >
            Alle Artikel ansehen →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsfeedSlider;