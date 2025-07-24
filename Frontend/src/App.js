import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const posiciones = ['Portero', 'Defensa', 'Medio', 'Delantero'];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    //axios.get('http://localhost:3001/players')
    axios.get(`${process.env.REACT_APP_API_URL}/players`)
      .then(res => setPlayers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div className="Tittle">
        <div className="imagen-overlay"></div>
        <h1>FC BARCELONA - PRIMER EQUIPO</h1>
        <b>La plantilla de la temporada 2025/2026 todavía no es definitiva</b>
      </div>

      <div className="contenedor-jugadores">
        <div className="presentado-por">
          <span className="presentado-texto">PRESENTADO POR</span>
          <span className="presentado-nombre">DIEGO ARENDS</span>
        </div>

        <div className="primer-equipo">FC BARCELONA FIRST TEAM</div>

        <div className="botones-navegacion">
          <button onClick={() => scrollToSection('portero')}>PORTERO</button>
          <button onClick={() => scrollToSection('defensa')}>DEFENSA</button>
          <button onClick={() => scrollToSection('medio')}>MEDIOCAMPISTAS</button>
          <button onClick={() => scrollToSection('delantero')}>DELANTEROS</button>
          <button onClick={() => scrollToSection('director tecnico')}>DIRECTOR TECNICO</button>
        </div>

        {posiciones.map(pos => (
          <React.Fragment key={pos}>
            <h2 id={pos.toLowerCase()} className="titulo-position">{pos.toUpperCase()}S</h2>
            {players
              .filter(player => player.position_2 === pos)
              .map(player => (
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
                    {/* <div className="dato-jugador">
                      <b className="titulo-dato">Nacimiento</b>
                      <span className="valor-dato">{player.birthdate}</span>
                    </div> */}
                  </div>
                </div>
              ))}
          </React.Fragment>
        ))}

        {/* 🔥 Sección Director Técnico */}
        <h2 id="director tecnico" className="titulo-position">DIRECTOR TÉCNICO</h2>
        {players
          .filter(player => player.position_2 === 'DIRECTOR TECNICO')
          .map(player => (
            <div key={player.id} className="carta-jugador">
              <img
                src={player.photo_url}
                alt={player.name}
                className="foto-director"
                onError={e => e.target.src = '/photos/placeholder.png'}
              />
              <div className="nombre-jugador">{player.name}</div>
              <div className="overlay-datos">
                <div className="dato-jugador">
                  <b className="titulo-dato">POSICIÓN</b>
                  <span className="valor-dato">DT</span>
                </div>
                <div className="dato-jugador">
                  <b className="titulo-dato">Nacionalidad</b>
                  <span className="valor-dato">{player.nationality}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
