'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import BlogMetaTags from '../../components/BlogMetaTags';
import TableOfContents from '../../components/TableOfContents';
import StyledBlogContent from '../../components/StyledBlogContent';

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
  author: string;
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
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/newsfeed-v2/by-slug?slug=${slug}`);
        
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
        } else {
          throw new Error('Post nicht gefunden');
        }

      } catch (error) {
        console.error('Fehler beim Laden des Posts:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
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
          marginRight: isMobile ? '0' : '320px' // Platz für das fixed TOC
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
            marginBottom: '2rem'
          }}>
            {post.title}
          </h1>

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
            <StyledBlogContent content={post.content} />
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