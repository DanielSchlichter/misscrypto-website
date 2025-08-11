import { ViewType } from '../types';
import HeadingModule from './modules/HeadingModule';
import HighlightModule from './modules/HighlightModule';
import StatsModule from './modules/StatsModule';
import SecurityModule from './modules/SecurityModule';
import ImageModule from './modules/ImageModule';

interface ModuleSidebarProps {
  currentView: ViewType;
  moduleData: any;
  editingModuleId: string | null;
  onViewChange: (view: ViewType) => void;
  onModuleDataChange: (data: any) => void;
  onStartEditing: (type: ViewType) => void;
  onCancelEditing: () => void;
  onSaveModule: () => void;
  onClose: () => void;
  onOpenMediaModal: () => void;
  onContentChange: () => void;
  heightInputRef?: React.RefObject<HTMLInputElement>;
  startIncrement?: () => void;
  startDecrement?: () => void;
  stopIncrement?: () => void;
  stopDecrement?: () => void;
}

export default function ModuleSidebar({
  currentView,
  moduleData,
  editingModuleId,
  onViewChange,
  onModuleDataChange,
  onStartEditing,
  onCancelEditing,
  onSaveModule,
  onClose,
  onOpenMediaModal,
  onContentChange,
  heightInputRef,
  startIncrement,
  startDecrement,
  stopIncrement,
  stopDecrement
}: ModuleSidebarProps) {
  const sidebarWidth = 400;

  const renderModuleEditor = () => {
    switch (currentView) {
      case 'heading':
        return (
          <HeadingModule
            data={moduleData}
            onChange={onModuleDataChange}
            editingModuleId={editingModuleId}
            onSave={onSaveModule}
            onCancel={onCancelEditing}
          />
        );
      case 'highlight':
        return (
          <HighlightModule
            data={moduleData}
            onChange={onModuleDataChange}
            editingModuleId={editingModuleId}
            onSave={onSaveModule}
            onCancel={onCancelEditing}
          />
        );
      case 'stats':
        return (
          <StatsModule
            data={moduleData}
            onChange={onModuleDataChange}
            editingModuleId={editingModuleId}
            onSave={onSaveModule}
            onCancel={onCancelEditing}
          />
        );
      case 'security':
        return (
          <SecurityModule
            data={moduleData}
            onChange={onModuleDataChange}
            editingModuleId={editingModuleId}
            onSave={onSaveModule}
            onCancel={onCancelEditing}
          />
        );
      case 'image':
        return (
          <ImageModule
            data={moduleData}
            onChange={onModuleDataChange}
            editingModuleId={editingModuleId}
            onSave={onSaveModule}
            onCancel={onCancelEditing}
            onOpenMediaModal={onOpenMediaModal}
            onContentChange={onContentChange}
            heightInputRef={heightInputRef}
            startIncrement={startIncrement}
            startDecrement={startDecrement}
            stopIncrement={stopIncrement}
            stopDecrement={stopDecrement}
          />
        );

      default:
        return (
          <div style={{ padding: '1.5rem' }}>
            <h2 style={{
              margin: '0 0 1.5rem 0',
              color: '#f8dfa5',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              📦 Module hinzufügen
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => onStartEditing('heading')}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(248, 223, 165, 0.1)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '8px',
                  color: '#f8dfa5',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>📝</span>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    Nummerierte Überschrift
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                    Strukturierte Kapitel-Überschrift
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onStartEditing('highlight')}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(248, 223, 165, 0.1)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '8px',
                  color: '#f8dfa5',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>💡</span>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    Highlight-Box
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                    Wichtige Hinweise hervorheben
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onStartEditing('stats')}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(248, 223, 165, 0.1)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '8px',
                  color: '#f8dfa5',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>📊</span>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    Statistik-Grid
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                    Zahlen und Fakten darstellen
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onStartEditing('security')}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(248, 223, 165, 0.1)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '8px',
                  color: '#f8dfa5',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🔒</span>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    Sicherheits-Box
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                    Sicherheit und Vertrauen
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onStartEditing('image')}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(248, 223, 165, 0.1)',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  borderRadius: '8px',
                  color: '#f8dfa5',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 223, 165, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(248, 223, 165, 0.3)';
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🖼️</span>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    Bild
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                    Bilder mit anpassbarer Höhe
                  </div>
                </div>
              </button>


            </div>
          </div>
        );
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: `${sidebarWidth}px`,
      height: '100vh',
      background: '#1a1a1a',
      border: '1px solid #333',
      borderTop: 'none',
      borderRight: 'none',
      boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.3)',
      zIndex: 1500,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h2 style={{
          margin: 0,
          color: '#f8dfa5',
          fontSize: '1.25rem',
          fontWeight: '600'
        }}>
          {currentView === 'modules' ? '🧩 Module' : 
           currentView === 'heading' ? '📝 Überschrift' :
           currentView === 'highlight' ? '💡 Highlight' :
           currentView === 'stats' ? '📊 Statistik' :
           currentView === 'security' ? '🔒 Sicherheit' :
           currentView === 'image' ? '🖼️ Bild' : 'Module'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '6px',
            color: '#ef4444',
            padding: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            lineHeight: 1
          }}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflow: 'auto'
      }}>
        {renderModuleEditor()}
      </div>
    </div>
  );
} 