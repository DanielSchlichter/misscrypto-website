'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  uploadedAt: string;
  mimeType: string;
}

export default function MediaPage() {
  const { data: session } = useSession();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<MediaFile[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [screenWidth, setScreenWidth] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeletingBulk, setIsDeletingBulk] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;

  // Medien laden
  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async (retryCount = 0) => {
    try {
      setIsLoading(true);
      console.log(`🚀 Lade Media-Dateien... (Versuch ${retryCount + 1})`);
      
      // API-Call mit längerem Timeout für Media
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s Timeout für Media
      
      const response = await fetch('/api/media', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        console.log(`✅ ${data.files?.length || 0} Media-Dateien geladen`);
        setMediaFiles(data.files || []);
      } else {
        console.error('Fehler beim Laden der Medien:', data.error);
      }
    } catch (error: any) {
      console.error('Fehler beim Laden der Medien:', error);
      
      if (error.name === 'AbortError' && retryCount < 2) {
        console.log(`⏳ Media Retry ${retryCount + 1}/3 nach Timeout...`);
        setTimeout(() => fetchMedia(retryCount + 1), 2000); // 2s warten vor Retry
        return;
      }
      
      // Fallback: Leere Liste setzen bei Fehlern
      setMediaFiles([]);
    } finally {
      if (retryCount === 0) {
        setIsLoading(false);
      }
    }
  };

  // Drag & Drop Handler
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    setIsUploading(true);

    try {
      for (const file of files) {
        // Validierung
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
          alert(`${file.name} ist kein unterstützter Dateityp.`);
          continue;
        }

        // Größe prüfen (100MB Limit)
        if (file.size > 100 * 1024 * 1024) {
          alert(`${file.name} ist zu groß. Maximum: 100MB.`);
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Upload fehlgeschlagen');
        }
      }

      // Medien neu laden
      await fetchMedia();
      
      // File input zurücksetzen
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload-Fehler:', error);
      alert('Upload fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm('Möchten Sie diese Datei wirklich löschen?')) {
      return;
    }

    try {
      const response = await fetch(`/api/media/${fileId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setMediaFiles(mediaFiles.filter(file => file.id !== fileId));
        setSelectedFiles(selectedFiles.filter(file => file.id !== fileId));
      } else {
        throw new Error(result.error || 'Löschen fehlgeschlagen');
      }
    } catch (error) {
      console.error('Lösch-Fehler:', error);
      alert('Löschen fehlgeschlagen. Bitte versuchen Sie es erneut.');
    }
  };

  const handleSelectFile = (file: MediaFile) => {
    setSelectedFiles(prev => 
      prev.find(f => f.id === file.id) 
        ? prev.filter(f => f.id !== file.id)
        : [...prev, file]
    );
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL in Zwischenablage kopiert!');
  };

  const handleBulkDelete = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsDeletingBulk(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (const file of selectedFiles) {
        try {
          const response = await fetch(`/api/media/${file.id}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            successCount++;
          } else {
            errorCount++;
            console.error(`Fehler beim Löschen von ${file.name}`);
          }
        } catch (error) {
          errorCount++;
          console.error(`Fehler beim Löschen von ${file.name}:`, error);
        }
      }

      // UI aktualisieren
      setMediaFiles(prev => prev.filter(file => 
        !selectedFiles.some(selected => selected.id === file.id)
      ));
      setSelectedFiles([]);
      setShowDeleteModal(false);

      // Erfolgs-/Fehlermeldung
      if (errorCount === 0) {
        alert(`${successCount} Datei(en) erfolgreich gelöscht!`);
      } else {
        alert(`${successCount} Datei(en) gelöscht, ${errorCount} Fehler aufgetreten.`);
      }

      // Medien neu laden für Konsistenz
      await fetchMedia();

    } catch (error) {
      console.error('Fehler beim Bulk-Löschen:', error);
      alert('Fehler beim Löschen der Dateien');
    } finally {
      setIsDeletingBulk(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesType;
  });

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
        color: '#ffffff',
        padding: isMobile ? '1rem' : '2rem',
        fontFamily: 'Raleway, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '3rem',
            marginBottom: '1rem',
            animation: 'spin 1s linear infinite' 
          }}>📁</div>
          <p style={{ marginBottom: '0.5rem' }}>Mediathek wird geladen...</p>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
            Dies kann beim ersten Aufruf etwas dauern
          </p>
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #111111 100%)',
      color: '#ffffff',
      padding: isMobile ? '1rem' : '2rem',
      fontFamily: 'Raleway, sans-serif'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: isMobile ? '2rem' : '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          Mediathek
        </h1>
        <p style={{
          color: '#d1d5db',
          fontSize: '1.1rem'
        }}>
          Verwalten Sie Ihre Medien und laden Sie neue Dateien hoch
        </p>
      </div>

      {/* Upload-Bereich */}
      <div
        style={{
          background: dragActive 
            ? 'rgba(248, 223, 165, 0.1)' 
            : 'rgba(255, 255, 255, 0.05)',
          border: dragActive 
            ? '2px dashed #f8dfa5' 
            : '2px dashed rgba(248, 223, 165, 0.3)',
          borderRadius: '1rem',
          padding: '3rem 2rem',
          textAlign: 'center',
          marginBottom: '2rem',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        {isUploading ? (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <p style={{ fontSize: '1.1rem', color: '#f8dfa5' }}>
              Dateien werden hochgeladen...
            </p>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Dateien hier ablegen oder klicken zum Auswählen
            </p>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
              Unterstützt: Bilder (JPG, PNG, GIF, WebP) und Videos (MP4, WebM, AVI)
            </p>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
              Maximale Dateigröße: 100MB
            </p>
          </div>
        )}
      </div>

      {/* Filter und Suche */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '1rem',
        marginBottom: '2rem',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <input
            type="text"
            placeholder="Medien durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.75rem',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '0.5rem',
              color: '#ffffff',
              fontSize: '0.875rem',
              width: isMobile ? '100%' : '300px'
            }}
          />
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'image' | 'video')}
            style={{
              padding: '0.75rem',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '0.5rem',
              color: '#ffffff',
              fontSize: '0.875rem'
            }}
          >
            <option value="all">Alle Dateien</option>
            <option value="image">Nur Bilder</option>
            <option value="video">Nur Videos</option>
          </select>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.5rem'
        }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '0.75rem',
              background: viewMode === 'grid' 
                ? 'rgba(248, 223, 165, 0.2)' 
                : 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '0.5rem',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            ⊞
          </button>
          <button
            onClick={() => setViewMode('list')}
            style={{
              padding: '0.75rem',
              background: viewMode === 'list' 
                ? 'rgba(248, 223, 165, 0.2)' 
                : 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '0.5rem',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Medien-Anzeige */}
      {filteredFiles.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#9ca3af'
        }}>
          {searchTerm || filterType !== 'all' ? 
            'Keine Medien gefunden, die den Filterkriterien entsprechen.' :
            'Noch keine Medien hochgeladen. Laden Sie Ihre ersten Dateien hoch!'
          }
          
          {/* Refresh Button */}
          <div style={{ marginTop: '2rem' }}>
            <button
              onClick={() => fetchMedia()}
              style={{
                background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
                color: '#000000',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
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
              🔄 Medien neu laden
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? 'repeat(auto-fill, minmax(150px, 1fr))'
            : 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: selectedFiles.find(f => f.id === file.id) 
                  ? '2px solid #f8dfa5' 
                  : '1px solid rgba(248, 223, 165, 0.2)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleSelectFile(file)}
            >
              <div style={{
                aspectRatio: '1',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {file.type === 'image' ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 0, 0, 0.3)',
                    fontSize: '3rem'
                  }}>
                    🎥
                  </div>
                )}
                
                {selectedFiles.find(f => f.id === file.id) && (
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: '#f8dfa5',
                    color: '#000',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}>
                    ✓
                  </div>
                )}
              </div>
              
              <div style={{ padding: '0.75rem' }}>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.25rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {file.name}
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af'
                }}>
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '0.75rem',
          overflow: 'hidden'
        }}>
          {filteredFiles.map((file, index) => (
            <div
              key={file.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                borderBottom: index < filteredFiles.length - 1 
                  ? '1px solid rgba(248, 223, 165, 0.1)' 
                  : 'none',
                background: selectedFiles.find(f => f.id === file.id)
                  ? 'rgba(248, 223, 165, 0.1)'
                  : 'transparent',
                cursor: 'pointer'
              }}
              onClick={() => handleSelectFile(file)}
            >
              <div style={{
                width: '48px',
                height: '48px',
                marginRight: '1rem',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                {file.type === 'image' ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 0, 0, 0.3)',
                    fontSize: '1.5rem'
                  }}>
                    🎥
                  </div>
                )}
              </div>
              
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.25rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {file.name}
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af'
                }}>
                  {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString('de-DE')}
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center'
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(file.url);
                  }}
                  style={{
                    background: 'rgba(248, 223, 165, 0.1)',
                    border: '1px solid rgba(248, 223, 165, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f8dfa5',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                  title="URL kopieren"
                >
                  📋
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFile(file.id);
                  }}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#ef4444',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                  title="Löschen"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ausgewählte Dateien Aktionen */}
      {selectedFiles.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          borderRadius: '1rem',
          padding: '1rem',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <span style={{ fontSize: '0.875rem' }}>
            {selectedFiles.length} ausgewählt
          </span>
          
          <button
            onClick={() => {
              const urls = selectedFiles.map(f => f.url).join('\n');
              copyToClipboard(urls);
            }}
            style={{
              background: 'rgba(248, 223, 165, 0.1)',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '0.5rem',
              color: '#f8dfa5',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            URLs kopieren
          </button>
          
          <button
            onClick={() => setShowDeleteModal(true)}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '0.5rem',
              color: '#ef4444',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            🗑️ Löschen
          </button>
          
          <button
            onClick={() => setSelectedFiles([])}
            style={{
              background: 'rgba(156, 163, 175, 0.1)',
              border: '1px solid rgba(156, 163, 175, 0.3)',
              borderRadius: '0.5rem',
              color: '#9ca3af',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Abwählen
          </button>
        </div>
      )}

      {/* Lösch-Bestätigungsmodal */}
      {showDeleteModal && (
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
          zIndex: 2000
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#f8dfa5'
            }}>
              Dateien löschen bestätigen
            </h3>
            
            <p style={{
              color: '#d1d5db',
              marginBottom: '1.5rem',
              lineHeight: '1.5'
            }}>
              Möchten Sie wirklich <strong>{selectedFiles.length}</strong> Datei(en) 
              dauerhaft löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>

            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <p style={{
                color: '#ef4444',
                fontSize: '0.875rem',
                margin: 0,
                fontWeight: '500'
              }}>
                ⚠️ Warnung: Die Dateien werden aus Firebase Storage gelöscht und 
                sind nicht mehr verfügbar.
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeletingBulk}
                style={{
                  background: 'rgba(156, 163, 175, 0.1)',
                  border: '1px solid rgba(156, 163, 175, 0.3)',
                  borderRadius: '0.5rem',
                  color: '#9ca3af',
                  padding: '0.75rem 1.5rem',
                  cursor: isDeletingBulk ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem',
                  opacity: isDeletingBulk ? 0.5 : 1
                }}
              >
                Abbrechen
              </button>
              
              <button
                onClick={handleBulkDelete}
                disabled={isDeletingBulk}
                style={{
                  background: isDeletingBulk 
                    ? 'rgba(156, 163, 175, 0.1)' 
                    : 'rgba(239, 68, 68, 0.2)',
                  border: `1px solid ${isDeletingBulk 
                    ? 'rgba(156, 163, 175, 0.3)' 
                    : 'rgba(239, 68, 68, 0.5)'}`,
                  borderRadius: '0.5rem',
                  color: isDeletingBulk ? '#9ca3af' : '#ef4444',
                  padding: '0.75rem 1.5rem',
                  cursor: isDeletingBulk ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {isDeletingBulk ? (
                  <>
                    <span style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #9ca3af',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></span>
                    Lösche...
                  </>
                ) : (
                  <>🗑️ Endgültig löschen</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 