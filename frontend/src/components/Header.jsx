import React from 'react';

const Header = ({ logoSrc, activeMode, bellStatus, time, onStopAudio, onTogglePause }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '20px 24px', borderRadius: '16px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img src={logoSrc} alt="Logo Sekolah" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
        <div>
          <h1 style={{ margin: 0, color: '#0f172a', fontSize: '1.4rem', fontWeight: '800' }}>
            BELL SMK 1 PERGURUAN "CIKNI"
          </h1>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '600', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '12px' }}>
              ● Connected
            </span>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Mode: <strong style={{ color: '#2563eb', textTransform: 'uppercase' }}>{activeMode.replace('_', ' ')}</strong>
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onStopAudio}
          style={{
            padding: '10px 16px', borderRadius: '10px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '0.875rem',
            backgroundColor: '#dc2626', color: 'white', display: 'flex', alignItems: 'center', gap: '6px',
            boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)'
          }}
        >
          🛑 Stop Audio
        </button>

        <button
          onClick={onTogglePause}
          style={{
            padding: '10px 18px', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '0.875rem',
            backgroundColor: bellStatus === 'active' ? '#f59e0b' : '#10b981', color: 'white'
          }}
        >
          {bellStatus === 'active' ? '⏸ Pause Bel' : '▶ Aktifkan Bel'}
        </button>

        <div style={{ textAlign: 'right', marginLeft: '8px' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: bellStatus === 'active' ? '#0f172a' : '#94a3b8', fontFamily: 'monospace' }}>
            {time}
          </div>
          <span style={{ backgroundColor: bellStatus === 'active' ? '#dcfce7' : '#fee2e2', padding: '2px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '800', color: bellStatus === 'active' ? '#15803d' : '#b91c1c' }}>
            {bellStatus === 'active' ? 'SISTEM AKTIF' : 'SISTEM DIPAUSE'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;