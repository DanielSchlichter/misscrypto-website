'use client';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="blog-content">
      <style jsx>{`
        .blog-content {
          color: #d1d5db;
          line-height: 1.7;
        }

        .blog-content p {
          margin-bottom: 1.5rem;
          font-size: 1rem;
        }

        /* Nummerierte goldene Überschriften */
        .blog-content .numbered-heading {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 3rem 0 2rem 0;
        }

        .blog-content .heading-number {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #f8dfa5, #e4b15e);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #1a1a2e;
        }

        .blog-content .golden-heading {
          color: #ffffff;
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #f8dfa5, #e4b15e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Highlight-Boxen */
        .blog-content .highlight-box {
          background: linear-gradient(135deg, rgba(248, 223, 165, 0.1), rgba(228, 177, 94, 0.1));
          border: 1px solid rgba(248, 223, 165, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
          margin: 2rem 0;
          position: relative;
        }

        .blog-content .highlight-label {
          position: absolute;
          top: -10px;
          left: 20px;
          background: linear-gradient(135deg, #f8dfa5, #e4b15e);
          color: #1a1a2e;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .blog-content .highlight-text {
          margin: 0;
          font-weight: 500;
        }

        /* Statistik-Grid */
        .blog-content .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin: 2rem 0;
        }

        .blog-content .stat-item {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(248, 223, 165, 0.2);
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
        }

        .blog-content .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #f8dfa5;
          margin-bottom: 0.5rem;
        }

        .blog-content .stat-label {
          font-size: 0.8rem;
          color: #9ca3af;
        }

        /* Sicherheits-Boxen */
        .blog-content .security-box {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 8px;
          padding: 1rem;
          margin: 2rem 0;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .blog-content .security-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .blog-content .security-content {
          flex: 1;
        }

        .blog-content .security-title {
          font-weight: 600;
          color: #10b981;
          margin-bottom: 0.25rem;
        }

        .blog-content .security-description {
          font-size: 0.9rem;
          color: #d1d5db;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .blog-content .numbered-heading {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .blog-content .heading-number {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
          }

          .blog-content .golden-heading {
            font-size: 1.5rem;
          }

          .blog-content .stats-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .blog-content .security-box {
            flex-direction: column;
            text-align: center;
          }

          .blog-content .highlight-box {
            padding: 1rem;
          }

          .blog-content .highlight-label {
            position: relative;
            top: auto;
            left: auto;
            margin-bottom: 1rem;
            display: inline-block;
          }
        }
      `}</style>

      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
} 