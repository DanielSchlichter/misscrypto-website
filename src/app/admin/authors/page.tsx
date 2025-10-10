'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import MediaModal from '../../components/RichTextEditor/components/MediaModal';

interface Author {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  photo?: string;
  website?: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  expertise?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  uploadedAt: string;
  mimeType: string;
}

export default function AdminAuthorsPage() {
  const { data: session } = useSession();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Edit State
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Media Modal State
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [mediaContext, setMediaContext] = useState<'create' | 'edit'>('create');

  // Form state
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    email: '',
    bio: '',
    photo: '',
    website: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    expertise: ''
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Authoren laden
  useEffect(() => {
    loadAuthors();
  }, []);

  const isMobile = screenWidth < 768;

  const loadAuthors = async () => {
    try {
      // Check if data is already cached in sessionStorage
      const cachedData = sessionStorage.getItem('authorsData');
      const cacheTime = sessionStorage.getItem('authorsCacheTime');

      // Use cache if it's less than 5 minutes old
      if (cachedData && cacheTime) {
        const age = Date.now() - parseInt(cacheTime);
        if (age < 300000) { // 5 minutes
          console.log('✍️ Using cached authors data');
          setAuthors(JSON.parse(cachedData));
          setIsLoading(false);
          return;
        }
      }

      setIsLoading(true);
      console.log('🚀 Loading fresh authors data...');

      const response = await fetch('/api/authors', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${data.authors.length} Authoren geladen und gecacht`);
        setAuthors(data.authors);
        setMessage(null);

        // Cache the data
        sessionStorage.setItem('authorsData', JSON.stringify(data.authors));
        sessionStorage.setItem('authorsCacheTime', Date.now().toString());
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Fehler beim Laden der Authoren' });
      }
    } catch (error: any) {
      console.error('Fehler beim Laden der Authoren:', error);
      setMessage({ type: 'error', text: 'Fehler beim Laden der Authoren' });
    } finally {
      setIsLoading(false);
    }
  };

  const createAuthor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAuthor.name || !newAuthor.email) {
      setMessage({ type: 'error', text: 'Name und E-Mail sind erforderlich' });
      return;
    }

    try {
      setIsCreating(true);
      setMessage(null);

      const authorData = {
        ...newAuthor,
        expertise: newAuthor.expertise.split(',').map(s => s.trim()).filter(s => s),
        socialMedia: {
          twitter: newAuthor.twitter || undefined,
          linkedin: newAuthor.linkedin || undefined,
          instagram: newAuthor.instagram || undefined
        },
        photo: newAuthor.photo || undefined
      };

      const response = await fetch('/api/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authorData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `Autor ${newAuthor.name} erfolgreich erstellt!` });
        setNewAuthor({ name: '', email: '', bio: '', photo: '', website: '', twitter: '', linkedin: '', instagram: '', expertise: '' });
        setShowCreateForm(false);
        // Cache invalidieren und neu laden
        sessionStorage.removeItem('authorsData');
        sessionStorage.removeItem('authorsCacheTime');
        loadAuthors();
      } else {
        setMessage({ type: 'error', text: data.error || 'Fehler beim Erstellen des Autors' });
      }
    } catch (error: any) {
      console.error('Fehler beim Erstellen:', error);
      setMessage({ type: 'error', text: 'Fehler beim Erstellen des Autors' });
    } finally {
      setIsCreating(false);
    }
  };

  const editAuthor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAuthor || !newAuthor.name || !newAuthor.email) {
      setMessage({ type: 'error', text: 'Name und E-Mail sind erforderlich' });
      return;
    }

    try {
      setIsEditing(true);
      setMessage(null);

      const authorData = {
        ...newAuthor,
        expertise: newAuthor.expertise.split(',').map(s => s.trim()).filter(s => s),
        socialMedia: {
          twitter: newAuthor.twitter || undefined,
          linkedin: newAuthor.linkedin || undefined,
          instagram: newAuthor.instagram || undefined
        },
        photo: newAuthor.photo || undefined
      };

      const response = await fetch('/api/authors', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedAuthor.id,
          ...authorData
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `Autor ${newAuthor.name} erfolgreich aktualisiert!` });
        setNewAuthor({ name: '', email: '', bio: '', photo: '', website: '', twitter: '', linkedin: '', instagram: '', expertise: '' });
        setSelectedAuthor(null);
        setShowEditModal(false);
        loadAuthors();
      } else {
        setMessage({ type: 'error', text: data.error || 'Fehler beim Aktualisieren des Autors' });
      }
    } catch (error: any) {
      console.error('Fehler beim Aktualisieren:', error);
      setMessage({ type: 'error', text: 'Fehler beim Aktualisieren des Autors' });
    } finally {
      setIsEditing(false);
    }
  };

  const openEditModal = (author: Author) => {
    setSelectedAuthor(author);
    setNewAuthor({
      name: author.name,
      email: author.email,
      bio: author.bio || '',
      photo: author.photo || '',
      website: author.website || '',
      twitter: author.socialMedia?.twitter || '',
      linkedin: author.socialMedia?.linkedin || '',
      instagram: author.socialMedia?.instagram || '',
      expertise: author.expertise?.join(', ') || ''
    });
    setShowEditModal(true);
  };

  const deleteAuthor = async (id: string, name: string) => {
    if (!confirm(`Möchten Sie den Autor "${name}" wirklich löschen?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/authors?id=${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `Autor ${name} erfolgreich gelöscht!` });
        loadAuthors();
      } else {
        setMessage({ type: 'error', text: data.error || 'Fehler beim Löschen des Autors' });
      }
    } catch (error: any) {
      console.error('Fehler beim Löschen:', error);
      setMessage({ type: 'error', text: 'Fehler beim Löschen des Autors' });
    }
  };

  // Media Modal Functions
  const fetchMedia = async () => {
    try {
      setLoadingMedia(true);
      const response = await fetch('/api/media');

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setMediaFiles(data.files || []);
      } else {
        console.error('Fehler beim Laden der Medien:', data.error);
        setMediaFiles([]);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Medien:', error);
      setMediaFiles([]);
    } finally {
      setLoadingMedia(false);
    }
  };

  const openMediaModal = (context: 'create' | 'edit') => {
    setMediaContext(context);
    setShowMediaModal(true);
    fetchMedia();
  };

  const handleMediaSelect = (file: MediaFile) => {
    setNewAuthor(prev => ({
      ...prev,
      photo: file.url
    }));
    setShowMediaModal(false);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('de-DE');
    } catch {
      return 'Unbekannt';
    }
  };

  if (isLoading) {
    return (
      <div style={{
        color: '#ffffff',
        fontFamily: 'Raleway, sans-serif',
        padding: isMobile ? '1rem' : '2rem'
      }}>
        {/* Header Skeleton */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            height: '2.5rem',
            width: '180px',
            background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '0.5rem',
            marginBottom: '0.5rem'
          }} />
          <div style={{
            height: '1.1rem',
            width: '280px',
            background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          }} />
          <div style={{
            height: '2.5rem',
            width: '160px',
            background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '0.5rem'
          }} />
        </div>

        {/* Authors Cards Skeleton */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              padding: '1.5rem'
            }}>
              {/* Avatar */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                margin: '0 auto 1rem'
              }} />

              {/* Name */}
              <div style={{
                height: '1.25rem',
                width: '70%',
                background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '0.5rem',
                margin: '0 auto 0.5rem'
              }} />

              {/* Email */}
              <div style={{
                height: '0.875rem',
                width: '80%',
                background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '0.5rem',
                margin: '0 auto 1rem'
              }} />

              {/* Bio lines */}
              <div style={{
                height: '0.875rem',
                width: '100%',
                background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '0.5rem',
                marginBottom: '0.5rem'
              }} />
              <div style={{
                height: '0.875rem',
                width: '60%',
                background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }} />

              {/* Action buttons */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center'
              }}>
                {[1, 2].map(j => (
                  <div key={j} style={{
                    height: '2rem',
                    width: '2rem',
                    background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    borderRadius: '0.5rem'
                  }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      color: '#ffffff',
      fontFamily: 'Raleway, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          ✍️ Authoren-Verwaltung
        </h1>
        <p style={{
          color: '#d1d5db',
          fontSize: '1.1rem'
        }}>
          Verwalten Sie Artikel-Authoren und deren Profile
        </p>
      </div>

      {/* Message */}
      {message && (
        <div style={{
          padding: '1rem',
          marginBottom: '2rem',
          borderRadius: '12px',
          background: message.type === 'success'
            ? 'rgba(34, 197, 94, 0.1)'
            : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${message.type === 'success' ? '#22c55e' : '#ef4444'}`,
          color: message.type === 'success' ? '#22c55e' : '#ef4444'
        }}>
          {message.text}
        </div>
      )}

      {/* Create Author Button */}
      <div style={{
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{
            background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
            color: '#000000',
            border: 'none',
            borderRadius: '12px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'Raleway, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(248, 223, 165, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {showCreateForm ? '❌ Abbrechen' : '➕ Neuen Autor erstellen'}
        </button>
      </div>

      {/* Create Author Form */}
      {showCreateForm && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            color: '#f8dfa5'
          }}>
            Neuen Autor erstellen
          </h3>

          <form onSubmit={createAuthor} style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#d1d5db',
                fontSize: '0.875rem'
              }}>
                Name *
              </label>
              <input
                type="text"
                value={newAuthor.name}
                onChange={(e) => setNewAuthor({...newAuthor, name: e.target.value})}
                placeholder="Vollständiger Name"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#d1d5db',
                fontSize: '0.875rem'
              }}>
                E-Mail *
              </label>
              <input
                type="email"
                value={newAuthor.email}
                onChange={(e) => setNewAuthor({...newAuthor, email: e.target.value})}
                placeholder="autor@example.com"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}
              />
            </div>

            <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#d1d5db',
                fontSize: '0.875rem'
              }}>
                Profilbild
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                {newAuthor.photo ? (
                  <div style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid rgba(248, 223, 165, 0.3)'
                  }}>
                    <img
                      src={newAuthor.photo}
                      alt="Profilbild"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setNewAuthor(prev => ({ ...prev, photo: '' }))}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        background: '#ef4444',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    border: '2px dashed rgba(248, 223, 165, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af',
                    fontSize: '0.75rem',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>👤</span>
                    <span>Kein Bild</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => openMediaModal('create')}
                  style={{
                    background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'Raleway, sans-serif'
                  }}
                >
                  {newAuthor.photo ? '📷 Bild ändern' : '📷 Bild auswählen'}
                </button>
              </div>
            </div>

            <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#d1d5db',
                fontSize: '0.875rem'
              }}>
                Biografie
              </label>
              <textarea
                value={newAuthor.bio}
                onChange={(e) => setNewAuthor({...newAuthor, bio: e.target.value})}
                placeholder="Kurze Beschreibung des Autors..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'Raleway, sans-serif',
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#d1d5db',
                fontSize: '0.875rem'
              }}>
                Website
              </label>
              <input
                type="url"
                value={newAuthor.website}
                onChange={(e) => setNewAuthor({...newAuthor, website: e.target.value})}
                placeholder="https://example.com"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#d1d5db',
                fontSize: '0.875rem'
              }}>
                Expertise (kommagetrennt)
              </label>
              <input
                type="text"
                value={newAuthor.expertise}
                onChange={(e) => setNewAuthor({...newAuthor, expertise: e.target.value})}
                placeholder="Bitcoin, DeFi, NFTs"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#d1d5db',
                fontSize: '0.875rem'
              }}>
                Twitter
              </label>
              <input
                type="text"
                value={newAuthor.twitter}
                onChange={(e) => setNewAuthor({...newAuthor, twitter: e.target.value})}
                placeholder="@username"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#d1d5db',
                fontSize: '0.875rem'
              }}>
                LinkedIn
              </label>
              <input
                type="text"
                value={newAuthor.linkedin}
                onChange={(e) => setNewAuthor({...newAuthor, linkedin: e.target.value})}
                placeholder="linkedin.com/in/username"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}
              />
            </div>

            <div style={{
              gridColumn: isMobile ? '1' : '1 / -1',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              <button
                type="submit"
                disabled={isCreating}
                style={{
                  background: isCreating
                    ? 'rgba(248, 223, 165, 0.3)'
                    : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: isCreating ? '#666' : '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isCreating ? 'not-allowed' : 'pointer',
                  fontFamily: 'Raleway, sans-serif'
                }}
              >
                {isCreating ? '🔄 Erstelle...' : '✅ Autor erstellen'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Authors List */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(248, 223, 165, 0.3)',
        borderRadius: '20px',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(248, 223, 165, 0.3)',
          background: 'rgba(248, 223, 165, 0.1)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            margin: 0,
            color: '#f8dfa5'
          }}>
            Alle Authoren ({authors.length})
          </h3>
        </div>

        <div style={{
          overflowX: 'auto'
        }}>
          {authors.length === 0 ? (
            <div style={{
              padding: '3rem',
              textAlign: 'center',
              color: '#9ca3af'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
              <p>Keine Authoren gefunden</p>
            </div>
          ) : (
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{
                  borderBottom: '1px solid rgba(248, 223, 165, 0.2)'
                }}>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    Name
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    E-Mail
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    Expertise
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    Status
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    Erstellt
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'center',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody>
                {authors.map((author, index) => (
                  <tr
                    key={author.id}
                    style={{
                      borderBottom: index < authors.length - 1 ? '1px solid rgba(248, 223, 165, 0.1)' : 'none'
                    }}
                  >
                    <td style={{
                      padding: '1rem',
                      color: '#ffffff',
                      fontWeight: '500'
                    }}>
                      {author.name}
                    </td>
                    <td style={{
                      padding: '1rem',
                      color: '#d1d5db',
                      fontSize: '0.875rem'
                    }}>
                      {author.email}
                    </td>
                    <td style={{
                      padding: '1rem',
                      color: '#d1d5db',
                      fontSize: '0.875rem'
                    }}>
                      {author.expertise?.length ? (
                        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                          {author.expertise.slice(0, 3).map((skill, i) => (
                            <span key={i} style={{
                              background: 'rgba(248, 223, 165, 0.2)',
                              color: '#f8dfa5',
                              padding: '0.125rem 0.5rem',
                              borderRadius: '12px',
                              fontSize: '0.75rem'
                            }}>
                              {skill}
                            </span>
                          ))}
                          {author.expertise.length > 3 && (
                            <span style={{
                              color: '#9ca3af',
                              fontSize: '0.75rem'
                            }}>
                              +{author.expertise.length - 3}
                            </span>
                          )}
                        </div>
                      ) : 'Keine Angabe'}
                    </td>
                    <td style={{
                      padding: '1rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: author.isActive ? '#22c55e' : '#ef4444'
                        }} />
                        <span style={{
                          color: author.isActive ? '#22c55e' : '#ef4444',
                          fontSize: '0.875rem'
                        }}>
                          {author.isActive ? 'Aktiv' : 'Inaktiv'}
                        </span>
                      </div>
                    </td>
                    <td style={{
                      padding: '1rem',
                      color: '#d1d5db',
                      fontSize: '0.875rem'
                    }}>
                      {formatDate(author.createdAt)}
                    </td>
                    <td style={{
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                      }}>
                        <button
                          onClick={() => openEditModal(author)}
                          style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            fontFamily: 'Raleway, sans-serif',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          ✏️ Bearbeiten
                        </button>
                        <button
                          onClick={() => deleteAuthor(author.id, author.name)}
                          style={{
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            fontFamily: 'Raleway, sans-serif',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          🗑️ Löschen
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Author Modal */}
      {showEditModal && selectedAuthor && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#f8dfa5'
            }}>
              ✏️ Autor bearbeiten
            </h3>

            <form onSubmit={editAuthor} style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: '1fr 1fr'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#d1d5db',
                  fontSize: '0.875rem'
                }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={newAuthor.name}
                  onChange={(e) => setNewAuthor({...newAuthor, name: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#d1d5db',
                  fontSize: '0.875rem'
                }}>
                  E-Mail *
                </label>
                <input
                  type="email"
                  value={newAuthor.email}
                  onChange={(e) => setNewAuthor({...newAuthor, email: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#d1d5db',
                  fontSize: '0.875rem'
                }}>
                  Profilbild
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  {newAuthor.photo ? (
                    <div style={{
                      position: 'relative',
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '3px solid rgba(248, 223, 165, 0.3)'
                    }}>
                      <img
                        src={newAuthor.photo}
                        alt="Profilbild"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setNewAuthor(prev => ({ ...prev, photo: '' }))}
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          background: '#ef4444',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      border: '2px dashed rgba(248, 223, 165, 0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9ca3af',
                      fontSize: '0.75rem',
                      textAlign: 'center'
                    }}>
                      <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>👤</span>
                      <span>Kein Bild</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => openMediaModal('edit')}
                    style={{
                      background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
                      color: '#000000',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'Raleway, sans-serif'
                    }}
                  >
                    {newAuthor.photo ? '📷 Bild ändern' : '📷 Bild auswählen'}
                  </button>
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#d1d5db',
                  fontSize: '0.875rem'
                }}>
                  Biografie
                </label>
                <textarea
                  value={newAuthor.bio}
                  onChange={(e) => setNewAuthor({...newAuthor, bio: e.target.value})}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontFamily: 'Raleway, sans-serif',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#d1d5db',
                  fontSize: '0.875rem'
                }}>
                  Website
                </label>
                <input
                  type="url"
                  value={newAuthor.website}
                  onChange={(e) => setNewAuthor({...newAuthor, website: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#d1d5db',
                  fontSize: '0.875rem'
                }}>
                  Expertise
                </label>
                <input
                  type="text"
                  value={newAuthor.expertise}
                  onChange={(e) => setNewAuthor({...newAuthor, expertise: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#d1d5db',
                  fontSize: '0.875rem'
                }}>
                  Twitter
                </label>
                <input
                  type="text"
                  value={newAuthor.twitter}
                  onChange={(e) => setNewAuthor({...newAuthor, twitter: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#d1d5db',
                  fontSize: '0.875rem'
                }}>
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={newAuthor.linkedin}
                  onChange={(e) => setNewAuthor({...newAuthor, linkedin: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontFamily: 'Raleway, sans-serif'
                  }}
                />
              </div>

              <div style={{
                gridColumn: '1 / -1',
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
                marginTop: '1rem'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedAuthor(null);
                    setNewAuthor({ name: '', email: '', bio: '', photo: '', website: '', twitter: '', linkedin: '', instagram: '', expertise: '' });
                  }}
                  style={{
                    background: 'rgba(107, 114, 128, 0.3)',
                    color: '#d1d5db',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'Raleway, sans-serif'
                  }}
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={isEditing}
                  style={{
                    background: isEditing
                      ? 'rgba(34, 197, 94, 0.3)'
                      : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    color: isEditing ? '#666' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: isEditing ? 'not-allowed' : 'pointer',
                    fontFamily: 'Raleway, sans-serif'
                  }}
                >
                  {isEditing ? '🔄 Speichere...' : '✅ Speichern'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Modal */}
      {showMediaModal && (
        <MediaModal
          mediaFiles={mediaFiles}
          loadingMedia={loadingMedia}
          onSelectFile={handleMediaSelect}
          onClose={() => setShowMediaModal(false)}
          onRefreshMedia={fetchMedia}
        />
      )}
    </div>
  );
}