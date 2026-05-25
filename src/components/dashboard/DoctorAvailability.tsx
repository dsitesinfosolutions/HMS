import { mockDoctors } from '../../data/mock';
import { Star } from 'lucide-react';

interface DoctorAvailabilityProps {
  darkMode: boolean;
}

export default function DoctorAvailability({ darkMode }: DoctorAvailabilityProps) {
  return (
    <div style={{
      background: darkMode ? '#1e293b' : 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)',
      border: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Doctor Availability</h3>
        <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
          <span style={{ color: '#10b981', fontWeight: 600 }}>● Available</span>
          <span style={{ color: '#94a3b8', fontWeight: 600 }}>● Busy</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {mockDoctors.map((doc) => (
          <div
            key={doc.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = darkMode ? 'rgba(255,255,255,0.04)' : '#f8fafc'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: doc.available
                  ? 'linear-gradient(135deg, #10b981, #34d399)'
                  : darkMode ? '#334155' : '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                color: doc.available ? 'white' : '#94a3b8',
              }}>{doc.avatar}</div>
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: doc.available ? '#10b981' : '#94a3b8',
                border: `2px solid ${darkMode ? '#1e293b' : 'white'}`,
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: darkMode ? '#e2e8f0' : '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doc.name}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>{doc.specialty}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end', marginBottom: '2px' }}>
                <Star size={10} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontSize: '11px', fontWeight: 600, color: darkMode ? '#cbd5e1' : '#374151' }}>{doc.rating}</span>
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>{doc.patients} patients</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
