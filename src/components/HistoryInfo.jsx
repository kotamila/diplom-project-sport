import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Menu } from "./Menu";

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
        <p>Тренування не знайдено</p>
        <button onClick={() => navigate("/history")}>Назад до історії</button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="history-info-main">
        <button className="btn-back" onClick={() => navigate("/history")}>
          {"<"} Назад
        </button>

        <h1>Інформація про тренування</h1>
        <p className="workout-date-title">{workout.date}</p>

        <section className="exercises-results">
          {workout.exercises.map((ex, idx) => (
            <div key={ex.id || idx} className="exercise-result-block">
              <h3>{ex.name}</h3>
              <div className="sets-list">
                {ex.sets.map((set, sIdx) => (
                  <div key={sIdx} className="set-item">
                    <span>Підхід {sIdx + 1}:</span>
                    <span>{set.reps} повторень</span>
                    {set.weight && <span>(+{set.weight} кг)</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="additional-info-results">
          <div className="info-row">
            <span>Пульс:</span>
            <span>
              {workout.pulse.min} - {workout.pulse.max} уд/хв
            </span>
          </div>
          <div className="info-row">
            <span>Важкість тренування:</span>
            <div className="difficulty-indicator">
              <strong>{workout.difficulty}</strong> / 10
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
