import { Star, Phone, Mail, Calendar, Users, Plus } from 'lucide-react';
import { mockDoctors } from '../data/mock';

interface DoctorsProps {
  darkMode: boolean;
}

export default function Doctors({ darkMode }: DoctorsProps) {
  const bg = darkMode ? '#1e293b' : 'white';
  const border = darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)';
  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = '#64748b';
  const shadow = darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)';

  const departments = ['All', 'Cardiology', 'Endocrinology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Radiology'];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: textPrimary }}>Doctors</h2>
          <p style={{ margin: '6px 0 0', color: textSecondary, fontSize: '14px' }}>Manage medical staff and availability</p>
        </div>
        <button style={primaryBtn}><Plus size={15} /> Add Doctor</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        {[
          { label: 'Total Doctors', value: '48', sub: 'On staff', color: '#0ea5e9' },
          { label: 'Available Now', value: '32', sub: 'On duty', color: '#10b981' },
          { label: 'On Leave', value: '5', sub: 'Today', color: '#f59e0b' },
          { label: 'Departments', value: '12', sub: 'Specialties', color: '#6366f1' },
        ].map(s => (
          <div key={s.label} style={{ background: bg, borderRadius: '14px', padding: '18px', border, boxShadow: shadow }}>
            <div style={{ fontSize: '26px', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: textPrimary, marginTop: '4px' }}>{s.label}</div>
            <div style={{ fontSize: '11px', color: textSecondary, marginTop: '2px' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Department filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {departments.map((d, i) => (
          <button key={d} style={{
            padding: '6px 14px', borderRadius: '20px',
            border: '1.5px solid',
            borderColor: i === 0 ? '#0ea5e9' : (darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
            background: i === 0 ? '#0ea5e920' : 'transparent',
            color: i === 0 ? '#0ea5e9' : textSecondary,
            fontSize: '12px', fontWeight: i === 0 ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s',
          }}>{d}</button>
        ))}
      </div>

      {/* Doctor cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {mockDoctors.map(doc => (
          <div key={doc.id} style={{
            background: bg, borderRadius: '16px', padding: '22px', border, boxShadow: shadow,
            transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
            (e.currentTarget as HTMLElement).style.boxShadow = darkMode ? '0 12px 40px rgba(0,0,0,0.4)' : '0 12px 40px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLElement).style.boxShadow = shadow;
          }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: doc.available
                    ? 'linear-gradient(135deg, #0ea5e9, #14b8a6)'
                    : (darkMode ? '#334155' : '#e2e8f0'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: 800,
                  color: doc.available ? 'white' : '#94a3b8',
                  boxShadow: doc.available ? '0 4px 16px rgba(14,165,233,0.3)' : 'none',
                }}>{doc.avatar}</div>
                <div style={{
                  position: 'absolute', bottom: '2px', right: '2px', width: '12px', height: '12px',
                  borderRadius: '50%', background: doc.available ? '#10b981' : '#94a3b8',
                  border: `2px solid ${darkMode ? '#1e293b' : 'white'}`,
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: textPrimary, marginBottom: '2px' }}>{doc.name}</div>
                <div style={{ fontSize: '12px', color: '#0ea5e9', fontWeight: 600 }}>{doc.specialty}</div>
                <div style={{ fontSize: '11px', color: textSecondary, marginTop: '2px' }}>{doc.id}</div>
              </div>
              <div style={{
                padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                background: doc.available ? (darkMode ? '#052e16' : '#dcfce7') : (darkMode ? '#1c1917' : '#f5f5f4'),
                color: doc.available ? '#10b981' : '#94a3b8',
              }}>
                {doc.available ? 'Available' : 'Busy'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: textPrimary }}>{doc.rating}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: textSecondary }}>
                <Users size={13} />
                <span style={{ fontSize: '12px' }}>{doc.patients} patients today</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                flex: 1, padding: '8px', borderRadius: '8px',
                background: '#0ea5e915', border: '1px solid #0ea5e930',
                color: '#0ea5e9', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
              }}><Calendar size={12} /> Schedule</button>
              <button style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: darkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
                border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                color: textSecondary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Phone size={13} /></button>
              <button style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: darkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
                border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                color: textSecondary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Mail size={13} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  padding: '9px 18px', borderRadius: '10px',
  background: 'linear-gradient(135deg, #0ea5e9, #14b8a6)',
  border: 'none', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
  display: 'flex', alignItems: 'center', gap: '6px',
};
