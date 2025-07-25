import React, { useEffect, useState } from 'react';
import axios from 'axios';
import fondoVidrio from './assets/fondo-con-textura-de-vidrio-patron.jpg';
import campNou from './assets/El_Camp_Nou_en_un_partido_de_la_Uefa_Champions_League.webp';
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
    axios.get(`${process.env.REACT_APP_API_URL}/players`)
      .then(res => setPlayers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#af0d33',
        backgroundImage: `radial-gradient(circle , rgba(56, 4, 4, 0.7) 0%, rgba(30, 131, 253, 0.863) 100%), url(${fondoVidrio})`,
        backgroundBlendMode: 'multiply',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        fontFamily: "'Segoe UI', Arial, sans-serif",
        margin: 0,
        padding: 0,
        minHeight: '100vh'
      }}
    >
      <div className="Tittle">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(to top,rgb(26, 9, 9) 0%, rgba(3, 26, 53, 0.233), rgba(0, 0, 0, 0.2), transparent), url(${campNou})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            opacity: 0.4,
            zIndex: 1,
            borderRadius: '10px'
          }}
        />
        <h1>FC BARCELONA - PRIMER EQUIPO</h1>
        <b>La plantilla de la temporada 2025/2026 todavía no es definitiva</b>
      </div>

      <div className="contenedor-jugadores">
        <div className="bloque-identidad">
          <div className="presentado-por">
            <span className="presentado-texto">PRESENTADO POR</span>
            <span className="presentado-nombre">DIEGO ARENDS</span>
          </div>
          <div className="primer-equipo">FC BARCELONA FIRST TEAM</div>
        </div>

        <div className="scroll-wrapper">
          <div className="botones-navegacion">
            <button onClick={() => scrollToSection('portero')}>PORTERO</button>
            <button onClick={() => scrollToSection('defensa')}>DEFENSA</button>
            <button onClick={() => scrollToSection('medio')}>MEDIOCAMPISTAS</button>
            <button onClick={() => scrollToSection('delantero')}>DELANTEROS</button>
            <button onClick={() => scrollToSection('director tecnico')}>DIRECTOR TECNICO</button>
          </div>
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
                  </div>
                </div>
              ))}
          </React.Fragment>
        ))}

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
