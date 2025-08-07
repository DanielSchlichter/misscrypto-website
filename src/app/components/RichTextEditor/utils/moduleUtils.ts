import { generateModuleHtml } from './htmlGenerators';

// Insert module into editor at cursor position
export const insertModule = (moduleHtml: string, editorRef: React.RefObject<HTMLDivElement | null>) => {
  if (!editorRef.current) return;

  const selection = window.getSelection();
  let range: Range;

  if (selection && selection.rangeCount > 0) {
    range = selection.getRangeAt(0);
  } else {
    // If no selection, create range at end of editor
    range = document.createRange();
    range.selectNodeContents(editorRef.current);
    range.collapse(false);
  }

  // Ensure we're within the editor
  if (!editorRef.current.contains(range.commonAncestorContainer)) {
    range.selectNodeContents(editorRef.current);
    range.collapse(false);
  }

  // Create a temporary div to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = moduleHtml;
  const moduleElement = tempDiv.firstElementChild;

  if (moduleElement) {
    // Insert the module
    range.deleteContents();
    range.insertNode(moduleElement);
    
    // Add some spacing after the module
    const br = document.createElement('br');
    const textNode = document.createTextNode('\n');
    range.collapse(false);
    range.insertNode(br);
    range.insertNode(textNode);
    
    // Position cursor after the module
    range.setStartAfter(textNode);
    range.collapse(true);
    
    // Update selection
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
};

// Update existing module with new HTML
export const updateModule = (
  moduleId: string, 
  newHtml: string, 
  editorRef: React.RefObject<HTMLDivElement | null>
) => {
  if (!editorRef.current) return false;

  const moduleElement = editorRef.current.querySelector(`[data-module-id="${moduleId}"]`);
  
  if (moduleElement) {
    // Create temporary container to get new element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newHtml;
    const newElement = tempDiv.firstElementChild;
    
    if (newElement) {
      moduleElement.replaceWith(newElement);
      return true;
    }
  }
  
  return false;
};

// Delete module by ID
export const deleteModule = (moduleId: string, editorRef: React.RefObject<HTMLDivElement | null>) => {
  if (!editorRef.current) return false;

  const moduleElement = editorRef.current.querySelector(`[data-module-id="${moduleId}"]`);
  
  if (moduleElement) {
    moduleElement.remove();
    return true;
  }
  
  return false;
};

// Get module element by ID
export const getModuleElement = (moduleId: string, editorRef: React.RefObject<HTMLDivElement | null>) => {
  if (!editorRef.current) return null;
  return editorRef.current.querySelector(`[data-module-id="${moduleId}"]`) as HTMLElement | null;
};

// Check if module exists
export const moduleExists = (moduleId: string, editorRef: React.RefObject<HTMLDivElement | null>) => {
  return getModuleElement(moduleId, editorRef) !== null;
};

// Get all modules in editor
export const getAllModules = (editorRef: React.RefObject<HTMLDivElement | null>) => {
  if (!editorRef.current) return [];
  
  const moduleElements = editorRef.current.querySelectorAll('.editable-module');
  return Array.from(moduleElements).map(element => ({
    id: (element as HTMLElement).dataset.moduleId || '',
    type: (element as HTMLElement).dataset.moduleType || '',
    element: element as HTMLElement
  }));
};

// Focus editor after module operations
export const focusEditor = (editorRef: React.RefObject<HTMLDivElement | null>) => {
  if (editorRef.current) {
    editorRef.current.focus();
  }
}; 