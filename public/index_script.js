const API = '/api/task-track';
const $ = id => document.getElementById(id);

const tabel = $('dataUsers');
const pesan = $('pesan');


function tampilPesan(teks) {
  pesan.textContent = teks;
}

async function muatData() {
  try {
    const res = await fetch(API+'/users');
    if (!res.ok) throw new Error('Gagal mengambil data1');

    const data = await res.json();
    tampilkanTabel(data);
  } catch (error) {
    tampilPesan(error.message);
  }
}

function tampilkanTabel(data) {
  tabel.replaceChildren();
  data.forEach(m => {
    const tr = document.createElement('tr');
    [m.username, m.password].forEach(value => {
      const td = document.createElement('td');
      td.textContent = value;
      tr.appendChild(td);
    });
    tabel.appendChild(tr);
  });
}

muatData();
