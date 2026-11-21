export const $ = id => document.getElementById(id);
export const API = '/api/task-track';
export const username = localStorage.getItem('username');


export function tampilPesan(el, teks) { // tampilPesan($('id'), 'string pesan')
  el.textContent = teks;
}

export function pisahWaktu(iso) {
  const d = new Date(iso);
  return {
    tanggal: d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC'}),
    jam: d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }),
  };
}