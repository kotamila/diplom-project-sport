import './common.css';

export const Header = ({ onMenuOpen }) => (
  <header className="header">
    <div className="logo">SPORT</div>
    <button className="burger-menu" onClick={onMenuOpen}>
      <img src="/images/burger.png" alt="Menu" />
    </button>
  </header>
);

