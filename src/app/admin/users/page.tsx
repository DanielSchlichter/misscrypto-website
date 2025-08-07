'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  uid: string;
  email: string;
  displayName?: string;
  disabled: boolean;
  emailVerified: boolean;
  creationTime: string;
  lastSignInTime?: string;
  customClaims: {
    role?: string;
    adminLevel?: string;
  };
  // Erweiterte Firestore-Daten
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    department?: string;
  };
  preferences?: {
    theme?: string;
    language?: string;
    notifications?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
    };
  };
  permissions?: {
    canManageUsers?: boolean;
    canManageContent?: boolean;
    canViewAnalytics?: boolean;
    canManageSettings?: boolean;
  };
  lastActivity?: string | null;
  totalLogins?: number;
  isActive?: boolean;
}

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    displayName: ''
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  const isMobile = screenWidth < 768;

  const loadUsers = async (retryCount = 0) => {
    try {
      setIsLoading(true);
      console.log(`🚀 Lade Benutzer... (Versuch ${retryCount + 1})`);
      
      // API-Call mit längerem Timeout für Users
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s Timeout für Users
      
      const response = await fetch('/api/users-v2', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${data.users.length} Benutzer geladen`);
        setUsers(data.users);
        setMessage(null); // Erfolg - Fehlermeldung löschen
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Fehler beim Laden der Benutzer' });
      }
    } catch (error: any) {
      console.error('Fehler beim Laden der Benutzer:', error);
      
      if (error.name === 'AbortError' && retryCount < 2) {
        console.log(`⏳ Retry ${retryCount + 1}/3 nach Timeout...`);
        setTimeout(() => loadUsers(retryCount + 1), 2000); // 2s warten vor Retry
        return;
      }
      
      if (error.name === 'AbortError') {
        setMessage({ type: 'error', text: 'Zeitüberschreitung beim Laden der Benutzer. Bitte versuchen Sie es erneut.' });
      } else {
        setMessage({ type: 'error', text: 'Fehler beim Laden der Benutzer' });
      }
    } finally {
      if (retryCount === 0) {
        setIsLoading(false);
      }
    }
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.email || !newUser.password) {
      setMessage({ type: 'error', text: 'E-Mail und Passwort sind erforderlich' });
      return;
    }

    try {
      setIsCreating(true);
      setMessage(null);

      const response = await fetch('/api/users-v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `Benutzer ${newUser.email} erfolgreich erstellt!` });
        setNewUser({ email: '', password: '', displayName: '' });
        setShowCreateForm(false);
        loadUsers(); // Reload users list
      } else {
        setMessage({ type: 'error', text: data.error || 'Fehler beim Erstellen des Benutzers' });
      }
    } catch (error: any) {
      console.error('Fehler beim Erstellen:', error);
      setMessage({ type: 'error', text: 'Fehler beim Erstellen des Benutzers' });
    } finally {
      setIsCreating(false);
    }
  };

  const deleteUser = async (uid: string, email: string) => {
    if (!confirm(`Möchten Sie den Benutzer "${email}" wirklich löschen?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/users-v2?uid=${uid}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `Benutzer ${email} erfolgreich gelöscht!` });
        loadUsers(); // Reload users list
      } else {
        setMessage({ type: 'error', text: data.error || 'Fehler beim Löschen des Benutzers' });
      }
    } catch (error: any) {
      console.error('Fehler beim Löschen:', error);
      setMessage({ type: 'error', text: 'Fehler beim Löschen des Benutzers' });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('de-DE');
    } catch {
      return 'Unbekannt';
    }
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: '#ffffff',
        fontFamily: 'Raleway, sans-serif'
      }}>
        <div style={{
          flexDirection: 'column',
          gap: '1rem',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(248, 223, 165, 0.3)',
            borderTop: '4px solid #f8dfa5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }} />
          <p style={{ color: '#d1d5db' }}>Lade Benutzer...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      color: '#ffffff',
      fontFamily: 'Raleway, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          👥 Benutzer-Verwaltung
        </h1>
        <p style={{
          color: '#d1d5db',
          fontSize: '1.1rem'
        }}>
          Verwalten Sie Admin-Benutzer und erstellen Sie neue Accounts
        </p>
      </div>

      {/* Message */}
      {message && (
        <div style={{
          padding: '1rem',
          marginBottom: '2rem',
          borderRadius: '12px',
          background: message.type === 'success' 
            ? 'rgba(34, 197, 94, 0.1)' 
            : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${message.type === 'success' ? '#22c55e' : '#ef4444'}`,
          color: message.type === 'success' ? '#22c55e' : '#ef4444'
        }}>
          {message.text}
        </div>
      )}

      {/* Create User Button */}
      <div style={{
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{
            background: 'linear-gradient(135deg, #f8dfa5 0%, #e4b15e 100%)',
            color: '#000000',
            border: 'none',
            borderRadius: '12px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'Raleway, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(248, 223, 165, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {showCreateForm ? '❌ Abbrechen' : '➕ Neuen Admin erstellen'}
        </button>
      </div>

      {/* Create User Form */}
      {showCreateForm && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            color: '#f8dfa5'
          }}>
            Neuen Admin-Benutzer erstellen
          </h3>
          
          <form onSubmit={createUser} style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr auto'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#d1d5db',
                fontSize: '0.875rem'
              }}>
                E-Mail-Adresse *
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                placeholder="admin@example.com"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#d1d5db',
                fontSize: '0.875rem'
              }}>
                Passwort *
              </label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                placeholder="Mindestens 6 Zeichen"
                required
                minLength={6}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#d1d5db',
                fontSize: '0.875rem'
              }}>
                Name (optional)
              </label>
              <input
                type="text"
                value={newUser.displayName}
                onChange={(e) => setNewUser({...newUser, displayName: e.target.value})}
                placeholder="Vollständiger Name"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(248, 223, 165, 0.3)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'Raleway, sans-serif'
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'end'
            }}>
              <button
                type="submit"
                disabled={isCreating}
                style={{
                  background: isCreating 
                    ? 'rgba(248, 223, 165, 0.3)' 
                    : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: isCreating ? '#666' : '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isCreating ? 'not-allowed' : 'pointer',
                  fontFamily: 'Raleway, sans-serif',
                  whiteSpace: 'nowrap'
                }}
              >
                {isCreating ? '🔄 Erstelle...' : '✅ Erstellen'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(248, 223, 165, 0.3)',
        borderRadius: '20px',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(248, 223, 165, 0.3)',
          background: 'rgba(248, 223, 165, 0.1)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            margin: 0,
            color: '#f8dfa5'
          }}>
            Alle Admin-Benutzer ({users.length})
          </h3>
        </div>

        <div style={{
          overflowX: 'auto'
        }}>
          {users.length === 0 ? (
            <div style={{
              padding: '3rem',
              textAlign: 'center',
              color: '#9ca3af'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👤</div>
              <p>Keine Benutzer gefunden</p>
            </div>
          ) : (
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{
                  borderBottom: '1px solid rgba(248, 223, 165, 0.2)'
                }}>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    E-Mail
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    Name
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    Status
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    Erstellt
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    Letzter Login
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    Abteilung
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'center',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    Logins
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'center',
                    color: '#f8dfa5',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  const isCurrentUser = user.email === session?.user?.email;
                  
                  return (
                    <tr 
                      key={user.uid}
                      style={{
                        borderBottom: index < users.length - 1 ? '1px solid rgba(248, 223, 165, 0.1)' : 'none',
                        background: isCurrentUser ? 'rgba(248, 223, 165, 0.05)' : 'transparent'
                      }}
                    >
                      <td style={{
                        padding: '1rem',
                        color: '#ffffff',
                        fontWeight: isCurrentUser ? '600' : 'normal'
                      }}>
                        {user.email}
                        {isCurrentUser && (
                          <span style={{
                            marginLeft: '0.5rem',
                            padding: '0.25rem 0.5rem',
                            background: 'rgba(34, 197, 94, 0.2)',
                            color: '#22c55e',
                            borderRadius: '12px',
                            fontSize: '0.75rem'
                          }}>
                            Sie
                          </span>
                        )}
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: '#d1d5db'
                      }}>
                        {user.displayName || '-'}
                      </td>
                      <td style={{
                        padding: '1rem'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: user.disabled ? '#ef4444' : '#22c55e'
                          }} />
                          <span style={{
                            color: user.disabled ? '#ef4444' : '#22c55e',
                            fontSize: '0.875rem'
                          }}>
                            {user.disabled ? 'Deaktiviert' : 'Aktiv'}
                          </span>
                          {user.emailVerified && (
                            <span style={{
                              padding: '0.25rem 0.5rem',
                              background: 'rgba(34, 197, 94, 0.2)',
                              color: '#22c55e',
                              borderRadius: '12px',
                              fontSize: '0.75rem'
                            }}>
                              ✓ Verifiziert
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: '#d1d5db',
                        fontSize: '0.875rem'
                      }}>
                        {formatDate(user.creationTime)}
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: '#d1d5db',
                        fontSize: '0.875rem'
                      }}>
                        {user.lastSignInTime ? formatDate(user.lastSignInTime) : 'Nie'}
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: '#d1d5db',
                        fontSize: '0.875rem'
                      }}>
                        {user.profile?.department || 'Administration'}
                      </td>
                      <td style={{
                        padding: '1rem',
                        textAlign: 'center',
                        color: '#d1d5db',
                        fontSize: '0.875rem'
                      }}>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          background: 'rgba(248, 223, 165, 0.1)',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          color: '#f8dfa5'
                        }}>
                          {user.totalLogins || 0}
                        </span>
                      </td>
                      <td style={{
                        padding: '1rem',
                        textAlign: 'center'
                      }}>
                        {!isCurrentUser && (
                          <button
                            onClick={() => deleteUser(user.uid, user.email)}
                            style={{
                              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '0.5rem 1rem',
                              fontSize: '0.875rem',
                              cursor: 'pointer',
                              fontFamily: 'Raleway, sans-serif',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            🗑️ Löschen
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
} 