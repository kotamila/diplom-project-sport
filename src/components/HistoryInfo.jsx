import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Menu } from "./Menu";
import "./HistoryInfo.css";
import "./common.css";

export const HistoryInfo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const history = JSON.parse(localStorage.getItem("workoutHistory") || "[]");
  const workout = history.find((w) => w.id === Number(id));

  if (!workout) {
    return (
      <div className="page-container">
        <Header onMenuOpen={() => setIsMenuOpen(true)} />
        <div className="error-container">
          <p>Тренування не знайдено</p>
          <button
            className="btn-back-main"
            onClick={() => navigate("/history")}
          >
            Назад до історії
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="history-info-main">
        <section className="summary-box">
          <h2>Інформація про тренування</h2>
          <div className="summary-content">
            <p>
              Дата:{" "}
              {new Date(workout.date).toLocaleDateString("uk-UA", {
                day: "numeric",
                month: "long",
                weekday: "long",
              })}
            </p>
            <p>Кількість вправ: {workout.exercises.length}</p>
            <p>
              Кількість підходів:{" "}
              {workout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0)}
            </p>
            <p>Середній пульс під час тренування: {workout.pulse.max} уд/хв</p>
            <p>Оцінка важкості тренування: {workout.difficulty}</p>
          </div>
        </section>
        <section className="exercises-grid">
          {workout.exercises.map((ex, idx) => (
            <div key={ex.id || idx} className="exercise-card">
              <h3>
                Вправа {idx + 1} – {ex.name}
              </h3>
              <p className="sets-count">{ex.sets.length} підходи</p>

              <div className="sets-info">
                <p className="info-label">Інформація про підходи:</p>
                {ex.sets.map((set, sIdx) => (
                  <div key={sIdx} className="set-input-display">
                    {set.reps} повторень{" "}
                    {set.weight ? `(+${set.weight} кг)` : ""}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};
