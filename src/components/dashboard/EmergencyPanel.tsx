import { AlertTriangle, Clock, Phone } from 'lucide-react';

interface EmergencyPanelProps {
  darkMode: boolean;
}

const cases = [
  { id: 'E-001', patient: 'Vikram Singh', condition: 'Cardiac Arrest', time: '08:42 AM', severity: 'Critical', bed: 'ICU-3' },
  { id: 'E-002', patient: 'Ananya Das', condition: 'Head Trauma', time: '09:15 AM', severity: 'Serious', bed: 'ER-2' },
  { id: 'E-003', patient: 'Rajan Pillai', condition: 'Stroke', time: '10:05 AM', severity: 'Critical', bed: 'ICU-1' },
];

export default function EmergencyPanel({ darkMode }: EmergencyPanelProps) {
  return (
    <div style={{
      background: darkMode ? '#1e1014' : '#fff5f5',
      borderRadius: '16px',
      padding: '20px',
      border: `1px solid ${darkMode ? 'rgba(239,68,68,0.3)' : '#fecaca'}`,
      boxShadow: darkMode ? '0 4px 20px rgba(239,68,68,0.1)' : '0 2px 12px rgba(239,68,68,0.08)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '10px',
          background: '#ef444420',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ef4444',
        }}>
          <AlertTriangle size={16} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#ef4444' }}>Emergency Cases</h3>
          <p style={{ margin: 0, fontSize: '11px', color: '#f87171' }}>3 active cases</p>
        </div>
        <div style={{
          marginLeft: 'auto',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#ef4444',
          boxShadow: '0 0 0 3px rgba(239,68,68,0.3)',
          animation: 'pulse 2s infinite',
        }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {cases.map((c) => (
          <div key={c.id} style={{
            background: darkMode ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.06)',
            borderRadius: '10px',
            padding: '12px',
            borderLeft: `3px solid ${c.severity === 'Critical' ? '#ef4444' : '#f97316'}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: darkMode ? '#fca5a5' : '#b91c1c', marginBottom: '3px' }}>{c.patient}</div>
                <div style={{ fontSize: '11px', color: darkMode ? '#f87171' : '#dc2626' }}>{c.condition}</div>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '20px',
                background: c.severity === 'Critical' ? '#ef444430' : '#f9731630',
                color: c.severity === 'Critical' ? '#ef4444' : '#f97316',
              }}>{c.severity}</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#94a3b8' }}>
                <Clock size={10} />{c.time}
              </span>
              <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>Bed: {c.bed}</span>
            </div>
          </div>
        ))}
      </div>

      <button style={{
        width: '100%',
        marginTop: '14px',
        padding: '10px',
        borderRadius: '10px',
        background: '#ef444415',
        border: '1px solid #ef444430',
        color: '#ef4444',
        fontSize: '12px',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        transition: 'all 0.2s',
      }}>
        <Phone size={13} />
        Call Emergency Team
      </button>
    </div>
  );
}
