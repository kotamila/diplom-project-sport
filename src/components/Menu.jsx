import './Menu.css';
import "./common.css";

import { Link } from "react-router-dom";

export const Menu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="menu-overlay">
      <header className="menu-header">
        <img
          src="./public/images/logo_white.png"
          alt="Logo"
          className="logo-white"
        />
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Закрити меню"
        >
          <span className="close-icon"></span>
        </button>
      </header>

      <nav className="menu-nav">
        <ul className="menu-list">
          <li>
            <Link to="/" className="menu-item" onClick={onClose}>
              Головна
            </Link>
          </li>
          <li>
            <Link to="/profile" className="menu-item" onClick={onClose}>
              Профіль
            </Link>
          </li>
          <li>
            <Link to="/training" className="menu-item" onClick={onClose}>
              Записати тренування
            </Link>
          </li>
          <li>
            <Link to="/history" className="menu-item" onClick={onClose}>
              Історія тренувань
            </Link>
          </li>
          <li>
            <Link to="/analytics" className="menu-item" onClick={onClose}>
              Аналітика
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
