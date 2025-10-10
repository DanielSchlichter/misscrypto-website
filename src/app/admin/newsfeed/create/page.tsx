'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RichTextEditor from '../../../components/RichTextEditor/index';
import MediaModal from '../../../components/RichTextEditor/components/MediaModal';

interface Author {
  id: string;
  name: string;
  email: string;
  photo?: string;
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

export default function CreateNewsfeedPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditing = !!editId;
  
  const [screenWidth, setScreenWidth] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Bitcoin',
    status: 'draft' as 'draft' | 'published' | 'archived',
    authorId: '',
    featuredImage: '',
    metaTitle: '',
    metaDescription: ''
  });

  const [authors, setAuthors] = useState<Author[]>([]);
  const [loadingAuthors, setLoadingAuthors] = useState(true);

  // Media Modal State
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

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
    const fetchAuthors = async () => {
      try {
        setLoadingAuthors(true);
        const response = await fetch('/api/authors');
        const data = await response.json();

        if (data.success) {
          setAuthors(data.authors.filter((author: Author) => author.isActive !== false));
        } else {
          console.error('Fehler beim Laden der Authoren:', data.error);
          setAuthors([]);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Authoren:', error);
        setAuthors([]);
      } finally {
        setLoadingAuthors(false);
      }
    };

    fetchAuthors();
  }, []);

  // Post laden wenn im Bearbeitungsmodus
  useEffect(() => {
    if (isEditing && editId) {
      const fetchPost = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/newsfeed-v2/single?id=${editId}`);
          const data = await response.json();
          
          if (data.success && data.post) {
            const post = data.post;
            setFormData({
              title: post.title || '',
              content: post.content || '',
              category: post.category || 'Bitcoin',
              status: post.status || 'draft',
              authorId: post.authorId || '',
              featuredImage: post.featuredImage || '',
              metaTitle: post.seo?.metaTitle || post.title || '',
              metaDescription: post.seo?.metaDescription || post.excerpt || ''
            });
          } else {
            alert('Post nicht gefunden');
            router.push('/admin/newsfeed');
          }
        } catch (error) {
          console.error('Fehler beim Laden des Posts:', error);
          alert('Fehler beim Laden des Posts');
          router.push('/admin/newsfeed');
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [isEditing, editId, router]);

  const isMobile = screenWidth < 768;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let response;
      
      if (isEditing && editId) {
        // Update existierenden Post
        response = await fetch(`/api/newsfeed-v2/single?id=${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
            category: formData.category,
            status: formData.status,
            authorId: formData.authorId,
            featuredImage: formData.featuredImage,
            metaTitle: formData.metaTitle || formData.title,
            metaDescription: formData.metaDescription
          }),
        });
      } else {
        // Erstelle neuen Post
        response = await fetch('/api/newsfeed-v2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
            category: formData.category,
            status: formData.status,
            authorId: formData.authorId,
            featuredImage: formData.featuredImage,
            metaTitle: formData.metaTitle || formData.title,
            metaDescription: formData.metaDescription
          }),
        });
      }

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        alert(isEditing ? 'Post erfolgreich aktualisiert!' : 'Post erfolgreich erstellt!');
        router.push('/admin/newsfeed');
      } else {
        console.error(`Fehler beim ${isEditing ? 'Aktualisieren' : 'Erstellen'}:`, result || await response.text());
        alert(`Fehler beim ${isEditing ? 'Aktualisieren' : 'Erstellen'} des Posts.`);
      }
    } catch (error) {
      console.error(`Fehler beim ${isEditing ? 'Aktualisieren' : 'Erstellen'} des Posts:`, error);
      alert('Ein unerwarteter Fehler ist aufgetreten.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const openMediaModal = () => {
    setShowMediaModal(true);
    fetchMedia();
  };

  const handleMediaSelect = (file: MediaFile) => {
    setFormData(prev => ({
      ...prev,
      featuredImage: file.url
    }));
    setShowMediaModal(false);
  };

  const categories = [
    'Bitcoin',
    'Ethereum', 
    'Altcoins',
    'DeFi',
    'NFTs',
    'Trading',
    'Regulierung',
    'Technologie',
    'Marktanalyse',
    'Allgemein'
  ];

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <svg style={{ animation: 'spin 1s linear infinite', width: '24px', height: '24px' }} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#f8dfa5" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="32" />
          </svg>
          <span>Lade Post...</span>
        </div>
        <style jsx>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
      padding: '2rem 0'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: isMobile ? '0 1rem' : '0 2rem'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: isMobile ? '1.75rem' : '2.25rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            {isEditing ? '✏️ Post bearbeiten' : '➕ Neuen Post erstellen'}
          </h1>
          <p style={{
            color: '#d1d5db',
            fontSize: '1rem'
          }}>
            {isEditing ? 'Bearbeiten Sie Ihren Newsfeed-Post' : 'Erstelle einen neuen Newsfeed-Post mit SEO-Optimierung'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          padding: isMobile ? '1.5rem' : '2rem'
        }}>
          {/* Titel */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: '#f8dfa5',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Titel *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Bitcoin erreicht neues Allzeithoch..."
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(248, 223, 165, 0.3)',
                borderRadius: '0.5rem',
                color: '#ffffff',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Kategorie und Status */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                color: '#f8dfa5',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Kategorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '0.5rem',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} style={{ background: '#1a1a1a' }}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                color: '#f8dfa5',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as 'draft' | 'published' | 'archived')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '0.5rem',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              >
                <option value="draft" style={{ background: '#1a1a1a' }}>📝 Entwurf</option>
                <option value="published" style={{ background: '#1a1a1a' }}>🌐 Veröffentlicht</option>
                <option value="archived" style={{ background: '#1a1a1a' }}>📦 Archiviert</option>
              </select>
            </div>
          </div>

          {/* Beitragsbild und Autor */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                color: '#f8dfa5',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Beitragsbild (Thumbnail)
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                {formData.featuredImage ? (
                  <div style={{
                    position: 'relative',
                    width: '120px',
                    height: '80px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '2px solid rgba(248, 223, 165, 0.3)'
                  }}>
                    <img
                      src={formData.featuredImage}
                      alt="Beitragsbild"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: '#ef4444',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.7rem',
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
                    width: '120px',
                    height: '80px',
                    borderRadius: '8px',
                    border: '2px dashed rgba(248, 223, 165, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af',
                    fontSize: '0.75rem',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🖼️</span>
                    <span>Kein Bild</span>
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={openMediaModal}
                    style={{
                      background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
                      color: '#000000',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'Raleway, sans-serif'
                    }}
                  >
                    {formData.featuredImage ? '🖼️ Bild ändern' : '🖼️ Bild auswählen'}
                  </button>
                  <span style={{
                    color: '#9ca3af',
                    fontSize: '0.75rem',
                    textAlign: 'center'
                  }}>
                    Optional - wird als Thumbnail verwendet
                  </span>
                </div>
              </div>
            </div>

            {/* Autor Auswahl */}
            <div>
              <label style={{
                display: 'block',
                color: '#f8dfa5',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Autor auswählen
              </label>
              <select
                value={formData.authorId}
                onChange={(e) => handleInputChange('authorId', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '0.5rem',
                  color: '#ffffff',
                  fontSize: '1rem',
                  marginBottom: '0.75rem'
                }}
              >
                <option value="" style={{ background: '#1a1a1a' }}>
                  {loadingAuthors ? 'Lade Authoren...' : 'Autor auswählen (optional)'}
                </option>
                {authors.map(author => (
                  <option key={author.id} value={author.id} style={{ background: '#1a1a1a' }}>
                    ✍️ {author.name}
                  </option>
                ))}
              </select>

              {/* Ausgewählter Autor anzeigen */}
              {formData.authorId && (
                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  {(() => {
                    const selectedAuthor = authors.find(a => a.id === formData.authorId);
                    return selectedAuthor ? (
                      <>
                        {selectedAuthor.photo ? (
                          <img
                            src={selectedAuthor.photo}
                            alt={selectedAuthor.name}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '2px solid rgba(248, 223, 165, 0.3)'
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1rem',
                            color: '#000'
                          }}>
                            ✍️
                          </div>
                        )}
                        <div>
                          <div style={{ color: '#f8dfa5', fontWeight: '500' }}>
                            {selectedAuthor.name}
                          </div>
                          <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                            {selectedAuthor.email}
                          </div>
                        </div>
                      </>
                    ) : (
                      <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                        Autor nicht gefunden
                      </span>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Inhalt */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: '#f8dfa5',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Inhalt *
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => handleInputChange('content', content)}
            />
          </div>

          {/* SEO Sektion */}
          <div style={{
            background: 'rgba(248, 223, 165, 0.05)',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(248, 223, 165, 0.2)'
          }}>
            <h3 style={{
              color: '#f8dfa5',
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🔍 SEO-Optimierung
            </h3>

            {/* Meta Title */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                color: '#d1d5db',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Meta Title (falls abweichend vom Titel)
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                placeholder="Wird automatisch aus dem Titel generiert"
                maxLength={60}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '0.5rem',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  boxSizing: 'border-box'
                }}
              />
              <small style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                {formData.metaTitle.length}/60 Zeichen
              </small>
            </div>

            {/* Meta Description */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                color: '#d1d5db',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Meta Description
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                placeholder="Kurze Beschreibung für Suchmaschinen..."
                maxLength={160}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '0.5rem',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
              <small style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                {formData.metaDescription.length}/160 Zeichen
              </small>
            </div>


          </div>



          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
            flexWrap: 'wrap'
          }}>
            <button
              type="button"
              onClick={() => router.push('/admin/newsfeed')}
              disabled={isSubmitting}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(156, 163, 175, 0.2)',
                border: '1px solid rgba(156, 163, 175, 0.3)',
                borderRadius: '0.5rem',
                color: '#9ca3af',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.5 : 1
              }}
            >
              Abbrechen
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.content}
              style={{
                padding: '0.75rem 1.5rem',
                background: (isSubmitting || !formData.title || !formData.content)
                  ? 'rgba(156, 163, 175, 0.5)'
                  : 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
                border: 'none',
                borderRadius: '0.5rem',
                color: (isSubmitting || !formData.title || !formData.content) ? '#6b7280' : '#000000',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: (isSubmitting || !formData.title || !formData.content) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isSubmitting ? (
                <>
                  <svg 
                    style={{ 
                      animation: 'spin 1s linear infinite',
                      width: '16px',
                      height: '16px'
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
                  {isEditing ? 'Wird aktualisiert...' : 'Wird erstellt...'}
                </>
              ) : (
                isEditing ? '💾 Änderungen speichern' : '✏️ Post erstellen'
              )}
            </button>
          </div>
        </form>

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

        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
} 