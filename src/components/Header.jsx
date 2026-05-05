import './common.css';
import './Header.css';

export const Header = ({ onMenuOpen }) => (
  <header className="header-wrapper">
    <p className="logo"> SPORT</p>
    <button
      className="burger-menu"
      onClick={onMenuOpen}
      aria-label="Відкрити меню"
    >
      <div className="burger-icon-lines">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  </header>
);
