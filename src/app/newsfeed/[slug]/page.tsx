'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import BlogMetaTags from '../../components/BlogMetaTags';
import TableOfContents from '../../components/TableOfContents';
import StyledBlogContentWithZoom from '../../components/StyledBlogContentWithZoom';
import AuthorTooltip from '../../components/AuthorTooltip';

interface Author {
  id: string;
  name: string;
  email: string;
  photo?: string;
  bio?: string;
  expertise?: string[];
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  isActive?: boolean;
}

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  status: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author: string; // Legacy field
  authorId?: string; // New author field
  authorData?: Author; // Populated author data
  views: number;
  likes: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  featuredImage?: string;
}

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!slug) return;

    // Performance: Verwende AbortController für Cleanup
    const controller = new AbortController();

    const fetchPost = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`/api/newsfeed-v2/by-slug?slug=${slug}`, {
          signal: controller.signal,
          // Performance: Cache für 5 Minuten
          next: { revalidate: 300 },
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.status === 404) {
          notFound();
          return;
        }

        if (!response.ok) {
          throw new Error('Fehler beim Laden des Posts');
        }

        const data = await response.json();

        if (data.success && data.post) {
          // Nur veröffentlichte Posts anzeigen
          if (data.post.status !== 'published') {
            notFound();
            return;
          }

          setPost(data.post);

          // Performance: Preload featured image
          if (data.post.featuredImage) {
            const img = new Image();
            img.src = data.post.featuredImage;
          }
        } else {
          throw new Error('Post nicht gefunden');
        }

      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Request aborted');
          return;
        }
        console.error('Fehler beim Laden des Posts:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, [slug]);

  const updateMetaTag = (attr: string, value: string, content: string) => {
    let tag = document.querySelector(`meta[${attr}="${value}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, value);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  const isMobile = screenWidth < 768;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };



  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
        color: '#ffffff'
      }}>
        {/* Skeleton Content */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '4rem 1rem' : '8rem 2rem 3rem 2rem',
          display: 'flex',
          gap: '3rem',
          alignItems: 'flex-start',
          position: 'relative'
        }}>
          {/* Main Article Skeleton */}
          <main style={{
            flex: '1',
            minWidth: '0',
            maxWidth: isMobile ? '100%' : 'calc(100% - 300px)',
            paddingRight: isMobile ? '0' : '1rem'
          }}>
            {/* Category, Date & Back Link Skeleton */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: '80px',
                height: '28px',
                background: 'rgba(248, 223, 165, 0.1)',
                borderRadius: '1rem'
              }}></div>
              <div style={{
                width: '120px',
                height: '20px',
                background: 'rgba(156, 163, 175, 0.1)',
                borderRadius: '0.25rem'
              }}></div>
              <div style={{
                width: '100px',
                height: '20px',
                background: 'rgba(156, 163, 175, 0.1)',
                borderRadius: '0.25rem'
              }}></div>
              <div style={{
                width: '100px',
                height: '28px',
                background: 'rgba(156, 163, 175, 0.1)',
                borderRadius: '0.375rem',
                marginLeft: 'auto'
              }}></div>
            </div>

            {/* Title Skeleton */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                height: isMobile ? '40px' : '50px',
                background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite ease-in-out',
                borderRadius: '0.5rem',
                marginBottom: '0.5rem',
                width: '90%'
              }}></div>
              <div style={{
                height: isMobile ? '40px' : '50px',
                background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite ease-in-out 0.2s',
                borderRadius: '0.5rem',
                width: '70%'
              }}></div>
            </div>

            {/* Featured Image Skeleton */}
            <div style={{
              width: '100%',
              height: isMobile ? '200px' : '300px',
              background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.05) 0%, rgba(248, 223, 165, 0.1) 50%, rgba(248, 223, 165, 0.05) 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite ease-in-out 0.4s',
              borderRadius: '12px',
              marginBottom: '2rem',
              border: '1px solid rgba(248, 223, 165, 0.2)'
            }}></div>

            {/* Content Skeleton */}
            <div style={{ marginBottom: '3rem' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div key={index} style={{
                  height: '16px',
                  background: 'rgba(209, 213, 219, 0.1)',
                  borderRadius: '0.25rem',
                  marginBottom: '0.75rem',
                  width: index % 4 === 0 ? '60%' : index % 3 === 0 ? '80%' : '95%'
                }}></div>
              ))}

              {/* Paragraph break */}
              <div style={{ height: '24px', marginBottom: '1rem' }}></div>

              {[1, 2, 3, 4, 5].map((index) => (
                <div key={`p2-${index}`} style={{
                  height: '16px',
                  background: 'rgba(209, 213, 219, 0.1)',
                  borderRadius: '0.25rem',
                  marginBottom: '0.75rem',
                  width: index % 3 === 0 ? '70%' : '90%'
                }}></div>
              ))}
            </div>
          </main>

          {/* Desktop TOC Skeleton */}
          {!isMobile && (
            <div style={{
              width: '250px',
              flexShrink: 0,
              position: 'sticky',
              top: '2rem',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(248, 223, 165, 0.2)',
              borderRadius: '12px',
              padding: '1.5rem',
              height: 'fit-content'
            }}>
              <div style={{
                height: '20px',
                background: 'rgba(248, 223, 165, 0.15)',
                borderRadius: '0.25rem',
                marginBottom: '1rem',
                width: '60%'
              }}></div>
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} style={{
                  height: '14px',
                  background: 'rgba(209, 213, 219, 0.1)',
                  borderRadius: '0.25rem',
                  marginBottom: '0.5rem',
                  width: index % 2 === 0 ? '80%' : '90%',
                  marginLeft: index > 2 ? '1rem' : '0'
                }}></div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Skeleton */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '2rem 1rem' : '3rem 2rem',
          textAlign: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(248, 223, 165, 0.2)'
        }}>
          <div style={{
            display: 'inline-block',
            width: '200px',
            height: '44px',
            background: 'rgba(248, 223, 165, 0.1)',
            borderRadius: '0.75rem'
          }}></div>
        </div>

        {/* Animation Styles */}
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}</style>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
      color: '#ffffff',
      position: 'relative' // Ensure proper stacking context
    }}>
      {/* SEO Meta Tags */}
      <BlogMetaTags post={post} />
      
      {/* Main Content with Sidebar Layout */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '4rem 1rem' : '8rem 2rem 3rem 2rem',
        display: 'flex',
        gap: '3rem',
        alignItems: 'flex-start',
        position: 'relative'
      }}>
        {/* Main Article */}
        <main style={{
          flex: '1',
          minWidth: '0', // Verhindert Overflow
          maxWidth: isMobile ? '100%' : 'calc(100% - 300px)', // Begrenzt die Breite für TOC
          paddingRight: isMobile ? '0' : '1rem' // Kleiner Abstand zur Sidebar
        }}>
          {/* Category, Date & Back Link */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
            flexWrap: 'wrap'
          }}>
            <span style={{
              background: 'rgba(248, 223, 165, 0.1)',
              color: '#f8dfa5',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {post.category}
            </span>
            
            <span style={{
              color: '#9ca3af',
              fontSize: '0.875rem'
            }}>
              {formatDate(post.publishedAt)}
            </span>

            {/* Autor anzeigen, falls vorhanden */}
            {(post.authorData?.name || post.author) && (
              <span style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <span>•</span>
                {post.authorData ? (
                  <AuthorTooltip author={post.authorData}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      cursor: 'pointer',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.375rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                      e.currentTarget.style.color = '#f8dfa5';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#9ca3af';
                    }}>
                      {post.authorData.photo && (
                        <img
                          src={post.authorData.photo}
                          alt={post.authorData.name}
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }}
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <span>{post.authorData.name}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ marginLeft: '0.25rem', opacity: 0.6 }}
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </span>
                  </AuthorTooltip>
                ) : (
                  <span>{post.author}</span>
                )}
              </span>
            )}

            <Link href="/newsfeed" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: '#9ca3af',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: '400',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid rgba(156, 163, 175, 0.2)',
              background: 'rgba(156, 163, 175, 0.05)',
              transition: 'all 0.3s ease',
              marginLeft: 'auto'
            }}
            onMouseOver={(e) => {
              const target = e.target as HTMLElement;
              target.style.color = '#f8dfa5';
              target.style.borderColor = 'rgba(248, 223, 165, 0.3)';
            }}
            onMouseOut={(e) => {
              const target = e.target as HTMLElement;
              target.style.color = '#9ca3af';
              target.style.borderColor = 'rgba(156, 163, 175, 0.2)';
            }}>
              ← Alle Artikel
            </Link>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: isMobile ? '1.875rem' : '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.2',
            marginBottom: post.featuredImage ? '1.5rem' : '2rem'
          }}>
            {post.title}
          </h1>

          {/* Featured Image */}
          {post.featuredImage && (
            <div style={{
              marginBottom: '2rem',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(248, 223, 165, 0.2)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              background: '#1a1a1a'
            }}>
              <img
                src={post.featuredImage}
                alt={post.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  display: 'block'
                }}
                loading="eager" // Featured Image sollte sofort laden
                decoding="async"
                onLoad={(e) => {
                  // Fade-in Effect nach dem Laden
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transition = 'opacity 0.3s ease';
                }}
                onError={(e) => {
                  // Fallback bei Bild-Fehler
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Mobile Table of Contents */}
          {isMobile && (
            <div style={{ marginBottom: '2rem' }}>
              <TableOfContents content={post.content} isMobile={true} />
            </div>
          )}

          {/* Article Content */}
          <article style={{
            marginBottom: '3rem'
          }}>
            <StyledBlogContentWithZoom content={post.content} />
          </article>
        </main>

        {/* Desktop Table of Contents - Fixed positioned */}
        {!isMobile && (
          <TableOfContents content={post.content} isMobile={false} />
        )}
      </div>

      {/* Footer Navigation */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        textAlign: 'center',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(248, 223, 165, 0.2)'
      }}>
        <Link href="/newsfeed" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#f8dfa5',
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: '500',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.75rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          background: 'rgba(248, 223, 165, 0.05)',
          transition: 'all 0.3s ease'
        }}>
          ← Weitere Artikel entdecken
        </Link>
      </div>
    </div>
  );
} 