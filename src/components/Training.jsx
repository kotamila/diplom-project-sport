import { useState } from "react";
import { Header } from "./Header";
import { Menu } from "./Menu";

export const Training = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [exercises, setExercises] = useState([
    { id: "initial-ex", name: "", sets: [{ reps: "", weight: "" }] },
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

  const handleSaveWorkout = () => {
    const workout = {
      id: Date.now(),
      date: new Date().toLocaleDateString("uk-UA", {
        day: "numeric",
        month: "long",
        weekday: "long",
      }),
      exercises,
      difficulty,
      pulse,
    };
    const history = JSON.parse(localStorage.getItem("workoutHistory") || "[]");
    localStorage.setItem(
      "workoutHistory",
      JSON.stringify([workout, ...history]),
    );

    setExercises([
      {
        id: "initial-ex-" + Date.now(),
        name: "",
        sets: [{ reps: "", weight: "" }],
      },
    ]);
    setDifficulty(null);
    setPulse({ min: "", max: "" });
    alert("Тренування збережено!");
  };

  return (
    <div className="page-container">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main className="training-main">
        <h1>Тренавання</h1>
        {exercises.map((ex, exIdx) => (
          <div key={ex.id} className="exercise-card">
            <input
              placeholder="Назва вправи"
              className="input-field"
              value={ex.name}
              onChange={(e) => {
                const newEx = [...exercises];
                newEx[exIdx].name = e.target.value;
                setExercises(newEx);
              }}
            />
            {ex.sets.map((set, sIdx) => (
              <div key={sIdx} className="set-row">
                <input
                  placeholder="Кількість повторень"
                  className="input-small"
                />
                <input placeholder="Додаткова вага" className="input-small" />
              </div>
            ))}
            <button className="btn-add-set" onClick={() => addSet(ex.id)}>
              Додати підхід
            </button>
          </div>
        ))}
        <button className="btn-add-ex" onClick={addExercise}>
          Додати вправу
        </button>
        <button className="btn-save" onClick={handleSaveWorkout}>
          Зберегти
        </button>
      </main>
    </div>
  );
};
