const db = require('./database');

db.query('SELECT now()')
  .then(r => { console.log('Connected:', r.rows[0]); process.exit(0); })
  .catch(e => { console.error('Failed:', e.message); process.exit(1); });