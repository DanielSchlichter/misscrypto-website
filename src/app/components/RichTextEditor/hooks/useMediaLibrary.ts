import { useState, useCallback } from 'react';
import { MediaFile } from '../types';

export const useMediaLibrary = () => {
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  // Fetch media files from API
  const fetchMedia = useCallback(async () => {
    setLoadingMedia(true);
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        setMediaFiles(data.files || []);
      } else {
        console.error('Failed to fetch media:', response.statusText);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Medien:', error);
    } finally {
      setLoadingMedia(false);
    }
  }, []);

  // Open media modal and fetch media
  const openMediaModal = useCallback(() => {
    setShowMediaModal(true);
    fetchMedia();
  }, [fetchMedia]);

  // Close media modal
  const closeMediaModal = useCallback(() => {
    setShowMediaModal(false);
  }, []);

  // Select a media file (callback function to be provided by parent)
  const selectMediaFile = useCallback((file: MediaFile, onSelect?: (file: MediaFile) => void) => {
    if (onSelect) {
      onSelect(file);
    }
    closeMediaModal();
  }, [closeMediaModal]);

  return {
    showMediaModal,
    setShowMediaModal,
    mediaFiles,
    setMediaFiles,
    loadingMedia,
    setLoadingMedia,
    fetchMedia,
    openMediaModal,
    closeMediaModal,
    selectMediaFile
  };
}; 