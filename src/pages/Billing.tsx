import { Plus, Download, CreditCard, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

interface BillingProps {
  darkMode: boolean;
}

const invoices = [
  { id: 'INV-2001', patient: 'Arjun Mehta', date: '24 May 2026', amount: 4850, gst: 873, total: 5723, status: 'Paid', type: 'OP' },
  { id: 'INV-2002', patient: 'Sneha Reddy', date: '24 May 2026', amount: 28500, gst: 5130, total: 33630, status: 'Pending', type: 'IP' },
  { id: 'INV-2003', patient: 'Vikram Singh', date: '24 May 2026', amount: 72000, gst: 12960, total: 84960, status: 'Insurance', type: 'Emergency' },
  { id: 'INV-2004', patient: 'Kavitha Nair', date: '23 May 2026', amount: 15600, gst: 2808, total: 18408, status: 'Paid', type: 'IP' },
  { id: 'INV-2005', patient: 'Rahul Gupta', date: '23 May 2026', amount: 2200, gst: 396, total: 2596, status: 'Pending', type: 'OP' },
  { id: 'INV-2006', patient: 'Meena Iyer', date: '22 May 2026', amount: 1800, gst: 324, total: 2124, status: 'Cancelled', type: 'OP' },
];

const statusMap = {
  Paid: { icon: <CheckCircle size={13} />, bg: '#dcfce7', text: '#15803d', darkBg: '#052e16', darkText: '#86efac' },
  Pending: { icon: <Clock size={13} />, bg: '#fef9c3', text: '#a16207', darkBg: '#3d2c00', darkText: '#fde047' },
  Insurance: { icon: <CreditCard size={13} />, bg: '#dbeafe', text: '#1d4ed8', darkBg: '#1e3a5f', darkText: '#93c5fd' },
  Cancelled: { icon: <XCircle size={13} />, bg: '#fee2e2', text: '#b91c1c', darkBg: '#3b0000', darkText: '#fca5a5' },
} as const;

export default function Billing({ darkMode }: BillingProps) {
  const bg = darkMode ? '#1e293b' : 'white';
  const border = darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)';
  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = '#64748b';
  const shadow = darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: textPrimary }}>Billing & Payments</h2>
          <p style={{ margin: '6px 0 0', color: textSecondary, fontSize: '14px' }}>GST-compliant invoices and payment management</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={outlineBtn(darkMode)}><Download size={15} /> Export</button>
          <button style={primaryBtn}><Plus size={15} /> New Invoice</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        {[
          { label: 'Total Billed', value: '₹1,47,441', sub: 'Today', color: '#0ea5e9' },
          { label: 'Collected', value: '₹87,777', sub: '59% collection', color: '#10b981' },
          { label: 'Pending', value: '₹36,226', sub: '2 invoices', color: '#f59e0b' },
          { label: 'Insurance', value: '₹84,960', sub: '1 claim active', color: '#6366f1' },
        ].map(s => (
          <div key={s.label} style={{ background: bg, borderRadius: '14px', padding: '18px', border, boxShadow: shadow }}>
            <div style={{ fontSize: '22px', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: textPrimary, marginTop: '4px' }}>{s.label}</div>
            <div style={{ fontSize: '11px', color: textSecondary, marginTop: '2px' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Invoice table */}
      <div style={{ background: bg, borderRadius: '16px', border, boxShadow: shadow, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textPrimary }}>Recent Invoices</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Paid', 'Pending', 'Insurance'].map((f, i) => (
              <button key={f} style={{
                padding: '4px 12px', borderRadius: '6px', border: '1.5px solid',
                borderColor: i === 0 ? '#0ea5e9' : (darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
                background: i === 0 ? '#0ea5e920' : 'transparent',
                color: i === 0 ? '#0ea5e9' : textSecondary, fontSize: '11px', fontWeight: i === 0 ? 600 : 400, cursor: 'pointer',
              }}>{f}</button>
            ))}
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: darkMode ? 'rgba(255,255,255,0.02)' : '#fafbfc' }}>
              {['Invoice', 'Patient', 'Date', 'Amount', 'GST (18%)', 'Total', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => {
              const sm = statusMap[inv.status as keyof typeof statusMap];
              return (
                <tr key={inv.id} style={{ borderTop: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid #f8fafc', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <td style={{ padding: '13px 16px', fontSize: '12px', color: '#0ea5e9', fontWeight: 600 }}>{inv.id}</td>
                  <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 600, color: textPrimary }}>{inv.patient}</td>
                  <td style={{ padding: '13px 16px', fontSize: '12px', color: textSecondary }}>{inv.date}</td>
                  <td style={{ padding: '13px 16px', fontSize: '12px', color: textPrimary }}>₹{inv.amount.toLocaleString()}</td>
                  <td style={{ padding: '13px 16px', fontSize: '12px', color: textSecondary }}>₹{inv.gst.toLocaleString()}</td>
                  <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: textPrimary }}>₹{inv.total.toLocaleString()}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px',
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      background: darkMode ? sm.darkBg : sm.bg, color: darkMode ? sm.darkText : sm.text,
                    }}>
                      {sm.icon}{inv.status}
                    </span>
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <ActionBtn icon={<FileText size={12} />} color="#0ea5e9" title="View" />
                      <ActionBtn icon={<Download size={12} />} color="#14b8a6" title="Download" />
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

function ActionBtn({ icon, color, title }: { icon: React.ReactNode; color: string; title?: string }) {
  return (
    <button title={title} style={{ width: '28px', height: '28px', borderRadius: '7px', background: `${color}18`, border: `1px solid ${color}30`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      {icon}
    </button>
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
