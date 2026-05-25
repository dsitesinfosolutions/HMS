import { mockAppointments } from '../../data/mock';
import type { Appointment } from '../../types';
import { Video, MapPin } from 'lucide-react';

interface AppointmentStatusProps {
  darkMode: boolean;
}

const statusStyle: Record<Appointment['status'], { bg: string; text: string; darkBg: string; darkText: string }> = {
  Confirmed: { bg: '#dbeafe', text: '#1d4ed8', darkBg: '#1e3a5f', darkText: '#93c5fd' },
  Pending: { bg: '#fef9c3', text: '#a16207', darkBg: '#3d2c00', darkText: '#fde047' },
  Cancelled: { bg: '#fee2e2', text: '#b91c1c', darkBg: '#3b0000', darkText: '#fca5a5' },
  Completed: { bg: '#dcfce7', text: '#15803d', darkBg: '#052e16', darkText: '#86efac' },
};

export default function AppointmentStatus({ darkMode }: AppointmentStatusProps) {
  return (
    <div style={{
      background: darkMode ? '#1e293b' : 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)',
      border: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Today's Appointments</h3>
        <button style={{ fontSize: '12px', color: '#0ea5e9', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
          + New
        </button>
      </div>

      {/* Summary pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
        {(['Confirmed', 'Pending', 'Completed', 'Cancelled'] as Appointment['status'][]).map(s => {
          const count = mockAppointments.filter(a => a.status === s).length;
          const st = statusStyle[s];
          return (
            <div key={s} style={{
              padding: '4px 10px',
              borderRadius: '20px',
              background: darkMode ? st.darkBg : st.bg,
              color: darkMode ? st.darkText : st.text,
              fontSize: '11px',
              fontWeight: 600,
            }}>
              {count} {s}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {mockAppointments.map((a) => {
          const st = statusStyle[a.status];
          return (
            <div key={a.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '10px',
              background: darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
              border: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid #f1f5f9',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc';
            }}
            >
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#64748b',
                width: '56px',
                flexShrink: 0,
              }}>{a.time}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: darkMode ? '#e2e8f0' : '#1e293b', marginBottom: '2px' }}>{a.patient}</div>
                <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {a.doctor} · {a.department}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: a.type === 'Online' ? '#14b8a6' : '#94a3b8' }}>
                  {a.type === 'Online' ? <Video size={13} /> : <MapPin size={13} />}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '20px',
                  background: darkMode ? st.darkBg : st.bg,
                  color: darkMode ? st.darkText : st.text,
                }}>{a.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
