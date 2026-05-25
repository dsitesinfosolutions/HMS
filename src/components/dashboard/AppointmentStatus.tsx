import { mockAppointments } from "../../data/mock";
import type { Appointment } from "../../types";
import { Video, MapPin } from "lucide-react";

interface AppointmentStatusProps {
  darkMode: boolean;
}

const statusStyle: Record<
  Appointment["status"],
  { bg: string; text: string; darkBg: string; darkText: string }
> = {
  Confirmed: {
    bg: "#dbeafe",
    text: "#1d4ed8",
    darkBg: "#1e3a5f",
    darkText: "#93c5fd",
  },
  Pending: {
    bg: "#fef9c3",
    text: "#a16207",
    darkBg: "#3d2c00",
    darkText: "#fde047",
  },
  Cancelled: {
    bg: "#fee2e2",
    text: "#b91c1c",
    darkBg: "#3b0000",
    darkText: "#fca5a5",
  },
  Completed: {
    bg: "#dcfce7",
    text: "#15803d",
    darkBg: "#052e16",
    darkText: "#86efac",
  },
};

export default function AppointmentStatus({
  darkMode,
}: AppointmentStatusProps) {
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
          Today's Appointments
        </h3>
        <button
          style={{
            fontSize: "10px",
            color: "#0ea5e9",
            fontWeight: 600,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px 4px",
          }}
        >
          + New
        </button>
      </div>

      {/* Summary pills */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        {(
          [
            "Confirmed",
            "Pending",
            "Completed",
            "Cancelled",
          ] as Appointment["status"][]
        ).map((s) => {
          const count = mockAppointments.filter((a) => a.status === s).length;
          const st = statusStyle[s];
          return (
            <div
              key={s}
              style={{
                padding: "3px 8px",
                borderRadius: "16px",
                background: darkMode ? st.darkBg : st.bg,
                color: darkMode ? st.darkText : st.text,
                fontSize: "9px",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {count} {s}
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {mockAppointments.slice(0, 5).map((a) => {
          const st = statusStyle[a.status];
          return (
            <div
              key={a.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                borderRadius: "8px",
                background: darkMode ? "rgba(255,255,255,0.03)" : "#f8fafc",
                border: darkMode
                  ? "1px solid rgba(255,255,255,0.04)"
                  : "1px solid #f1f5f9",
                cursor: "pointer",
                transition: "all 0.15s",
                minWidth: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = darkMode
                  ? "rgba(255,255,255,0.06)"
                  : "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = darkMode
                  ? "rgba(255,255,255,0.03)"
                  : "#f8fafc";
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#64748b",
                  width: "48px",
                  flexShrink: 0,
                }}
              >
                {a.time}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: darkMode ? "#e2e8f0" : "#1e293b",
                    marginBottom: "1px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {a.patient}
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
                  {a.doctor}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  flexShrink: 0,
                }}
              >
                {a.type === "Online" && (
                  <Video size={11} style={{ color: "#14b8a6" }} />
                )}
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: "12px",
                    background: darkMode ? st.darkBg : st.bg,
                    color: darkMode ? st.darkText : st.text,
                    whiteSpace: "nowrap",
                  }}
                >
                  {a.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
