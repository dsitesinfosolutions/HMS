import { revenueData } from "../../data/mock";

interface RevenueChartProps {
  darkMode: boolean;
}

export default function RevenueChart({ darkMode }: RevenueChartProps) {
  const max = Math.max(...revenueData.map((d) => d.revenue));
  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);

  return (
    <div
      style={{
        background: darkMode ? "#1e293b" : "white",
        borderRadius: "14px",
        padding: "16px",
        boxShadow: darkMode
          ? "0 4px 20px rgba(0,0,0,0.3)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        border: darkMode
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: 700,
              color: darkMode ? "#f1f5f9" : "#0f172a",
            }}
          >
            Revenue Overview
          </h3>
          <p style={{ margin: "2px 0 0", fontSize: "10px", color: "#64748b" }}>
            Jan – Jul 2026
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 800,
              color: darkMode ? "#f1f5f9" : "#0f172a",
            }}
          >
            ₹{(totalRevenue / 100000).toFixed(1)}L
          </div>
          <div style={{ fontSize: "10px", color: "#10b981", fontWeight: 600 }}>
            +12.4% this quarter
          </div>
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "12px",
          flexWrap: "wrap",
          fontSize: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "2px",
              background: "#0ea5e9",
            }}
          />
          <span style={{ color: "#64748b" }}>Revenue</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "2px",
              background: "#14b8a6",
            }}
          />
          <span style={{ color: "#64748b" }}>Expenses</span>
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "6px",
          height: "120px",
          marginBottom: "8px",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        {revenueData.map((d, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              height: "100%",
              minWidth: "24px",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                gap: "2px",
                width: "100%",
              }}
            >
              <div
                style={{
                  flex: 1,
                  background: "linear-gradient(180deg, #0ea5e9, #38bdf8)",
                  borderRadius: "3px 3px 2px 2px",
                  height: `${(d.revenue / max) * 100}%`,
                  minHeight: "6px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                title={`Revenue: ₹${(d.revenue / 1000).toFixed(0)}K`}
              />
              <div
                style={{
                  flex: 1,
                  background: "linear-gradient(180deg, #14b8a6, #5eead4)",
                  borderRadius: "3px 3px 2px 2px",
                  height: `${(d.expenses / max) * 100}%`,
                  minHeight: "6px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                title={`Expenses: ₹${(d.expenses / 1000).toFixed(0)}K`}
              />
            </div>
            <span
              style={{
                fontSize: "8px",
                color: "#94a3b8",
                fontWeight: 500,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {d.month}
            </span>
          </div>
        ))}
      </div>

      {/* Y-axis hints */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "8px",
          fontSize: "9px",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ color: "#64748b" }}>
          Net Profit: ₹
          {(
            (totalRevenue - revenueData.reduce((s, d) => s + d.expenses, 0)) /
            100000
          ).toFixed(1)}
          L
        </span>
        <span style={{ color: "#10b981", fontWeight: 600 }}>Margin: 35.2%</span>
      </div>
    </div>
  );
}
