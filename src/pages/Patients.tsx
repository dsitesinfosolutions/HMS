import { useState } from 'react';
import { Search, Plus, Filter, Download, QrCode, FileText, Phone, User } from 'lucide-react';
import { mockPatients } from '../data/mock';
import type { Patient } from '../types';

interface PatientsProps {
  darkMode: boolean;
}

const statusColors: Record<Patient['status'], { bg: string; text: string }> = {
  OP: { bg: '#dbeafe', text: '#1d4ed8' },
  IP: { bg: '#dcfce7', text: '#15803d' },
  Emergency: { bg: '#fee2e2', text: '#dc2626' },
};

export default function Patients({ darkMode }: PatientsProps) {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<Patient | null>(null);

  const filtered = mockPatients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.condition.toLowerCase().includes(search.toLowerCase())
  );

  const bg = darkMode ? '#1e293b' : 'white';
  const border = darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)';
  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = '#64748b';
  const shadow = darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)';

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: textPrimary }}>Patient Management</h2>
          <p style={{ margin: '6px 0 0', color: textSecondary, fontSize: '14px' }}>Manage all registered patients</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={outlineBtn(darkMode)}>
            <Download size={15} /> Export
          </button>
          <button onClick={() => setShowForm(true)} style={primaryBtn}>
            <Plus size={15} /> New Patient
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', zIndex: 1 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, ID, condition..."
            style={searchInput(darkMode)}
          />
        </div>
        <button style={outlineBtn(darkMode)}><Filter size={15} /> Filter</button>
        {['All', 'OP', 'IP', 'Emergency'].map(f => (
          <button key={f} style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1.5px solid',
            borderColor: f === 'All' ? '#0ea5e9' : (darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
            background: f === 'All' ? '#0ea5e920' : 'transparent',
            color: f === 'All' ? '#0ea5e9' : textSecondary,
            fontSize: '13px',
            fontWeight: f === 'All' ? 600 : 400,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}>{f}</button>
        ))}
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { label: 'Total Patients', value: '1,248', color: '#0ea5e9' },
          { label: 'OP Today', value: '184', color: '#14b8a6' },
          { label: 'IP Admitted', value: '64', color: '#6366f1' },
          { label: 'Emergency', value: '3', color: '#ef4444' },
        ].map(s => (
          <div key={s.label} style={{ background: bg, borderRadius: '12px', padding: '16px', border, boxShadow: shadow }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: textSecondary, marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: bg, borderRadius: '16px', border, boxShadow: shadow, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f1f5f9' }}>
              {['Patient', 'ID', 'Age/Gender', 'Condition', 'Doctor', 'Status', 'Time', 'Actions'].map(h => (
                <th key={h} style={{
                  padding: '14px 16px',
                  textAlign: 'left',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  background: darkMode ? 'rgba(255,255,255,0.02)' : '#fafbfc',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => {
              const sc = darkMode
                ? { bg: p.status === 'Emergency' ? '#450a0a' : p.status === 'IP' ? '#052e16' : '#1e3a5f', text: p.status === 'Emergency' ? '#fca5a5' : p.status === 'IP' ? '#86efac' : '#93c5fd' }
                : statusColors[p.status];
              return (
                <tr
                  key={p.id}
                  style={{
                    borderBottom: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid #f8fafc',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                    background: i % 2 === 0 ? 'transparent' : (darkMode ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)'),
                  }}
                  onClick={() => setSelected(p)}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = darkMode ? 'rgba(255,255,255,0.04)' : '#f8fafc'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? 'transparent' : (darkMode ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)')}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '34px', height: '34px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0ea5e9, #14b8a6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: 700, color: 'white', flexShrink: 0,
                      }}>{p.avatar}</div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: '#0ea5e9', fontWeight: 600 }}>{p.id}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: textSecondary }}>{p.age}y / {p.gender}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: textPrimary }}>{p.condition}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: textSecondary }}>{p.doctor}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: sc.bg, color: sc.text }}>{p.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: textSecondary }}>{p.time}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <ActionBtn icon={<User size={13} />} color="#0ea5e9" darkMode={darkMode} title="View" />
                      <ActionBtn icon={<QrCode size={13} />} color="#14b8a6" darkMode={darkMode} title="QR" />
                      <ActionBtn icon={<FileText size={13} />} color="#f59e0b" darkMode={darkMode} title="Records" />
                      <ActionBtn icon={<Phone size={13} />} color="#10b981" darkMode={darkMode} title="Call" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Patient detail modal */}
      {selected && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)',
        }} onClick={() => setSelected(null)}>
          <div style={{
            background: darkMode ? '#1e293b' : 'white', borderRadius: '20px', padding: '32px', width: '480px', maxWidth: '90vw',
            boxShadow: '0 40px 80px rgba(0,0,0,0.3)', animation: 'scaleIn 0.2s ease',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: textPrimary }}>Patient Profile</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: textSecondary }}>×</button>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: 'white' }}>{selected.avatar}</div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: textPrimary }}>{selected.name}</div>
                <div style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '13px' }}>{selected.id}</div>
              </div>
            </div>
            {[
              ['Age / Gender', `${selected.age} yrs / ${selected.gender}`],
              ['Phone', selected.phone],
              ['Condition', selected.condition],
              ['Assigned Doctor', selected.doctor],
              ['Status', selected.status],
              ['Scheduled Time', selected.time],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '13px', color: textSecondary }}>{l}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New patient form modal */}
      {showForm && <PatientForm darkMode={darkMode} onClose={() => setShowForm(false)} />}
    </div>
  );
}

function ActionBtn({ icon, color, darkMode, title }: { icon: React.ReactNode; color: string; darkMode: boolean; title?: string }) {
  return (
    <button title={title} style={{
      width: '28px', height: '28px', borderRadius: '7px',
      background: `${color}18`, border: `1px solid ${color}30`,
      color, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s',
    }}>
      {icon}
    </button>
  );
}

function PatientForm({ darkMode, onClose }: { darkMode: boolean; onClose: () => void }) {
  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: '10px',
    border: darkMode ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #e2e8f0',
    background: darkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc',
    color: textPrimary, fontSize: '13px', outline: 'none', boxSizing: 'border-box' as const,
  };
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div style={{ background: darkMode ? '#1e293b' : 'white', borderRadius: '20px', padding: '32px', width: '560px', maxWidth: '90vw', boxShadow: '0 40px 80px rgba(0,0,0,0.3)', animation: 'scaleIn 0.2s ease', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: textPrimary }}>Register New Patient</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}>×</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {[
            ['Full Name', 'text', 'Enter full name'],
            ['Phone Number', 'tel', '+91 xxxxxxxxxx'],
            ['Date of Birth', 'date', ''],
            ['Gender', 'select', ''],
            ['Blood Group', 'select', ''],
            ['Address', 'text', 'City, State'],
            ['Emergency Contact', 'tel', '+91 xxxxxxxxxx'],
            ['Condition / Complaint', 'text', 'Chief complaint'],
          ].map(([label, type]) => (
            <div key={label} style={{ gridColumn: label === 'Condition / Complaint' || label === 'Address' ? 'span 2' : 'span 1' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '6px' }}>{label}</label>
              {type === 'select' ? (
                <select style={inputStyle}>
                  {label === 'Gender' ? ['Male', 'Female', 'Other'].map(o => <option key={o}>{o}</option>) : ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(o => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input type={type} style={inputStyle} />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '24px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={outlineBtn(darkMode)}>Cancel</button>
          <button style={primaryBtn}>Register Patient</button>
        </div>
      </div>
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  padding: '9px 18px', borderRadius: '10px',
  background: 'linear-gradient(135deg, #0ea5e9, #14b8a6)',
  border: 'none', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
  display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s',
};

function outlineBtn(darkMode: boolean): React.CSSProperties {
  return {
    padding: '9px 18px', borderRadius: '10px',
    border: darkMode ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #e2e8f0',
    background: 'transparent', color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: '13px', fontWeight: 500, cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s',
  };
}

function searchInput(darkMode: boolean): React.CSSProperties {
  return {
    width: '100%', paddingLeft: '36px', paddingRight: '16px', height: '40px',
    borderRadius: '10px', border: darkMode ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #e2e8f0',
    background: darkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc',
    color: darkMode ? '#f1f5f9' : '#0f172a', fontSize: '13px', outline: 'none',
  };
}
