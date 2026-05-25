import { AlertTriangle, Clock, Phone } from "lucide-react";

interface EmergencyPanelProps {
  darkMode: boolean;
}

const cases = [
  {
    id: "E-001",
    patient: "Vikram Singh",
    condition: "Cardiac Arrest",
    time: "08:42 AM",
    severity: "Critical",
    bed: "ICU-3",
  },
  {
    id: "E-002",
    patient: "Ananya Das",
    condition: "Head Trauma",
    time: "09:15 AM",
    severity: "Serious",
    bed: "ER-2",
  },
  {
    id: "E-003",
    patient: "Rajan Pillai",
    condition: "Stroke",
    time: "10:05 AM",
    severity: "Critical",
    bed: "ICU-1",
  },
];

export default function EmergencyPanel({ darkMode }: EmergencyPanelProps) {
  return (
    <div
      style={{
        background: darkMode ? "#1e1014" : "#fff5f5",
        borderRadius: "14px",
        padding: "14px",
        border: `1px solid ${darkMode ? "rgba(239,68,68,0.3)" : "#fecaca"}`,
        boxShadow: darkMode
          ? "0 4px 20px rgba(239,68,68,0.1)"
          : "0 2px 12px rgba(239,68,68,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: "#ef444420",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ef4444",
            flexShrink: 0,
          }}
        >
          <AlertTriangle size={14} />
        </div>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: 700,
              color: "#ef4444",
            }}
          >
            Emergency
          </h3>
          <p style={{ margin: 0, fontSize: "10px", color: "#f87171" }}>
            3 active
          </p>
        </div>
        <div
          style={{
            marginLeft: "auto",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#ef4444",
            boxShadow: "0 0 0 2px rgba(239,68,68,0.3)",
            animation: "pulse 2s infinite",
            flexShrink: 0,
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {cases.map((c) => (
          <div
            key={c.id}
            style={{
              background: darkMode
                ? "rgba(239,68,68,0.08)"
                : "rgba(239,68,68,0.06)",
              borderRadius: "8px",
              padding: "10px",
              borderLeft: `2px solid ${c.severity === "Critical" ? "#ef4444" : "#f97316"}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: darkMode ? "#fca5a5" : "#b91c1c",
                    marginBottom: "2px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.patient}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: darkMode ? "#f87171" : "#dc2626",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.condition}
                </div>
              </div>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: "16px",
                  background:
                    c.severity === "Critical" ? "#ef444430" : "#f9731630",
                  color: c.severity === "Critical" ? "#ef4444" : "#f97316",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {c.severity}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "6px",
                fontSize: "9px",
                color: "#94a3b8",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                <Clock size={9} />
                {c.time}
              </span>
              <span style={{ fontWeight: 600 }}>{c.bed}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          marginTop: "10px",
          padding: "8px",
          borderRadius: "8px",
          background: "#ef444415",
          border: "1px solid #ef444430",
          color: "#ef4444",
          fontSize: "11px",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          transition: "all 0.2s",
        }}
      >
        <Phone size={11} />
        Call Team
      </button>
    </div>
  );
}
