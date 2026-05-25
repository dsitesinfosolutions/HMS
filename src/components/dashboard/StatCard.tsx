import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  trend?: number;
  darkMode: boolean;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
  trend,
  darkMode,
}: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <div
      style={{
        background: darkMode ? "#1e293b" : "white",
        borderRadius: "14px",
        padding: "14px",
        boxShadow: darkMode
          ? "0 4px 20px rgba(0,0,0,0.3)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        border: darkMode
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.boxShadow = darkMode
          ? "0 8px 30px rgba(0,0,0,0.4)"
          : "0 8px 30px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = darkMode
          ? "0 4px 20px rgba(0,0,0,0.3)"
          : "0 2px 12px rgba(0,0,0,0.06)";
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: `${color}12`,
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "10px",
              color: "#64748b",
              margin: "0 0 6px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: darkMode ? "#f1f5f9" : "#0f172a",
              margin: "0 0 4px",
              lineHeight: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {value}
          </p>
          {subtitle && (
            <p
              style={{
                fontSize: "11px",
                color: "#64748b",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {subtitle}
            </p>
          )}
          {trend !== undefined && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                marginTop: "6px",
                padding: "2px 6px",
                borderRadius: "20px",
                background: isPositive ? "#dcfce7" : "#fee2e2",
                color: isPositive ? "#16a34a" : "#dc2626",
                fontSize: "9px",
                fontWeight: 600,
              }}
            >
              {isPositive ? (
                <TrendingUp size={10} />
              ) : (
                <TrendingDown size={10} />
              )}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: `${color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: color,
            flexShrink: 0,
            fontSize: "18px",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
