import { createPortal } from 'react-dom';
import { useState, useRef, useCallback } from 'react';
import { MediaFile } from '../types';

interface MediaModalProps {
  mediaFiles: MediaFile[];
  loadingMedia: boolean;
  onSelectFile: (file: MediaFile) => void;
  onClose: () => void;
  onRefreshMedia?: () => void;
}

export default function MediaModal({
  mediaFiles,
  loadingMedia,
  onSelectFile,
  onClose,
  onRefreshMedia
}: MediaModalProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = useCallback(async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Bitte wählen Sie eine Bilddatei aus.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload fehlgeschlagen');
      }

      const data = await response.json();
      
      // Refresh media list to show new file
      if (onRefreshMedia && typeof onRefreshMedia === 'function') {
        try {
          await onRefreshMedia();
        } catch (error) {
          console.log('Refresh failed, but upload was successful:', error);
        }
      }
      
      // Auto-select the newly uploaded file
      if (data.file) {
        // Close modal and automatically use the uploaded file
        onSelectFile(data.file);
      } else {
        // Just close modal if no file data is returned
        alert('Bild wurde hochgeladen! Bitte wählen Sie es aus der Liste aus.');
      }

    } catch (error) {
      console.error('Upload error:', error);
      alert('Fehler beim Hochladen: ' + (error as Error).message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [onRefreshMedia, onSelectFile]);

  // Handle drag and drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  // Handle file input change
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);
  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '800px',
        maxHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{
            margin: 0,
            color: '#f8dfa5',
            fontSize: '1.25rem',
            fontWeight: '600'
          }}>
            📁 Bild aus Mediathek wählen
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {/* Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '6px',
                color: '#22c55e',
                padding: '0.5rem 1rem',
                cursor: uploading ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                opacity: uploading ? 0.5 : 1,
                transition: 'all 0.2s'
              }}
            >
              {uploading ? '⏳ Lädt...' : '📤 Hochladen'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '6px',
                color: '#ef4444',
                padding: '0.5rem',
                cursor: 'pointer',
                fontSize: '1.25rem',
                lineHeight: 1,
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div 
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '1.5rem',
            position: 'relative'
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {/* Drag Overlay */}
          {isDragOver && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(34, 197, 94, 0.1)',
              border: '3px dashed #22c55e',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              margin: '1rem',
              color: '#22c55e',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📥</div>
              <div>Bild hier ablegen zum Hochladen</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.7, marginTop: '0.5rem' }}>
                Nur Bilddateien (JPG, PNG, GIF, etc.)
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {uploading && (
            <div style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              textAlign: 'center',
              color: '#22c55e'
            }}>
              <div style={{ marginBottom: '0.5rem' }}>📤 Lade Bild hoch...</div>
              <div style={{
                background: '#333',
                borderRadius: '4px',
                height: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: '#22c55e',
                  height: '100%',
                  width: '100%',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
              </div>
            </div>
          )}

          {/* Drag & Drop Hint */}
          {!uploading && !loadingMedia && mediaFiles.length === 0 && (
            <div style={{
              border: '2px dashed #333',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              marginBottom: '1.5rem',
              background: 'rgba(248, 223, 165, 0.02)',
              transition: 'all 0.2s'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
              <div style={{ 
                color: '#f8dfa5', 
                fontSize: '1.1rem', 
                marginBottom: '0.5rem' 
              }}>
                Keine Bilder in der Mediathek
              </div>
              <div style={{ 
                color: 'rgba(248, 223, 165, 0.6)', 
                fontSize: '0.9rem',
                marginBottom: '1rem'
              }}>
                Ziehen Sie ein Bild hierher oder klicken Sie auf "Hochladen"
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '6px',
                  color: '#22c55e',
                  padding: '0.75rem 1.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                📤 Erstes Bild hochladen
              </button>
            </div>
          )}
          {loadingMedia ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem',
              color: 'rgba(248, 223, 165, 0.6)',
              fontSize: '1rem'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                border: '2px solid rgba(248, 223, 165, 0.3)',
                borderTop: '2px solid #f8dfa5',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginRight: '0.75rem'
              }}></div>
              Medien werden geladen...
            </div>
          ) : (
            <>
              {mediaFiles.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: 'rgba(248, 223, 165, 0.6)'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</div>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                    Keine Medien in der Mediathek gefunden.
                  </p>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '0.9rem', 
                    color: 'rgba(248, 223, 165, 0.4)' 
                  }}>
                    Laden Sie zuerst Bilder in die Mediathek hoch.
                  </p>
                </div>
              ) : (
                <>
                  {/* Upload Area for existing media */}
                  {mediaFiles.length > 0 && (
                    <div style={{
                      border: '2px dashed #333',
                      borderRadius: '8px',
                      padding: '1rem',
                      textAlign: 'center',
                      marginBottom: '1.5rem',
                      background: 'rgba(34, 197, 94, 0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#22c55e';
                      e.currentTarget.style.background = 'rgba(34, 197, 94, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#333';
                      e.currentTarget.style.background = 'rgba(34, 197, 94, 0.02)';
                    }}>
                      <div style={{ 
                        color: '#22c55e', 
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}>
                        <span>📤</span>
                        <span>Neues Bild hochladen oder hier hineinziehen</span>
                      </div>
                    </div>
                  )}
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '1rem'
                  }}>
                    {mediaFiles.filter(file => file.type === 'image').map((file) => (
                    <div
                      key={file.id}
                      onClick={() => onSelectFile(file)}
                      style={{
                        border: '1px solid #333',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: '#0a0a0a'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#f8dfa5';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#333';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <div style={{
                        width: '100%',
                        height: '120px',
                        overflow: 'hidden',
                        background: '#2a2a2a'
                      }}>
                        <img
                          src={file.url}
                          alt={file.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <div style={{
                        padding: '0.75rem',
                        color: '#f8dfa5',
                        fontSize: '0.875rem',
                        wordBreak: 'break-word'
                      }}>
                        {file.name}
                      </div>
                    </div>
                                      ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
} 