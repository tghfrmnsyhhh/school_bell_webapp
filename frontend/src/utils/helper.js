import Swal from 'sweetalert2';

export const getTodayName = () => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const today = days[new Date().getDay()];
  return ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].includes(today) ? today : 'Senin';
};

// Toast Notifikasi Alert Ringkas
export const showAlert = (icon, title, text = '') => {
  Swal.fire({
    icon: icon, // 'success', 'error', 'warning', 'info'
    title: title,
    text: text,
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
    timerProgressBar: true,
  });
};

// Konfirmasi Dialog untuk Hapus
export const showConfirmDialog = async (title, text) => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal',
  });
  return result.isConfirmed;
};