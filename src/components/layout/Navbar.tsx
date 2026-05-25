import { useState } from 'react';
import { Search, Bell, Moon, Sun, MessageSquare, HelpCircle, ChevronDown, Wifi, AlertTriangle, Menu } from 'lucide-react';

interface NavbarProps {
  sidebarWidth: number;
  darkMode: boolean;
  onToggleDark: () => void;
  pageTitle: string;
  isMobile?: boolean;
  onMenuToggle?: () => void;
}

export default function Navbar({ sidebarWidth, darkMode, onToggleDark, pageTitle, isMobile = false, onMenuToggle }: NavbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const notifications = [
    { icon: <AlertTriangle size={14} />, color: '#ef4444', text: 'Emergency: Vikram Singh - ICU', time: '2m ago' },
    { icon: <Wifi size={14} />, color: '#0ea5e9', text: '3 new lab reports ready', time: '15m ago' },
    { icon: <Bell size={14} />, color: '#f59e0b', text: 'Low stock: Paracetamol 500mg', time: '1h ago' },
    { icon: <MessageSquare size={14} />, color: '#14b8a6', text: 'Dr. Sharma sent a message', time: '2h ago' },
  ];

  const navHeight = isMobile ? '56px' : '64px';
  const navPadding = isMobile ? '0 12px' : '0 24px';
  const searchWidth = isMobile ? '140px' : '280px';
  const searchPlaceholder = isMobile ? 'Search...' : 'Search patients, doctors...';

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: `${sidebarWidth}px`,
      right: 0,
      height: navHeight,
      background: darkMode ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      padding: navPadding,
      gap: isMobile ? '8px' : '16px',
      transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={onMenuToggle}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
            background: darkMode ? 'rgba(255,255,255,0.04)' : '#f8fafc',
            color: darkMode ? '#94a3b8' : '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            border: 'none',
          }}
        >
          <Menu size={18} />
        </button>
      )}

      {/* Page title - hide on small mobile */}
      {!isMobile && (
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{
            fontSize: '17px',
            fontWeight: 700,
            color: darkMode ? '#f1f5f9' : '#0f172a',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>{pageTitle}</h1>
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Sunday, 24 May 2026</p>
        </div>
      )}

      {isMobile && (
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{
            fontSize: '14px',
            fontWeight: 700,
            color: darkMode ? '#f1f5f9' : '#0f172a',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>{pageTitle}</h1>
        </div>
      )}

      {/* Search - responsive width */}
      <div style={{
        position: 'relative',
        display: isMobile ? 'none' : 'flex',
        alignItems: 'center',
      }}>
        <Search size={15} style={{
          position: 'absolute',
          left: '12px',
          color: searchFocused ? '#0ea5e9' : '#94a3b8',
          transition: 'color 0.2s',
          zIndex: 1,
        }} />
        <input
          type="text"
          placeholder={searchPlaceholder}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            paddingLeft: '36px',
            paddingRight: '16px',
            height: '36px',
            width: searchWidth,
            borderRadius: '10px',
            border: searchFocused
              ? '1.5px solid #0ea5e9'
              : darkMode ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #e2e8f0',
            background: darkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc',
            color: darkMode ? '#f1f5f9' : '#0f172a',
            fontSize: '13px',
            outline: 'none',
            transition: 'all 0.2s',
            boxShadow: searchFocused ? '0 0 0 3px rgba(14,165,233,0.12)' : 'none',
          }}
        />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '2px' : '4px' }}>
        <NavBtn onClick={onToggleDark} darkMode={darkMode} title="Toggle theme" isMobile={isMobile}>
          {darkMode ? <Sun size={isMobile ? 16 : 17} /> : <Moon size={isMobile ? 16 : 17} />}
        </NavBtn>
        <NavBtn darkMode={darkMode} title="Help" isMobile={isMobile} className="hide-mobile">
          <HelpCircle size={isMobile ? 16 : 17} />
        </NavBtn>
        <NavBtn darkMode={darkMode} title="Messages" isMobile={isMobile} className="hide-mobile">
          <MessageSquare size={isMobile ? 16 : 17} />
        </NavBtn>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <NavBtn darkMode={darkMode} onClick={() => setShowNotif(!showNotif)} title="Notifications" isMobile={isMobile}>
            <Bell size={isMobile ? 16 : 17} />
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#ef4444',
              border: '1.5px solid',
              borderColor: darkMode ? '#0f172a' : 'white',
            }} />
          </NavBtn>
          {showNotif && (
            <div style={{
              position: 'absolute',
              top: '48px',
              right: 0,
              width: isMobile ? 'calc(100vw - 32px)' : '320px',
              maxWidth: '320px',
              background: darkMode ? '#1e293b' : 'white',
              borderRadius: '14px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
              overflow: 'hidden',
              zIndex: 100,
              animation: 'slideDown 0.2s ease',
            }}>
              <div style={{ padding: '12px 16px', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '13px', color: darkMode ? '#f1f5f9' : '#0f172a' }}>Notifications</span>
                <span style={{ fontSize: '10px', color: '#0ea5e9', cursor: 'pointer', fontWeight: 600 }}>Clear</span>
              </div>
              {notifications.map((n, i) => (
                <div key={i} style={{
                  padding: '10px 14px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                  borderBottom: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid #f8fafc',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${n.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: n.color, flexShrink: 0 }}>
                    {n.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', color: darkMode ? '#e2e8f0' : '#1e293b', fontWeight: 500, lineHeight: 1.3 }}>{n.text}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile - hide on mobile */}
      {!isMobile && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 12px 6px 6px',
          borderRadius: '12px',
          cursor: 'pointer',
          background: darkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc',
          border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
          transition: 'all 0.2s',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0ea5e9, #14b8a6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 700,
            color: 'white',
          }}>AD</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: darkMode ? '#f1f5f9' : '#0f172a', lineHeight: 1.2 }}>Admin</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Super Admin</div>
          </div>
          <ChevronDown size={13} color="#94a3b8" />
        </div>
      )}
    </header>
  );
}

function NavBtn({ children, onClick, darkMode, title, isMobile = false, className }: { children: React.ReactNode; onClick?: () => void; darkMode: boolean; title?: string; isMobile?: boolean; className?: string }) {
  return (
    <button
      className={className}
      onClick={onClick}
      title={title}
      style={{
        width: isMobile ? '36px' : '38px',
        height: isMobile ? '36px' : '38px',
        borderRadius: '10px',
        border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
        background: darkMode ? 'rgba(255,255,255,0.04)' : '#f8fafc',
        color: darkMode ? '#94a3b8' : '#64748b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.2s',
      }}
    >
      {children}
    </button>
  );
}
