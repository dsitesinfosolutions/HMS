import { FlaskConical, Download, Upload, Clock, CheckCircle, Plus } from 'lucide-react';

interface LaboratoryProps {
  darkMode: boolean;
}

const tests = [
  { id: 'LAB-001', patient: 'Arjun Mehta', test: 'Complete Blood Count', ordered: '09:00 AM', collected: '09:30 AM', status: 'Completed', result: 'Normal', doctor: 'Dr. Sharma' },
  { id: 'LAB-002', patient: 'Sneha Reddy', test: 'HbA1c', ordered: '09:15 AM', collected: '09:45 AM', status: 'Processing', result: '—', doctor: 'Dr. Raj Kumar' },
  { id: 'LAB-003', patient: 'Vikram Singh', test: 'Troponin I', ordered: '08:45 AM', collected: '09:00 AM', status: 'Urgent', result: 'High', doctor: 'Dr. Anita Bose' },
  { id: 'LAB-004', patient: 'Kavitha Nair', test: 'Lipid Profile', ordered: '10:00 AM', collected: '—', status: 'Pending Sample', result: '—', doctor: 'Dr. Menon' },
  { id: 'LAB-005', patient: 'Rahul Gupta', test: 'X-Ray Report', ordered: '11:00 AM', collected: '11:20 AM', status: 'Completed', result: 'Fracture R', doctor: 'Dr. Sharma' },
  { id: 'LAB-006', patient: 'Meena Iyer', test: 'Thyroid Panel', ordered: '11:30 AM', collected: '12:00 PM', status: 'Processing', result: '—', doctor: 'Dr. Raj Kumar' },
];

const statusMap = {
  Completed: { bg: '#dcfce7', text: '#15803d', darkBg: '#052e16', darkText: '#86efac', icon: <CheckCircle size={12} /> },
  Processing: { bg: '#dbeafe', text: '#1d4ed8', darkBg: '#1e3a5f', darkText: '#93c5fd', icon: <Clock size={12} /> },
  Urgent: { bg: '#fee2e2', text: '#dc2626', darkBg: '#450a0a', darkText: '#fca5a5', icon: <Clock size={12} /> },
  'Pending Sample': { bg: '#fef9c3', text: '#a16207', darkBg: '#3d2c00', darkText: '#fde047', icon: <Clock size={12} /> },
} as const;

export default function Laboratory({ darkMode }: LaboratoryProps) {
  const bg = darkMode ? '#1e293b' : 'white';
  const border = darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)';
  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = '#64748b';
  const shadow = darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: textPrimary }}>Laboratory</h2>
          <p style={{ margin: '6px 0 0', color: textSecondary, fontSize: '14px' }}>Track tests, samples, and lab reports</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={outlineBtn(darkMode)}><Upload size={15} /> Upload Report</button>
          <button style={primaryBtn}><Plus size={15} /> New Test</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        {[
          { label: 'Tests Today', value: '87', color: '#0ea5e9' },
          { label: 'Completed', value: '66', color: '#10b981' },
          { label: 'Pending', value: '21', color: '#f59e0b' },
          { label: 'Urgent', value: '4', color: '#ef4444' },
        ].map(s => (
          <div key={s.label} style={{ background: bg, borderRadius: '14px', padding: '18px', border, boxShadow: shadow }}>
            <div style={{ fontSize: '26px', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: textSecondary, marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Sample tracking pipeline */}
      <div style={{ background: bg, borderRadius: '16px', padding: '20px 24px', border, boxShadow: shadow, marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 18px', fontSize: '14px', fontWeight: 700, color: textPrimary }}>Sample Tracking Pipeline</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[
            { label: 'Test Ordered', count: 87, color: '#0ea5e9' },
            { label: 'Sample Collected', count: 83, color: '#14b8a6' },
            { label: 'In Processing', count: 21, color: '#f59e0b' },
            { label: 'Reports Ready', count: 66, color: '#10b981' },
            { label: 'Delivered', count: 58, color: '#6366f1' },
          ].map((stage, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%', margin: '0 auto 8px',
                background: `${stage.color}20`, border: `2px solid ${stage.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 800, color: stage.color,
              }}>{stage.count}</div>
              <div style={{ fontSize: '10px', color: textSecondary, fontWeight: 500 }}>{stage.label}</div>
              {i < 4 && (
                <div style={{
                  position: 'absolute', top: '22px', right: '-8px',
                  width: '16px', height: '2px',
                  background: darkMode ? '#334155' : '#e2e8f0',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tests table */}
      <div style={{ background: bg, borderRadius: '16px', border, boxShadow: shadow, overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textPrimary }}>Today's Tests</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: darkMode ? 'rgba(255,255,255,0.02)' : '#fafbfc' }}>
              {['Test ID', 'Patient', 'Test Name', 'Ordered', 'Collected', 'Doctor', 'Status', 'Result', 'Actions'].map(h => (
                <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: '10px', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tests.map(t => {
              const sm = statusMap[t.status as keyof typeof statusMap];
              return (
                <tr key={t.id} style={{ borderTop: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid #f8fafc', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 14px', fontSize: '11px', color: '#0ea5e9', fontWeight: 600 }}>{t.id}</td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 600, color: textPrimary }}>{t.patient}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <FlaskConical size={13} color="#0ea5e9" />
                      <span style={{ fontSize: '12px', color: textPrimary }}>{t.test}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '11px', color: textSecondary }}>{t.ordered}</td>
                  <td style={{ padding: '12px 14px', fontSize: '11px', color: textSecondary }}>{t.collected}</td>
                  <td style={{ padding: '12px 14px', fontSize: '11px', color: textSecondary }}>{t.doctor}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      fontSize: '10px', fontWeight: 600, padding: '3px 8px', borderRadius: '20px',
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      background: darkMode ? sm.darkBg : sm.bg, color: darkMode ? sm.darkText : sm.text,
                    }}>
                      {sm.icon}{t.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 600, color: t.result === 'Normal' ? '#10b981' : t.result !== '—' ? '#ef4444' : textSecondary }}>{t.result}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {t.status === 'Completed' && <button style={{ padding: '4px 8px', borderRadius: '6px', background: '#0ea5e915', border: '1px solid #0ea5e930', color: '#0ea5e9', fontSize: '10px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}><Download size={10} />PDF</button>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

function outlineBtn(darkMode: boolean): React.CSSProperties {
  return {
    padding: '9px 18px', borderRadius: '10px',
    border: darkMode ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #e2e8f0',
    background: 'transparent', color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: '13px', fontWeight: 500, cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '6px',
  };
}
