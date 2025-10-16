'use client';

import React, { useState, useEffect } from 'react';

interface Author {
  id: string;
  name: string;
  email?: string;
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

interface AuthorTooltipProps {
  author: Author;
  children: React.ReactNode;
}

export default function AuthorTooltip({ author, children }: AuthorTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '65%',
            transform: 'translateX(-50%)',
            marginTop: '0.5rem',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f172a 50%, #1e293b 75%, #334155 100%)',
            border: '2px solid rgba(248, 223, 165, 0.4)',
            borderRadius: '12px',
            padding: '1rem',
            minWidth: isMobile ? '280px' : '300px',
            maxWidth: isMobile ? 'calc(100vw - 2rem)' : '400px',
            width: 'max-content',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            zIndex: 1000,
            color: '#ffffff'
          }}
        >
          {/* Tooltip Arrow */}
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '65%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: '8px solid rgba(248, 223, 165, 0.4)'
            }}
          />

          {/* Author Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid rgba(248, 223, 165, 0.3)'
          }}>
            {author.photo && (
              <img
                src={author.photo}
                alt={author.name}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(248, 223, 165, 0.3)'
                }}
              />
            )}
            <div>
              <h4 style={{
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {author.name}
              </h4>
              {author.email && (
                <p style={{
                  margin: 0,
                  fontSize: '0.8rem',
                  color: '#9ca3af'
                }}>
                  {author.email}
                </p>
              )}
            </div>
          </div>

          {/* Bio */}
          {author.bio && (
            <div style={{ marginBottom: '1rem' }}>
              <p style={{
                margin: 0,
                fontSize: '0.9rem',
                lineHeight: '1.4',
                color: '#d1d5db'
              }}>
                {author.bio}
              </p>
            </div>
          )}

          {/* Expertise */}
          {author.expertise && author.expertise.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h5 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '0.8rem',
                fontWeight: '600',
                color: '#f8dfa5',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Expertise
              </h5>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.25rem'
              }}>
                {author.expertise.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'rgba(248, 223, 165, 0.1)',
                      color: '#f8dfa5',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      border: '1px solid rgba(248, 223, 165, 0.2)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Media */}
          {author.socialMedia && (
            <div>
              <h5 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '0.8rem',
                fontWeight: '600',
                color: '#f8dfa5',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Social Media
              </h5>
              <div style={{
                display: 'flex',
                gap: '0.5rem'
              }}>
                {author.socialMedia.linkedin && (
                  <a
                    href={author.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      background: 'rgba(248, 223, 165, 0.1)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '6px',
                      color: '#f8dfa5',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(248, 223, 165, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.2)';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}

                {author.socialMedia.twitter && (
                  <a
                    href={author.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      background: 'rgba(248, 223, 165, 0.1)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '6px',
                      color: '#f8dfa5',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(248, 223, 165, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.2)';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}

                {author.socialMedia.instagram && (
                  <a
                    href={author.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      background: 'rgba(248, 223, 165, 0.1)',
                      border: '1px solid rgba(248, 223, 165, 0.2)',
                      borderRadius: '6px',
                      color: '#f8dfa5',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(248, 223, 165, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.2)';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}