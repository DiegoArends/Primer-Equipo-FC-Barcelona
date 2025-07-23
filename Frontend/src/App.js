import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/players')
      .then(res => setPlayers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div className="Tittle">
  <div className="imagen-overlay"></div>
  <h1>FC BARCELONA - PRIMER EQUIPO</h1>
</div>
      <div className="contenedor-jugadores">
        {players.map(player => (
          <div key={player.id} className="carta-jugador">
  <img
    src={player.photo_url}
    alt={player.name}
    className="foto-jugador"
    onError={e => e.target.src = '/photos/placeholder.png'}
  />
  <div className="nombre-jugador">{player.name}</div>
  <div className="dorsal">{player.number}</div>
  <div className="overlay-datos">
  <div className="dato-jugador">
  <b className="titulo-dato">Posición</b>
  <span className="valor-dato">{player.position}</span>
</div>
<div className="dato-jugador">
  <b className="titulo-dato">Nacionalidad</b>
  <span className="valor-dato">{player.nationality}</span>
</div>
<div className="dato-jugador">
  <b className="titulo-dato">Nacimiento</b>
  <span className="valor-dato">{player.birthdate}</span>
</div>
  </div>
</div>
        ))}
      </div>
    </div>
  );
}

export default App;