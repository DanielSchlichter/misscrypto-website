'use client';

import { useState, useEffect } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  isMobile?: boolean;
}

export default function TableOfContents({ content, isMobile = false }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Extrahiere Überschriften aus dem HTML-Content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const items: TocItem[] = [];
    
    headings.forEach((heading, index) => {
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.charAt(1));
      const id = heading.id || `heading-${index}`;
      
      // Setze ID wenn nicht vorhanden
      if (!heading.id) {
        heading.id = id;
      }
      
      items.push({ id, text, level });
    });
    
    setTocItems(items);
  }, [content]);

  useEffect(() => {
    // Warte kurz und setze dann IDs für Überschriften im gerenderten DOM
    const timer = setTimeout(() => {
      const allHeadings = document.querySelectorAll('.blog-content-wrapper h1, .blog-content-wrapper h2, .blog-content-wrapper h3, .blog-content-wrapper h4, .blog-content-wrapper h5, .blog-content-wrapper h6');
      allHeadings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
      });

      // Debug: Zeige alle gefundenen IDs
      console.log('TOC Debug - Found headings:', Array.from(allHeadings).map(h => ({ id: h.id, text: h.textContent })));
    }, 500); // Mehr Zeit geben

    return () => clearTimeout(timer);
  }, [tocItems]);

  useEffect(() => {
    // Scroll-Tracking für aktive Sektion
    const handleScroll = () => {
      const headings = tocItems.map(item => document.getElementById(item.id)).filter(Boolean);

      let current = '';
      for (const heading of headings) {
        if (heading) {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= 100) {
            current = heading.id;
          }
        }
      }

      setActiveSection(current);
    };

    if (tocItems.length > 0) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [tocItems]);

  if (tocItems.length === 0) {
    return null;
  }

  if (isMobile) {
    return (
      <div style={{
        width: '100%',
        position: 'relative',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f172a 50%, #1e293b 75%, #334155 100%)',
          border: '2px solid rgba(248, 223, 165, 0.4)',
          borderRadius: '12px',
          padding: '1rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid rgba(248, 223, 165, 0.3)'
          }}>
            <div style={{ fontSize: '1.2rem' }}>📋</div>
            <h3 style={{
              color: '#f8dfa5',
              fontSize: '1.1rem',
              fontWeight: '600',
              margin: 0,
              background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Inhaltsverzeichnis
            </h3>
          </div>
          <nav>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              {tocItems.map((item, index) => (
                <li key={item.id} style={{ marginBottom: '0.75rem' }}>
                  <a
                    href={`#${item.id}`}
                    style={{
                      color: activeSection === item.id ? '#f8dfa5' : '#d1d5db',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      display: 'block',
                      padding: '0.5rem 0 0.5rem 1.5rem',
                      marginLeft: '-1rem',
                      borderLeft: `3px solid ${activeSection === item.id ? '#f8dfa5' : 'transparent'}`,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {index + 1}. {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'sticky',
      top: '8rem', // Mehr Abstand für Header-Clearance
      right: '0',
      width: '280px',
      maxHeight: 'calc(100vh - 12rem)', // Mehr Abstand zu Header und Footer
      zIndex: 1000,
      overflowY: 'auto',
      alignSelf: 'flex-start' // Wichtig für sticky in flex container
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f172a 50%, #1e293b 75%, #334155 100%)',
        border: '2px solid rgba(248, 223, 165, 0.4)',
        borderRadius: '12px',
        padding: '1rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid rgba(248, 223, 165, 0.3)'
        }}>
          <div style={{ fontSize: '1.2rem' }}>📋</div>
          <h3 style={{
            color: '#f8dfa5',
            fontSize: '1.1rem',
            fontWeight: '600',
            margin: 0,
            background: 'linear-gradient(135deg, #f8dfa5, #e4b15e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Inhaltsverzeichnis
          </h3>
        </div>
        
        <nav>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {tocItems.map((item, index) => (
              <li key={item.id} style={{ marginBottom: '0.75rem' }}>
                <a 
                  href={`#${item.id}`}
                  style={{
                    color: activeSection === item.id ? '#f8dfa5' : '#d1d5db',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    display: 'block',
                    padding: '0.5rem 0 0.5rem 1rem',
                    marginLeft: '-1rem',
                    borderLeft: activeSection === item.id ? '3px solid #f8dfa5' : '3px solid transparent',
                    transition: 'all 0.3s ease',
                    paddingLeft: `${1 + (item.level - 1) * 0.5}rem` // Einrückung basierend auf Level
                  }}
                  onMouseOver={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.color = '#f8dfa5';
                    target.style.borderLeftColor = '#f8dfa5';
                  }}
                  onMouseOut={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.color = activeSection === item.id ? '#f8dfa5' : '#d1d5db';
                    target.style.borderLeftColor = activeSection === item.id ? '#f8dfa5' : 'transparent';
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('TOC Click Debug - Looking for ID:', item.id);
                    const target = document.getElementById(item.id);
                    console.log('TOC Click Debug - Found target:', target);

                    if (target) {
                      // Scroll mit Offset für Fixed Header
                      const yOffset = -120; // Offset für Header
                      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      console.log('TOC Click Debug - Scrolling to Y:', y);
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    } else {
                      // Fallback: Suche nach Text-Content
                      const allHeadings = document.querySelectorAll('.blog-content-wrapper h1, .blog-content-wrapper h2, .blog-content-wrapper h3, .blog-content-wrapper h4, .blog-content-wrapper h5, .blog-content-wrapper h6');
                      const headingByText = Array.from(allHeadings).find(h => h.textContent?.trim() === item.text.trim());
                      console.log('TOC Click Debug - Fallback found:', headingByText);

                      if (headingByText) {
                        const yOffset = -120;
                        const y = headingByText.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {index + 1}. {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
} 