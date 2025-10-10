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

  // Passwort-Änderung State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

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

  // Benutzer laden mit Caching
  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        // Check if data is already cached in sessionStorage
        const cachedData = sessionStorage.getItem('usersData');
        const cacheTime = sessionStorage.getItem('usersCacheTime');

        // Use cache if it's less than 5 minutes old
        if (cachedData && cacheTime) {
          const age = Date.now() - parseInt(cacheTime);
          if (age < 300000) { // 5 minutes
            console.log('👥 Using cached users data');
            setUsers(JSON.parse(cachedData));
            setIsLoading(false);
            return;
          }
        }

        setIsLoading(true);
        console.log('🚀 Loading fresh users data...');

        const response = await fetch('/api/users-v2', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        if (!isMounted) return;

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
          console.log(`✅ ${data.users?.length || 0} Benutzer geladen und gecacht`);
          setUsers(data.users || []);

          // Cache the data
          sessionStorage.setItem('usersData', JSON.stringify(data.users || []));
          sessionStorage.setItem('usersCacheTime', Date.now().toString());
        } else {
          console.error('Fehler beim Laden der Benutzer:', data.error);
        }
      } catch (error: any) {
        if (!isMounted) return;

        console.error('Fehler beim Laden der Benutzer:', error);
        setUsers([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
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
        // Cache invalidieren und neu laden
        sessionStorage.removeItem('usersData');
        sessionStorage.removeItem('usersCacheTime');
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

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser || !newPassword) {
      setMessage({ type: 'error', text: 'Passwort ist erforderlich' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Das Passwort muss mindestens 6 Zeichen lang sein' });
      return;
    }

    try {
      setIsChangingPassword(true);
      setMessage(null);

      const response = await fetch('/api/users-v2', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: selectedUser.uid,
          newPassword: newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `Passwort für ${selectedUser.email} erfolgreich geändert!` });
        setNewPassword('');
        setSelectedUser(null);
        setShowPasswordModal(false);
      } else {
        setMessage({ type: 'error', text: data.error || 'Fehler beim Ändern des Passworts' });
      }
    } catch (error: any) {
      console.error('Fehler beim Ändern des Passworts:', error);
      setMessage({ type: 'error', text: 'Fehler beim Ändern des Passworts' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const openPasswordModal = (user: User) => {
    setSelectedUser(user);
    setNewPassword('');
    setShowPasswordModal(true);
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
        color: '#ffffff',
        fontFamily: 'Raleway, sans-serif',
        padding: isMobile ? '1rem' : '2rem'
      }}>
        {/* Header Skeleton */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            height: '2.5rem',
            width: '200px',
            background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '0.5rem',
            marginBottom: '0.5rem'
          }} />
          <div style={{
            height: '1.1rem',
            width: '300px',
            background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          }} />
          <div style={{
            height: '2.5rem',
            width: '150px',
            background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '0.5rem'
          }} />
        </div>

        {/* Users Table Skeleton */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(248, 223, 165, 0.3)',
          overflow: 'hidden'
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 100px' : '2fr 2fr 1fr 1fr 150px',
            gap: '1rem',
            padding: '1rem',
            borderBottom: '1px solid rgba(248, 223, 165, 0.2)',
            background: 'rgba(248, 223, 165, 0.05)'
          }}>
            {['Benutzer', 'Status', 'Erstellt', 'Letzter Login', 'Aktionen'].slice(0, isMobile ? 2 : 5).map((_, i) => (
              <div key={i} style={{
                height: '1rem',
                background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '0.5rem'
              }} />
            ))}
          </div>

          {/* Table Rows */}
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 100px' : '2fr 2fr 1fr 1fr 150px',
              gap: '1rem',
              padding: '1rem',
              borderBottom: i < 5 ? '1px solid rgba(248, 223, 165, 0.1)' : 'none'
            }}>
              {/* User Info */}
              <div>
                <div style={{
                  height: '1rem',
                  width: '80%',
                  background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                  borderRadius: '0.5rem',
                  marginBottom: '0.5rem'
                }} />
                <div style={{
                  height: '0.875rem',
                  width: '60%',
                  background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                  borderRadius: '0.5rem'
                }} />
              </div>

              {!isMobile && (
                <>
                  {/* Status */}
                  <div style={{
                    height: '1.5rem',
                    width: '80px',
                    background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    borderRadius: '12px'
                  }} />

                  {/* Created */}
                  <div style={{
                    height: '0.875rem',
                    width: '70%',
                    background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    borderRadius: '0.5rem'
                  }} />

                  {/* Last Login */}
                  <div style={{
                    height: '0.875rem',
                    width: '70%',
                    background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    borderRadius: '0.5rem'
                  }} />
                </>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2].map(j => (
                  <div key={j} style={{
                    height: '2rem',
                    width: '2rem',
                    background: 'linear-gradient(90deg, rgba(248, 223, 165, 0.1) 0%, rgba(248, 223, 165, 0.2) 50%, rgba(248, 223, 165, 0.1) 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    borderRadius: '0.5rem'
                  }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
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
                        textAlign: 'center'
                      }}>
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem',
                          justifyContent: 'center',
                          flexWrap: 'wrap'
                        }}>
                          <button
                            onClick={() => openPasswordModal(user)}
                            style={{
                              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
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
                            🔐 Passwort
                          </button>
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
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && selectedUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(248, 223, 165, 0.3)',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#f8dfa5'
            }}>
              🔐 Passwort ändern
            </h3>
            
            <p style={{
              color: '#d1d5db',
              marginBottom: '1.5rem'
            }}>
              Neues Passwort für <strong>{selectedUser.email}</strong> setzen:
            </p>
            
            <form onSubmit={changePassword}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#d1d5db',
                  fontSize: '0.875rem'
                }}>
                  Neues Passwort *
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
              
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setSelectedUser(null);
                    setNewPassword('');
                  }}
                  style={{
                    background: 'rgba(107, 114, 128, 0.3)',
                    color: '#d1d5db',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'Raleway, sans-serif'
                  }}
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  style={{
                    background: isChangingPassword 
                      ? 'rgba(34, 197, 94, 0.3)' 
                      : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    color: isChangingPassword ? '#666' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: isChangingPassword ? 'not-allowed' : 'pointer',
                    fontFamily: 'Raleway, sans-serif'
                  }}
                >
                  {isChangingPassword ? '🔄 Ändere...' : '✅ Passwort ändern'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 