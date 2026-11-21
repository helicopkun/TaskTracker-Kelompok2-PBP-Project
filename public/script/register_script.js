import { $, tampilPesan } from './utils.js'

$('formRegister').addEventListener('submit', async (e) => {
    e.preventDefault();

    if ($('password').value !== $('pwConfirm').value) {
        $('pwConfirm').value = '';
        tampilPesan($('pesan'), 'Password tidak sama!');
        return;
    }

    try {
    const res = await fetch('/api/task-track/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: $('username').value,
        password: $('password').value,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.pesan || 'Register gagal');

    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('username', data.username);
    location.href = '/home';
    } catch (error) {
        tampilPesan($('pesan'), error.message);
    }

});