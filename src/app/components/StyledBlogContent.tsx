'use client';

import { useEffect, useRef, useMemo } from 'react';

interface StyledBlogContentProps {
  content: string;
}

// Function to clean HTML for publishing (remove editor elements)
const getCleanContentForPublishing = (htmlContent: string): string => {
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

export default function StyledBlogContent({ content }: StyledBlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Clean content for publishing (remove editor elements)
  const cleanContent = useMemo(() => {
    return getCleanContentForPublishing(content);
  }, [content]);

  useEffect(() => {
    if (contentRef.current) {
      // Füge IDs zu Überschriften hinzu für Inhaltsverzeichnis
      const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
      });
    }
  }, [cleanContent]);

  return (
    <div
      ref={contentRef}
      className="blog-content-wrapper"
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
} 