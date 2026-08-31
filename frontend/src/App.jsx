import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import ScheduleForm from './components/ScheduleForm';
import DayTabs from './components/DayTabs'; 
import ScheduleTable from './components/ScheduleTable';
import * as api from './services/api';
import { getTodayName, showAlert, showConfirmDialog } from './utils/helper';

function App() {
  const [schedules, setSchedules] = useState([]);
  const [activeMode, setActiveMode] = useState('reguler');
  
  // Inisialisasi awal dari localStorage agar tidak ter-reset ke 'active' saat di-refresh
  const [bellStatus, setBellStatus] = useState(() => {
    return localStorage.getItem('bell_status') || 'active';
  });

  const [time, setTime] = useState(new Date().toLocaleTimeString('id-ID'));
  const [loading, setLoading] = useState(true);

  const [selectedDay, setSelectedDay] = useState(getTodayName());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    mode: 'reguler',
    day: getTodayName(),
    time: '',
    bell_type: 'Pelajaran',
    bell_ke: 1,
    audio_file: '',
    message: ''
  });

  useEffect(() => {
    fetchData();

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('id-ID'));
    }, 1000);

    const dataTimer = setInterval(() => {
      fetchData();
    }, 15000);

    return () => {
      clearInterval(timer);
      clearInterval(dataTimer);
    };
  }, []);

  const fetchData = async () => {
    try {
      const resSetting = await api.getSettings();

      if (Array.isArray(resSetting.data)) {
        // 1. Ambil Setting Active Mode
        const modeSetting = resSetting.data.find(s => (s.key || s.Key) === 'active_mode');
        if (modeSetting) {
          const val = modeSetting.value || modeSetting.Value;
          if (val) setActiveMode(val);
        }

        // 2. Ambil Setting Bell Status & Normalisasi
        const statusSetting = resSetting.data.find(s => (s.key || s.Key) === 'bell_status');
        if (statusSetting) {
          const rawVal = statusSetting.value !== undefined ? statusSetting.value : statusSetting.Value;
          
          const isPaused = rawVal === 'paused' || rawVal === '0' || rawVal === 0 || rawVal === false;
          const normalizedStatus = isPaused ? 'paused' : 'active';

          setBellStatus(normalizedStatus);
          localStorage.setItem('bell_status', normalizedStatus);
        }

      } else if (resSetting.data && typeof resSetting.data === 'object') {
        const keyName = resSetting.data.key || resSetting.data.Key;
        const valData = resSetting.data.value !== undefined ? resSetting.data.value : resSetting.data.Value;

        if (keyName === 'active_mode' && valData) {
          setActiveMode(valData);
        }
        
        if (keyName === 'bell_status') {
          const isPaused = valData === 'paused' || valData === '0' || valData === 0 || valData === false;
          const normalizedStatus = isPaused ? 'paused' : 'active';

          setBellStatus(normalizedStatus);
          localStorage.setItem('bell_status', normalizedStatus);
        }
      }

      const resSchedules = await api.getSchedules();
      setSchedules(resSchedules.data);
    } catch (err) {
      console.error("Gagal koneksi ke API backend:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🛑 STOP AUDIO BEL
  const handleStopBellAudio = async () => {
    try {
      await api.stopBellAudio();
      showAlert('success', 'Berhasil Stop', 'Suara bel berhasil dihentikan!');
    } catch (err) {
      showAlert('error', 'Gagal', 'Gagal menghentikan suara bel!');
    }
  };

  // ⏸ TOGGLE PAUSE BEL
  const handleTogglePause = async () => {
    const nextStatus = bellStatus === 'active' ? 'paused' : 'active';

    setBellStatus(nextStatus);
    localStorage.setItem('bell_status', nextStatus);

    try {
      await api.updateSetting('bell_status', nextStatus);
      showAlert(
        'info',
        nextStatus === 'paused' ? 'Bel Dipaused' : 'Bel Diaktifkan',
        `Status bel sekarang: ${nextStatus.toUpperCase()}`
      );
    } catch (err) {
      showAlert('error', 'Gagal', 'Gagal mengupdate status ke server, perubahan disimpan secara lokal.');
    }
  };

  // 📅 CHANGE MODE
  const handleModeChange = async (newMode) => {
    if (bellStatus === 'paused') {
      showAlert('warning', 'Bel Dipaused', 'Aktifkan bel terlebih dahulu untuk mengganti mode!');
      return;
    }

    try {
      await api.updateSetting('active_mode', newMode);
      setActiveMode(newMode);
      resetForm(newMode);
      showAlert('success', 'Mode Berubah', `Mode aktif diubah ke ${newMode.replace('_', ' ')}`);
    } catch (err) {
      showAlert('error', 'Gagal', 'Gagal mengubah mode bel!');
    }
  };

  const resetForm = (currentMode = activeMode) => {
    setFormData({
      mode: currentMode,
      day: selectedDay,
      time: '',
      bell_type: 'Pelajaran',
      bell_ke: 1,
      audio_file: '',
      message: ''
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEditClick = (schedule) => {
    setIsEditing(true);

    const currentId = schedule.id !== undefined ? schedule.id : schedule.ID;
    setEditId(currentId);

    const rawBellKe = schedule.bell_ke !== undefined ? schedule.bell_ke : schedule.BellKe;
    const parsedBellKe = rawBellKe !== undefined && rawBellKe !== null ? parseInt(rawBellKe, 10) : 1;
    const rawBellType = schedule.bell_type || schedule.BellType || 'Pelajaran';
    const dayVal = schedule.day || schedule.Day || selectedDay;

    setSelectedDay(dayVal);

    setFormData({
      mode: schedule.mode || schedule.Mode || activeMode,
      day: dayVal,
      time: schedule.time || schedule.Time || '',
      bell_type: rawBellType,
      bell_ke: parsedBellKe,
      audio_file: schedule.audio_file || schedule.AudioFile || '',
      message: schedule.message || schedule.Message || ''
    });

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ➕/✏ SUBMIT FORM (TAMBAH / EDIT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.time || !formData.audio_file || !formData.message) {
      showAlert('warning', 'Form Tidak Lengkap', 'Harap isi semua kolom dan pilih file audio!');
      return;
    }

    try {
      if (isEditing) {
        await api.updateSchedule(editId, formData);
        showAlert('success', 'Berhasil Edit', 'Jadwal bel berhasil diperbarui!');
      } else {
        await api.createSchedule(formData);
        showAlert('success', 'Berhasil Tambah', 'Jadwal bel baru berhasil ditambahkan!');
      }
      resetForm();
      fetchData();
    } catch (err) {
      showAlert('error', 'Gagal', isEditing ? 'Gagal memperbarui jadwal!' : 'Gagal menyimpan jadwal!');
    }
  };

  // 🗑 DELETE JADWAL
  const handleDelete = async (id) => {
    const isConfirmed = await showConfirmDialog('Hapus Jadwal?', 'Data jadwal bel ini akan dihapus secara permanen.');
    
    if (isConfirmed) {
      try {
        await api.deleteSchedule(id);
        showAlert('success', 'Terhapus', 'Jadwal bel berhasil dihapus!');
        fetchData();
        if (editId === id) resetForm();
      } catch (err) {
        showAlert('error', 'Gagal', 'Gagal menghapus data jadwal!');
      }
    }
  };

  const filteredSchedules = schedules
    .filter(s => {
      const modeDB = s.mode ? s.mode.toLowerCase() : (s.Mode ? s.Mode.toLowerCase() : '');
      const modeAktif = activeMode ? activeMode.toLowerCase() : '';
      const dayDB = s.day || s.Day || 'Senin';

      return modeDB === modeAktif && dayDB.toLowerCase() === selectedDay.toLowerCase();
    })
    .sort((a, b) => {
      const timeA = a.time || a.Time || '00:00';
      const timeB = b.time || b.Time || '00:00';
      return timeA.localeCompare(timeB);
    });

  const isPaused = bellStatus === 'paused';

  return (
    <div style={{ padding: '24px', fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      
      {/* HEADER */}
      <Header
        logoSrc="./assets/logocikini.png"
        activeMode={activeMode}
        bellStatus={bellStatus}
        time={time}
        onStopAudio={handleStopBellAudio}
        onTogglePause={handleTogglePause}
      />

      {/* BANNER INDIKATOR PAUSED PADA SELURUH HALAMAN */}
      {isPaused && (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px 20px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: '600', fontSize: '0.9rem' }}>
          <span>⏸ Sistem Bel sedang DIPAUSED. Tidak ada suara bel otomatis yang akan berbunyi.</span>
          <button onClick={handleTogglePause} style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}>
            Aktifkan Sekarang
          </button>
        </div>
      )}

      {/* GRID KONTEN DENGAN EFEK OPACITY SAAT PAUSED */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
        
        {/* KOLOM KIRI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ModeSelector
            activeMode={activeMode}
            bellStatus={bellStatus}
            isEditing={isEditing}
            onModeChange={handleModeChange}
          />
          <ScheduleForm
            formRef={formRef}
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
            setSelectedDay={setSelectedDay}
            onSubmit={handleSubmit}
            onReset={() => resetForm()}
          />
        </div>

        {/* KOLOM KANAN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <DayTabs
            selectedDay={selectedDay}
            todayName={getTodayName()}
            onSelectDay={(day) => {
              setSelectedDay(day);
              setFormData(prev => ({ ...prev, day }));
            }}
          />
          <ScheduleTable
            selectedDay={selectedDay}
            schedules={filteredSchedules}
            loading={loading}
            bellStatus={bellStatus}
            editId={editId}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        </div>

      </div>
    </div>
  );
}

export default App;