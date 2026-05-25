import { useState, useEffect } from "react";
import type { ModuleKey } from "./types";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import Billing from "./pages/Billing";
import Pharmacy from "./pages/Pharmacy";
import Laboratory from "./pages/Laboratory";
import Reports from "./pages/Reports";
import GenericModule from "./pages/GenericModule";

const pageTitles: Record<ModuleKey, string> = {
  dashboard: "Dashboard",
  patients: "Patient Management",
  appointments: "Appointments",
  doctors: "Doctors",
  "op-ip": "OP / IP Management",
  billing: "Billing & Payments",
  pharmacy: "Pharmacy",
  laboratory: "Laboratory",
  radiology: "Radiology",
  inventory: "Inventory",
  staff: "Staff & HR",
  ambulance: "Ambulance",
  reports: "Reports & Analytics",
  telemedicine: "Telemedicine",
  settings: "Settings",
};

function renderModule(key: ModuleKey, darkMode: boolean) {
  switch (key) {
    case "dashboard":
      return <Dashboard darkMode={darkMode} />;
    case "patients":
      return <Patients darkMode={darkMode} />;
    case "appointments":
      return <Appointments darkMode={darkMode} />;
    case "doctors":
      return <Doctors darkMode={darkMode} />;
    case "billing":
      return <Billing darkMode={darkMode} />;
    case "pharmacy":
      return <Pharmacy darkMode={darkMode} />;
    case "laboratory":
      return <Laboratory darkMode={darkMode} />;
    case "reports":
      return <Reports darkMode={darkMode} />;
    default:
      return <GenericModule moduleKey={key} darkMode={darkMode} />;
  }
}

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleKey>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarCollapsed]);

  const sidebarWidth = isMobile
    ? sidebarOpen
      ? 260
      : 0
    : sidebarCollapsed
      ? 72
      : 260;
  const contentPadding = isMobile ? "16px" : "28px";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode ? "#0f172a" : "#f1f5f9",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        transition: "background 0.3s ease",
      }}
    >
      <Sidebar
        activeModule={activeModule}
        onModuleChange={(module) => {
          setActiveModule(module);
          if (isMobile) setSidebarOpen(false);
        }}
        collapsed={sidebarCollapsed}
        onToggle={() => {
          if (isMobile) {
            setSidebarOpen(!sidebarOpen);
          } else {
            setSidebarCollapsed((c) => !c);
          }
        }}
        isMobile={isMobile}
        mobileOpen={sidebarOpen}
      />

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
        />
      )}

      <Navbar
        sidebarWidth={sidebarWidth}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
        pageTitle={pageTitles[activeModule]}
        isMobile={isMobile}
        onMenuToggle={() => {
          if (isMobile) {
            setSidebarOpen(!sidebarOpen);
          } else {
            setSidebarCollapsed((c) => !c);
          }
        }}
      />

      <main
        style={{
          marginLeft: `${sidebarWidth}px`,
          marginTop: isMobile ? "56px" : "64px",
          padding: contentPadding,
          minHeight: `calc(100vh - ${isMobile ? "56px" : "64px"})`,
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowX: "hidden",
        }}
      >
        {renderModule(activeModule, darkMode)}
      </main>
    </div>
  );
}
