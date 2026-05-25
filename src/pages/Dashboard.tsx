import {
  Users,
  CalendarDays,
  BedDouble,
  Pill,
  FlaskConical,
  AlertTriangle,
  DollarSign,
  Activity,
} from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import BedOccupancy from "../components/dashboard/BedOccupancy";
import RecentPatients from "../components/dashboard/RecentPatients";
import DoctorAvailability from "../components/dashboard/DoctorAvailability";
import EmergencyPanel from "../components/dashboard/EmergencyPanel";
import AppointmentStatus from "../components/dashboard/AppointmentStatus";

interface DashboardProps {
  darkMode: boolean;
}

export default function Dashboard({ darkMode }: DashboardProps) {
  return (
    <div>
      {/* Greeting */}
      <div style={{ marginBottom: "24px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: 800,
            color: darkMode ? "#f1f5f9" : "#0f172a",
          }}
        >
          Good morning, Admin
        </h2>
        <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: "13px" }}>
          Here's what's happening at MediCore Hospital today.
        </p>
      </div>

      {/* Stat cards - responsive grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <StatCard
          title="Total Patients"
          value="248"
          subtitle="Registered today"
          icon={<Users size={20} />}
          color="#0ea5e9"
          trend={8}
          darkMode={darkMode}
        />
        <StatCard
          title="OP Patients"
          value="184"
          subtitle="Outpatient today"
          icon={<Activity size={20} />}
          color="#14b8a6"
          trend={5}
          darkMode={darkMode}
        />
        <StatCard
          title="IP Patients"
          value="64"
          subtitle="Admitted"
          icon={<BedDouble size={20} />}
          color="#6366f1"
          trend={-2}
          darkMode={darkMode}
        />
        <StatCard
          title="Revenue Today"
          value="₹1.24L"
          subtitle="Gross earnings"
          icon={<DollarSign size={20} />}
          color="#10b981"
          trend={12}
          darkMode={darkMode}
        />
        <StatCard
          title="Appointments"
          value="73"
          subtitle="Scheduled today"
          icon={<CalendarDays size={20} />}
          color="#f59e0b"
          trend={3}
          darkMode={darkMode}
        />
        <StatCard
          title="Lab Pending"
          value="21"
          subtitle="Reports awaited"
          icon={<FlaskConical size={20} />}
          color="#8b5cf6"
          trend={-7}
          darkMode={darkMode}
        />
        <StatCard
          title="Pharmacy"
          value="₹42K"
          subtitle="Sales today"
          icon={<Pill size={20} />}
          color="#ec4899"
          trend={9}
          darkMode={darkMode}
        />
        <StatCard
          title="Emergencies"
          value="3"
          subtitle="Active cases"
          icon={<AlertTriangle size={20} />}
          color="#ef4444"
          darkMode={darkMode}
        />
      </div>

      {/* Middle row - 2 column on desktop, 1 on mobile */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <RevenueChart darkMode={darkMode} />
        <BedOccupancy darkMode={darkMode} />
      </div>

      {/* Bottom row - 3 column on desktop, 1 on mobile */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        <RecentPatients darkMode={darkMode} />
        <AppointmentStatus darkMode={darkMode} />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <EmergencyPanel darkMode={darkMode} />
          <DoctorAvailability darkMode={darkMode} />
        </div>
      </div>

      {/* Mobile responsive breakpoints */}
      <style>{`
        @media (max-width: 1400px) {
          div[style*="gridTemplateColumns: repeat(3, 1fr)"] {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns: minmax(0, 2fr) minmax(0, 1fr)"] {
            grid-template-columns: 1fr;
          }
          
          div[style*="gridTemplateColumns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: repeat(auto-fill, minmax(160px, 1fr))"] {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          div[style*="gridTemplateColumns: repeat(auto-fill, minmax(160px, 1fr))"] {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
