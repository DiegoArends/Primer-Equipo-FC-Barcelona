import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './biography.css';
import nike from '../assets/Logo_NIKE.svg.png';
import spotify from '../assets/spotify-logo (1).svg';
import instagram from '../assets/instagram.png';
import facebook from '../assets/facebook.png';
import x from '../assets/twitter..avif';
import youtube from '../assets/youtube.png';
import './main.css';

function BiographyPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    axios
      .get(`${baseUrl}/players_biography/${id}`)
      .then(res => setPlayer(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!player) return <div className="biografia-carta">Cargando biografía...</div>;

  const isCoach = (player.position || '').toLowerCase().includes('tecnico') ||
                  (player.position || '').toLowerCase().includes('técnico') ||
                  /hansi\s*flick/i.test(player.name || '');

  return (
    <>
      <header className="header-bio">
        <div className="header-content">
          <h1>
            <Link to="/" className="brand-link">FC Barcelona</Link>
          </h1>
          <nav>
            <Link to="/" className="nav-link">Jugadores</Link>
          </nav>
        </div>
      </header>

      <div className={`biografia-carta ${isCoach ? 'sin-stats1' : ''}`}>
        <h2 className="nombre-jugador_fondo">{player.short_name}</h2>
        
          {!isCoach && (
            <div className="datos-jugador_bio">
              <ul className="stats">
                <li className="names">
                  <div><b>Partidos</b></div>
                  <div className='numbers'>{player.matches_played}</div>
                  <div>Temporada 25/26</div>
                  <div className='sub-numbers'>{player.matches_played_now}</div>
                </li>
                <li className="names">
                  <div><b>Goles</b></div>
                  <div className='numbers'>{player.goals}</div>
                  <div>Temporada 25/26</div>
                  <div className='sub-numbers'>{player.goals_now}</div>
                </li>
                <li className="names">
                  <div><b>Asistencias</b></div>
                  <div className='numbers'>{player.assists}</div>
                  <div>Temporada 25/26</div>
                  <div className='sub-numbers'>{player.assists_now}</div>
                </li>
              </ul>
            </div>
          )}

          <div className="datos-jugador_bio2">
          <h2 className="nombre">{player.name}</h2>
            <ul className="stats-2">
              <li className="names">
                <div><b>Nacimiento</b></div>
                <div className='sub-numbers'>{player.birth_date}</div>
              </li>
              {!isCoach && (
                <li className="names">
                  <div>Peso</div>
                  <div className='sub-numbers'>{player.weight_kg}kg</div>
                </li>
              )}
              <li className="names">
                <div><b>Altura</b></div>
                <div className='sub-numbers'>{player.height_m}m</div>
              </li>
              <li className="names">
                <div><b>Posición</b></div>
                <div className='sub-numbers'>{player.position}</div>
              </li>
            </ul>
          </div>
          <div className="foto-wrapper">
            <img
              src={player.photo_url}
              alt={player.name}
              className="foto-jugador_bio"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className='biografia-container'>
          <h2 className="nombre">{player.name}</h2>
          <p className='biografia'>{player.biography}</p>
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
    </>
  );
}

export default BiographyPage;