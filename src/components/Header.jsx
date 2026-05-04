import './common.css';
import './Header.css';

export const Header = ({ onMenuOpen }) => (
  <header className="header-wrapper">
    <img src="./public/images/logo.png" alt="Logo" className="logo" />
    <button className="burger-menu" onClick={onMenuOpen}>
      <img
        src="./public/images/burger.png"
        alt="Menu"
        className="burger-icon"
      />
    </button>
  </header>
);
