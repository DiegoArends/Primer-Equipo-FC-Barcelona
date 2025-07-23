const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware para leer JSON y permitir CORS
app.use(express.json());
app.use(cors());

// Conexión a la base de datos
const db = new sqlite3.Database('./barcelona.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('¡API de Barcelona funcionando!');
});

// Obtener todos los jugadores (ahora players)
app.get('/players', (req, res) => {
  db.all('SELECT * FROM players', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Agregar un nuevo jugador (ahora player)
app.post('/players', (req, res) => {
  const { name, position, number, nationality, birthdate, photo_url } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const sql = `INSERT INTO players (name, position, number, nationality, birthdate, photo_url)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [name, position, number, nationality, birthdate, photo_url];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, ...req.body });
    }
  });
});

// Editar un jugador por ID
app.put('/players/:id', (req, res) => {
  const { id } = req.params;
  const { name, position, number, nationality, birthdate, photo_url } = req.body;
  const sql = `UPDATE players SET name = ?, position = ?, number = ?, nationality = ?, birthdate = ?, photo_url = ? WHERE id = ?`;
  const params = [name, position, number, nationality, birthdate, photo_url, id];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Jugador no encontrado' });
    } else {
      res.json({ id, name, position, number, nationality, birthdate, photo_url });
    }
  });
});

// Eliminar un jugador por ID
app.delete('/players/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM players WHERE id = ?`;
  db.run(sql, id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Jugador no encontrado' });
    } else {
      res.json({ message: 'Jugador eliminado correctamente' });
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


