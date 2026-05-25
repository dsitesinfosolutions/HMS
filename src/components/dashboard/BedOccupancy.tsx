import { bedOccupancy } from "../../data/mock";

interface BedOccupancyProps {
  darkMode: boolean;
}

const colors = ["#0ea5e9", "#14b8a6", "#f59e0b", "#10b981", "#6366f1"];

export default function BedOccupancy({ darkMode }: BedOccupancyProps) {
  const totalBeds = bedOccupancy.reduce((s, b) => s + b.total, 0);
  const totalOccupied = bedOccupancy.reduce((s, b) => s + b.occupied, 0);
  const overallPct = Math.round((totalOccupied / totalBeds) * 100);

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
          alignItems: "center",
          marginBottom: "14px",
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
            Bed Occupancy
          </h3>
          <p style={{ margin: "3px 0 0", fontSize: "11px", color: "#64748b" }}>
            {totalOccupied} / {totalBeds} beds
          </p>
        </div>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: `conic-gradient(#0ea5e9 0% ${overallPct}%, ${darkMode ? "#334155" : "#f1f5f9"} ${overallPct}% 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: darkMode ? "#1e293b" : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{ fontSize: "11px", fontWeight: 800, color: "#0ea5e9" }}
            >
              {overallPct}%
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {bedOccupancy.map((ward, i) => {
          const pct = Math.round((ward.occupied / ward.total) * 100);
          return (
            <div key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: darkMode ? "#cbd5e1" : "#334155",
                  }}
                >
                  {ward.ward}
                </span>
                <span style={{ fontSize: "11px", color: "#64748b" }}>
                  {ward.occupied}/{ward.total}{" "}
                  <span style={{ color: colors[i], fontWeight: 600 }}>
                    {pct}%
                  </span>
                </span>
              </div>
              <div
                style={{
                  height: "6px",
                  borderRadius: "20px",
                  background: darkMode ? "#334155" : "#f1f5f9",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${pct}%`,
                    borderRadius: "20px",
                    background: `linear-gradient(90deg, ${colors[i]}, ${colors[i]}bb)`,
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
