const express = require('express');
const app = express();

const db = require('./database');
const API = '/api/task-track'

app.use(express.json());
app.use(express.static('public'));


['users'].forEach(table => {
    app.get(`${API}/${table}`, async (req, res) => {
        try {
            const { rows } = await db.query(`SELECT * FROM ${table}`);
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ pesan: 'Gagal mengambil data2' });
        }
    });
});






if (!process.env.VERCEL) {
  app.listen(3000, () => console.log('http://localhost:3000'));
}

module.exports = app;
