import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Menu } from "./Menu";

export const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Header onMenuOpen={() => setIsMenuOpen(true)} />

      <main className="main-content">
        <section className="welcome-section">
          <h1 className="welcome-title">Вітаємо у SPORT!</h1>
          <p className="welcome-subtitle">
            Твій шлях до нових вершин починається тут
          </p>
        </section>

        <div className="illustration-container">
          <img
            src="/images/image_home_skreen.png"
            alt="Running person illustration"
            className="hero-illustration"
          />
        </div>

        <div className="action-buttons">
          <button className="btn-primary" onClick={() => navigate("/training")}>
            Почати тренування
          </button>

          <button
            className="btn-secondary"
            onClick={() => navigate("/history")}
          >
            Історія тренувань
          </button>
        </div>
      </main>
    </div>
  );
};
