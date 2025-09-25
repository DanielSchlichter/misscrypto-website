'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const KryptoKompassClient = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true); // Video starts with autoPlay
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [particles, setParticles] = useState<any[]>([]);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    // Generate particles only on client side
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      color: i % 3 === 0 ? '#f8dfa5' : i % 3 === 1 ? '#e4b15e' : '#d4a574',
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const buyLinks = [
    {
      name: 'Amazon DE',
      url: 'https://amzn.eu/d/iLEKJaf',
      flag: '🇩🇪',
      color: '#FF9900'
    },
    {
      name: 'Thalia DE',
      url: 'https://tidd.ly/3Ic7eAb',
      flag: '🇩🇪',
      color: '#E31837'
    },
    {
      name: 'Thalia AT',
      url: 'https://tidd.ly/4gjKMBB',
      flag: '🇦🇹',
      color: '#E31837'
    },
    {
      name: 'Orell Füssli CH',
      url: 'https://tidd.ly/4m98cLe',
      flag: '🇨🇭',
      color: '#0066CC'
    }
  ];


  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #000000 100%)',
      color: '#ffffff',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Animated Background Particles */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              width: particle.width + 'px',
              height: particle.height + 'px',
              background: particle.color,
              borderRadius: '50%',
              left: particle.left + '%',
              top: particle.top + '%',
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: particle.delay + 's',
              opacity: 0.6
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '2rem 1rem',
        paddingTop: isMobile ? '7rem' : '2rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : undefined,
          gridTemplateColumns: isMobile ? undefined : '1fr 1fr',
          gap: isMobile ? '2rem' : '4rem',
          alignItems: 'center'
        }}>
          {/* Mobile: Title First, Desktop: Left Content */}
          {isMobile && (
            <div style={{
              textAlign: 'center',
              width: '100%'
            }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(248, 223, 165, 0.1)',
                border: '1px solid rgba(248, 223, 165, 0.3)',
                borderRadius: '2rem',
                padding: '0.5rem 1rem',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                📚 <span style={{ color: '#f8dfa5' }}>Jetzt vorbestellen</span>
              </div>

              {/* Main Title */}
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '300',
                background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 50%, #d4a574 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: '1.1',
                marginBottom: '1rem'
              }}>
                Der Krypto Kompass
              </h1>

              {/* Subtitle */}
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#e2e8f0',
                marginBottom: '2rem',
                lineHeight: '1.4'
              }}>
                Dein Einstieg in Bitcoin, Blockchain und Co
              </h2>
            </div>
          )}

          {/* Desktop: Left Content */}
          {!isMobile && (
            <div>
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(248, 223, 165, 0.1)',
                border: '1px solid rgba(248, 223, 165, 0.3)',
                borderRadius: '2rem',
                padding: '0.5rem 1rem',
                marginBottom: '2rem',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                📚 <span style={{ color: '#f8dfa5' }}>Jetzt vorbestellen</span>
              </div>

              {/* Main Title */}
              <h1 style={{
                fontSize: '4rem',
                fontWeight: '300',
                background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 50%, #d4a574 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: '1.1',
                marginBottom: '1rem'
              }}>
                Der Krypto Kompass
              </h1>

              {/* Subtitle */}
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#e2e8f0',
                marginBottom: '2rem',
                lineHeight: '1.4'
              }}>
                Dein Einstieg in Bitcoin, Blockchain und Co
              </h2>

              {/* Description */}
              <p style={{
                fontSize: '1.125rem',
                color: '#94a3b8',
                lineHeight: '1.6',
                marginBottom: '3rem',
                maxWidth: '600px'
              }}>
                Krypto verstehen – Angst verlieren: Der ultimative Praxis Guide von MissCrypto.
                Vom Grundbegriff Kryptowährung bis zum Wallet – verständlich, praktisch und ohne Fachkauderwelsch erklärt.
              </p>

              {/* CTA Button */}
              <div style={{
                display: 'flex',
                marginBottom: '2rem'
              }}>
                <button
                  onClick={() => document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '0.75rem',
                    padding: '1rem 2rem',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(248, 223, 165, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(248, 223, 165, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(248, 223, 165, 0.3)';
                  }}
                >
                  📖 Jetzt vorbestellen
                </button>
              </div>
            </div>
          )}

          {/* Video - Second on Mobile, Right on Desktop */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '600px',
              aspectRatio: '16/9',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              border: '2px solid rgba(248, 223, 165, 0.2)'
            }}>
              <video
                ref={videoRef}
                autoPlay
                loop
                playsInline
                muted={isVideoMuted}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              >
                <source src="/buch/Werbevideo-01-optimized.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Controls */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                display: 'flex',
                gap: '0.75rem',
                zIndex: 10
              }}>
                {/* Play/Pause Button */}
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      if (isVideoPlaying) {
                        videoRef.current.pause();
                      } else {
                        videoRef.current.play();
                      }
                    }
                  }}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '2px solid rgba(248, 223, 165, 0.8)',
                    color: '#f8dfa5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(248, 223, 165, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {isVideoPlaying ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7L8 5z"/>
                    </svg>
                  )}
                </button>

                {/* Volume Button */}
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      if (isVideoMuted) {
                        // Wenn aktuell stumm -> unmuten und von vorne starten
                        videoRef.current.muted = false;
                        videoRef.current.currentTime = 0;
                        videoRef.current.play();
                        setIsVideoMuted(false);
                      } else {
                        // Wenn aktuell laut -> stumm schalten
                        videoRef.current.muted = true;
                        setIsVideoMuted(true);
                      }
                    }
                  }}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '2px solid rgba(248, 223, 165, 0.8)',
                    color: '#f8dfa5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(248, 223, 165, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {isVideoMuted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile: Text and Button after Video */}
          {isMobile && (
            <div style={{
              textAlign: 'center',
              width: '100%'
            }}>
              {/* Description */}
              <p style={{
                fontSize: '1rem',
                color: '#94a3b8',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                Krypto verstehen – Angst verlieren: Der ultimative Praxis Guide von MissCrypto.
                Vom Grundbegriff Kryptowährung bis zum Wallet – verständlich, praktisch und ohne Fachkauderwelsch erklärt.
              </p>

              {/* CTA Button */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '2rem'
              }}>
                <button
                  onClick={() => document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '0.75rem',
                    padding: '1rem 2rem',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(248, 223, 165, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(248, 223, 165, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(248, 223, 165, 0.3)';
                  }}
                >
                  📖 Jetzt vorbestellen
                </button>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* Preview Section */}
      <section id="preview-section" style={{
        position: 'relative',
        zIndex: 2,
        padding: isMobile ? '0 1rem' : '0 2rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              Das Buch zum Krypto-Erfolg
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#94a3b8',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Jetzt vorbestellen und mit dem umfassenden Praxis-Guide durchstarten
            </p>
          </div>

          {/* Book Cover and Preview Images */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '4rem'
          }}>
            {/* Book Cover */}
            <div style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'relative',
                maxWidth: '400px',
                width: '100%'
              }}>
                <Image
                  src="/buch/BuchCover.webp"
                  alt="Der Krypto Kompass - Buchcover"
                  width={400}
                  height={600}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                    border: '2px solid rgba(248, 223, 165, 0.2)'
                  }}
                />
                {/* Floating badge */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                  color: '#000000',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(248, 223, 165, 0.4)',
                  animation: 'pulse 2s infinite'
                }}>
                  Bestseller 🏆
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '600',
                color: '#f8dfa5',
                marginBottom: '2rem'
              }}>
                Was macht dieses Buch besonders?
              </h3>

              <p style={{
                fontSize: '1.125rem',
                color: '#94a3b8',
                lineHeight: '1.8'
              }}>
                Dr. Stephanie Morgenroth (MissCrypto) begleitet auf YouTube und X regelmäßig Zehntausende durch die Welt der Blockchain und Finanzen.
                In diesem Leitfaden bündelt sie ihre Erfahrungen: Vom Krypto Crashkurs über vertiefende Info-Boxen bis hin zu konkreten Praxistipps.
                <br /><br />
                Du erfährst, warum Krypto mehr ist als nur Geld, welche Faktoren Bitcoin und Altcoins beeinflussen,
                wie du Hype Projekte von nachhaltigen Projekten trennst und weshalb Bitcoin als „digitales Gold" nicht bloß ein Buzzword ist.
              </p>

              {/* Buy Links direkt nach der Beschreibung */}
              <div style={{
                marginTop: '3rem'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: '1.5rem'
                }}>
                  {buyLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `2px solid ${link.color}30`,
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        textDecoration: 'none',
                        color: '#ffffff',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(10px)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.borderColor = link.color;
                        e.currentTarget.style.background = `${link.color}15`;
                        e.currentTarget.style.boxShadow = `0 10px 30px ${link.color}30`;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = `${link.color}30`;
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        fontSize: '1.5rem',
                        width: '50px',
                        height: '50px',
                        background: `${link.color}20`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px solid ${link.color}40`
                      }}>
                        {link.flag}
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: link.color,
                          marginBottom: '0.25rem'
                        }}>
                          {link.name}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#94a3b8'
                        }}>
                          Jetzt vorbestellen →
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Author Section */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        padding: isMobile ? '4rem 1rem' : '6rem 2rem',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid transparent',
        borderImage: 'linear-gradient(90deg, transparent 0%, #f8dfa5 20%, #e4b15e 50%, #f8dfa5 80%, transparent 100%) 1'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '3rem',
            fontWeight: '300',
            background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            Über die Autorin
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
            gap: '3rem',
            alignItems: 'center',
            background: 'rgba(248, 223, 165, 0.05)',
            border: '1px solid rgba(248, 223, 165, 0.1)',
            borderRadius: '2rem',
            padding: isMobile ? '2rem' : '3rem',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Author Image */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              order: isMobile ? 1 : 1
            }}>
              <div style={{
                position: 'relative',
                maxWidth: '300px',
                width: '100%'
              }}>
                <Image
                  src="/buch/2.webp"
                  alt="Dr. Stephanie Morgenroth (MissCrypto) mit dem Krypto Kompass Buch"
                  width={300}
                  height={400}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    border: '2px solid rgba(248, 223, 165, 0.2)'
                  }}
                />
              </div>
            </div>

            {/* Author Info */}
            <div style={{
              order: isMobile ? 2 : 2,
              textAlign: isMobile ? 'center' : 'left'
            }}>
              <h3 style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '600',
                color: '#f8dfa5',
                marginBottom: '1rem'
              }}>
                Dr. Stephanie Morgenroth
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#ffffff',
                fontWeight: '500',
                marginBottom: '2rem'
              }}>
                Online bekannt als "MissCrypto"
              </p>
              <p style={{
                fontSize: '1.125rem',
                color: '#94a3b8',
                lineHeight: '1.8',
                marginBottom: '3rem'
              }}>
                Als promovierte Expertin und erfolgreiche Content-Creatorin hat Dr. Stephanie Morgenroth bereits
                Zehntausende Menschen dabei unterstützt, die Welt der Kryptowährungen zu verstehen.
                Mit ihrer einzigartigen Fähigkeit, komplexe Finanzthemen verständlich zu erklären,
                bringt sie in diesem Buch ihre jahrelange Erfahrung aus der Praxis direkt zu dir nach Hause.
              </p>

              {/* Press Logos */}
              <div>
                <p style={{
                  fontSize: '1rem',
                  color: '#f8dfa5',
                  fontWeight: '500',
                  marginBottom: '1.5rem',
                  textAlign: isMobile ? 'center' : 'left'
                }}>
                  Bekannt aus:
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                  gap: '1.5rem',
                  alignItems: 'center'
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60px',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(248, 223, 165, 0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <Image
                      src="/logos/crypto-insiders.svg"
                      alt="Crypto Insiders Logo"
                      width={120}
                      height={40}
                      style={{
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60px',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(248, 223, 165, 0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <Image
                      src="/logos/btc-echo.svg"
                      alt="BTC Echo Logo"
                      width={120}
                      height={40}
                      style={{
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60px',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(248, 223, 165, 0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <Image
                      src="/logos/wirtschafts-woche.svg"
                      alt="Wirtschafts Woche Logo"
                      width={120}
                      height={40}
                      style={{
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60px',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(248, 223, 165, 0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <Image
                      src="/logos/business-insider.png"
                      alt="Business Insider Logo"
                      width={120}
                      height={40}
                      style={{
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @media (min-width: 768px) {
          section {
            padding: 4rem 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default KryptoKompassClient;