import './common.css';
import './Header.css';

export const Header = ({ onMenuOpen }) => (
  <header className="header">
    <div className="logo">SPORT</div>
    <button className="burger-menu" onClick={onMenuOpen}>
      <img src="public/images/burger.png" alt="Menu" />
    </button>
  </header>
);

