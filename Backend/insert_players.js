const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./barcelona.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

const players = [
  { name: 'Marc-André ter Stegen', position: 'Portero', number: 1, nationality: 'Alemania', birthdate: '1992-04-30', photo_url: '/photos/01-Ter_Stegen.webp' },
  { name: 'Iñaki Peña', position: 'Portero', number: 13, nationality: 'España', birthdate: '1999-03-02', photo_url: '/photos/00-Pena.webp' },
  { name: 'Wojciech Szczesny', position: 'Portero', number: 25, nationality: 'Polonia', birthdate: '1990-04-18', photo_url: '/photos/25-Szczesny.webp' },
  { name: 'Joan García', position: 'Portero', number: null, nationality: 'España', birthdate: '2001-05-04', photo_url: '/photos/00-Joan_Garcia.webp' },
  { name: 'Pau Cubarsí', position: 'Defensa', number: 2, nationality: 'España', birthdate: '2007-01-22', photo_url: '/photos/02-Cubarsi.webp' },
  { name: 'Alejandro Balde', position: 'Defensa', number: 3, nationality: 'España', birthdate: '2003-10-18', photo_url: '/photos/03-Balde.webp' },
  { name: 'Ronald Araújo', position: 'Defensa', number: 4, nationality: 'Uruguay', birthdate: '1999-03-07', photo_url: '/photos/04-Araujo.webp' },
  { name: 'Íñigo Martínez', position: 'Defensa', number: 5, nationality: 'España', birthdate: '1991-05-17', photo_url: '/photos/05-Martinez.webp' },
  { name: 'Andreas Christensen', position: 'Defensa', number: 15, nationality: 'Dinamarca', birthdate: '1996-04-10', photo_url: '/photos/15-Christensen.webp' },
  { name: 'Jules Koundé', position: 'Defensa', number: 23, nationality: 'Francia', birthdate: '1998-11-12', photo_url: '/photos/23-Kounde.webp' },
  { name: 'Eric García', position: 'Defensa', number: 24, nationality: 'España', birthdate: '2001-01-09', photo_url: '/photos/24-Eric_Garcia.webp' },
  { name: 'Gavi', position: 'Centrocampista', number: 6, nationality: 'España', birthdate: '2004-08-05', photo_url: '/photos/06-Gavi.webp' },
  { name: 'Pedri', position: 'Centrocampista', number: 8, nationality: 'España', birthdate: '2002-11-25', photo_url: '/photos/08-Pedri.webp' },
  { name: 'Fermín López', position: 'Centrocampista', number: 16, nationality: 'España', birthdate: '2003-05-11', photo_url: '/photos/16-Fermin.webp' },
  { name: 'Marc Casadó', position: 'Centrocampista', number: 17, nationality: 'España', birthdate: '2003-09-14', photo_url: '/photos/17-Casado.webp' },
  { name: 'Dani Olmo', position: 'Centrocampista', number: 20, nationality: 'España', birthdate: '1998-05-07', photo_url: '/photos/20-Olmo.webp' },
  { name: 'Frenkie de Jong', position: 'Centrocampista', number: 21, nationality: 'Países Bajos', birthdate: '1997-05-12', photo_url: '/photos/21-De_Jong.webp' },
  { name: 'Ferran Torres', position: 'Delantero', number: 7, nationality: 'España', birthdate: '2000-02-29', photo_url: '/photos/07-Ferran_Torres.webp' },
  { name: 'Robert Lewandowski', position: 'Delantero', number: 9, nationality: 'Polonia', birthdate: '1988-08-21', photo_url: '/photos/09-Lewandowski.webp' },
  { name: 'Raphinha', position: 'Delantero', number: 11, nationality: 'Brasil', birthdate: '1996-12-14', photo_url: '/photos/11-Raphinha.webp' },
  { name: 'Pau Víctor', position: 'Delantero', number: 18, nationality: 'España', birthdate: '2001-11-26', photo_url: '/photos/18-Pau_Victor.webp' },
  { name: 'Lamine Yamal', position: 'Delantero', number: 19, nationality: 'España', birthdate: '2007-07-13', photo_url: '/photos/19-Lamine.webp' }
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