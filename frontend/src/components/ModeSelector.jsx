import React from 'react';

const modes = ['REGULER', 'RAMADAN', 'UJIAN_X', 'UJIAN_XI', 'UJIAN_XII'];

const ModeSelector = ({ activeMode, bellStatus, isEditing, onModeChange }) => {
  const isPaused = bellStatus === 'paused';

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', opacity: isPaused ? 0.75 : 1, transition: 'all 0.2s' }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#0f172a', fontSize: '0.9rem', fontWeight: '700', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>MODE BEL</span>
        {isPaused && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '800' }}>PAUSED</span>}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {modes.map((m) => {
          const isActive = activeMode === m;
          const isDisabled = isEditing || isPaused;

          return (
            <button
              key={m}
              disabled={isDisabled}
              onClick={() => onModeChange(m)}
              style={{
                padding: '8px 12px', borderRadius: '8px', border: 'none', fontWeight: '600', fontSize: '0.85rem',
                textTransform: 'capitalize', cursor: isDisabled ? 'not-allowed' : 'pointer',
                textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                backgroundColor: isActive ? '#eff6ff' : 'transparent', color: isActive ? '#2563eb' : '#64748b'
              }}
            >
              <span>📅 {m.replace('_', ' ')}</span>
              {isActive && (
                <span style={{ 
                  fontSize: '0.7rem', 
                  backgroundColor: isPaused ? '#ef4444' : '#2563eb', 
                  color: 'white', 
                  padding: '2px 6px', 
                  borderRadius: '4px' 
                }}>
                  {isPaused ? 'Paused' : 'Aktif'}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSelector;