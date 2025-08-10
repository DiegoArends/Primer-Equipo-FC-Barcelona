import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import fondoVidrio from '../assets/fondo-con-textura-de-vidrio-patron.jpg';
import campNou from '../assets/El_Camp_Nou_en_un_partido_de_la_Uefa_Champions_League.webp';
import nike from '../assets/Logo_NIKE.svg.png';
import spotify from '../assets/spotify-logo (1).svg';
import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
import x from '../assets/twitter..avif';
import youtube from '../assets/youtube.png';
import './main.css';

function MainPage() {
  const [players, setPlayers] = useState([]);
  const posiciones = ['Portero', 'Defensa', 'Mediocampista', 'Delantero'];

  // Memoizar los jugadores filtrados por posición para evitar recálculos
  const playersByPosition = useMemo(() => {
    const result = {};
    posiciones.forEach(pos => {
      result[pos] = players.filter(player => player.position_2 === pos);
    });
    result['DIRECTOR TECNICO'] = players.filter(player => player.position_2 === 'DIRECTOR TECNICO');
    return result;
  }, [players]);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/players`)
    //.get('http://localhost:3001/players')
      .then(res => setPlayers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{
      backgroundColor: '#af0d33',
      backgroundImage: `radial-gradient(circle , rgba(56, 4, 4, 0.7) 0%, rgba(30, 131, 253, 0.863) 100%), url(${fondoVidrio})`,
      backgroundBlendMode: 'multiply',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      fontFamily: "'Segoe UI', Arial, sans-serif",
      margin: 0,
      padding: 0,
      minHeight: '100vh'
    }}>
      <div className="Tittle">
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to top,rgb(26, 9, 9) 0%, rgba(3, 26, 53, 0.233), rgba(0, 0, 0, 0.2), transparent), url(${campNou})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          opacity: 0.4,
          zIndex: 1,
          borderRadius: '10px'
        }} />
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
            {posiciones.map(pos => (
              <button key={pos} onClick={() => scrollToSection(pos.toLowerCase())}>
                {pos.toUpperCase()}
              </button>
            ))}
            <button onClick={() => scrollToSection('director tecnico')}>DIRECTOR TECNICO</button>
          </div>
        </div>

        {posiciones.map(pos => (
          <React.Fragment key={pos}>
            <h2 id={pos.toLowerCase()} className="titulo-position">{pos.toUpperCase()}S</h2>
            {playersByPosition[pos].map((player, index) => (
              <Link to={`/biografia/${player.id}`} style={{ textDecoration: 'none' }} key={player.id}>
                <div className={`carta-jugador ${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <img
                    src={player.photo_url}
                    alt={player.name}
                    className="foto-jugador"
                    loading="lazy"
                    decoding="async"
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
              </Link>
            ))}
          </React.Fragment>
        ))}

        <>
          <h2 id="director tecnico" className="titulo-position">DIRECTOR TÉCNICO</h2>
          {playersByPosition['DIRECTOR TECNICO'].map(player => (
            <Link to={`/biografia/${player.id}`} style={{ textDecoration: 'none' }} key={player.id}>
              <div className="carta-jugador tecnico">
                <img
                  src={player.photo_url}
                  alt={player.name}
                  className="foto-jugador"
                  loading="lazy"
                  decoding="async"
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
            </Link>
          ))}
        </>
      </div>

      <section className="sponsors-section">
        <h2>SPONSORS OFICIALES</h2>
        <div className="sponsors-logos">
          <a href="https://www.nike.com" target="_blank" rel="noopener noreferrer">
            <img src={nike} alt="Nike" />
          </a>
          <a href="https://www.spotify.com" target="_blank" rel="noopener noreferrer">
            <img src={spotify} alt="Spotify" />
          </a>
        </div>

        <section className="redes-section">
          <h2>SIGUE AL BARÇA EN REDES SOCIALES</h2>
          <div className="redes-logos">
            <a href="https://www.instagram.com/fcbarcelona" target="_blank" rel="noopener noreferrer">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="https://www.twitter.com/fcbarcelona" target="_blank" rel="noopener noreferrer">
              <img src={x} alt="Twitter/X" />
            </a>
            <a href="https://www.facebook.com/fcbarcelona" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="https://www.youtube.com/fcbarcelona" target="_blank" rel="noopener noreferrer">
              <img src={youtube} alt="YouTube" />
            </a>
          </div>
        </section>
      </section>

      <footer style={{
        backgroundColor: '#0a0a0a',
        color: '#fff',
        textAlign: 'center',
        padding: '20px 10px',
        marginTop: '50px',
        fontSize: '0.9rem'
      }}>
        <p>&copy; {new Date().getFullYear()} FC Barcelona - Proyecto desarrollado por Diego Arends</p>
        <p>Inspirado en la página oficial del primer equipo</p>
      </footer>
    </div>
  );
}

export default MainPage;