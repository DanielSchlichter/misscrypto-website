import { useState, useCallback, useRef } from 'react';
import { ModuleData, ViewType } from '../types';
import { generateModuleHtml } from '../utils/htmlGenerators';
import { insertModule, updateModule, deleteModule } from '../utils/moduleUtils';
import { extractModuleData } from '../utils/contentUtils';

export const useModuleManagement = (
  editorRef: React.RefObject<HTMLDivElement | null>,
  handleContentChange?: () => void,
  heightInputRef?: React.RefObject<HTMLInputElement | null>,
  onOpenSidebar?: () => void
) => {
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>('modules');
  const [moduleData, setModuleData] = useState<any>({});
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);

  // Handle click events on modules
  const handleModuleClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const moduleElement = target.closest('.editable-module') as HTMLElement;
    
    // Check if delete button was clicked
    if (target.classList.contains('delete-module-btn')) {
      event.preventDefault();
      event.stopPropagation();
      
      if (moduleElement && editorRef.current) {
        const moduleId = moduleElement.dataset.moduleId;
        if (moduleId) {
          deleteModule(moduleId, editorRef);
          // Update modules state
          setModules(prev => prev.filter(m => m.id !== moduleId));
          // Trigger content change
          if (handleContentChange) {
            setTimeout(handleContentChange, 50);
          }
        }
      }
      return;
    }
    

    
    if (moduleElement) {
      event.preventDefault();
      event.stopPropagation();
      
      const moduleId = moduleElement.dataset.moduleId;
      const moduleType = moduleElement.dataset.moduleType as ViewType;
      
      if (moduleId && moduleType && moduleType !== 'modules') {
        // Extract current data from the module
        const currentData = extractModuleData(moduleElement, moduleType);
        
        setEditingModuleId(moduleId);
        setModuleData(currentData);
        setCurrentView(moduleType);
        
        // Reset height input wenn Image-Modul bearbeitet wird
        if (moduleType === 'image' && heightInputRef?.current) {
          heightInputRef.current.value = (currentData.height || 300).toString();
        }
        
        // Open sidebar for module editing
        if (onOpenSidebar) {
          onOpenSidebar();
        }
      }
    }
  }, [editorRef, handleContentChange, onOpenSidebar]);

  // Insert a new module
  const insertNewModule = useCallback((type?: ViewType, data?: any) => {
    const moduleType = type || currentView;
    const moduleDataToUse = data || moduleData;
    
    if (moduleType === 'modules') return;
    
    const moduleHtml = generateModuleHtml(moduleType, moduleDataToUse);
    
    // Focus the editor first
    if (editorRef.current) {
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
        // Get current cursor position
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          
          // Insert module at cursor position
          try {
            range.deleteContents();
            range.insertNode(moduleElement);
            
            // Create a new paragraph after the module for continued editing
            const newParagraph = document.createElement('p');
            newParagraph.innerHTML = '<br>';
            
            // Insert after the module
            if (moduleElement.nextSibling) {
              moduleElement.parentNode?.insertBefore(newParagraph, moduleElement.nextSibling);
            } else {
              moduleElement.parentNode?.appendChild(newParagraph);
            }
            
            // Move cursor to the new paragraph
            const newRange = document.createRange();
            newRange.setStart(newParagraph, 0);
            newRange.setEnd(newParagraph, 0);
            selection.removeAllRanges();
            selection.addRange(newRange);
            
          } catch (error) {
            // Fallback: append at the end if insertion fails
            console.log('Fallback: Appending at end due to error:', error);
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
        } else {
          // No selection found, append at the end
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
      }
    }
    
    // Add to modules state
    const newModule: ModuleData = {
      id: `${moduleType}-${Date.now()}-${Math.random()}`,
      type: moduleType,
      data: moduleDataToUse,
      htmlStart: 0,
      htmlEnd: 0
    };
    setModules(prev => [...prev, newModule]);
    
    // Trigger content change
    if (handleContentChange) {
      setTimeout(handleContentChange, 50);
    }
  }, [currentView, moduleData, editorRef, handleContentChange]);

  // Update existing module
  const updateExistingModule = useCallback((moduleId?: string, type?: ViewType, data?: any) => {
    const moduleIdToUse = moduleId || editingModuleId;
    const moduleType = type || currentView;
    const moduleDataToUse = data || moduleData;
    
    if (!moduleIdToUse || moduleType === 'modules') return;
    
    const moduleHtml = generateModuleHtml(moduleType, moduleDataToUse, moduleIdToUse);
    
    // Update existing module directly
    const moduleElement = document.querySelector(`[data-module-id="${moduleIdToUse}"]`);
    if (moduleElement && editorRef.current) {
      moduleElement.outerHTML = moduleHtml;
      
      setModules(prev => prev.map(module => 
        module.id === moduleIdToUse 
          ? { ...module, data: moduleDataToUse }
          : module
      ));
      
      // Trigger content change
      if (handleContentChange) {
        setTimeout(handleContentChange, 50);
      }
    }
  }, [editingModuleId, currentView, moduleData, editorRef, handleContentChange]);

  // Get default module data
  const getDefaultModuleData = useCallback((type: ViewType) => {
    switch (type) {
      case 'heading':
        return { number: '1', title: 'Neue Überschrift' };
      case 'highlight':
        return { label: 'HIGHLIGHT', text: 'Wichtiger Hinweis' };
      case 'stats':
        return { 
          items: [
            { value: '100%', label: 'Erfolgsrate' },
            { value: '24/7', label: 'Support' }
          ] 
        };
      case 'security':
        return { 
          icon: '🔒', 
          title: 'Sicher & Geschützt', 
          description: 'Ihre Daten sind bei uns sicher' 
        };
      case 'image':
        return { url: '', alt: '', height: 300 };
      case 'text':
        return { content: '', fontSize: 'medium', alignment: 'left', color: '#f8dfa5' };
      default:
        return {};
    }
  }, []);

  // Start editing a module
  const startEditing = useCallback((type: ViewType) => {
    setCurrentView(type);
    setEditingModuleId(null);
    const defaultData = getDefaultModuleData(type);
    setModuleData(defaultData);
    
    // Reset height input wenn Image-Modul erstellt wird
    if (type === 'image' && heightInputRef?.current) {
      heightInputRef.current.value = (defaultData.height || 300).toString();
    }
  }, [getDefaultModuleData]);

  // Cancel editing
  const cancelEditing = useCallback(() => {
    setCurrentView('modules');
    setEditingModuleId(null);
    setModuleData({});
  }, []);

  // Save module (insert or update)
  const saveModule = useCallback(() => {
    if (currentView === 'modules') return;
    
    if (editingModuleId) {
      updateExistingModule();
    } else {
      insertNewModule();
    }
    
    cancelEditing();
  }, [currentView, editingModuleId, moduleData, updateExistingModule, insertNewModule, cancelEditing]);

  return {
    modules,
    setModules,
    currentView,
    setCurrentView,
    moduleData,
    setModuleData,
    editingModuleId,
    setEditingModuleId,
    handleModuleClick,
    insertNewModule,
    updateExistingModule,
    getDefaultModuleData,
    startEditing,
    cancelEditing,
    saveModule
  };
}; 