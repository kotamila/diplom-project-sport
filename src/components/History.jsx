import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Menu } from "./Menu";

export const History = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const history = JSON.parse(localStorage.getItem("workoutHistory") || "[]");

  return (
    <div className="page-container">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="history-main">
        <h1>Історія тренувань</h1>

        <div className="history-list">
          {history.length > 0 ? (
            history.map((workout) => (
              <div key={workout.id} className="history-card">
                <div className="card-content">
                  <p className="workout-date">{workout.date}</p>
                  <div className="workout-stats">
                    <span>{workout.exercises.length} вправи</span>
                    <span>Важкість: {workout.difficulty}/10</span>
                  </div>
                </div>
                {/* Кнопка "Переглянути" веде на сторінку деталей за ID */}
                <button
                  className="btn-view"
                  onClick={() => navigate(`/history-info/${workout.id}`)}
                >
                  Переглянути {">"}
                </button>
              </div>
            ))
          ) : (
            <p>У вас ще немає записаних тренувань.</p>
          )}
        </div>

        <button
          className="btn-analytics"
          onClick={() => navigate("/analytics")}
        >
          Переглянути аналітику
        </button>
      </main>
    </div>
  );
};
