import { AlertTriangle, Package, Plus, Search } from 'lucide-react';

interface PharmacyProps {
  darkMode: boolean;
}

const medicines = [
  { id: 'MED-001', name: 'Paracetamol 500mg', category: 'Analgesic', stock: 45, min: 100, price: 2.5, expiry: '2026-08', supplier: 'Sun Pharma', status: 'Low' },
  { id: 'MED-002', name: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 320, min: 50, price: 8.0, expiry: '2027-03', supplier: 'Cipla', status: 'Good' },
  { id: 'MED-003', name: 'Metformin 500mg', category: 'Antidiabetic', stock: 210, min: 80, price: 3.2, expiry: '2026-12', supplier: 'Dr. Reddy\'s', status: 'Good' },
  { id: 'MED-004', name: 'Atorvastatin 10mg', category: 'Statin', stock: 18, min: 50, price: 12.5, expiry: '2026-06', supplier: 'Lupin', status: 'Critical' },
  { id: 'MED-005', name: 'Omeprazole 20mg', category: 'PPI', stock: 140, min: 60, price: 5.8, expiry: '2027-01', supplier: 'Zydus', status: 'Good' },
  { id: 'MED-006', name: 'Amlodipine 5mg', category: 'CCB', stock: 88, min: 70, price: 6.4, expiry: '2026-09', supplier: 'Sun Pharma', status: 'Good' },
  { id: 'MED-007', name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 12, min: 60, price: 4.5, expiry: '2026-07', supplier: 'Cipla', status: 'Critical' },
];

export default function Pharmacy({ darkMode }: PharmacyProps) {
  const bg = darkMode ? '#1e293b' : 'white';
  const border = darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)';
  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = '#64748b';
  const shadow = darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)';

  const alerts = medicines.filter(m => m.status !== 'Good');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: textPrimary }}>Pharmacy</h2>
          <p style={{ margin: '6px 0 0', color: textSecondary, fontSize: '14px' }}>Medicine inventory, billing and supplier management</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={primaryBtn}><Plus size={15} /> Add Medicine</button>
        </div>
      </div>

      {/* Alert banner */}
      {alerts.length > 0 && (
        <div style={{
          background: darkMode ? '#1c0a00' : '#fff7ed',
          border: `1px solid ${darkMode ? 'rgba(251,146,60,0.3)' : '#fed7aa'}`,
          borderRadius: '12px', padding: '14px 18px',
          display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px',
        }}>
          <AlertTriangle size={16} color="#f97316" />
          <span style={{ fontSize: '13px', fontWeight: 600, color: darkMode ? '#fb923c' : '#c2410c' }}>
            {alerts.filter(a => a.status === 'Critical').length} critical & {alerts.filter(a => a.status === 'Low').length} low stock items — Reorder required
          </span>
          <button style={{ marginLeft: 'auto', padding: '5px 14px', borderRadius: '8px', background: '#f9731620', border: '1px solid #f9731640', color: '#f97316', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            Order Now
          </button>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        {[
          { label: 'Total Medicines', value: '847', color: '#0ea5e9' },
          { label: 'Sales Today', value: '₹42,350', color: '#10b981' },
          { label: 'Low Stock', value: `${alerts.length}`, color: '#f59e0b' },
          { label: 'Expiring Soon', value: '12', color: '#ef4444' },
        ].map(s => (
          <div key={s.label} style={{ background: bg, borderRadius: '14px', padding: '18px', border, boxShadow: shadow }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: textSecondary, marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', zIndex: 1 }} />
        <input placeholder="Search medicines by name, category..." style={{
          width: '100%', paddingLeft: '36px', paddingRight: '16px', height: '42px',
          borderRadius: '10px', border: darkMode ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid #e2e8f0',
          background: darkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc',
          color: textPrimary, fontSize: '13px', outline: 'none', boxSizing: 'border-box',
        }} />
      </div>

      {/* Table */}
      <div style={{ background: bg, borderRadius: '16px', border, boxShadow: shadow, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: darkMode ? 'rgba(255,255,255,0.02)' : '#fafbfc' }}>
              {['Medicine', 'Category', 'Stock', 'Min Level', 'Unit Price', 'Expiry', 'Supplier', 'Status'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {medicines.map(m => {
              const pct = Math.min((m.stock / m.min) * 100, 200);
              const statusColor = m.status === 'Critical' ? { bg: '#fee2e2', text: '#dc2626', darkBg: '#3b0000', darkText: '#fca5a5' }
                : m.status === 'Low' ? { bg: '#fef9c3', text: '#a16207', darkBg: '#3d2c00', darkText: '#fde047' }
                : { bg: '#dcfce7', text: '#15803d', darkBg: '#052e16', darkText: '#86efac' };
              return (
                <tr key={m.id} style={{ borderTop: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid #f8fafc', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0ea5e915', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9' }}>
                        <Package size={14} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>{m.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: textSecondary }}>{m.category}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: m.status === 'Good' ? textPrimary : (m.status === 'Critical' ? '#ef4444' : '#f59e0b'), marginBottom: '4px' }}>{m.stock}</div>
                    <div style={{ width: '70px', height: '4px', borderRadius: '20px', background: darkMode ? '#334155' : '#f1f5f9', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, borderRadius: '20px', background: m.status === 'Critical' ? '#ef4444' : m.status === 'Low' ? '#f59e0b' : '#10b981' }} />
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: textSecondary }}>{m.min}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: textPrimary }}>₹{m.price}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: textSecondary }}>{m.expiry}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: textSecondary }}>{m.supplier}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px',
                      background: darkMode ? statusColor.darkBg : statusColor.bg,
                      color: darkMode ? statusColor.darkText : statusColor.text,
                    }}>{m.status === 'Good' ? 'In Stock' : m.status}</span>
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
