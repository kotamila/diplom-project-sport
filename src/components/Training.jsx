import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Menu } from "./Menu";
import "./Training.css";
import "./common.css";

export const Training = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [exercises, setExercises] = useState([
    { id: 1, name: "", sets: [{ reps: "", weight: "" }] },
  ]);

  const [difficulty, setDifficulty] = useState(null);
  const [pulse, setPulse] = useState({ min: "", max: "" });

  const addSet = (exId) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exId
          ? { ...ex, sets: [...ex.sets, { reps: "", weight: "" }] }
          : ex,
      ),
    );
  };

  const addExercise = () => {
    setExercises([
      ...exercises,
      { id: Date.now(), name: "", sets: [{ reps: "", weight: "" }] },
    ]);
  };

  const updateSet = (exIdx, sIdx, field, value) => {
    const newEx = [...exercises];
    newEx[exIdx].sets[sIdx][field] = value;
    setExercises(newEx);
    setErrorMessage("");
  };

  const handleSaveWorkout = () => {
    const isValid = exercises.every(
      (ex) =>
        ex.name.trim() !== "" && ex.sets.some((set) => set.reps.trim() !== ""),
    );

    if (!isValid) {
      setErrorMessage(
        "Будь ласка, введіть назву вправи та кількість повторень!",
      );
      return;
    }

    const workout = {
      id: Date.now(),
      date: new Date().toISOString(),
      exercises: exercises.filter((ex) => ex.name.trim() !== ""),
      difficulty: difficulty || "Не вказано",
      pulse,
    };

    const history = JSON.parse(localStorage.getItem("workoutHistory") || "[]");
    localStorage.setItem(
      "workoutHistory",
      JSON.stringify([workout, ...history]),
    );

    navigate("/history");
  };

  return (
    <div className="page-container">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="training-main">
        <h1 className="training-title">Тренування</h1>

        <div className="training-content-wrapper">
          {exercises.map((ex, exIdx) => (
            <div key={ex.id} className="exercise-card">
              <input
                placeholder="Назва вправи"
                className="input-field main-exercise-input"
                value={ex.name}
                onChange={(e) => {
                  const newEx = [...exercises];
                  newEx[exIdx].name = e.target.value;
                  setExercises(newEx);
                  setErrorMessage("");
                }}
              />

              {ex.sets.map((set, sIdx) => (
                <div key={sIdx} className="set-row">
                  <input
                    placeholder="Кількість повторень"
                    className="input-small"
                    value={set.reps}
                    onChange={(e) =>
                      updateSet(exIdx, sIdx, "reps", e.target.value)
                    }
                  />
                  <input
                    placeholder="Додаткова вага"
                    className="input-small"
                    value={set.weight}
                    onChange={(e) =>
                      updateSet(exIdx, sIdx, "weight", e.target.value)
                    }
                  />
                </div>
              ))}

              <button className="btn-add-set" onClick={() => addSet(ex.id)}>
                + Додати підхід
              </button>
            </div>
          ))}

          <button className="btn-add-ex" onClick={addExercise}>
            Додати вправу
          </button>

          {/* СЕКЦІЯ ПУЛЬСУ */}
          <section className="training-section">
            <h2 className="section-subtitle">Пульс</h2>
            <div className="pulse-container">
              <input
                type="number"
                placeholder="Мін"
                className="pulse-input"
                value={pulse.min}
                onChange={(e) => setPulse({ ...pulse, min: e.target.value })}
              />
              <span className="pulse-divider">—</span>
              <input
                type="number"
                placeholder="Макс"
                className="pulse-input"
                value={pulse.max}
                onChange={(e) => setPulse({ ...pulse, max: e.target.value })}
              />
            </div>
          </section>

          <section className="training-section">
            <h2 className="section-subtitle">Складність</h2>
            <div className="difficulty-grid">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i + 1}
                  className={`diff-box box-${i + 1} ${
                    difficulty === i + 1 ? "active" : ""
                  }`}
                  onClick={() => {
                    setDifficulty(i + 1);
                    setErrorMessage("");
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </section>

          {errorMessage && (
            <p
              className="error-message-text"
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              {errorMessage}
            </p>
          )}

          <button className="btn-save-workout" onClick={handleSaveWorkout}>
            Зберегти
          </button>
        </div>
      </main>
    </div>
  );
};
