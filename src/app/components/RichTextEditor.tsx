'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

// Import types
import { RichTextEditorProps, ModuleData, ViewType, MediaFile } from './RichTextEditor/types';

// Import utilities
import { getCleanContentForPublishing, generateModuleHtml } from './RichTextEditor/utils/htmlGenerators';
import { generateMetaData, applyTextFormatToSelection } from './RichTextEditor/utils/contentUtils';

// Import hooks
import { useModuleManagement } from './RichTextEditor/hooks/useModuleManagement';
import { useMediaLibrary } from './RichTextEditor/hooks/useMediaLibrary';

// Import components
import FloatingToolbar from './RichTextEditor/components/FloatingToolbar';
import ModuleSidebar from './RichTextEditor/components/ModuleSidebar';
import MediaModal from './RichTextEditor/components/MediaModal';

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
  const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showHtmlView, setShowHtmlView] = useState(false);
  
  // Refs
  const editorRef = useRef<HTMLDivElement>(null);
  const floatingToolbarRef = useRef<HTMLDivElement>(null);

  // Handle content changes (define before hooks that use it)
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

  // Height control refs (for image module)
  const heightInputRef = useRef<HTMLInputElement>(null);
  const incrementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const decrementIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Custom hooks
  const moduleManagement = useModuleManagement(editorRef, handleContentChange, heightInputRef);
  const mediaLibrary = useMediaLibrary();

  // Height increment/decrement functions (from original backup)
  const incrementHeight = useCallback(() => {
    if (heightInputRef.current) {
      const currentValue = parseInt(heightInputRef.current.value) || 300;
      const newValue = Math.min(currentValue + 10, 800);
      heightInputRef.current.value = newValue.toString();
      moduleManagement.setModuleData({...moduleManagement.moduleData, height: newValue});
    }
  }, [moduleManagement]);

  const decrementHeight = useCallback(() => {
    if (heightInputRef.current) {
      const currentValue = parseInt(heightInputRef.current.value) || 300;
      const newValue = Math.max(currentValue - 10, 100);
      heightInputRef.current.value = newValue.toString();
      moduleManagement.setModuleData({...moduleManagement.moduleData, height: newValue});
    }
  }, [moduleManagement]);

  const startIncrement = useCallback(() => {
    incrementHeight(); // Sofort einmal ausführen
    incrementIntervalRef.current = setInterval(incrementHeight, 100); // Dann alle 100ms
    
    // Globale Event-Listener für sichere Stopp-Events
    const stopOnMouseUp = () => {
      stopIncrement();
      document.removeEventListener('mouseup', stopOnMouseUp);
      document.removeEventListener('touchend', stopOnMouseUp);
    };
    
    document.addEventListener('mouseup', stopOnMouseUp);
    document.addEventListener('touchend', stopOnMouseUp);
  }, [incrementHeight]);

  const startDecrement = useCallback(() => {
    decrementHeight(); // Sofort einmal ausführen
    decrementIntervalRef.current = setInterval(decrementHeight, 100); // Dann alle 100ms
    
    // Globale Event-Listener für sichere Stopp-Events
    const stopOnMouseUp = () => {
      stopDecrement();
      document.removeEventListener('mouseup', stopOnMouseUp);
      document.removeEventListener('touchend', stopOnMouseUp);
    };
    
    document.addEventListener('mouseup', stopOnMouseUp);
    document.addEventListener('touchend', stopOnMouseUp);
  }, [decrementHeight]);

  const stopIncrement = useCallback(() => {
    if (incrementIntervalRef.current) {
      clearInterval(incrementIntervalRef.current);
      incrementIntervalRef.current = null;
    }
  }, []);

  const stopDecrement = useCallback(() => {
    if (decrementIntervalRef.current) {
      clearInterval(decrementIntervalRef.current);
      decrementIntervalRef.current = null;
    }
  }, []);

  // Ensure proper paragraph structure when typing
  const ensureParagraphStructure = useCallback(() => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    const currentNode = range.startContainer;
    
    // If we're typing directly in the editor div, wrap in paragraph
    if (currentNode === editorRef.current || 
        (currentNode.nodeType === Node.TEXT_NODE && currentNode.parentNode === editorRef.current)) {
      
      // Create a paragraph and move the text node into it
      const p = document.createElement('p');
      const textContent = currentNode.textContent || '';
      
      if (currentNode.nodeType === Node.TEXT_NODE) {
        p.appendChild(currentNode.cloneNode(true));
        editorRef.current.replaceChild(p, currentNode);
      }
      
      // Restore cursor position
      const newRange = document.createRange();
      newRange.setStart(p.firstChild || p, range.startOffset);
      newRange.setEnd(p.firstChild || p, range.endOffset);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  }, []);

  // Handle input changes without losing cursor position
  const handleInput = useCallback((event: React.FormEvent<HTMLDivElement>) => {
    // Ensure proper paragraph structure
    setTimeout(() => {
      ensureParagraphStructure();
      handleContentChange();
    }, 0);
  }, [ensureParagraphStructure, handleContentChange]);

  // Handle text selection for floating toolbar
  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      setShowFloatingToolbar(false);
      return;
    }

    const range = selection.getRangeAt(0);
    if (range.collapsed || !editorRef.current?.contains(range.commonAncestorContainer)) {
      setShowFloatingToolbar(false);
      return;
    }

    const selectedText = selection.toString().trim();
    if (selectedText.length > 0) {
      setSelectedText(selectedText);
      setShowFloatingToolbar(true);

      // Position floating toolbar
      const rect = range.getBoundingClientRect();
      if (floatingToolbarRef.current) {
        const toolbarWidth = 300;
        const left = Math.max(10, Math.min(window.innerWidth - toolbarWidth - 10, rect.left));
        const top = rect.top - 60;

        floatingToolbarRef.current.style.left = `${left}px`;
        floatingToolbarRef.current.style.top = `${top}px`;
      }
    } else {
      setShowFloatingToolbar(false);
    }
  }, []);

  // Initialize component and update editor content
  useEffect(() => {
    setMounted(true);
    if (value !== content) {
      setContent(value || '');
    }
    
    // Update editor content manually (not via dangerouslySetInnerHTML)
    if (editorRef.current && value !== undefined && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value, content]);

  // Update editor when content changes (for HTML view -> Visual view sync)
  useEffect(() => {
    if (editorRef.current && !showHtmlView && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content, showHtmlView]);

  // Stable image data for dependency tracking (from original backup)
  const imageModuleData = useMemo(() => {
    if (moduleManagement.currentView === 'image' && moduleManagement.moduleData) {
      return {
        url: moduleManagement.moduleData.url || '',
        alt: moduleManagement.moduleData.alt || '',
        height: moduleManagement.moduleData.height || 300
      };
    }
    return null;
  }, [moduleManagement.currentView, moduleManagement.moduleData?.url, moduleManagement.moduleData?.alt, moduleManagement.moduleData?.height]);

  // Auto-update module in real-time when editing (from original backup)
  useEffect(() => {
    if (moduleManagement.editingModuleId && moduleManagement.currentView === 'image' && imageModuleData && editorRef.current) {
      // Only update for image modules to avoid unnecessary re-renders
      const updatedHtml = generateModuleHtml('image', imageModuleData, moduleManagement.editingModuleId);
      const moduleElement = editorRef.current.querySelector(`[data-module-id="${moduleManagement.editingModuleId}"]`);
      
      if (moduleElement) {
        // Create temporary container to get new element
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = updatedHtml;
        const newElement = tempDiv.firstElementChild;
        
        if (newElement) {
          moduleElement.replaceWith(newElement);
          
          // Update the content state
          const newContent = editorRef.current.innerHTML;
          setContent(newContent);
          onChange(newContent);
          
          // Update modules array in moduleManagement
          moduleManagement.setModules(prev => prev.map(module => 
            module.id === moduleManagement.editingModuleId 
              ? { ...module, data: { ...imageModuleData } }
              : module
          ));
        }
      }
    }
  }, [imageModuleData, moduleManagement.editingModuleId, moduleManagement.currentView, moduleManagement.setModules, onChange]);

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

    // Add module click listener
    editor.addEventListener('click', moduleManagement.handleModuleClick);

    // Add selection change listener
    document.addEventListener('selectionchange', handleTextSelection);

    // Add input listener for content changes
    editor.addEventListener('input', handleContentChange);

      return () => {
      editor.removeEventListener('click', moduleManagement.handleModuleClick);
      document.removeEventListener('selectionchange', handleTextSelection);
      editor.removeEventListener('input', handleContentChange);
    };
  }, [mounted, moduleManagement.handleModuleClick, handleTextSelection, handleContentChange]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+M to toggle module sidebar
      if (event.ctrlKey && event.key === 'm') {
        event.preventDefault();
        setSidebarOpen(!sidebarOpen);
      }
      
      // Ctrl+B for bold
      if (event.ctrlKey && event.key === 'b') {
        event.preventDefault();
        applyTextFormatToSelection('bold', undefined, editorRef);
        handleContentChange();
      }
      
      // Ctrl+I for italic
      if (event.ctrlKey && event.key === 'i') {
        event.preventDefault();
        applyTextFormatToSelection('italic', undefined, editorRef);
        handleContentChange();
      }
      
      // Ctrl+U for underline
      if (event.ctrlKey && event.key === 'u') {
        event.preventDefault();
        applyTextFormatToSelection('underline', undefined, editorRef);
        handleContentChange();
      }
      
      // Escape to close sidebar and floating toolbar
      if (event.key === 'Escape') {
        setSidebarOpen(false);
        setShowFloatingToolbar(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sidebarOpen, handleContentChange]);

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
          <button
            type="button"
            onClick={() => applyTextFormatToSelection('bold', undefined, editorRef)}
            style={{
              background: 'rgba(248, 223, 165, 0.1)',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '4px',
              color: '#f8dfa5',
              padding: '0.375rem 0.75rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 'bold'
            }}
          >
            B
        </button>
          
        <button 
            type="button"
            onClick={() => applyTextFormatToSelection('italic', undefined, editorRef)}
            style={{
              background: 'rgba(248, 223, 165, 0.1)',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '4px',
              color: '#f8dfa5',
              padding: '0.375rem 0.75rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontStyle: 'italic'
            }}
          >
            I
        </button>
          
        <button 
            type="button"
            onClick={() => applyTextFormatToSelection('underline', undefined, editorRef)}
            style={{
              background: 'rgba(248, 223, 165, 0.1)',
              border: '1px solid rgba(248, 223, 165, 0.3)',
              borderRadius: '4px',
              color: '#f8dfa5',
              padding: '0.375rem 0.75rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              textDecoration: 'underline'
            }}
          >
            U
        </button>

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
          contentEditable
          onInput={handleInput}
          onFocus={() => setSidebarOpen(true)}
          onBlur={(e) => {
            // Only close sidebar if focus moves outside editor and not to sidebar
            setTimeout(() => {
              if (!isInteractingWithSidebar && document.activeElement !== editorRef.current) {
                setSidebarOpen(false);
              }
            }, 150);
          }}
          onMouseUp={() => {
            setTimeout(handleTextSelection, 10);
          }}
          onKeyUp={() => {
            setTimeout(handleTextSelection, 10);
          }}
          suppressContentEditableWarning={true}
          spellCheck={false}
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
        >
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
           onFocus={() => setSidebarOpen(true)}
           onBlur={(e) => {
             setTimeout(() => {
               if (!isInteractingWithSidebar) {
                 setSidebarOpen(false);
               }
             }, 150);
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
              resize: 'none',
              fontFamily: 'monospace'
            }}
          />
        )}

        {/* Floating Toolbar */}
        {showFloatingToolbar && mounted && (
          <FloatingToolbar
            ref={floatingToolbarRef}
            onFormatText={(format, value) => {
              applyTextFormatToSelection(format, value, editorRef);
              handleContentChange();
              setShowFloatingToolbar(false);
            }}
            onClose={() => setShowFloatingToolbar(false)}
         />
       )}
      </div>

      {/* Module Sidebar */}
      {sidebarOpen && mounted && createPortal(
        <div
          onMouseEnter={() => setIsInteractingWithSidebar(true)}
          onMouseLeave={() => setIsInteractingWithSidebar(false)}
        >
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
            // Force immediate content update
            setTimeout(() => {
              if (editorRef.current) {
                const newContent = editorRef.current.innerHTML;
                setContent(newContent);
                onChange(newContent);
                console.log('Module eingefügt, Content aktualisiert:', newContent);
              }
            }, 100);
          }}
            onClose={() => setSidebarOpen(false)}
            onOpenMediaModal={mediaLibrary.openMediaModal}
            onContentChange={handleContentChange}
            heightInputRef={heightInputRef}
            startIncrement={startIncrement}
            startDecrement={startDecrement}
            stopIncrement={stopIncrement}
            stopDecrement={stopDecrement}
          />
        </div>,
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
        />
      )}
    </>
  );
} 