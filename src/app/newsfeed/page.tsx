'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NewsletterForm from '../components/NewsletterForm';

interface Author {
  id: string;
  name: string;
  photo?: string;
}

interface NewsfeedPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  authorId?: string;
  featuredImage?: string;
  createdAt: string;
  publishedAt: string;
  views: number;
}

export default function NewsfeedPage() {
  // Initialisiere mit Desktop-Breite für SSR/erste Render
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [posts, setPosts] = useState<NewsfeedPost[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Setze initiale Breite nach Mount (falls SSR)
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch published posts and authors - optimized with query params
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Lade Posts und Autoren parallel mit optimierten Queries
        const [postsResponse, authorsResponse] = await Promise.all([
          fetch('/api/newsfeed-v2?status=published&limit=20', {
            // Cache für 5 Minuten
            next: { revalidate: 300 }
          }),
          fetch('/api/authors?limit=20', {
            // Cache für 10 Minuten (Autoren ändern sich seltener)
            next: { revalidate: 600 }
          })
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
        console.error('Fehler beim Laden der Daten:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Sofort laden ohne Verzögerung
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

  // Function to extract clean text from HTML content for preview
  const getCleanPreviewText = (htmlContent: string, maxLength: number = 200): string => {
    if (!htmlContent) return '';
    
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Remove all module elements (they contain structured content, not prose)
    const modules = tempDiv.querySelectorAll('.editable-module, .mc-content-section, .mc-highlight, .mc-statistics, .mc-security, .mc-image');
    modules.forEach(module => module.remove());
    
    // Remove all headings as they shouldn't be in the preview
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => heading.remove());
    
    // Get only text content from paragraphs
    const paragraphs = tempDiv.querySelectorAll('p');
    let textContent = '';
    
    paragraphs.forEach(p => {
      const pText = p.textContent?.trim();
      if (pText && pText.length > 0) {
        textContent += pText + ' ';
      }
    });
    
    // If no paragraph text found, get general text content but clean it
    if (!textContent.trim()) {
      textContent = tempDiv.textContent || '';
    }
    
    // Clean up the text
    textContent = textContent
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n+/g, ' ') // Replace newlines with space
      .trim();
    
    // Truncate to max length
    if (textContent.length > maxLength) {
      textContent = textContent.substring(0, maxLength).trim() + '...';
    }
    
    return textContent || 'Keine Vorschau verfügbar.';
  };

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  return (
    <>
      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          50% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
        color: '#ffffff',
        fontFamily: 'Raleway, sans-serif'
      }}>
      {/* Hero Section */}
      <section style={{
        padding: isMobile ? '6rem 1rem 4rem' : isTablet ? '8rem 2rem 6rem' : '10rem 2rem 8rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(248, 223, 165, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(248, 223, 165, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
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
            Aktuelle Artikel
          </h1>
          
          <p style={{
            fontSize: isMobile ? '1.125rem' : '1.25rem',
            color: '#d1d5db',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Aktuelle News, Analysen und Insights aus der Welt der Kryptowährungen.
            Verständlich erklärt für Einsteiger und Profis.
          </p>

          {/* Loading State - Skeleton Loader */}
          {isLoading && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: isMobile ? '2rem' : '2.5rem'
            }}>
              {/* Skeleton Cards */}
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {/* Featured Image Skeleton */}
                  <div style={{
                    width: '100%',
                    height: '200px',
                    background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.05) 0%, rgba(248, 223, 165, 0.1) 50%, rgba(248, 223, 165, 0.05) 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite ease-in-out'
                  }}></div>

                  <div style={{ padding: '1.5rem' }}>
                    {/* Title Skeleton */}
                    <div style={{ marginBottom: '0.75rem' }}>
                      <div style={{
                        height: '20px',
                        background: 'rgba(248, 223, 165, 0.15)',
                        borderRadius: '0.5rem',
                        marginBottom: '0.5rem',
                        width: '90%'
                      }}></div>
                      <div style={{
                        height: '20px',
                        background: 'rgba(248, 223, 165, 0.15)',
                        borderRadius: '0.5rem',
                        width: '70%'
                      }}></div>
                    </div>

                    {/* Excerpt Skeleton */}
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{
                        height: '14px',
                        background: 'rgba(209, 213, 219, 0.1)',
                        borderRadius: '0.25rem',
                        marginBottom: '0.5rem'
                      }}></div>
                      <div style={{
                        height: '14px',
                        background: 'rgba(209, 213, 219, 0.1)',
                        borderRadius: '0.25rem',
                        marginBottom: '0.5rem'
                      }}></div>
                      <div style={{
                        height: '14px',
                        background: 'rgba(209, 213, 219, 0.1)',
                        borderRadius: '0.25rem',
                        width: '60%'
                      }}></div>
                    </div>

                    {/* Footer Skeleton */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(248, 223, 165, 0.1)',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'rgba(248, 223, 165, 0.1)'
                          }}></div>
                          <div style={{
                            height: '12px',
                            width: '60px',
                            background: 'rgba(156, 163, 175, 0.1)',
                            borderRadius: '0.25rem'
                          }}></div>
                        </div>
                        <div style={{
                          width: '80px',
                          height: '24px',
                          background: 'rgba(248, 223, 165, 0.1)',
                          borderRadius: '1rem'
                        }}></div>
                      </div>
                      <div style={{
                        height: '12px',
                        width: '80px',
                        background: 'rgba(156, 163, 175, 0.1)',
                        borderRadius: '0.25rem'
                      }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Articles */}
          {!isLoading && posts.length === 0 && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.15), rgba(248, 223, 165, 0.08))',
              backdropFilter: 'blur(15px)',
              borderRadius: '2rem',
              padding: isMobile ? '3rem 2rem' : '4rem 3rem',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{
                color: '#f8dfa5',
                fontSize: isMobile ? '1.8rem' : '2.2rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                Noch keine Artikel veröffentlicht
              </h3>
              <p style={{
                color: '#d1d5db',
                fontSize: '1.1rem',
                lineHeight: '1.6',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Die ersten Artikel sind in Arbeit. Trag dich in den Newsletter ein, um benachrichtigt zu werden, sobald neue Inhalte verfügbar sind.
              </p>
            </div>
          )}

          {/* Articles Grid */}
          {!isLoading && posts.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '2rem'
            }}>
              {posts.map((post) => {
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
                      {(post.excerpt || getCleanPreviewText(post.content) || post.metaDescription) && (
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
                          {post.excerpt || getCleanPreviewText(post.content) || post.metaDescription || 'Keine Vorschau verfügbar.'}
                        </p>
                      )}

                      {/* Footer */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(248, 223, 165, 0.1)',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}>
                        {/* Left side - Author and Category */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          flexWrap: 'wrap'
                        }}>
                          {/* Author */}
                          {author && (
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
                          )}

                          {/* Category */}
                          <div style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                            color: '#000000',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}>
                            {post.category}
                          </div>
                        </div>

                        {/* Right side - Date */}
                        <span style={{
                          color: '#9ca3af',
                          fontSize: '0.75rem'
                        }}>
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ 
        padding: isMobile ? '4rem 0' : isTablet ? '5rem 0' : '6rem 0',
        background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #111111 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(248, 223, 165, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(248, 223, 165, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: isMobile ? '0 1rem' : '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '3rem' : '4rem',
            alignItems: 'center'
          }}>
            {/* Left Column - Text Content */}
            <div>
              <h2 style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '1.5rem',
                lineHeight: '1.2',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                Verpasse{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  nichts Wichtiges!
                </span>
              </h2>
              <p style={{
                color: '#d1d5db',
                fontSize: isMobile ? '1.1rem' : isTablet ? '1.2rem' : '1.3rem',
                marginBottom: '2rem',
                lineHeight: '1.6',
                textAlign: isMobile ? 'center' : 'left',
                maxWidth: '600px'
              }}>
                Ich bereite für dich regelmäßig Krypto-Updates auf, die du nicht verpassen solltest: verständlich, verlässlich und mit echtem Mehrwert. Trag dich ein und sei ganz vorne dabei, wenn der Newsfeed startet.
              </p>
              <ul style={{ 
                color: '#f8dfa5',
                fontSize: isMobile ? '1rem' : '1.1rem',
                marginBottom: '2.5rem',
                paddingLeft: 0,
                listStyle: 'none',
                lineHeight: '2.1',
                textAlign: isMobile ? 'center' : 'left',
              }}>
                <li>📰 Krypto-News, die du verstehst</li>
                <li>📚 Wissen, das dich weiterbringt</li>
                <li>💡 Tipps, die wirklich helfen</li>
                <li>🤝 Ehrlich & Unabhängig</li>
              </ul>
            </div>

            {/* Right Column - Newsletter Form */}
            <NewsletterForm isMobile={isMobile} isTablet={isTablet} />
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section style={{
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        textAlign: 'center'
      }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#f8dfa5',
          textDecoration: 'none',
          fontSize: isMobile ? '1rem' : '1.1rem',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.75rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          background: 'rgba(248, 223, 165, 0.05)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(248, 223, 165, 0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        >
          ← Zurück zur Startseite
        </Link>
      </section>
      </div>
    </>
  );
} 