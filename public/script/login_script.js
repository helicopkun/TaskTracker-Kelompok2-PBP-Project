const $ = id => document.getElementById(id);
const pesan = $('pesan');


function tampilPesan(teks) {
  pesan.textContent = teks;
}

$('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/task-track/login', {
      method: 'POST', // ga nambah data baru, cuma biar ga tampil di url
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: $('username').value,
        password: $('password').value,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.pesan || 'Login gagal');

    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('username', data.username);
    location.href = '/home';
  } catch (error) {
    tampilPesan(error.message);
  }
});