import { revenueData } from '../../data/mock';

interface RevenueChartProps {
  darkMode: boolean;
}

export default function RevenueChart({ darkMode }: RevenueChartProps) {
  const max = Math.max(...revenueData.map(d => d.revenue));
  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);

  return (
    <div style={{
      background: darkMode ? '#1e293b' : 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)',
      border: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Revenue Overview</h3>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Jan – Jul 2026</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '22px', fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a' }}>
            ₹{(totalRevenue / 100000).toFixed(1)}L
          </div>
          <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>+12.4% this quarter</div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#0ea5e9' }} />
          <span style={{ fontSize: '12px', color: '#64748b' }}>Revenue</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#14b8a6' }} />
          <span style={{ fontSize: '12px', color: '#64748b' }}>Expenses</span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '160px' }}>
        {revenueData.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '3px', width: '100%' }}>
              <div
                style={{
                  flex: 1,
                  background: 'linear-gradient(180deg, #0ea5e9, #38bdf8)',
                  borderRadius: '6px 6px 3px 3px',
                  height: `${(d.revenue / max) * 100}%`,
                  minHeight: '8px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                title={`Revenue: ₹${(d.revenue/1000).toFixed(0)}K`}
              />
              <div
                style={{
                  flex: 1,
                  background: 'linear-gradient(180deg, #14b8a6, #5eead4)',
                  borderRadius: '6px 6px 3px 3px',
                  height: `${(d.expenses / max) * 100}%`,
                  minHeight: '8px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                title={`Expenses: ₹${(d.expenses/1000).toFixed(0)}K`}
              />
            </div>
            <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>{d.month}</span>
          </div>
        ))}
      </div>

      {/* Y-axis hints */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
        <span style={{ fontSize: '11px', color: '#64748b' }}>Net Profit: ₹{((totalRevenue - revenueData.reduce((s, d) => s + d.expenses, 0)) / 100000).toFixed(1)}L</span>
        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Margin: 35.2%</span>
      </div>
    </div>
  );
}
