const express = require('express');
const app = express();

const db = require('./database');
const API = '/api/task-track'
const path = require('path');
const { error } = require('console');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

//TESTING, NOT FOR USE
['users'].forEach(table => {
    app.get(`${API}/${table}`, async (req, res) => {
        try {
            const { rows } = await db.query(`SELECT * FROM ${table}`);
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ pesan: 'Terjadi kesalahan server' });
        }
    });
});

//API request
app.post(`${API}/login`, async (req, res) => {
  const { username, password } = req.body;
  try {
    const { rows } = await db.query(
      'SELECT id, username FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    if (!rows.length) return res.status(400).json({ pesan: 'Username atau password salah' });
    
    res.json({ username: rows[0].username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ pesan: 'Terjadi kesalahan server' });
  }
});

app.post(`${API}/register`, async (req, res) => {
  const { username, password } = req.body;
  try {
    await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, password]
    );
    res.json({ username: username, pesan: 'Berhasil daftar' });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ pesan: 'Username sudah dipakai' });
    }
    console.error(err);
    res.status(500).json({ pesan: 'Terjadi kesalahan server' })
  }
});






if (!process.env.VERCEL) {
  app.listen(3000, () => console.log('http://localhost:3000'));
}

module.exports = app;
