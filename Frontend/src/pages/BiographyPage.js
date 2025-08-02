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
    axios.get(`${process.env.REACT_APP_API_URL}/players_biography/${id}`)
    //.get(`http://localhost:3001/players_biography/${id}`)
      .then(res => setPlayer(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!player) return <div className="biografia-carta">Cargando biografía...</div>;

  return (
    <>
      <header className="header-bio">
        <div className="header-content">
          <h1>FC Barcelona</h1>
          <nav>
            <Link to="/" className="nav-link">Jugadores</Link>
          </nav>
        </div>
      </header>

      <div className="biografia-carta">
        <h2 className="nombre-jugador_fondo">{player.short_name}</h2>
        
          <div className="datos-jugador_bio">
            <ul className="stats">
              <li className="names">
                <li><b>Partidos</b></li>
                <li className='numbers'>{player.matches_played}</li>
                <li>Temporada 25/26</li>
                <li className='sub-numbers'>{player.matches_played_now}</li>
              </li>
              <li className="names">
                <li><b>Goles</b></li>
                <ul className="stats"></ul>
                <li className='numbers'>{player.goals}</li>
                <li>Temporada 25/26</li>
                <li className='sub-numbers'>{player.goals_now}</li>
              </li>
              <li className="names">
                <li><b>Asistencias</b></li>
                <li className='numbers'>{player.assists}</li>
                <li>Temporada 25/26</li>
                <li className='sub-numbers'>{player.assists_now}</li>  
              </li>
            </ul>
          </div>

          <div className="datos-jugador_bio2">
          <h2 className="nombre">{player.name}</h2>
            <ul className="stats-2">
              <li className="names">
                <li><b>Nacimiento</b></li>
                <li className='sub-numbers'>{player.birth_date}</li>
              </li>
              <li className="names">
                <li>Peso</li>
                <li className='sub-numbers'>{player.weight_kg}kg</li>
              </li>
              <li className="names">
                <li><b>Altura</b></li>
                <li className='sub-numbers'>{player.height_m}m</li>
              </li>
              <li className="names">
              <li><b>Posición</b></li>
                <li className='sub-numbers'>{player.position}</li>
              </li>
            </ul>
          </div>
          <img
            src={player.photo_url}
            alt={player.name}
            className="foto-jugador_bio"
          />
        </div>

        <div className='biografia-container'>
        <h2 className="nombre">{player.name}</h2>
        <h2 className='biografia'>{player.biography}</h2>
      
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