'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import ImageModal from './ImageModal';

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

export default function StyledBlogContentWithZoom({ content }: StyledBlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

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

      // Add zoom functionality to all images
      const images = contentRef.current.querySelectorAll('img');
      images.forEach((img) => {
        // Create wrapper for image
        const wrapper = document.createElement('div');
        wrapper.className = 'image-zoom-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.width = '100%';
        wrapper.style.cursor = 'zoom-in';

        // Create zoom icon
        const zoomIcon = document.createElement('div');
        zoomIcon.className = 'zoom-icon';
        zoomIcon.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        `;
        zoomIcon.style.position = 'absolute';
        zoomIcon.style.top = '1rem';
        zoomIcon.style.right = '1rem';
        zoomIcon.style.background = 'rgba(0, 0, 0, 0.7)';
        zoomIcon.style.color = 'white';
        zoomIcon.style.padding = '0.5rem';
        zoomIcon.style.borderRadius = '8px';
        zoomIcon.style.display = 'none';
        zoomIcon.style.pointerEvents = 'none';
        zoomIcon.style.transition = 'opacity 0.3s ease';

        // Wrap the image
        if (img.parentNode) {
          img.parentNode.insertBefore(wrapper, img);
          wrapper.appendChild(img);
          wrapper.appendChild(zoomIcon);
        }

        // Add hover effect
        wrapper.addEventListener('mouseenter', () => {
          zoomIcon.style.display = 'flex';
        });

        wrapper.addEventListener('mouseleave', () => {
          zoomIcon.style.display = 'none';
        });

        // Add click handler
        wrapper.addEventListener('click', () => {
          setModalImage({
            src: img.src,
            alt: img.alt || ''
          });
        });
      });
    }

    // Cleanup function
    return () => {
      if (contentRef.current) {
        const wrappers = contentRef.current.querySelectorAll('.image-zoom-wrapper');
        wrappers.forEach((wrapper) => {
          const img = wrapper.querySelector('img');
          if (img && wrapper.parentNode) {
            wrapper.parentNode.insertBefore(img, wrapper);
            wrapper.remove();
          }
        });
      }
    };
  }, [cleanContent]);

  return (
    <>
      <div
        ref={contentRef}
        className="blog-content-wrapper"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />

      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          isOpen={!!modalImage}
          onClose={() => setModalImage(null)}
        />
      )}
    </>
  );
}