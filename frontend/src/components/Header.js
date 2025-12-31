import { Link, useNavigate, useLocation } from 'react-router-dom';
import "../components/PetMatchStyle.css";
import '../components/Header.css';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToAbout: true } });
    } else {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="header">
        <div className="logo" >
          <h2>PawMatch 🐾</h2>
        </div>

      <nav className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/match">Quiz</Link>
        <Link to="/profile">Pets</Link>
        <Link to="/food">Food</Link>
        <Link to="/care">Tips</Link>
        <a href="#about" onClick={handleAboutClick} className="about-link">About Us</a>
      </nav>

      <div className="header-actions">
        <Link to="/login" className="login-btn-main">Login</Link>
      </div>
    </header>
  );
}
