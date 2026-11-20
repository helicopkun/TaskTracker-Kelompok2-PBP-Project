const $ = id => document.getElementById(id);

if (!localStorage.getItem('loggedIn')) {
  location.replace('/index');
}

$('btnLogout').addEventListener('click', () => {
    localStorage.clear();
    location.href = '/index';
});

$('user').textContent = localStorage.getItem('username');