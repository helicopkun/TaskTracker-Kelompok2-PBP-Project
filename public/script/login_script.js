import { API, $, tampilPesan } from './utils_script.js'

const form = $('formLogin');
const btn = form.querySelector('button[type="submit"]');

function updateButton() {
  btn.disabled = !form.checkValidity();
}

form.addEventListener('input', updateButton);   // runs on every keystroke or change
form.addEventListener('reset', () => setTimeout(updateButton)); // after e.target.reset()
updateButton();                                  // set the initial state on page load

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${API}/login`, {
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
    tampilPesan($('pesan'), error.message);
  }
});