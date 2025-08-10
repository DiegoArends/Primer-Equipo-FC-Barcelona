const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./barcelona.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

const players = [
];

players.forEach(player => {
  const sql = `INSERT INTO players (name, position, number, nationality, birthdate, photo_url) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [player.name, player.position, player.number, player.nationality, player.birthdate, player.photo_url];
  db.run(sql, params, function (err) {
    if (err) {
      console.error('Error al insertar jugador:', err.message);
    } else {
      console.log(`Jugador insertado con id ${this.lastID}: ${player.name}`);
    }
  });
});

db.close(); 