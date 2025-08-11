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

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div style={{
      width: isMobile ? '100%' : '280px',
      position: isMobile ? 'relative' : 'sticky',
      top: isMobile ? 'auto' : '2rem', // Reduced from 120px for better positioning
      zIndex: 10, // Ensure TOC stays above other content
      height: 'fit-content',
      flexShrink: 0,
      marginBottom: isMobile ? '2rem' : '0',
      maxHeight: isMobile ? 'none' : 'calc(100vh - 4rem)', // Prevent TOC from being too tall
      overflowY: isMobile ? 'visible' : 'auto' // Add scrolling if TOC is very long
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
                    const target = document.getElementById(item.id);
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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