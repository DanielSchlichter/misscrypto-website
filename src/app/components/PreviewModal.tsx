'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import TableOfContents from './TableOfContents';

// Function to clean HTML for preview (remove editor elements)
const getCleanContentForPreview = (htmlContent: string): string => {
  if (!htmlContent) return '';
  
  // Create a temporary DOM to manipulate
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Remove all delete buttons
  const deleteButtons = tempDiv.querySelectorAll('.delete-module-btn');
  deleteButtons.forEach(btn => btn.remove());
  
  // Remove editor-specific classes but keep content classes
  const editableModules = tempDiv.querySelectorAll('.editable-module');
  editableModules.forEach(module => {
    module.classList.remove('editable-module');
    // Remove data attributes used for editing
    module.removeAttribute('data-module-id');
    module.removeAttribute('data-module-type');
  });
  
  // Remove any other editor-specific elements
  const editorElements = tempDiv.querySelectorAll('[data-editor-only]');
  editorElements.forEach(el => el.remove());
  
  // Add IDs to headings for table of contents
  const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
  });
  
  return tempDiv.innerHTML;
};

interface PreviewModalProps {
  post: {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    category: string;
    status: string;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
    author?: string;
    views?: number;
    likes?: number;
    seo?: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
    featuredImage?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onPublish?: (postId: string) => void;
}

export default function PreviewModal({ post, isOpen, onClose, onPublish }: PreviewModalProps) {
  const [screenWidth, setScreenWidth] = useState(0);
  
  // Clean content for preview (remove editor elements)
  const cleanContent = useMemo(() => {
    return post ? getCleanContentForPreview(post.content) : '';
  }, [post?.content]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isMobile = screenWidth < 768;

  if (!isOpen || !post) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
        borderBottom: '1px solid rgba(248, 223, 165, 0.2)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10001
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <span style={{
            background: 'rgba(248, 223, 165, 0.1)',
            color: '#f8dfa5',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            border: '1px solid rgba(248, 223, 165, 0.3)'
          }}>
            VORSCHAU - ENTWURF
          </span>
          <h1 style={{
            color: '#ffffff',
            fontSize: '1.25rem',
            fontWeight: '600',
            margin: 0
          }}>
            {post.title}
          </h1>
        </div>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center'
        }}>
          {/* Veröffentlichen Button */}
          {onPublish && post.status === 'draft' && (
            <button
              onClick={() => onPublish(post.id)}
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                color: '#22c55e',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)';
              }}
            >
              ✓ Veröffentlichen
            </button>
          )}
          
          {/* Schließen Button */}
          <button
            onClick={onClose}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
            }}
          >
            ✕ Schließen
          </button>
        </div>
      </div>

      {/* Content - Exakt wie echte News-Seite */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
        color: '#ffffff',
        position: 'relative'
      }}>
        {/* Main Content with Sidebar Layout - Exakt wie echte Seite */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '4rem 1rem' : '8rem 2rem 3rem 2rem',
          display: 'flex',
          gap: '3rem',
          alignItems: 'flex-start',
          position: 'relative'
        }}>
          {/* Main Article - Exakt wie echte Seite */}
          <main style={{
            flex: '1',
            minWidth: '0',
            marginRight: isMobile ? '0' : '320px'
          }}>
            {/* Category, Date & Preview Label - Exakt wie echte Seite */}
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
                {formatDate(post.createdAt || post.publishedAt || new Date().toISOString())}
              </span>

              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: '#f8dfa5',
                fontSize: '0.75rem',
                fontWeight: '400',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid rgba(248, 223, 165, 0.3)',
                background: 'rgba(248, 223, 165, 0.1)',
                marginLeft: 'auto'
              }}>
                👁️ Vorschau
              </span>
            </div>

            {/* Title - Exakt wie echte Seite */}
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
                <TableOfContents content={cleanContent} isMobile={true} />
              </div>
            )}

            {/* Article Content - Exakt wie echte Seite */}
            <article style={{
              marginBottom: '3rem'
            }}>
              <div 
                className="blog-content-wrapper"
                dangerouslySetInnerHTML={{ __html: cleanContent }}
              />
            </article>
          </main>

          {/* Desktop Table of Contents - Fixed positioned */}
          {!isMobile && (
            <TableOfContents content={cleanContent} isMobile={false} />
          )}
        </div>

        {/* Footer Navigation - Exakt wie echte Seite */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '2rem 1rem' : '3rem 2rem',
          textAlign: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(248, 223, 165, 0.2)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#f8dfa5',
            fontSize: '1rem',
            fontWeight: '500',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            background: 'rgba(248, 223, 165, 0.05)'
          }}>
            👁️ Dies ist eine Vorschau des Entwurfs
          </div>
        </div>
      </div>
    </div>
  );
}
