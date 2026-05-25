import { useState } from 'react';
import { Plus, Video, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockAppointments, mockDoctors } from '../data/mock';
import type { Appointment } from '../types';

interface AppointmentsProps {
  darkMode: boolean;
}

const statusStyle: Record<Appointment['status'], { bg: string; text: string; darkBg: string; darkText: string }> = {
  Confirmed: { bg: '#dbeafe', text: '#1d4ed8', darkBg: '#1e3a5f', darkText: '#93c5fd' },
  Pending: { bg: '#fef9c3', text: '#a16207', darkBg: '#3d2c00', darkText: '#fde047' },
  Cancelled: { bg: '#fee2e2', text: '#b91c1c', darkBg: '#3b0000', darkText: '#fca5a5' },
  Completed: { bg: '#dcfce7', text: '#15803d', darkBg: '#052e16', darkText: '#86efac' },
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();

export default function Appointments({ darkMode }: AppointmentsProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const bg = darkMode ? '#1e293b' : 'white';
  const border = darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)';
  const textPrimary = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = '#64748b';
  const shadow = darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)';

  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: textPrimary }}>Appointments</h2>
          <p style={{ margin: '6px 0 0', color: textSecondary, fontSize: '14px' }}>Schedule and manage patient appointments</p>
        </div>
        <button style={primaryBtn}>
          <Plus size={15} /> Book Appointment
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '20px' }}>
        {/* Calendar */}
        <div>
          <div style={{ background: bg, borderRadius: '16px', padding: '24px', border, boxShadow: shadow, marginBottom: '20px' }}>
            {/* Month nav */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: textSecondary, padding: '4px' }}
              ><ChevronLeft size={18} /></button>
              <span style={{ fontWeight: 700, fontSize: '15px', color: textPrimary }}>{monthName}</span>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: textSecondary, padding: '4px' }}
              ><ChevronRight size={18} /></button>
            </div>

            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
              {days.map(d => (
                <div key={d} style={{ textAlign: 'center', fontSize: '11px', fontWeight: 600, color: textSecondary, padding: '4px 0' }}>{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
                const isSelected = day === selectedDay;
                const hasAppt = [3, 7, 12, 15, 18, 22, 25].includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: isToday || isSelected ? 700 : 400,
                      background: isSelected ? 'linear-gradient(135deg, #0ea5e9, #14b8a6)' : isToday ? '#0ea5e920' : 'transparent',
                      color: isSelected ? 'white' : isToday ? '#0ea5e9' : textPrimary,
                      position: 'relative',
                      transition: 'all 0.15s',
                    }}
                  >
                    {day}
                    {hasAppt && !isSelected && (
                      <div style={{ position: 'absolute', bottom: '3px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '50%', background: '#0ea5e9' }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Doctor slots */}
          <div style={{ background: bg, borderRadius: '16px', padding: '20px', border, boxShadow: shadow }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: textPrimary }}>Available Doctors Today</h3>
            {mockDoctors.filter(d => d.available).map(doc => (
              <div key={doc.id} style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                borderRadius: '10px', marginBottom: '6px',
                background: darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                border: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid #f1f5f9',
              }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #34d399)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white' }}>{doc.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: textPrimary }}>{doc.name}</div>
                  <div style={{ fontSize: '11px', color: textSecondary }}>{doc.specialty}</div>
                </div>
                <button style={{ padding: '4px 12px', borderRadius: '8px', background: '#0ea5e915', border: '1px solid #0ea5e930', color: '#0ea5e9', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                  Book
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments list */}
        <div style={{ background: bg, borderRadius: '16px', padding: '24px', border, boxShadow: shadow }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textPrimary }}>
              Appointments — May {selectedDay}
            </h3>
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['All', 'OP', 'Online'] as const).map(f => (
                <button key={f} style={{
                  padding: '4px 12px', borderRadius: '6px', border: '1.5px solid',
                  borderColor: f === 'All' ? '#0ea5e9' : (darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
                  background: f === 'All' ? '#0ea5e920' : 'transparent',
                  color: f === 'All' ? '#0ea5e9' : textSecondary, fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                }}>{f}</button>
              ))}
            </div>
          </div>

          {/* Queue tokens */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <div key={n} style={{
                flexShrink: 0, width: '40px', height: '40px', borderRadius: '10px',
                background: n <= 3 ? 'linear-gradient(135deg, #0ea5e9, #14b8a6)' : (darkMode ? '#334155' : '#f1f5f9'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: 700,
                color: n <= 3 ? 'white' : textSecondary,
                border: n === 4 ? '2px solid #0ea5e9' : 'none',
                cursor: 'pointer',
              }}>
                {n < 10 ? `0${n}` : n}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mockAppointments.map(a => {
              const st = statusStyle[a.status];
              return (
                <div key={a.id} style={{
                  display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px',
                  borderRadius: '12px', background: darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                  border: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #f1f5f9', cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = darkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc'}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: a.type === 'Online' ? '#14b8a620' : '#0ea5e920',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: a.type === 'Online' ? '#14b8a6' : '#0ea5e9', flexShrink: 0,
                  }}>
                    {a.type === 'Online' ? <Video size={18} /> : <MapPin size={18} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: textPrimary, marginBottom: '3px' }}>{a.patient}</div>
                    <div style={{ fontSize: '12px', color: textSecondary }}>{a.doctor} · {a.department}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: textPrimary, marginBottom: '4px' }}>{a.time}</div>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px',
                      background: darkMode ? st.darkBg : st.bg, color: darkMode ? st.darkText : st.text,
                    }}>{a.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  padding: '9px 18px', borderRadius: '10px',
  background: 'linear-gradient(135deg, #0ea5e9, #14b8a6)',
  border: 'none', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
  display: 'flex', alignItems: 'center', gap: '6px',
};
