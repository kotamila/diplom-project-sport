import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Menu } from "./Menu";
import "./History.css";
import "./common.css";

export const History = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [history] = useState(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return [];

    return JSON.parse(localStorage.getItem("workoutHistory") || "[]");
  });

  return (
    <div className="page-container">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="history-main">
        <h1 className="history-title">Історія тренувань</h1>

        <div className="history-list">
          {history.length > 0 ? (
            history.map((workout) => (
              <div key={workout.id} className="history-card">
                <div className="card-content">
                  <p className="workout-date">
                    {new Date(workout.date).toLocaleDateString("uk-UA", {
                      day: "numeric",
                      month: "long",
                      weekday: "long",
                    })}
                  </p>
                  <div className="workout-stats">
                    <span className="stats-item">
                      <strong>{workout.exercises.length}</strong> вправи
                    </span>
                    <span className="stats-item">
                      Важкість: <strong>{workout.difficulty}/10</strong>
                    </span>
                  </div>
                </div>
                <button
                  className="btn-view"
                  onClick={() => navigate(`/history-info/${workout.id}`)}
                >
                  Переглянути {">"}
                </button>
              </div>
            ))
          ) : (
            <div className="empty-history">
              <p>У вас ще немає записаних тренувань.</p>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <button
            type="button"
            className="btn-analytics"
            onClick={() => navigate("/analytics")}
          >
            Переглянути аналітику
          </button>
        )}
      </main>
    </div>
  );
};
