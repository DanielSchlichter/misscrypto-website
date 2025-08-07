'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface ModuleData {
  id: string;
  type: 'heading' | 'highlight' | 'stats' | 'security' | 'image';
  data: any;
  htmlStart: number;
  htmlEnd: number;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onMetaGenerated?: (meta: { title: string; description: string; keywords: string[] }) => void;
  onCleanContentChange?: (cleanContent: string) => void;
}

// Function to get clean HTML for publishing
export const getCleanContentForPublishing = (htmlContent: string): string => {
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
  
  return tempDiv.innerHTML;
};

export default function RichTextEditor({ value, onChange, onMetaGenerated, onCleanContentChange }: RichTextEditorProps) {
  const [content, setContent] = useState(value || '');
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isInteractingWithSidebar, setIsInteractingWithSidebar] = useState(false);
  const [currentView, setCurrentView] = useState<'modules' | 'heading' | 'highlight' | 'stats' | 'security' | 'image'>('modules');
  const [moduleData, setModuleData] = useState<any>({});
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showHtmlView, setShowHtmlView] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const heightInputRef = useRef<HTMLInputElement>(null);
  const incrementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const decrementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const editorRef = useRef<HTMLDivElement>(null);
  const floatingToolbarRef = useRef<HTMLDivElement>(null);

  // Medien laden
  const fetchMedia = async () => {
    setLoadingMedia(true);
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        setMediaFiles(data.files || []);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Medien:', error);
    } finally {
      setLoadingMedia(false);
    }
  };

  // Height increment/decrement functions
  const incrementHeight = () => {
    if (heightInputRef.current) {
      const currentValue = parseInt(heightInputRef.current.value) || 300;
      const newValue = Math.min(currentValue + 10, 800);
      heightInputRef.current.value = newValue.toString();
      setModuleData({...moduleData, height: newValue});
    }
  };

  const decrementHeight = () => {
    if (heightInputRef.current) {
      const currentValue = parseInt(heightInputRef.current.value) || 300;
      const newValue = Math.max(currentValue - 10, 100);
      heightInputRef.current.value = newValue.toString();
      setModuleData({...moduleData, height: newValue});
    }
  };

  const startIncrement = () => {
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
  };

  const startDecrement = () => {
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
  };

  const stopIncrement = () => {
    if (incrementIntervalRef.current) {
      clearInterval(incrementIntervalRef.current);
      incrementIntervalRef.current = null;
    }
  };

  const stopDecrement = () => {
    if (decrementIntervalRef.current) {
      clearInterval(decrementIntervalRef.current);
      decrementIntervalRef.current = null;
    }
  };

  useEffect(() => {
    setContent(value || '');
    // Only update editor content if it's different and editor is not focused
    if (editorRef.current && document.activeElement !== editorRef.current) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  useEffect(() => {
    setMounted(true);
    
    // Cleanup function
    return () => {
      if (incrementIntervalRef.current) {
        clearInterval(incrementIntervalRef.current);
      }
      if (decrementIntervalRef.current) {
        clearInterval(decrementIntervalRef.current);
      }
    };
  }, []);

  // Stable image data for dependency tracking
  const imageModuleData = useMemo(() => {
    if (currentView === 'image' && moduleData) {
      return {
        url: moduleData.url || '',
        alt: moduleData.alt || '',
        height: moduleData.height || 300
      };
    }
    return null;
  }, [currentView, moduleData?.url, moduleData?.alt, moduleData?.height]);

  // Auto-update module in real-time when editing
  useEffect(() => {
    if (editingModuleId && currentView === 'image' && imageModuleData && editorRef.current) {
      // Only update for image modules to avoid unnecessary re-renders
      const updatedHtml = generateModuleHtml('image', imageModuleData);
      const moduleElement = editorRef.current.querySelector(`[data-module-id="${editingModuleId}"]`);
      
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
          
          // Update modules array
          setModules(prev => prev.map(module => 
            module.id === editingModuleId 
              ? { ...module, data: { ...imageModuleData } }
              : module
          ));
        }
      }
    }
  }, [imageModuleData, editingModuleId, currentView]);

  // Generate clean content for publishing whenever content changes
  useEffect(() => {
    if (onCleanContentChange && content && mounted) {
      const cleanContent = getCleanContentForPublishing(content);
      onCleanContentChange(cleanContent);
    }
  }, [content, onCleanContentChange, mounted]);

  // Synchronize content with editor when not focused
  useEffect(() => {
    if (editorRef.current && mounted) {
      // Only update if editor is not currently focused to avoid cursor issues
      if (document.activeElement !== editorRef.current && !showHtmlView) {
        if (editorRef.current.innerHTML !== content) {
          editorRef.current.innerHTML = content;
        }
      }
    }
  }, [content, mounted, showHtmlView]);

  // Handle text selection for floating toolbar
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0 && !selection.toString().includes('<')) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Check if selection is within the editor
      if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
        setSelectedText(selection.toString());
        setShowFloatingToolbar(true);
        
        // Position floating toolbar above the selection
        if (floatingToolbarRef.current) {
          const editorRect = editorRef.current.getBoundingClientRect();
          const toolbarWidth = 300;
          
          let left = rect.left + (rect.width / 2) - (toolbarWidth / 2);
          let top = rect.top - 60;
          
          // Keep toolbar within viewport
          if (left < 10) left = 10;
          if (left + toolbarWidth > window.innerWidth - 10) {
            left = window.innerWidth - toolbarWidth - 10;
          }
          if (top < 10) top = rect.bottom + 10;
          
          floatingToolbarRef.current.style.top = `${top}px`;
          floatingToolbarRef.current.style.left = `${left}px`;
        }
      }
    } else {
      setShowFloatingToolbar(false);
      setSelectedText('');
    }
  };

  // Apply text formatting with modern approaches
  const applyTextFormat = (format: string, value?: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!range || range.collapsed) return;

    // Ensure we're within the editor
    if (!editorRef.current || !editorRef.current.contains(range.commonAncestorContainer)) return;

    const selectedContent = range.extractContents();
    let wrapper: HTMLElement;

    switch (format) {
      case 'bold':
        wrapper = document.createElement('strong');
        wrapper.style.fontWeight = 'bold';
        wrapper.style.color = '#f8dfa5';
        break;
      case 'italic':
        wrapper = document.createElement('em');
        wrapper.style.fontStyle = 'italic';
        wrapper.style.color = '#e4b15e';
        break;
      case 'underline':
        wrapper = document.createElement('u');
        wrapper.style.textDecoration = 'underline';
        wrapper.style.textDecorationColor = '#f8dfa5';
        break;
      case 'fontSize':
        wrapper = document.createElement('span');
        wrapper.style.fontSize = value || '1rem';
        break;
      case 'fontFamily':
        wrapper = document.createElement('span');
        wrapper.style.fontFamily = value || 'Arial';
        break;
      case 'color':
        wrapper = document.createElement('span');
        wrapper.style.color = value || '#f8dfa5';
        break;
      default:
        wrapper = document.createElement('span');
    }

    wrapper.appendChild(selectedContent);
    range.insertNode(wrapper);
    
    // Clear selection and update content
    selection.removeAllRanges();
    setShowFloatingToolbar(false);
    handleContentChange();
  };

  // Apply text formatting for toolbar buttons (works with or without selection)
  const applyTextFormatToSelection = (format: string, value?: string) => {
    const selection = window.getSelection();
    
    // Focus editor if not focused
    if (editorRef.current && document.activeElement !== editorRef.current) {
      editorRef.current.focus();
    }
    
    if (!selection || selection.rangeCount === 0) {
      // No selection - just focus and return
      return;
    }

    const range = selection.getRangeAt(0);
    
    // If no text selected, do nothing
    if (range.collapsed) {
      return;
    }

    // Ensure we're within the editor
    if (!editorRef.current || !editorRef.current.contains(range.commonAncestorContainer)) return;

    const selectedContent = range.extractContents();
    let wrapper: HTMLElement;

    switch (format) {
      case 'bold':
        wrapper = document.createElement('strong');
        wrapper.style.fontWeight = 'bold';
        wrapper.style.color = '#f8dfa5';
        break;
      case 'italic':
        wrapper = document.createElement('em');
        wrapper.style.fontStyle = 'italic';
        wrapper.style.color = '#e4b15e';
        break;
      case 'underline':
        wrapper = document.createElement('u');
        wrapper.style.textDecoration = 'underline';
        wrapper.style.textDecorationColor = '#f8dfa5';
        break;
      case 'fontSize':
        wrapper = document.createElement('span');
        wrapper.style.fontSize = value || '1rem';
        break;
      case 'fontFamily':
        wrapper = document.createElement('span');
        wrapper.style.fontFamily = value || 'Arial';
        break;
      case 'color':
        wrapper = document.createElement('span');
        wrapper.style.color = value || '#f8dfa5';
        break;
      default:
        wrapper = document.createElement('span');
    }

    wrapper.appendChild(selectedContent);
    range.insertNode(wrapper);
    
    // Clear selection and update content
    selection.removeAllRanges();
    handleContentChange();
  };

  // Clean HTML for SEO (remove editor elements, improve structure)
  const cleanHtmlForSEO = (html: string): string => {
    // Create a temporary DOM element to parse and clean HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove all delete buttons and editor-only elements
    const deleteButtons = tempDiv.querySelectorAll('.delete-module-btn');
    deleteButtons.forEach(btn => btn.remove());
    
    // Remove empty paragraphs and divs
    const emptyElements = tempDiv.querySelectorAll('p:empty, div:empty, p:has(br:only-child), div:has(br:only-child)');
    emptyElements.forEach(el => {
      if (el.innerHTML === '' || el.innerHTML === '<br>' || el.innerHTML === '<br/>') {
        el.remove();
      }
    });
    
    // Convert standalone divs with text content to paragraphs
    const textDivs = tempDiv.querySelectorAll('div');
    textDivs.forEach(div => {
      // Only convert divs that don't have module classes and contain text
      if (!div.classList.contains('editable-module') && 
          !div.classList.contains('stat-item') && 
          !div.classList.contains('security-content') &&
          div.textContent?.trim()) {
        const p = document.createElement('p');
        p.innerHTML = div.innerHTML;
        div.parentNode?.replaceChild(p, div);
      }
    });
    
    // Improve heading hierarchy - ensure we start with h1 if this is main content
    const headings = tempDiv.querySelectorAll('h2, h3, h4, h5, h6');
    if (headings.length > 0) {
      // If this is the first heading and there's no h1, make it h1
      const firstHeading = headings[0] as HTMLElement;
      if (firstHeading.tagName === 'H2') {
        // Check if this looks like a main title (first heading in content)
        const allContent = tempDiv.textContent?.trim() || '';
        const headingText = firstHeading.textContent?.trim() || '';
        
        // If the heading appears early in the content, make it h1
        if (allContent.indexOf(headingText) < 200) {
          const h1 = document.createElement('h1');
          h1.innerHTML = firstHeading.innerHTML;
          h1.className = firstHeading.className;
          firstHeading.parentNode?.replaceChild(h1, firstHeading);
        }
      }
    }
    
    // Clean up excessive line breaks
    let cleanedHtml = tempDiv.innerHTML;
    cleanedHtml = cleanedHtml.replace(/(<br\s*\/?>[\s]*){3,}/gi, '<br><br>');
    cleanedHtml = cleanedHtml.replace(/(<div><br><\/div>){2,}/gi, '<br>');
    
    // Add proper paragraph structure for consecutive text content
    cleanedHtml = cleanedHtml.replace(/(<\/(?:section|aside)>)\s*([^<]+)(?=\s*<(?:section|aside|p|div))/gi, '$1<p>$2</p>');
    
    return cleanedHtml;
  };

  // Generate SEO meta data from content
  const generateSEOMeta = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Extract title from first heading
    const firstHeading = tempDiv.querySelector('h1, h2, h3');
    const title = firstHeading?.textContent?.trim() || '';
    
    // Generate description from first paragraph or content
    const paragraphs = tempDiv.querySelectorAll('p, .mc-highlight-text');
    let description = '';
    for (const p of paragraphs) {
      const text = p.textContent?.trim() || '';
      if (text && text.length > 20) {
        description = text.length > 160 ? text.substring(0, 157) + '...' : text;
        break;
      }
    }
    
    // Extract keywords from content
    const allText = tempDiv.textContent?.toLowerCase() || '';
    const commonCryptoTerms = [
      'bitcoin', 'ethereum', 'kryptowährung', 'blockchain', 'trading', 
      'investition', 'wallet', 'mining', 'defi', 'nft', 'altcoin',
      'börse', 'kurs', 'handel', 'sicherheit', 'regulierung'
    ];
    
    const foundKeywords = commonCryptoTerms.filter(term => 
      allText.includes(term)
    );
    
    // Add specific terms from stats and highlights
    const statLabels = tempDiv.querySelectorAll('.stat-label');
    statLabels.forEach(label => {
      const text = label.textContent?.toLowerCase().trim();
      if (text && text.length < 20) {
        foundKeywords.push(text);
      }
    });
    
    return {
      title,
      description,
      keywords: [...new Set(foundKeywords)].slice(0, 10) // Remove duplicates, max 10
    };
  };

  // Handle content changes
  const handleContentChange = () => {
    if (editorRef.current) {
      const rawContent = editorRef.current.innerHTML;
      const cleanedContent = cleanHtmlForSEO(rawContent);
      setContent(rawContent); // Keep raw content for editor
      onChange(cleanedContent); // Send cleaned content to parent
      
      // Generate and send SEO meta data
      if (onMetaGenerated && cleanedContent.trim()) {
        const meta = generateSEOMeta(cleanedContent);
        if (meta.title || meta.description) {
          onMetaGenerated(meta);
        }
      }
    }
  };

  // Ensure proper paragraph structure when typing
  const ensureParagraphStructure = () => {
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
        currentNode.parentNode?.replaceChild(p, currentNode);
      } else {
        p.innerHTML = textContent;
        editorRef.current.appendChild(p);
      }
      
      // Restore cursor position
      const newRange = document.createRange();
      newRange.setStart(p.firstChild || p, textContent.length);
      newRange.setEnd(p.firstChild || p, textContent.length);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };

  // Handle input changes without losing cursor position
  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    // Ensure proper paragraph structure
    setTimeout(() => {
      ensureParagraphStructure();
      handleContentChange();
    }, 0);
  };

  // Handle module editing
  const editModule = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      setEditingModuleId(moduleId);
      setModuleData(module.data);
      setCurrentView(module.type);
      setSidebarOpen(true);
      
      // Reset height input wenn Image-Modul bearbeitet wird
      if (module.type === 'image' && heightInputRef.current) {
        heightInputRef.current.value = (module.data.height || 300).toString();
      }
    }
  };

  // Generate clean HTML for publishing (without editor elements)
  const generateCleanModuleHtml = (type: string, data: any): string => {
    switch (type) {
      case 'heading':
        return `
<section class="numbered-heading mc-content-section" itemScope itemType="https://schema.org/Article">
  <div class="heading-number mc-heading-number">${data.number}</div>
  <h2 class="heading-title mc-heading-title" itemProp="headline">${data.title}</h2>
</section>`;
      case 'highlight':
        return `
<aside class="highlight-box mc-highlight" itemScope itemType="https://schema.org/SpecialAnnouncement">
  <div class="highlight-content mc-highlight-content">
    <span class="highlight-label mc-highlight-label" itemProp="category">${data.label}</span>
    <p class="highlight-text mc-highlight-text" itemProp="text">${data.text}</p>
  </div>
</aside>`;
      case 'stats':
        return `
<div class="stats-grid mc-stats" itemScope itemType="https://schema.org/Table">
  ${data.items.map((item: any) => `
    <div class="stat-item mc-stat-item" itemScope itemType="https://schema.org/Statistic">
      <div class="stat-value mc-stat-value" itemProp="value">${item.value}</div>
      <div class="stat-label mc-stat-label" itemProp="name">${item.label}</div>
    </div>
  `).join('')}
</div>`;
      case 'security':
        return `
<aside class="security-box mc-security" itemScope itemType="https://schema.org/Service">
  <div class="security-content mc-security-content">
    <div class="security-icon mc-security-icon" aria-hidden="true">${data.icon}</div>
    <h3 class="security-title mc-security-title" itemProp="name">${data.title}</h3>
    <p class="security-description mc-security-desc" itemProp="description">${data.description}</p>
  </div>
</aside>`;
      case 'image':
        return `
<figure class="mc-image" itemScope itemType="https://schema.org/ImageObject">
  <img 
    src="${data.url}" 
    alt="${data.alt || ''}" 
    class="mc-image-element" 
    style="height: ${data.height || 300}px; width: 100%; object-fit: cover;" 
    itemProp="contentUrl"
    loading="lazy"
    decoding="async"
  />
  <meta itemProp="width" content="100%" />
  <meta itemProp="height" content="${data.height || 300}" />
  <meta itemProp="encodingFormat" content="${data.url ? data.url.split('.').pop()?.toLowerCase() : 'jpg'}" />
</figure>`;
      default:
        return '';
    }
  };

  // Generate module HTML (for editor with delete buttons)
  const generateModuleHtml = (type: string, data: any): string => {
    const moduleId = editingModuleId || `${type}-${Date.now()}-${Math.random()}`;
    
    switch (type) {
      case 'heading':
        return `
<section class="numbered-heading editable-module mc-content-section" data-module-id="${moduleId}" data-module-type="${type}" itemScope itemType="https://schema.org/Article">
  <button class="delete-module-btn" aria-label="Überschrift löschen">×</button>
  <span class="heading-number" aria-hidden="true">${data.number}</span>
  <h2 class="mc-heading" itemProp="headline">${data.title}</h2>
</section>`;
      case 'highlight':
        return `
<aside class="highlight-box editable-module mc-highlight" data-module-id="${moduleId}" data-module-type="${type}" role="note" itemScope itemType="https://schema.org/Quotation">
  <button class="delete-module-btn" aria-label="Highlight-Box löschen">×</button>
  <span class="highlight-label mc-label">${data.label}</span>
  <p class="mc-highlight-text" itemProp="text">${data.text}</p>
</aside>`;
      case 'stats':
        return `
<section class="stats-grid editable-module mc-statistics" data-module-id="${moduleId}" data-module-type="${type}" aria-label="Statistiken" itemScope itemType="https://schema.org/Table">
  <button class="delete-module-btn" aria-label="Statistik-Grid löschen">×</button>
  ${data.items.map((item: any, index: number) => `
  <div class="stat-item mc-stat" itemScope itemType="https://schema.org/PropertyValue">
    <div class="stat-value mc-stat-value" itemProp="value">${item.value}</div>
    <div class="stat-label mc-stat-label" itemProp="name">${item.label}</div>
  </div>`).join('')}
</section>`;
      case 'security':
        return `
<aside class="security-box editable-module mc-security" data-module-id="${moduleId}" data-module-type="${type}" role="complementary" itemScope itemType="https://schema.org/SecurityPolicy">
  <button class="delete-module-btn" aria-label="Sicherheits-Box löschen">×</button>
  <span class="security-icon mc-icon" aria-hidden="true">${data.icon}</span>
  <div class="security-content mc-security-content">
    <h3 class="security-title mc-security-title" itemProp="name">${data.title}</h3>
    <p class="security-description mc-security-desc" itemProp="description">${data.description}</p>
  </div>
</aside>`;
      case 'image':
        return `
<figure class="image-box editable-module mc-image" data-module-id="${moduleId}" data-module-type="${type}" itemScope itemType="https://schema.org/ImageObject">
  <button class="delete-module-btn" aria-label="Bild löschen">×</button>
  <img 
    src="${data.url}" 
    alt="${data.alt || ''}" 
    class="mc-image-element" 
    style="height: ${data.height || 300}px; width: 100%; object-fit: cover;" 
    itemProp="contentUrl"
    loading="lazy"
    decoding="async"
  />
  <meta itemProp="width" content="100%" />
  <meta itemProp="height" content="${data.height || 300}" />
  <meta itemProp="encodingFormat" content="${data.url ? data.url.split('.').pop()?.toLowerCase() : 'jpg'}" />
</figure>`;
      default:
        return '';
    }
  };

  // Handle click events on modules
  const handleModuleClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const moduleElement = target.closest('.editable-module') as HTMLElement;
    
    // Check if delete button was clicked
    if (target.classList.contains('delete-module-btn')) {
      event.preventDefault();
      event.stopPropagation();
      
      if (moduleElement && editorRef.current) {
        moduleElement.remove();
        handleContentChange();
      }
      return;
    }
    
    if (moduleElement) {
      event.preventDefault();
      event.stopPropagation();
      
      const moduleId = moduleElement.dataset.moduleId;
      const moduleType = moduleElement.dataset.moduleType as 'heading' | 'highlight' | 'stats' | 'security';
      
      if (moduleId && moduleType) {
        // Extract current data from the module
        const currentData = extractModuleData(moduleElement, moduleType);
        
        setEditingModuleId(moduleId);
        setModuleData(currentData);
        setCurrentView(moduleType);
        setSidebarOpen(true);
      }
    }
  }, []);

  // Extract data from existing module elements
  const extractModuleData = (element: HTMLElement, type: string) => {
    switch (type) {
      case 'heading':
        const numberSpan = element.querySelector('.heading-number');
        const titleH2 = element.querySelector('h2');
        return {
          number: numberSpan?.textContent?.trim() || '1',
          title: titleH2?.textContent?.trim() || 'Überschrift'
        };
      case 'highlight':
        const labelSpan = element.querySelector('.highlight-label');
        const textP = element.querySelector('p');
        return {
          label: labelSpan?.textContent?.trim() || 'HIGHLIGHT',
          text: textP?.textContent?.trim() || 'Text'
        };
      case 'stats':
        const statDivs = Array.from(element.querySelectorAll('.stat-item'));
        const items = statDivs.map(statDiv => {
          const valueDiv = statDiv.querySelector('.stat-value');
          const labelDiv = statDiv.querySelector('.stat-label');
          return {
            value: valueDiv?.textContent?.trim() || '',
            label: labelDiv?.textContent?.trim() || ''
          };
        });
        return { items };
      case 'security':
        const iconSpan = element.querySelector('.security-icon');
        const titleH3 = element.querySelector('.security-title');
        const descP = element.querySelector('.security-description');
        return {
          icon: iconSpan?.textContent?.trim() || '🔒',
          title: titleH3?.textContent?.trim() || 'Titel',
          description: descP?.textContent?.trim() || 'Beschreibung'
        };
      case 'image':
        const img = element.querySelector('img');
        const caption = element.querySelector('figcaption');
        const heightStyle = img?.getAttribute('style')?.match(/height:\s*(\d+)px/);
        return {
          url: img?.getAttribute('src') || '',
          alt: img?.getAttribute('alt') || '',
          caption: caption?.textContent?.trim() || '',
          height: heightStyle ? parseInt(heightStyle[1]) : 300
        };
      default:
        return {};
    }
  };

  // Add click listeners to existing modules
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.addEventListener('click', handleModuleClick);
      return () => {
        if (editorRef.current) {
          editorRef.current.removeEventListener('click', handleModuleClick);
        }
      };
    }
  }, [handleModuleClick]);

  // Add keyboard shortcuts
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
        applyTextFormatToSelection('bold');
      }
      
      // Ctrl+I for italic
      if (event.ctrlKey && event.key === 'i') {
        event.preventDefault();
        applyTextFormatToSelection('italic');
      }
      
      // Ctrl+U for underline
      if (event.ctrlKey && event.key === 'u') {
        event.preventDefault();
        applyTextFormatToSelection('underline');
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
  }, [sidebarOpen, applyTextFormat]);

  // Update modules when content changes
  useEffect(() => {
    if (editorRef.current) {
      const moduleElements = editorRef.current.querySelectorAll('.editable-module');
      const updatedModules: ModuleData[] = [];
      
      moduleElements.forEach((element, index) => {
        const moduleId = (element as HTMLElement).dataset.moduleId;
        const moduleType = (element as HTMLElement).dataset.moduleType as 'heading' | 'highlight' | 'stats' | 'security' | 'image';
        
        if (moduleId && moduleType) {
          const data = extractModuleData(element as HTMLElement, moduleType);
          updatedModules.push({
            id: moduleId,
            type: moduleType,
            data,
            htmlStart: 0, // Position tracking is less important in WYSIWYG mode
            htmlEnd: 0
          });
        }
      });
      
      setModules(updatedModules);
    }
  }, [content]);

  // Insert or update module
  const insertOrUpdateModule = () => {
    const moduleHtml = generateModuleHtml(currentView, moduleData);
    
    if (editingModuleId) {
      // Update existing module
      const moduleElement = document.querySelector(`[data-module-id="${editingModuleId}"]`);
      if (moduleElement && editorRef.current) {
        moduleElement.outerHTML = moduleHtml;
        handleContentChange();
      }
    } else {
      // Insert new module at cursor position or end
      if (editorRef.current) {
        // Focus the editor first
        editorRef.current.focus();
        
        // If editor is completely empty, add initial content
        if (!editorRef.current.innerHTML.trim() || editorRef.current.innerHTML === '<br>') {
          editorRef.current.innerHTML = '<p><br></p>';
        }
        
        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = moduleHtml;
        const moduleElement = tempDiv.firstElementChild as HTMLElement;
        
        if (moduleElement) {
         // Always append at the end to avoid positioning issues
         editorRef.current.appendChild(moduleElement);
         
         // Add a line break and new paragraph for continued writing
         const lineBreak = document.createElement('div');
         lineBreak.innerHTML = '<br>';
         editorRef.current.appendChild(lineBreak);
         
         const newParagraph = document.createElement('p');
         newParagraph.innerHTML = '<br>';
         editorRef.current.appendChild(newParagraph);
         
         // Place cursor in new paragraph
         const range = document.createRange();
         const selection = window.getSelection();
         range.setStart(newParagraph, 0);
         range.setEnd(newParagraph, 0);
         selection?.removeAllRanges();
         selection?.addRange(range);
        }
        
        handleContentChange();
        
        // Force a re-render to ensure module is visible
        setTimeout(() => {
          if (editorRef.current) {
            const newContent = editorRef.current.innerHTML;
            setContent(newContent);
            onChange(newContent);
          }
        }, 50);
      }
    }
    
    // Reset editing state
    setEditingModuleId(null);
    setCurrentView('modules');
    setModuleData({});
    
    // Keep sidebar open for continued module insertion
    // setSidebarOpen(false);
  };

  // Open module editor
  const openModuleEditor = (blockType: 'heading' | 'highlight' | 'stats' | 'security' | 'image') => {
    const defaultData = {
      heading: { number: '1', title: 'Neue Überschrift' },
      highlight: { label: 'HIGHLIGHT', text: 'Wichtige Information hier eingeben...' },
      stats: { 
        items: [
          { value: '1,49%', label: 'Handelsgebühren' },
          { value: '400+', label: 'Kryptowährungen' },
          { value: 'FMA', label: 'Reguliert' }
        ]
      },
      security: { icon: '🔒', title: 'Höchste Sicherheit', description: 'Beschreibung der Sicherheitsfeatures' },
      image: { url: '', alt: '', height: 300 }
    };
    
    setModuleData(defaultData[blockType]);
    setCurrentView(blockType);
    setEditingModuleId(null);
    
    // Reset height input wenn Image-Modul geöffnet wird
    if (blockType === 'image' && heightInputRef.current) {
      heightInputRef.current.value = (defaultData[blockType].height || 300).toString();
    }
  };

  // Floating Toolbar Component
  const FloatingToolbar = () => {
    if (!mounted || !showFloatingToolbar) return null;
    
    return createPortal(
      <div 
        ref={floatingToolbarRef}
        className="floating-toolbar"
        style={{
          position: 'fixed',
          zIndex: 10000,
          background: 'linear-gradient(135deg, #111827, #1f2937)',
          border: '2px solid rgba(248, 223, 165, 0.3)',
          borderRadius: '12px',
          padding: '0.75rem 1rem',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeInUp 0.2s ease-out'
        }}
      >
        <button 
          type="button"
          onClick={() => applyTextFormat('bold')}
          className="toolbar-btn"
          title="Fett"
        >
          <strong>B</strong>
        </button>
        <button 
          type="button"
          onClick={() => applyTextFormat('italic')}
          className="toolbar-btn"
          title="Kursiv"
        >
          <em>I</em>
        </button>
        <button 
          type="button"
          onClick={() => applyTextFormat('underline')}
          className="toolbar-btn"
          title="Unterstrichen"
        >
          <u>U</u>
        </button>
        <div className="toolbar-separator"></div>
        <select 
          onChange={(e) => applyTextFormat('fontSize', e.target.value)}
          className="toolbar-select"
          defaultValue="3"
          title="Schriftgröße"
        >
          <option value="0.75rem">Klein (12px)</option>
          <option value="0.875rem">Klein+ (14px)</option>
          <option value="1rem">Normal (16px)</option>
          <option value="1.125rem">Mittel (18px)</option>
          <option value="1.25rem">Groß (20px)</option>
          <option value="1.5rem">Sehr Groß (24px)</option>
          <option value="1.875rem">Überschrift (30px)</option>
          <option value="2.25rem">Titel (36px)</option>
        </select>
        <select 
          onChange={(e) => applyTextFormat('fontFamily', e.target.value)}
          className="toolbar-select"
          title="Schriftart"
        >
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times</option>
          <option value="Courier New">Courier</option>
          <option value="Inter">Inter</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Verdana">Verdana</option>
        </select>
        <div className="toolbar-separator"></div>
        <input
          type="color"
          onChange={(e) => applyTextFormat('color', e.target.value)}
          className="toolbar-color"
          title="Textfarbe"
          defaultValue="#f8dfa5"
        />
        <button 
          onClick={() => setShowFloatingToolbar(false)}
          className="toolbar-btn close-btn"
          title="Schließen"
        >
          ✕
        </button>
      </div>,
      document.body
    );
  };

  // Sidebar Portal Component (same as before, but with insert/update logic)
  const SidebarPortal = () => {
    if (!mounted) return null;
    
    return createPortal(
      <div 
        className={`floating-sidebar ${sidebarOpen ? 'open' : ''}`}
        onMouseEnter={() => setIsInteractingWithSidebar(true)}
        onMouseLeave={() => setIsInteractingWithSidebar(false)}
      >

        <div className="sidebar-content">
          {currentView === 'modules' && (
            <>
              <div className="sidebar-header">
                <span>🧩</span>
                Content-Module
              </div>

              <div className="modules-grid">
                <div className="module-card" onClick={() => openModuleEditor('heading')}>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>🏆</span>
                    <div style={{ color: '#f8dfa5', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Goldene Überschrift</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.7rem' }}>Nummerierte Überschrift mit goldenem Styling</div>
                  </div>
                </div>

                <div className="module-card" onClick={() => openModuleEditor('highlight')}>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>💡</span>
                    <div style={{ color: '#f8dfa5', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Highlight-Box</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.7rem' }}>Wichtige Informationen hervorheben</div>
                  </div>
                </div>

                <div className="module-card" onClick={() => openModuleEditor('stats')}>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>📊</span>
                    <div style={{ color: '#f8dfa5', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Statistik-Grid</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.7rem' }}>3-spaltige Kennzahlen-Anzeige</div>
                  </div>
                </div>

                <div className="module-card" onClick={() => openModuleEditor('security')}>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>🔒</span>
                    <div style={{ color: '#f8dfa5', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Sicherheits-Box</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.7rem' }}>Sicherheitsfeatures hervorheben</div>
                  </div>
                </div>

                <div className="module-card" onClick={() => openModuleEditor('image')}>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>🖼️</span>
                    <div style={{ color: '#f8dfa5', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Bild-Modul</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.7rem' }}>Bild mit anpassbarer Höhe</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentView === 'heading' && (
            <>
              <div className="sidebar-header">
                <button type="button" className="back-button" onClick={() => setCurrentView('modules')}>←</button>
                <span>🏆</span>
                {editingModuleId ? 'Überschrift bearbeiten' : 'Goldene Überschrift'}
              </div>
              
              <div className="editor-form">
                <div className="form-group">
                  <label>Nummer</label>
                  <input 
                    type="text" 
                    value={moduleData.number || ''}
                    onChange={(e) => setModuleData({...moduleData, number: e.target.value})}
                    placeholder="1"
                  />
                </div>
                
                <div className="form-group">
                  <label>Überschrift</label>
                  <input 
                    type="text" 
                    value={moduleData.title || ''}
                    onChange={(e) => setModuleData({...moduleData, title: e.target.value})}
                    placeholder="Überschrift eingeben..."
                  />
                </div>
                
                <button type="button" className="insert-button" onClick={insertOrUpdateModule}>
                  ✏️ {editingModuleId ? 'Aktualisieren' : 'Einfügen'}
                </button>
              </div>
            </>
          )}

          {currentView === 'highlight' && (
            <>
              <div className="sidebar-header">
                <button type="button" className="back-button" onClick={() => setCurrentView('modules')}>←</button>
                <span>💡</span>
                {editingModuleId ? 'Highlight bearbeiten' : 'Highlight-Box'}
              </div>
              
              <div className="editor-form">
                <div className="form-group">
                  <label>Label</label>
                  <input 
                    type="text" 
                    value={moduleData.label || ''}
                    onChange={(e) => setModuleData({...moduleData, label: e.target.value})}
                    placeholder="HIGHLIGHT"
                  />
                </div>
                
                <div className="form-group">
                  <label>Text</label>
                  <textarea 
                    value={moduleData.text || ''}
                    onChange={(e) => setModuleData({...moduleData, text: e.target.value})}
                    placeholder="Wichtige Information hier eingeben..."
                    rows={4}
                  />
                </div>
                
                <button type="button" className="insert-button" onClick={insertOrUpdateModule}>
                  ✏️ {editingModuleId ? 'Aktualisieren' : 'Einfügen'}
                </button>
              </div>
            </>
          )}

          {currentView === 'stats' && (
            <>
              <div className="sidebar-header">
                <button type="button" className="back-button" onClick={() => setCurrentView('modules')}>←</button>
                <span>📊</span>
                {editingModuleId ? 'Statistiken bearbeiten' : 'Statistik-Grid'}
              </div>
              
              <div className="editor-form">
                {moduleData.items?.map((item: any, index: number) => (
                  <div key={index} style={{ background: 'rgba(248, 223, 165, 0.05)', border: '1px solid rgba(248, 223, 165, 0.2)', borderRadius: '6px', padding: '0.75rem', marginBottom: '0.75rem' }}>
                    <div className="form-group">
                      <label>Wert {index + 1}</label>
                      <input 
                        type="text" 
                        value={item.value || ''}
                        onChange={(e) => {
                          const newItems = [...moduleData.items];
                          newItems[index] = {...item, value: e.target.value};
                          setModuleData({...moduleData, items: newItems});
                        }}
                        placeholder="1,49%"
                      />
                    </div>
                    <div className="form-group">
                      <label>Bezeichnung {index + 1}</label>
                      <input 
                        type="text" 
                        value={item.label || ''}
                        onChange={(e) => {
                          const newItems = [...moduleData.items];
                          newItems[index] = {...item, label: e.target.value};
                          setModuleData({...moduleData, items: newItems});
                        }}
                        placeholder="Handelsgebühren"
                      />
                    </div>
                  </div>
                ))}
                
                <button type="button" className="insert-button" onClick={insertOrUpdateModule}>
                  ✏️ {editingModuleId ? 'Aktualisieren' : 'Einfügen'}
                </button>
              </div>
            </>
          )}

          {currentView === 'security' && (
            <>
              <div className="sidebar-header">
                <button type="button" className="back-button" onClick={() => setCurrentView('modules')}>←</button>
                <span>🔒</span>
                {editingModuleId ? 'Sicherheits-Box bearbeiten' : 'Sicherheits-Box'}
              </div>
              
              <div className="editor-form">
                <div className="form-group">
                  <label>Icon</label>
                  <input 
                    type="text" 
                    value={moduleData.icon || ''}
                    onChange={(e) => setModuleData({...moduleData, icon: e.target.value})}
                    placeholder="🔒"
                  />
                </div>
                
                <div className="form-group">
                  <label>Titel</label>
                  <input 
                    type="text" 
                    value={moduleData.title || ''}
                    onChange={(e) => setModuleData({...moduleData, title: e.target.value})}
                    placeholder="Höchste Sicherheit"
                  />
                </div>
                
                <div className="form-group">
                  <label>Beschreibung</label>
                  <textarea 
                    value={moduleData.description || ''}
                    onChange={(e) => setModuleData({...moduleData, description: e.target.value})}
                    placeholder="Beschreibung der Sicherheitsfeatures"
                    rows={3}
                  />
                </div>
                
                <button type="button" className="insert-button" onClick={insertOrUpdateModule}>
                  ✏️ {editingModuleId ? 'Aktualisieren' : 'Einfügen'}
                </button>
              </div>
            </>
          )}

          {currentView === 'image' && (
            <>
              <div className="sidebar-header">
                <button type="button" className="back-button" onClick={() => setCurrentView('modules')}>←</button>
                <span>🖼️</span>
                {editingModuleId ? 'Bild bearbeiten' : 'Bild-Modul'}
              </div>
              
              <div className="editor-form">
                {/* Bild-Vorschau */}
                <div className="form-group">
                  <label>Bildvorschau</label>
                  <div style={{
                    width: '100%',
                    height: '200px', // Feste Höhe für die Vorschau
                    border: '2px dashed rgba(248, 223, 165, 0.3)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    background: 'rgba(0, 0, 0, 0.1)',
                    marginBottom: '1rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setShowMediaModal(true);
                    fetchMedia();
                  }}>
                    {moduleData.url ? (
                      <img 
                        src={moduleData.url}
                        alt={moduleData.alt || 'Vorschau'}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        textAlign: 'center',
                        color: 'rgba(248, 223, 165, 0.6)',
                        padding: '2rem'
                      }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🖼️</div>
                        <div style={{ fontSize: '0.9rem' }}>
                          Klicken Sie hier, um ein Bild auszuwählen
                        </div>
                      </div>
                    )}
                  </div>
                  {moduleData.url && (
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'rgba(248, 223, 165, 0.6)',
                      marginTop: '0.5rem',
                      textAlign: 'center'
                    }}>
                      Finale Höhe: {moduleData.height || 300}px
                    </div>
                  )}
                </div>

                {/* Bild auswählen Button */}
                <div className="form-group">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowMediaModal(true);
                      fetchMedia();
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(248, 223, 165, 0.1)',
                      border: '1px solid rgba(248, 223, 165, 0.3)',
                      borderRadius: '6px',
                      color: '#f8dfa5',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    📁 Bild aus Mediathek wählen
                  </button>
                  {moduleData.url && (
                    <button 
                      type="button"
                      onClick={() => setModuleData({...moduleData, url: ''})}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '6px',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        marginTop: '0.5rem'
                      }}
                    >
                      🗑️ Bild entfernen
                    </button>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Alt-Text</label>
                  <input 
                    type="text" 
                    value={moduleData.alt || ''}
                    onChange={(e) => setModuleData({...moduleData, alt: e.target.value})}
                    placeholder="Beschreibung des Bildes"
                  />
                </div>
                
                
                <div className="form-group">
                  <label>Höhe (px)</label>
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <input 
                      ref={heightInputRef}
                      type="number" 
                      defaultValue={moduleData.height || 300}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 100 && value <= 800) {
                          setModuleData({...moduleData, height: value});
                        }
                      }}
                      onBlur={(e) => {
                        const value = parseInt(e.target.value);
                        let finalValue = value;
                        
                        if (isNaN(value) || value < 100) {
                          finalValue = 100;
                        } else if (value > 800) {
                          finalValue = 800;
                        }
                        
                        if (heightInputRef.current) {
                          heightInputRef.current.value = finalValue.toString();
                        }
                        setModuleData({...moduleData, height: finalValue});
                      }}
                      placeholder="300"
                      min="100"
                      max="800"
                      autoComplete="off"
                      style={{
                        paddingRight: '3rem',
                        flex: 1
                      }}
                      className="height-number-input"
                    />
                    <div style={{
                      position: 'absolute',
                      right: '0.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px'
                    }}>
                      <button
                        type="button"
                        onMouseDown={startIncrement}
                        onMouseUp={stopIncrement}
                        onMouseLeave={stopIncrement}
                        onTouchStart={startIncrement}
                        onTouchEnd={stopIncrement}
                        style={{
                          width: '20px',
                          height: '15px',
                          background: 'rgba(248, 223, 165, 0.1)',
                          border: '1px solid rgba(248, 223, 165, 0.3)',
                          borderRadius: '3px',
                          color: '#f8dfa5',
                          cursor: 'pointer',
                          fontSize: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          userSelect: 'none'
                        }}
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onMouseDown={startDecrement}
                        onMouseUp={stopDecrement}
                        onMouseLeave={stopDecrement}
                        onTouchStart={startDecrement}
                        onTouchEnd={stopDecrement}
                        style={{
                          width: '20px',
                          height: '15px',
                          background: 'rgba(248, 223, 165, 0.1)',
                          border: '1px solid rgba(248, 223, 165, 0.3)',
                          borderRadius: '3px',
                          color: '#f8dfa5',
                          cursor: 'pointer',
                          fontSize: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          userSelect: 'none'
                        }}
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>
                
                {!editingModuleId && (
                  <button type="button" className="insert-button" onClick={insertOrUpdateModule}>
                    ✏️ Einfügen
                  </button>
                )}
                
                {editingModuleId && (
                  <div style={{
                    padding: '0.75rem',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '6px',
                    color: '#22c55e',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    marginTop: '1rem'
                  }}>
                    ✓ Änderungen werden automatisch gespeichert
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className="rich-text-editor-container">

        <div className="editor-toolbar">
          <div className="toolbar-actions">
            {/* Formatting Toolbar */}
            <div className="formatting-toolbar">
              <button 
                onClick={() => applyTextFormatToSelection('bold')}
                className="format-btn"
                title="Fett (Strg+B)"
              >
                <strong>B</strong>
              </button>
              <button 
                onClick={() => applyTextFormatToSelection('italic')}
                className="format-btn"
                title="Kursiv (Strg+I)"
              >
                <em>I</em>
              </button>
              <button 
                onClick={() => applyTextFormatToSelection('underline')}
                className="format-btn"
                title="Unterstrichen (Strg+U)"
              >
                <u>U</u>
              </button>
              <div className="format-separator"></div>
              <select 
                onChange={(e) => applyTextFormatToSelection('fontSize', e.target.value)}
                className="format-select"
                title="Schriftgröße"
                defaultValue="1rem"
              >
                <option value="0.75rem">Klein (12px)</option>
                <option value="0.875rem">Klein+ (14px)</option>
                <option value="1rem">Normal (16px)</option>
                <option value="1.125rem">Mittel (18px)</option>
                <option value="1.25rem">Groß (20px)</option>
                <option value="1.5rem">Sehr Groß (24px)</option>
                <option value="1.875rem">Überschrift (30px)</option>
                <option value="2.25rem">Titel (36px)</option>
              </select>
              <select 
                onChange={(e) => applyTextFormatToSelection('fontFamily', e.target.value)}
                className="format-select"
                title="Schriftart"
                defaultValue="Arial"
              >
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times</option>
                <option value="Courier New">Courier</option>
                <option value="Inter">Inter</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Verdana">Verdana</option>
              </select>
              <input
                type="color"
                onChange={(e) => applyTextFormatToSelection('color', e.target.value)}
                className="format-color"
                title="Textfarbe"
                defaultValue="#f8dfa5"
              />
            </div>
             
            <button 
              type="button"
              className="toolbar-btn"
              onClick={() => setShowHtmlView(!showHtmlView)}
            >
              {showHtmlView ? '👁️ Visual' : '💻 HTML'}
            </button>
          </div>
        </div>

        <div
          ref={editorRef}
          className="wysiwyg-editor"
          contentEditable
          onInput={handleInput}
          onFocus={() => setSidebarOpen(true)}
          onBlur={(e) => {
            // Only close sidebar if focus moves outside editor and not to sidebar
            setTimeout(() => {
              if (!isInteractingWithSidebar) {
                setSidebarOpen(false);
              }
            }, 150);
          }}
          onMouseUp={() => {
            // Only show floating toolbar if text is selected and it's not already shown in header
            setTimeout(handleTextSelection, 10);
          }}
          onKeyUp={() => {
            setTimeout(handleTextSelection, 10);
          }}
          suppressContentEditableWarning={true}
          spellCheck={false}
          style={{ display: showHtmlView ? 'none' : 'block' }}
        >
        </div>
       
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
         />
       )}
      </div>

      <FloatingToolbar />
      <SidebarPortal />
      
      {/* Mediathek-Modal */}
      {showMediaModal && mounted && createPortal(
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
          zIndex: 10000
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '90vw',
            maxHeight: '90vh',
            width: '800px',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#f8dfa5',
                margin: 0
              }}>
                📁 Bild aus Mediathek wählen
              </h3>
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                style={{
                  background: 'rgba(156, 163, 175, 0.1)',
                  border: '1px solid rgba(156, 163, 175, 0.3)',
                  borderRadius: '6px',
                  color: '#9ca3af',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                ✕
              </button>
            </div>

            {loadingMedia ? (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3rem',
                color: '#d1d5db'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  border: '3px solid rgba(248, 223, 165, 0.3)',
                  borderTop: '3px solid #f8dfa5',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '1rem'
                }}></div>
                Medien werden geladen...
              </div>
            ) : (
              <>
                {mediaFiles.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: '#9ca3af'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</div>
                    <p>Keine Medien in der Mediathek gefunden.</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                      Laden Sie zuerst Bilder in die Mediathek hoch.
                    </p>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '1rem',
                    maxHeight: '400px',
                    overflowY: 'auto'
                  }}>
                    {mediaFiles.filter(file => file.type === 'image').map((file) => (
                      <div
                        key={file.id}
                        onClick={() => {
                          setModuleData({
                            ...moduleData, 
                            url: file.url,
                            alt: moduleData.alt || file.name
                          });
                          setShowMediaModal(false);
                        }}
                        style={{
                          border: '2px solid rgba(248, 223, 165, 0.2)',
                          borderRadius: '8px',
                          padding: '0.5rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          background: 'rgba(0, 0, 0, 0.3)'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.5)';
                          e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.2)';
                          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                        }}
                      >
                        <img
                          src={file.url}
                          alt={file.name}
                          style={{
                            width: '100%',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            marginBottom: '0.5rem'
                          }}
                        />
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#d1d5db',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap'
                        }}>
                          {file.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
} 