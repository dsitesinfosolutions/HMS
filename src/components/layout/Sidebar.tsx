import { useState } from "react";
import type { ModuleKey } from "../../types";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Stethoscope,
  BedDouble,
  Receipt,
  Pill,
  FlaskConical,
  Scan,
  Package,
  UserCog,
  Ambulance,
  BarChart3,
  Video,
  Settings,
  ChevronLeft,
  ChevronRight,
  Heart,
  ChevronDown,
} from "lucide-react";

interface NavItem {
  key: ModuleKey;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const navItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { key: "patients", label: "Patients", icon: <Users size={18} />, badge: 248 },
  {
    key: "appointments",
    label: "Appointments",
    icon: <CalendarDays size={18} />,
    badge: 12,
  },
  { key: "doctors", label: "Doctors", icon: <Stethoscope size={18} /> },
  { key: "op-ip", label: "OP / IP Management", icon: <BedDouble size={18} /> },
  { key: "billing", label: "Billing", icon: <Receipt size={18} /> },
  { key: "pharmacy", label: "Pharmacy", icon: <Pill size={18} />, badge: 3 },
  {
    key: "laboratory",
    label: "Laboratory",
    icon: <FlaskConical size={18} />,
    badge: 7,
  },
  { key: "radiology", label: "Radiology", icon: <Scan size={18} /> },
  { key: "inventory", label: "Inventory", icon: <Package size={18} /> },
  { key: "staff", label: "Staff & HR", icon: <UserCog size={18} /> },
  { key: "ambulance", label: "Ambulance", icon: <Ambulance size={18} /> },
  {
    key: "reports",
    label: "Reports & Analytics",
    icon: <BarChart3 size={18} />,
  },
  { key: "telemedicine", label: "Telemedicine", icon: <Video size={18} /> },
  { key: "settings", label: "Settings", icon: <Settings size={18} /> },
];

interface SidebarProps {
  activeModule: ModuleKey;
  onModuleChange: (key: ModuleKey) => void;
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  mobileOpen?: boolean;
}

export default function Sidebar({
  activeModule,
  onModuleChange,
  collapsed,
  onToggle,
  isMobile = false,
  mobileOpen = false,
}: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<ModuleKey | null>(null);

  // Determine sidebar position and visibility
  const sidebarWidth = isMobile ? (mobileOpen ? 260 : 0) : collapsed ? 72 : 260;
  const shouldShow = isMobile ? mobileOpen : true;

  return (
    <aside
      className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}
      style={{
        width: isMobile ? "260px" : collapsed ? "72px" : "260px",
        transform: isMobile
          ? mobileOpen
            ? "translateX(0)"
            : "translateX(-100%)"
          : "translateX(0)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "16px 14px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          minHeight: isMobile ? "56px" : "72px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(14,165,233,0.4)",
          }}
        >
          <Heart size={20} color="white" fill="white" />
        </div>
        <div style={{ overflow: "hidden", whiteSpace: "nowrap", flex: 1 }}>
          <div
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: isMobile ? "14px" : "15px",
              lineHeight: 1.2,
            }}
          >
            MediCore HMS
          </div>
          <div style={{ color: "#64748b", fontSize: "10px", marginTop: "2px" }}>
            Multi-Speciality Hospital
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "12px 8px",
        }}
      >
        <div
          style={{
            color: "#475569",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "8px 8px 4px",
          }}
        >
          Main Menu
        </div>
        {navItems.map((item) => {
          const isActive = activeModule === item.key;
          const isHovered = hoveredItem === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onModuleChange(item.key)}
              onMouseEnter={() => setHoveredItem(item.key)}
              onMouseLeave={() => setHoveredItem(null)}
              title={isActive ? item.label : undefined}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                justifyContent: "flex-start",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                marginBottom: "2px",
                position: "relative",
                transition: "all 0.2s ease",
                background: isActive
                  ? "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(20,184,166,0.15))"
                  : isHovered
                    ? "rgba(255,255,255,0.05)"
                    : "transparent",
                color: isActive ? "#38bdf8" : "#94a3b8",
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "3px",
                    height: "24px",
                    borderRadius: "0 4px 4px 0",
                    background: "linear-gradient(180deg, #0ea5e9, #14b8a6)",
                  }}
                />
              )}
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              <span
                style={{
                  fontSize: "13.5px",
                  fontWeight: isActive ? 600 : 400,
                  whiteSpace: "nowrap",
                  flex: 1,
                  textAlign: "left",
                }}
              >
                {item.label}
              </span>
              {item.badge && (
                <span
                  style={{
                    background: isActive
                      ? "rgba(14,165,233,0.3)"
                      : "rgba(255,255,255,0.1)",
                    color: isActive ? "#38bdf8" : "#64748b",
                    fontSize: "10px",
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: "20px",
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User + collapse */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 700,
            color: "white",
            flexShrink: 0,
          }}
        >
          AD
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div
            style={{
              color: "#e2e8f0",
              fontSize: "13px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Admin User
          </div>
          <div style={{ color: "#475569", fontSize: "11px" }}>Super Admin</div>
        </div>
        <ChevronDown size={14} color="#475569" />
      </div>

      {/* Toggle button - only show on desktop */}
      {!isMobile && (
        <button
          onClick={onToggle}
          style={{
            position: "absolute",
            right: "-12px",
            top: "82px",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "#0ea5e9",
            border: "2px solid #0f172a",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 60,
            transition: "all 0.2s",
            boxShadow: "0 2px 8px rgba(14,165,233,0.4)",
          }}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      )}
    </aside>
  );
}
