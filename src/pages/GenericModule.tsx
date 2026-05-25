import type { ModuleKey } from '../types';

interface GenericModuleProps {
  moduleKey: ModuleKey;
  darkMode: boolean;
}

const moduleInfo: Record<string, { title: string; description: string; color: string }> = {
  'op-ip': { title: 'OP / IP Management', description: 'Manage outpatient and inpatient workflows, bed allocation and discharge.', color: '#6366f1' },
  radiology: { title: 'Radiology', description: 'Manage radiology orders, DICOM viewer, and report delivery.', color: '#0ea5e9' },
  inventory: { title: 'Inventory', description: 'Track medical equipment, consumables, and procurement orders.', color: '#f59e0b' },
  staff: { title: 'Staff & HR', description: 'Manage staff profiles, attendance, shifts and payroll.', color: '#10b981' },
  ambulance: { title: 'Ambulance', description: 'Dispatch and track ambulances, manage emergency transport.', color: '#ef4444' },
  telemedicine: { title: 'Telemedicine', description: 'Online consultations, video calls and digital prescriptions.', color: '#14b8a6' },
  settings: { title: 'Settings', description: 'Configure hospital profile, roles, integrations and preferences.', color: '#94a3b8' },
};

export default function GenericModule({ moduleKey, darkMode }: GenericModuleProps) {
  const info = moduleInfo[moduleKey] || { title: moduleKey, description: 'Module content goes here.', color: '#0ea5e9' };
  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{
        width: '80px', height: '80px', borderRadius: '24px',
        background: `${info.color}18`, border: `2px solid ${info.color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', marginBottom: '24px',
      }}>
        🏥
      </div>
      <h2 style={{ margin: '0 0 10px', fontSize: '24px', fontWeight: 800, color: textPrimary }}>{info.title}</h2>
      <p style={{ margin: '0 0 32px', fontSize: '15px', color: '#64748b', textAlign: 'center', maxWidth: '380px', lineHeight: 1.6 }}>{info.description}</p>
      <div style={{
        padding: '12px 28px', borderRadius: '12px',
        background: `linear-gradient(135deg, ${info.color}, ${info.color}aa)`,
        border: 'none', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        boxShadow: `0 8px 24px ${info.color}40`,
      }}>
        Open {info.title}
      </div>
    </div>
  );
}
