import './Menu.css';
import "./common.css";

import { Link } from "react-router-dom";

export const Menu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="menu-overlay">
      <header className="menu-header">
        <div className="logo-white">SPORT</div>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Закрити меню"
        >
          <img src="/images/close_button.png" alt="Close" />
        </button>
      </header>

      <nav className="menu-nav">
        <ul>
          <li>
            <Link to="/" onClick={onClose}>
              Головна
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={onClose}>
              Профіль
            </Link>
          </li>
          <li>
            <Link to="/training" onClick={onClose}>
              Записати тренування
            </Link>
          </li>
          <li>
            <Link to="/history" onClick={onClose}>
              Історія тренувань
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
