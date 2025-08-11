'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

// Import types
import { RichTextEditorProps, ModuleData, ViewType, MediaFile } from './types';

// Import utilities
import { getCleanContentForPublishing } from './utils/htmlGenerators';
import { generateMetaData, applyTextFormatToSelection } from './utils/contentUtils';

// Import hooks
import { useModuleManagement } from './hooks/useModuleManagement';
import { useMediaLibrary } from './hooks/useMediaLibrary';

// Import components
import ModuleSidebar from './components/ModuleSidebar';
import MediaModal from './components/MediaModal';

export { getCleanContentForPublishing };

export default function RichTextEditor({ 
  value, 
  onChange, 
  onMetaGenerated, 
  onCleanContentChange 
}: RichTextEditorProps) {
  // Basic state
  const [content, setContent] = useState(value || '');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isInteractingWithSidebar, setIsInteractingWithSidebar] = useState(false);
  const [showHtmlView, setShowHtmlView] = useState(false);

  // Refs
  const editorRef = useRef<HTMLDivElement>(null);

  // Handle content changes
  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange(newContent);

      // Generate meta data
      if (onMetaGenerated) {
        const meta = generateMetaData(newContent);
        onMetaGenerated(meta);
      }
    }
  }, [onChange, onMetaGenerated]);

  // Custom hooks
  const moduleManagement = useModuleManagement(
    editorRef, 
    handleContentChange, 
    undefined, // heightInputRef
    () => setSidebarOpen(true) // onOpenSidebar callback
  );
  const mediaLibrary = useMediaLibrary();

  // Initialize component
  useEffect(() => {
    setMounted(true);
    if (value !== content) {
      setContent(value || '');
    }
  }, [value]);

  // Sync editor DOM only when value prop changes (important for edit mode)
  useEffect(() => {
    if (!mounted || !editorRef.current) return;
    const targetHtml = value || '';
    if (value && editorRef.current.innerHTML !== targetHtml) {
      editorRef.current.innerHTML = targetHtml;
    }
  }, [mounted, value]);

  // Handle clean content change
  useEffect(() => {
    if (onCleanContentChange && content && mounted) {
      const cleanContent = getCleanContentForPublishing(content);
      onCleanContentChange(cleanContent);
    }
  }, [content, onCleanContentChange, mounted]);

  // Add event listeners
  useEffect(() => {
    if (!mounted || !editorRef.current) return;

    const editor = editorRef.current;

    // General click handler to open sidebar
    const handleEditorClick = (event: MouseEvent) => {
      // First, let module click handler run
      moduleManagement.handleModuleClick(event);
      
      // If no module was clicked, open sidebar for general editing
      const target = event.target as HTMLElement;
      const moduleElement = target.closest('.editable-module');
      
      if (!moduleElement) {
        setSidebarOpen(true);
      }
    };

    // Add click listener
    editor.addEventListener('click', handleEditorClick);

    // Add input listener for content changes
    editor.addEventListener('input', handleContentChange);

    return () => {
      editor.removeEventListener('click', handleEditorClick);
      editor.removeEventListener('input', handleContentChange);
    };
  }, [mounted, moduleManagement.handleModuleClick, handleContentChange]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+M to toggle module sidebar
      if (event.ctrlKey && event.key === 'm') {
        event.preventDefault();
        setSidebarOpen(!sidebarOpen);
      }
      
      // Escape to close sidebar
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sidebarOpen]);

  // Handle HTML view toggle
  const toggleHtmlView = useCallback(() => {
    if (showHtmlView) {
      // Switch back to visual mode
      if (editorRef.current) {
        const textarea = editorRef.current.querySelector('textarea');
        if (textarea) {
          setContent(textarea.value);
          onChange(textarea.value);
          editorRef.current.innerHTML = textarea.value;
        }
      }
    } else {
      // Switch to HTML mode
      if (editorRef.current) {
        const currentContent = editorRef.current.innerHTML;
        editorRef.current.innerHTML = `<textarea style="width: 100%; height: 400px; background: #1a1a1a; color: #f8dfa5; border: 1px solid #333; padding: 1rem; font-family: 'Courier New', monospace; font-size: 14px; resize: vertical;">${currentContent}</textarea>`;
      }
    }
    setShowHtmlView(!showHtmlView);
  }, [showHtmlView, onChange]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="rich-text-editor-container" style={{
        position: 'relative',
        width: '100%',
        minHeight: '400px',
        background: '#0a0a0a',
        border: '1px solid #333',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {/* Main Toolbar */}
        <div style={{
          background: '#1a1a1a',
          borderBottom: '1px solid #333',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ 
            color: '#9ca3af', 
            fontSize: '0.875rem',
            fontStyle: 'italic'
          }}>
            📝 Text bearbeiten oder Module hinzufügen
          </div>
          
          <div style={{ 
            color: '#f8dfa5', 
            fontSize: '0.75rem',
            marginLeft: '1rem'
          }}>
            💡 Module werden an der Cursor-Position eingefügt
          </div>

          <div style={{ width: '1px', height: '24px', background: '#333', margin: '0 0.5rem' }} />

          <button
            type="button"
            onClick={toggleHtmlView}
            style={{
              background: showHtmlView ? 'rgba(248, 223, 165, 0.2)' : 'rgba(248, 223, 165, 0.1)',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '4px',
              color: '#f8dfa5',
              padding: '0.375rem 0.75rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            {showHtmlView ? 'Visual' : 'HTML'}
          </button>

          <div style={{ width: '1px', height: '24px', background: '#333', margin: '0 0.5rem' }} />

          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: sidebarOpen ? 'rgba(248, 223, 165, 0.2)' : 'rgba(248, 223, 165, 0.1)',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '4px',
              color: '#f8dfa5',
              padding: '0.375rem 0.75rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            🧩 Module
          </button>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          className="wysiwyg-editor"
          contentEditable={true}
          suppressContentEditableWarning={true}
          style={{
            display: showHtmlView ? 'none' : 'block',
            minHeight: '350px',
            padding: '1.5rem',
            color: '#f8dfa5',
            fontSize: '1rem',
            lineHeight: '1.6',
            outline: 'none',
            background: 'transparent',
            overflowY: 'auto',
            maxHeight: '600px'
          }}
          onKeyDown={(e) => {
            // Allow normal text input and editing
          }}
        >
          {/* Initial content placeholder - will be replaced by useEffect */}
        </div>

        {/* HTML View */}
        {showHtmlView && (
          <textarea
            className="html-editor"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              onChange(e.target.value);
            }}
            placeholder="HTML-Code hier bearbeiten..."
            spellCheck={false}
            style={{
              minHeight: '350px',
              padding: '1.5rem',
              color: '#f8dfa5',
              fontSize: '1rem',
              lineHeight: '1.6',
              outline: 'none',
              background: 'transparent',
              border: 'none',
              width: '100%',
              resize: 'vertical',
              fontFamily: 'monospace'
            }}
          />
        )}
      </div>

      {/* Module Sidebar */}
      {sidebarOpen && mounted && createPortal(
        <ModuleSidebar
          currentView={moduleManagement.currentView}
          moduleData={moduleManagement.moduleData}
          editingModuleId={moduleManagement.editingModuleId}
          onViewChange={moduleManagement.setCurrentView}
          onModuleDataChange={moduleManagement.setModuleData}
          onStartEditing={moduleManagement.startEditing}
          onCancelEditing={moduleManagement.cancelEditing}
          onSaveModule={() => {
            moduleManagement.saveModule();
            // Sicherstellen, dass der Inhalt nach dem Einfügen sofort synchronisiert wird
            setTimeout(() => {
              if (editorRef.current) {
                const newContent = editorRef.current.innerHTML;
                setContent(newContent);
                onChange(newContent);
              }
            }, 50);
          }}
          onClose={() => setSidebarOpen(false)}
          onOpenMediaModal={mediaLibrary.openMediaModal}
          onContentChange={handleContentChange}
        />,
        document.body
      )}

      {/* Media Modal */}
      {mediaLibrary.showMediaModal && mounted && (
        <MediaModal
          mediaFiles={mediaLibrary.mediaFiles}
          loadingMedia={mediaLibrary.loadingMedia}
          onSelectFile={(file: MediaFile) => {
            // Update module data with selected file
            if (moduleManagement.currentView === 'image') {
              moduleManagement.setModuleData({
                ...moduleManagement.moduleData,
                url: file.url,
                alt: moduleManagement.moduleData.alt || file.name
              });
            }
            mediaLibrary.closeMediaModal();
          }}
          onClose={mediaLibrary.closeMediaModal}
          onRefreshMedia={mediaLibrary.fetchMedia}
        />
      )}
    </>
  );
} 