import { mockDoctors } from "../../data/mock";
import { Star } from "lucide-react";

interface DoctorAvailabilityProps {
  darkMode: boolean;
}

export default function DoctorAvailability({
  darkMode,
}: DoctorAvailabilityProps) {
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
          marginBottom: "12px",
          flexWrap: "wrap",
          gap: "8px",
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
          Doctor Availability
        </h3>
        <div style={{ display: "flex", gap: "8px", fontSize: "9px" }}>
          <span style={{ color: "#10b981", fontWeight: 600 }}>● Available</span>
          <span style={{ color: "#94a3b8", fontWeight: 600 }}>● Busy</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          maxHeight: "250px",
          overflowY: "auto",
        }}
      >
        {mockDoctors.slice(0, 6).map((doc) => (
          <div
            key={doc.id}
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
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: doc.available
                    ? "linear-gradient(135deg, #10b981, #34d399)"
                    : darkMode
                      ? "#334155"
                      : "#e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: doc.available ? "white" : "#94a3b8",
                }}
              >
                {doc.avatar}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: doc.available ? "#10b981" : "#94a3b8",
                  border: `1.5px solid ${darkMode ? "#1e293b" : "white"}`,
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: darkMode ? "#e2e8f0" : "#1e293b",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {doc.name}
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
                {doc.specialty}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  justifyContent: "flex-end",
                  marginBottom: "1px",
                }}
              >
                <Star size={9} fill="#f59e0b" color="#f59e0b" />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: darkMode ? "#cbd5e1" : "#374151",
                  }}
                >
                  {doc.rating}
                </span>
              </div>
              <div style={{ fontSize: "9px", color: "#94a3b8" }}>
                {doc.patients}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
