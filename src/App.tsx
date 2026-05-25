import { useState } from 'react';
import type { ModuleKey } from './types';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Doctors from './pages/Doctors';
import Billing from './pages/Billing';
import Pharmacy from './pages/Pharmacy';
import Laboratory from './pages/Laboratory';
import Reports from './pages/Reports';
import GenericModule from './pages/GenericModule';

const pageTitles: Record<ModuleKey, string> = {
  dashboard: 'Dashboard',
  patients: 'Patient Management',
  appointments: 'Appointments',
  doctors: 'Doctors',
  'op-ip': 'OP / IP Management',
  billing: 'Billing & Payments',
  pharmacy: 'Pharmacy',
  laboratory: 'Laboratory',
  radiology: 'Radiology',
  inventory: 'Inventory',
  staff: 'Staff & HR',
  ambulance: 'Ambulance',
  reports: 'Reports & Analytics',
  telemedicine: 'Telemedicine',
  settings: 'Settings',
};

function renderModule(key: ModuleKey, darkMode: boolean) {
  switch (key) {
    case 'dashboard': return <Dashboard darkMode={darkMode} />;
    case 'patients': return <Patients darkMode={darkMode} />;
    case 'appointments': return <Appointments darkMode={darkMode} />;
    case 'doctors': return <Doctors darkMode={darkMode} />;
    case 'billing': return <Billing darkMode={darkMode} />;
    case 'pharmacy': return <Pharmacy darkMode={darkMode} />;
    case 'laboratory': return <Laboratory darkMode={darkMode} />;
    case 'reports': return <Reports darkMode={darkMode} />;
    default: return <GenericModule moduleKey={key} darkMode={darkMode} />;
  }
}

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleKey>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const sidebarWidth = sidebarCollapsed ? 72 : 260;

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode ? '#0f172a' : '#f1f5f9',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      transition: 'background 0.3s ease',
    }}>
      <Sidebar
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
      />

      <Navbar
        sidebarWidth={sidebarWidth}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
        pageTitle={pageTitles[activeModule]}
      />

      <main style={{
        marginLeft: `${sidebarWidth}px`,
        marginTop: '64px',
        padding: '28px',
        minHeight: 'calc(100vh - 64px)',
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {renderModule(activeModule, darkMode)}
      </main>
    </div>
  );
}
