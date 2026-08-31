import React from 'react';

const ScheduleTable = ({ selectedDay, schedules, loading, bellStatus, editId, onEdit, onDelete }) => {
  const isPaused = bellStatus === 'paused';

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', flex: 1, opacity: isPaused ? 0.85 : 1, transition: 'all 0.2s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1rem', fontWeight: '700' }}>
          Jadwal Hari <span style={{ color: '#2563eb' }}>{selectedDay}</span>
        </h3>

        {isPaused ? (
          <span style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>
            ⏸ BEL NONAKTIF
          </span>
        ) : (
          <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>
            {schedules.length} Items
          </span>
        )}
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading data...</p>
      ) : schedules.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 20px', color: '#94a3b8', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
          <p style={{ margin: 0, fontWeight: '600', fontSize: '0.875rem' }}>Tidak ada jadwal bel untuk hari {selectedDay}.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px' }}>Waktu</th>
                <th style={{ padding: '10px' }}>Jenis Bel</th>
                <th style={{ padding: '10px' }}>Jam Ke-</th>
                <th style={{ padding: '10px' }}>File Audio</th>
                <th style={{ padding: '10px' }}>Keterangan</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((s) => {
                const timeVal = s.time || s.Time;
                const bType = s.bell_type || s.BellType || '';
                const bKe = s.bell_ke !== undefined ? s.bell_ke : (s.BellKe !== undefined ? s.BellKe : 0);
                const aFile = s.audio_file || s.AudioFile;
                const msg = s.message || s.Message || '-';
                const idVal = s.id || s.ID;
                const isSelected = editId === idVal;

                return (
                  <tr key={idVal} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: isSelected ? '#fffbeb' : 'transparent' }}>
                    <td style={{ padding: '12px 10px', fontWeight: '800', color: isPaused ? '#64748b' : '#2563eb', fontFamily: 'monospace', fontSize: '0.95rem' }}>{timeVal}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <span style={{
                        padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700',
                        backgroundColor: ['Pelajaran', 'ganti_jam'].includes(bType) ? '#eff6ff' : ['Istirahat', 'istirahat'].includes(bType) ? '#fef3c7' : '#f1f5f9',
                        color: ['Pelajaran', 'ganti_jam'].includes(bType) ? '#1d4ed8' : ['Istirahat', 'istirahat'].includes(bType) ? '#b45309' : '#475569'
                      }}>
                        {bType.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '12px 10px', fontWeight: '700', color: '#0f172a' }}>{bKe > 0 ? bKe : '-'}</td>
                    <td style={{ padding: '12px 10px', color: '#475569', fontSize: '0.8rem', fontFamily: 'monospace' }}>🎵 {aFile}</td>
                    <td style={{ padding: '12px 10px', color: '#64748b', fontSize: '0.85rem' }}>{msg}</td>
                    <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                        <button onClick={() => onEdit(s)} style={{ backgroundColor: '#f1f5f9', color: '#0f172a', border: 'none', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>Edit</button>
                        <button onClick={() => onDelete(idVal)} style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScheduleTable;