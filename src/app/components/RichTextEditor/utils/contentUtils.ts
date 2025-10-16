import { ModuleData } from '../types';

// Apply text formatting with modern approaches
export const applyTextFormat = (format: string, value?: string, editorRef?: React.RefObject<HTMLDivElement | null>) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (!range || range.collapsed) return;

  // Ensure we're within the editor
  if (!editorRef?.current || !editorRef.current.contains(range.commonAncestorContainer)) return;

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
  
  // Clear selection
  selection.removeAllRanges();
};

// Apply text formatting for toolbar buttons (works with or without selection)
export const applyTextFormatToSelection = (format: string, value?: string, editorRef?: React.RefObject<HTMLDivElement | null>) => {
  const selection = window.getSelection();

  // Focus editor if not focused
  if (editorRef?.current && document.activeElement !== editorRef.current) {
    editorRef.current.focus();
  }

  if (!selection || selection.rangeCount === 0) {
    console.log('No selection found');
    return;
  }

  const range = selection.getRangeAt(0);

  // If no text selected, do nothing
  if (range.collapsed) {
    console.log('Range is collapsed');
    return;
  }

  // Ensure we're within the editor
  if (!editorRef?.current || !editorRef.current.contains(range.commonAncestorContainer)) {
    console.log('Range not within editor');
    return;
  }

  console.log('Creating link with URL:', value);
  console.log('Selected text:', range.toString());

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
    case 'link':
      wrapper = document.createElement('a');
      wrapper.setAttribute('href', value || '#');
      wrapper.setAttribute('target', '_blank');
      wrapper.setAttribute('rel', 'noopener noreferrer');
      console.log('Created link element:', wrapper);
      break;
    default:
      wrapper = document.createElement('span');
  }

  wrapper.appendChild(selectedContent);
  range.insertNode(wrapper);

  console.log('Link inserted into range');

  // Move cursor after the inserted element
  range.setStartAfter(wrapper);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

// Helper function to get the selected text
export const getSelectedText = (): string => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return '';
  return selection.toString().trim();
};

// Helper function to check if we have a text selection
export const hasTextSelection = (): boolean => {
  const selection = window.getSelection();
  return !!(selection && selection.rangeCount > 0 && !selection.getRangeAt(0).collapsed);
};

// Extract data from existing module elements
export const extractModuleData = (element: HTMLElement, type: string) => {
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

// Extract modules from content
export const extractModules = (content: string): ModuleData[] => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const moduleElements = tempDiv.querySelectorAll('.editable-module');
  const modules: ModuleData[] = [];
  
  moduleElements.forEach((element, index) => {
    const moduleId = (element as HTMLElement).dataset.moduleId;
    const moduleType = (element as HTMLElement).dataset.moduleType as 'heading' | 'highlight' | 'stats' | 'security' | 'image';
    
    if (moduleId && moduleType) {
      const data = extractModuleData(element as HTMLElement, moduleType);
      modules.push({
        id: moduleId,
        type: moduleType,
        data,
        htmlStart: 0, // These would need to be calculated properly
        htmlEnd: 0
      });
    }
  });
  
  return modules;
};

// Generate meta data from content
export const generateMetaData = (content: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  
  // Extract title from first h1, h2, or heading module
  let title = '';
  const firstHeading = tempDiv.querySelector('h1, h2, .mc-heading');
  if (firstHeading) {
    title = firstHeading.textContent?.trim() || '';
  }
  
  // Extract description from first paragraph or highlight
  let description = '';
  const firstParagraph = tempDiv.querySelector('p, .mc-highlight-text');
  if (firstParagraph) {
    description = firstParagraph.textContent?.trim().substring(0, 160) || '';
  }
  
  // Extract keywords from headings and highlights
  const keywords: string[] = [];
  const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, .mc-heading');
  const highlights = tempDiv.querySelectorAll('.highlight-label, .mc-highlight-label');
  
  headings.forEach(heading => {
    const text = heading.textContent?.trim();
    if (text) {
      keywords.push(...text.split(' ').filter(word => word.length > 3));
    }
  });
  
  highlights.forEach(highlight => {
    const text = highlight.textContent?.trim();
    if (text) {
      keywords.push(text);
    }
  });
  
  return {
    title: title || 'Untitled',
    description: description || 'No description available',
    keywords: [...new Set(keywords)].slice(0, 10) // Remove duplicates and limit to 10
  };
}; 