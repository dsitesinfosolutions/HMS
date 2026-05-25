import { mockPatients } from "../../data/mock";
import type { Patient } from "../../types";

interface RecentPatientsProps {
  darkMode: boolean;
}

const statusColors: Record<Patient["status"], { bg: string; text: string }> = {
  OP: { bg: "#dbeafe", text: "#1d4ed8" },
  IP: { bg: "#dcfce7", text: "#15803d" },
  Emergency: { bg: "#fee2e2", text: "#dc2626" },
};

export default function RecentPatients({ darkMode }: RecentPatientsProps) {
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
        <h3
          style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: 700,
            color: darkMode ? "#f1f5f9" : "#0f172a",
          }}
        >
          Recent Patients
        </h3>
        <button
          style={{
            fontSize: "11px",
            color: "#0ea5e9",
            fontWeight: 600,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "3px 6px",
            borderRadius: "4px",
          }}
        >
          View all
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        {mockPatients.map((p) => {
          const sc = darkMode
            ? {
                bg:
                  p.status === "Emergency"
                    ? "#450a0a"
                    : p.status === "IP"
                      ? "#052e16"
                      : "#1e3a5f",
                text:
                  p.status === "Emergency"
                    ? "#fca5a5"
                    : p.status === "IP"
                      ? "#86efac"
                      : "#93c5fd",
              }
            : statusColors[p.status];
          return (
            <div
              key={p.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = darkMode
                  ? "rgba(255,255,255,0.04)"
                  : "#f8fafc")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "transparent")
              }
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {p.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: darkMode ? "#e2e8f0" : "#1e293b",
                    marginBottom: "1px",
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#64748b",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.id}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: "16px",
                    background: sc.bg,
                    color: sc.text,
                    display: "block",
                    marginBottom: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.status}
                </span>
                <span style={{ fontSize: "9px", color: "#94a3b8" }}>
                  {p.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
