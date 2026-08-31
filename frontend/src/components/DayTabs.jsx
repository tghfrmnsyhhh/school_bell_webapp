import React from 'react';

const daysList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

const DayTabs = ({ selectedDay, todayName, onSelectDay }) => {
  return (
    <div style={{ display: 'flex', gap: '8px', backgroundColor: '#ffffff', padding: '8px', borderRadius: '16px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
      {daysList.map((day) => {
        const isToday = day === todayName;
        const isSelected = selectedDay === day;

        return (
          <button
            key={day}
            onClick={() => onSelectDay(day)}
            style={{
              flex: 1, padding: '10px 14px', borderRadius: '10px', border: 'none',
              fontWeight: isSelected ? '700' : '600', fontSize: '0.875rem', cursor: 'pointer',
              backgroundColor: isSelected ? '#2563eb' : 'transparent',
              color: isSelected ? '#ffffff' : '#64748b',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
              transition: 'all 0.15s ease', minWidth: '80px'
            }}
          >
            <span>{day}</span>
            {isToday && (
              <span style={{
                fontSize: '0.65rem', padding: '1px 6px', borderRadius: '10px',
                backgroundColor: isSelected ? '#ffffff' : '#dcfce7',
                color: isSelected ? '#2563eb' : '#15803d', fontWeight: '800'
              }}>
                HARI INI
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default DayTabs;