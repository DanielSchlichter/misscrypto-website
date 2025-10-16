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

  // Fix image heights - remove fixed heights and set to auto
  const images = tempDiv.querySelectorAll('img');
  images.forEach(img => {
    // Remove any fixed height from style attribute
    const currentStyle = img.getAttribute('style') || '';
    // Remove height property and object-fit cover, set to auto and contain
    const newStyle = currentStyle
      .replace(/height:\s*\d+px;?/gi, 'height: auto;')
      .replace(/object-fit:\s*cover;?/gi, 'object-fit: contain;')
      // Ensure width: 100% is present
      .replace(/width:\s*\d+%;?/gi, 'width: 100%;');

    // Add width: 100% and height: auto if not present
    let finalStyle = newStyle;
    if (!finalStyle.includes('width:')) {
      finalStyle += ' width: 100%;';
    }
    if (!finalStyle.includes('height:')) {
      finalStyle += ' height: auto;';
    }

    img.setAttribute('style', finalStyle.trim());
  });

  return tempDiv.innerHTML;
};

export default function StyledBlogContentWithZoom({ content }: StyledBlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  // Clean content for publishing (remove editor elements)
  const cleanContent = useMemo(() => {
    return getCleanContentForPublishing(content);
  }, [content]);

  // Add image click handlers
  useEffect(() => {
    if (contentRef.current) {
      // Füge IDs zu Überschriften hinzu für Inhaltsverzeichnis
      const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
      });

      // Check if images are already wrapped
      const images = contentRef.current.querySelectorAll('img');
      images.forEach((img) => {
        // Skip if already wrapped
        if (img.parentElement?.classList.contains('image-zoom-wrapper')) {
          return;
        }

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

        // Store event handlers on the wrapper element for later cleanup
        const handleMouseEnter = () => {
          zoomIcon.style.display = 'flex';
        };

        const handleMouseLeave = () => {
          zoomIcon.style.display = 'none';
        };

        // Store references for cleanup
        (wrapper as any)._hoverHandlers = {
          mouseenter: handleMouseEnter,
          mouseleave: handleMouseLeave
        };

        // Add hover effect
        wrapper.addEventListener('mouseenter', handleMouseEnter);
        wrapper.addEventListener('mouseleave', handleMouseLeave);

        // Store image data on the element for click handler
        (wrapper as any)._imageData = {
          src: img.src,
          alt: img.alt || ''
        };
      });
    }
  }, [cleanContent]);

  // Add click event listener separately
  useEffect(() => {
    const handleImageClick = (e: MouseEvent) => {
      const wrapper = (e.currentTarget as HTMLElement);
      if (wrapper.classList.contains('image-zoom-wrapper')) {
        const imageData = (wrapper as any)._imageData;
        if (imageData) {
          setModalImage({
            src: imageData.src,
            alt: imageData.alt
          });
        }
      }
    };

    if (contentRef.current) {
      const wrappers = contentRef.current.querySelectorAll('.image-zoom-wrapper');
      wrappers.forEach(wrapper => {
        // Store the click handler on the wrapper
        (wrapper as any)._clickHandler = handleImageClick;

        // Remove existing listeners to avoid duplicates
        wrapper.removeEventListener('click', handleImageClick);
        // Add fresh listener
        wrapper.addEventListener('click', handleImageClick);
      });

      return () => {
        wrappers.forEach(wrapper => {
          const storedHandler = (wrapper as any)._clickHandler;
          if (storedHandler) {
            wrapper.removeEventListener('click', storedHandler);
          }
        });
      };
    }
  }, [cleanContent]);

  // Ensure zoom icons are always visible after modal closes
  useEffect(() => {
    if (!modalImage && contentRef.current) {
      // Re-wrap any images that lost their wrappers after modal close
      const images = contentRef.current.querySelectorAll('img');
      images.forEach((img) => {
        // Skip if already wrapped
        if (img.parentElement?.classList.contains('image-zoom-wrapper')) {
          // Just ensure event listeners are attached
          const wrapper = img.parentElement;
          const zoomIcon = wrapper.querySelector('.zoom-icon') as HTMLElement;
          if (zoomIcon) {
            // Re-attach hover handlers
            const storedHandlers = (wrapper as any)._hoverHandlers;
            if (storedHandlers) {
              wrapper.removeEventListener('mouseenter', storedHandlers.mouseenter);
              wrapper.removeEventListener('mouseleave', storedHandlers.mouseleave);
              wrapper.addEventListener('mouseenter', storedHandlers.mouseenter);
              wrapper.addEventListener('mouseleave', storedHandlers.mouseleave);
            }

            // Re-attach click handler
            const handleImageClick = (e: MouseEvent) => {
              const wrapper = (e.currentTarget as HTMLElement);
              if (wrapper.classList.contains('image-zoom-wrapper')) {
                const imageData = (wrapper as any)._imageData;
                if (imageData) {
                  setModalImage({
                    src: imageData.src,
                    alt: imageData.alt
                  });
                }
              }
            };

            // Store and attach click handler
            (wrapper as any)._clickHandler = handleImageClick;
            wrapper.removeEventListener('click', handleImageClick);
            wrapper.addEventListener('click', handleImageClick);
          }
          return;
        }

        // Create wrapper for unwrapped images
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
        zoomIcon.style.transition = 'opacity 0.3s';

        // Wrap the image
        if (img.parentNode) {
          img.parentNode.insertBefore(wrapper, img);
          wrapper.appendChild(img);
          wrapper.appendChild(zoomIcon);
        }

        // Store event handlers
        const handleMouseEnter = () => {
          zoomIcon.style.display = 'flex';
        };

        const handleMouseLeave = () => {
          zoomIcon.style.display = 'none';
        };

        // Store references for cleanup
        (wrapper as any)._hoverHandlers = {
          mouseenter: handleMouseEnter,
          mouseleave: handleMouseLeave
        };

        // Add hover effect
        wrapper.addEventListener('mouseenter', handleMouseEnter);
        wrapper.addEventListener('mouseleave', handleMouseLeave);

        // Store image data on the element for click handler
        (wrapper as any)._imageData = {
          src: img.src,
          alt: img.alt || ''
        };

        // Add click handler for newly created wrappers
        const handleImageClick = (e: MouseEvent) => {
          const wrapper = (e.currentTarget as HTMLElement);
          if (wrapper.classList.contains('image-zoom-wrapper')) {
            const imageData = (wrapper as any)._imageData;
            if (imageData) {
              setModalImage({
                src: imageData.src,
                alt: imageData.alt
              });
            }
          }
        };

        // Store and attach click handler
        (wrapper as any)._clickHandler = handleImageClick;
        wrapper.addEventListener('click', handleImageClick);
      });
    }
  }, [modalImage]);

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