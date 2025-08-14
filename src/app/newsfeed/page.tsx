'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NewsletterForm from '../components/NewsletterForm';

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
  createdAt: string;
  publishedAt: string;
  views: number;
}

export default function NewsfeedPage() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [posts, setPosts] = useState<NewsfeedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch published posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/newsfeed-v2');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Only show published posts
            const publishedPosts = data.posts.filter((post: NewsfeedPost) => post.status === 'published');
            setPosts(publishedPosts);
          }
        }
      } catch (error) {
        console.error('Fehler beim Laden der Posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            fontSize: isMobile ? '3rem' : '4rem',
            marginBottom: '1rem'
          }}>
            📰
          </div>
          
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
            margin: '0 auto'
          }}>
            Aktuelle News, Analysen und Insights aus der Welt der Kryptowährungen. 
            Verständlich erklärt für Einsteiger und Profis.
          </p>
        </div>
      </section>

      {/* Articles Section */}
      <section style={{
        padding: isMobile ? '2rem 1rem' : isTablet ? '3rem 2rem' : '4rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>


          {/* Loading State */}
          {isLoading && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
              fontSize: '1.2rem',
              color: '#d1d5db'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                Artikel werden geladen...
              </div>
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
              gap: isMobile ? '2rem' : '2.5rem'
            }}>
              {posts.map((post) => (
                <article key={post.id} style={{
                  background: 'linear-gradient(135deg, rgba(248, 223, 165, 0.08), rgba(248, 223, 165, 0.04))',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  border: '1px solid rgba(248, 223, 165, 0.2)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.2)';
                }}
                onClick={() => {
                  window.location.href = `/newsfeed/${post.slug}`;
                }}>
                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(248, 223, 165, 0.2)',
                    color: '#f8dfa5',
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {post.category}
                  </div>

                  {/* Content */}
                  <div style={{ marginTop: '1rem' }}>
                    <h3 style={{
                      color: '#f8dfa5',
                      fontSize: isMobile ? '1.3rem' : '1.5rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      lineHeight: '1.3',
                      paddingRight: '3rem' // Space for category badge
                    }}>
                      {post.title}
                    </h3>
                    
                    <p style={{
                      color: '#d1d5db',
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {getCleanPreviewText(post.content) || post.metaDescription || 'Keine Vorschau verfügbar.'}
                    </p>

                    {/* Meta Info */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: '#9ca3af',
                      fontSize: '0.875rem'
                    }}>
                      <span>{formatDate(post.publishedAt)}</span>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span>👁️ {post.views || 0}</span>
                        <span style={{
                          color: '#f8dfa5',
                          fontWeight: '500'
                        }}>
                          Lesen →
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
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
  );
} 