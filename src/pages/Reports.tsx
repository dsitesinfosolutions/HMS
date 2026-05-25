import { departmentStats, revenueData } from '../data/mock';
import { TrendingUp, TrendingDown, BarChart3, Download } from 'lucide-react';

interface ReportsProps {
  darkMode: boolean;
}

export default function Reports({ darkMode }: ReportsProps) {
  const bg = darkMode ? '#1e293b' : 'white';
  const border = darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)';
  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = '#64748b';
  const shadow = darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)';

  const kpis = [
    { label: 'Avg Consultation Time', value: '18 min', trend: -5, positive: true, sub: 'Down from 19 min' },
    { label: 'Patient Satisfaction', value: '94.2%', trend: 2.1, positive: true, sub: 'NPS Score: 72' },
    { label: 'Bed Turnover Rate', value: '4.8/day', trend: 8, positive: true, sub: 'Above target' },
    { label: 'Revenue per Patient', value: '₹4,820', trend: 12, positive: true, sub: 'Gross average' },
    { label: 'Staff Utilization', value: '87%', trend: -3, positive: false, sub: 'Below target' },
    { label: 'Readmission Rate', value: '3.2%', trend: -1.5, positive: true, sub: 'Within norm' },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
  const maxDept = Math.max(...departmentStats.map(d => d.patients));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: textPrimary }}>Reports & Analytics</h2>
          <p style={{ margin: '6px 0 0', color: textSecondary, fontSize: '14px' }}>Hospital KPIs, revenue trends and performance metrics</p>
        </div>
        <button style={primaryBtn}><Download size={15} /> Export Report</button>
      </div>

      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: bg, borderRadius: '14px', padding: '18px 20px', border, boxShadow: shadow }}>
            <div style={{ fontSize: '11px', color: textSecondary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>{k.label}</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: textPrimary, marginBottom: '8px' }}>{k.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: textSecondary }}>{k.sub}</span>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '20px',
                background: k.positive ? '#dcfce7' : '#fee2e2',
                color: k.positive ? '#15803d' : '#dc2626',
                fontSize: '11px', fontWeight: 600,
              }}>
                {k.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {Math.abs(k.trend)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Revenue chart */}
        <div style={{ background: bg, borderRadius: '16px', padding: '24px', border, boxShadow: shadow }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textPrimary }}>Monthly Revenue Trend</h3>
            <BarChart3 size={18} color="#0ea5e9" />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '180px' }}>
            {revenueData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '3px', width: '100%' }}>
                  <div style={{
                    flex: 1, background: 'linear-gradient(180deg, #0ea5e9, #38bdf8)',
                    borderRadius: '6px 6px 3px 3px',
                    height: `${(d.revenue / maxRevenue) * 100}%`, minHeight: '8px',
                  }} />
                  <div style={{
                    flex: 1, background: 'linear-gradient(180deg, #14b8a6, #5eead4)',
                    borderRadius: '6px 6px 3px 3px',
                    height: `${(d.expenses / maxRevenue) * 100}%`, minHeight: '8px',
                  }} />
                </div>
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>{d.month}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#0ea5e9' }} />
              <span style={{ fontSize: '11px', color: textSecondary }}>Revenue</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#14b8a6' }} />
              <span style={{ fontSize: '11px', color: textSecondary }}>Expenses</span>
            </div>
          </div>
        </div>

        {/* Department distribution */}
        <div style={{ background: bg, borderRadius: '16px', padding: '24px', border, boxShadow: shadow }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: 700, color: textPrimary }}>Department Patient Share</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {departmentStats.map(d => (
              <div key={d.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{d.name}</span>
                  <span style={{ fontSize: '12px', color: textSecondary }}>{d.patients} patients</span>
                </div>
                <div style={{ height: '8px', borderRadius: '20px', background: darkMode ? '#334155' : '#f1f5f9', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${(d.patients / maxDept) * 100}%`,
                    borderRadius: '20px', background: d.color, transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        {[
          { title: 'Daily Census Report', date: 'Today', size: '248 KB', icon: '📊' },
          { title: 'Revenue Summary', date: 'Weekly', size: '182 KB', icon: '💰' },
          { title: 'Staff Attendance', date: 'Monthly', size: '94 KB', icon: '👥' },
          { title: 'Pharmacy Sales', date: 'Today', size: '67 KB', icon: '💊' },
          { title: 'Lab TAT Report', date: 'Today', size: '43 KB', icon: '🔬' },
          { title: 'Insurance Claims', date: 'Monthly', size: '218 KB', icon: '📋' },
        ].map(r => (
          <div key={r.title} style={{
            background: bg, borderRadius: '14px', padding: '18px', border, boxShadow: shadow,
            display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = darkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = bg}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#0ea5e915', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              {r.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>{r.title}</div>
              <div style={{ fontSize: '11px', color: textSecondary, marginTop: '2px' }}>{r.date} · {r.size}</div>
            </div>
            <Download size={14} color="#0ea5e9" />
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
