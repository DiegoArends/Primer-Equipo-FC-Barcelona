const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const compression = require('compression');

const app = express();
const PORT = 3001;

// Middleware de compresión gzip para reducir tamaño de respuestas
app.use(compression());

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

// Cache simple en memoria para jugadores
let playersCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Función para obtener jugadores con caché
const getPlayersWithCache = () => {
  return new Promise((resolve, reject) => {
    // Si hay caché válido, usarlo
    if (playersCache && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
      return resolve(playersCache);
    }

    // Si no hay caché válido, consultar la base de datos
    db.all('SELECT * FROM players ORDER BY position_2, name', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // Actualizar caché
        playersCache = rows;
        cacheTimestamp = Date.now();
        resolve(rows);
      }
    });
  });
};

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('¡API de Barcelona funcionando!');
});

// Obtener todos los jugadores (con caché)
app.get('/players', async (req, res) => {
  try {
    const players = await getPlayersWithCache();
    // Agregar header de cache para el navegador
    res.set('Cache-Control', 'public, max-age=300'); // 5 minutos
    res.json(players);
  } catch (err) {
    console.error('Error al obtener jugadores:', err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para verificar estado de la API y caché
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    cacheStatus: playersCache ? 'active' : 'inactive',
    cacheAge: cacheTimestamp ? Math.floor((Date.now() - cacheTimestamp) / 1000) + 's' : 'N/A'
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
      // Invalidar caché después de insertar
      playersCache = null;
      cacheTimestamp = null;
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
      // Invalidar caché después de actualizar
      playersCache = null;
      cacheTimestamp = null;
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
      // Invalidar caché después de eliminar
      playersCache = null;
      cacheTimestamp = null;
      res.json({ message: 'Jugador eliminado correctamente' });
    }
  });
});

// Obtener la biografía de un jugador por ID
app.get('/players_biography/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM players_biography WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Biografía no encontrada' });
    } else {
      res.json(row);
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});