import React from 'react';

const ScheduleForm = ({ formRef, isEditing, formData, setFormData, setSelectedDay, onSubmit, onReset }) => {
  const showJamKe = ['Pelajaran', 'Istirahat', 'ganti_jam', 'istirahat'].includes(formData.bell_type);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFormData((prev) => ({ ...prev, audio_file: selectedFile.name }));
    }
  };

  return (
    <div
      ref={formRef}
      style={{
        backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px',
        border: isEditing ? '2px solid #f59e0b' : '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)'
      }}
    >
      <h3 style={{ margin: '0 0 14px 0', color: isEditing ? '#d97706' : '#0f172a', fontSize: '1rem', fontWeight: '700' }}>
        {isEditing ? '✏ Edit Jadwal' : '➕ Tambah Jadwal'}
      </h3>

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>HARI</label>
            <select
              style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              value={formData.day}
              onChange={(e) => {
                setFormData({ ...formData, day: e.target.value });
                setSelectedDay(e.target.value);
              }}
            >
              {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>WAKTU</label>
            <input type="time" style={{ width: '100%', padding: '7px', marginTop: '4px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>JENIS BUNYI</label>
          <select
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
            value={formData.bell_type}
            onChange={(e) => {
              const type = e.target.value;
              setFormData({ ...formData, bell_type: type, bell_ke: ['Pelajaran', 'Istirahat', 'ganti_jam', 'istirahat'].includes(type) ? 1 : 0 });
            }}
          >
            <option value="Pelajaran">Pelajaran / Ganti Jam</option>
            <option value="Istirahat">Istirahat</option>
            <option value="Masuk">Masuk Kelas</option>
            <option value="Pulang">Pulang Sekolah</option>
            <option value="Upacara">Upacara</option>
          </select>
        </div>

        {showJamKe && (
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>JAM KE-</label>
            <input type="number" min="1" max="15" style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} value={formData.bell_ke} onChange={(e) => setFormData({ ...formData, bell_ke: parseInt(e.target.value, 10) || 0 })} />
          </div>
        )}

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>FILE AUDIO (.MP3)</label>
          <div style={{ marginTop: '4px' }}>
            <input type="file" accept=".mp3" id="audio-picker" onChange={handleFileChange} style={{ display: 'none' }} />
            <label htmlFor="audio-picker" style={{ display: 'block', padding: '8px', backgroundColor: '#f1f5f9', border: '1px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', fontWeight: '600', fontSize: '0.8rem', color: '#475569' }}>
              📁 Pilih MP3
            </label>
            {formData.audio_file && (
              <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '600', marginTop: '4px', wordBreak: 'break-all' }}>
                🎵 {formData.audio_file}
              </div>
            )}
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>KETERANGAN</label>
          <input type="text" placeholder="Contoh: Jam ke-1 dimulai" style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
          <button type="submit" style={{ flex: 1, backgroundColor: isEditing ? '#f59e0b' : '#2563eb', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
            {isEditing ? 'Simpan' : 'Tambah'}
          </button>
          {isEditing && (
            <button type="button" onClick={onReset} style={{ backgroundColor: '#f1f5f9', color: '#64748b', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}>
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;