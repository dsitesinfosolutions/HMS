import { useState } from 'react';
import { Search, Bell, Moon, Sun, MessageSquare, HelpCircle, ChevronDown, Wifi, AlertTriangle } from 'lucide-react';

interface NavbarProps {
  sidebarWidth: number;
  darkMode: boolean;
  onToggleDark: () => void;
  pageTitle: string;
}

export default function Navbar({ sidebarWidth, darkMode, onToggleDark, pageTitle }: NavbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const notifications = [
    { icon: <AlertTriangle size={14} />, color: '#ef4444', text: 'Emergency: Vikram Singh - ICU', time: '2m ago' },
    { icon: <Wifi size={14} />, color: '#0ea5e9', text: '3 new lab reports ready', time: '15m ago' },
    { icon: <Bell size={14} />, color: '#f59e0b', text: 'Low stock: Paracetamol 500mg', time: '1h ago' },
    { icon: <MessageSquare size={14} />, color: '#14b8a6', text: 'Dr. Sharma sent a message', time: '2h ago' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: `${sidebarWidth}px`,
      right: 0,
      height: '64px',
      background: darkMode ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '16px',
      transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}>
      {/* Page title */}
      <div style={{ flex: 1 }}>
        <h1 style={{
          fontSize: '17px',
          fontWeight: 700,
          color: darkMode ? '#f1f5f9' : '#0f172a',
          margin: 0,
        }}>{pageTitle}</h1>
        <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Sunday, 24 May 2026</p>
      </div>

      {/* Search */}
      <div style={{
        position: 'relative',
        display: 'flex',
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
          placeholder="Search patients, doctors..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            paddingLeft: '36px',
            paddingRight: '16px',
            height: '38px',
            width: '280px',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <NavBtn onClick={onToggleDark} darkMode={darkMode} title="Toggle theme">
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </NavBtn>
        <NavBtn darkMode={darkMode} title="Help">
          <HelpCircle size={17} />
        </NavBtn>
        <NavBtn darkMode={darkMode} title="Messages">
          <MessageSquare size={17} />
        </NavBtn>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <NavBtn darkMode={darkMode} onClick={() => setShowNotif(!showNotif)} title="Notifications">
            <Bell size={17} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ef4444',
              border: '2px solid',
              borderColor: darkMode ? '#0f172a' : 'white',
            }} />
          </NavBtn>
          {showNotif && (
            <div style={{
              position: 'absolute',
              top: '48px',
              right: 0,
              width: '320px',
              background: darkMode ? '#1e293b' : 'white',
              borderRadius: '14px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
              overflow: 'hidden',
              zIndex: 100,
              animation: 'slideDown 0.2s ease',
            }}>
              <div style={{ padding: '16px 20px', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '14px', color: darkMode ? '#f1f5f9' : '#0f172a' }}>Notifications</span>
                <span style={{ fontSize: '11px', color: '#0ea5e9', cursor: 'pointer', fontWeight: 600 }}>Mark all read</span>
              </div>
              {notifications.map((n, i) => (
                <div key={i} style={{
                  padding: '12px 20px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  borderBottom: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid #f8fafc',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: `${n.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: n.color, flexShrink: 0 }}>
                    {n.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12.5px', color: darkMode ? '#e2e8f0' : '#1e293b', fontWeight: 500, lineHeight: 1.4 }}>{n.text}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile */}
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
    </header>
  );
}

function NavBtn({ children, onClick, darkMode, title }: { children: React.ReactNode; onClick?: () => void; darkMode: boolean; title?: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: '38px',
        height: '38px',
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
