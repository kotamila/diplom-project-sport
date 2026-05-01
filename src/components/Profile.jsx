import { useState } from "react";
import { Header } from "./Header";
import { Menu } from "./Menu";

export const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved
      ? JSON.parse(saved)
      : { firstName: "", lastName: "", email: "", birthday: "", weight: "" };
  });

  const [view, setView] = useState(() => {
    return localStorage.getItem("user") ? "details" : "register";
  });

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setView("details");
  };

  const handleWeightChange = (newWeight) => {
    const updated = { ...user, weight: newWeight };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return (
    <div className="page-container">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {view === "register" && (
        <main className="profile-form">
          <h1>Профіль</h1>
          <input
            placeholder="Ім'я"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
          <input
            placeholder="Прізвище"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
          <input
            placeholder="Електронна пошта"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            placeholder="Дата народження"
            value={user.birthday}
            onChange={(e) => setUser({ ...user, birthday: e.target.value })}
          />
          <input
            placeholder="Вага"
            value={user.weight}
            onChange={(e) => setUser({ ...user, weight: e.target.value })}
          />
          <button className="btn-primary" onClick={handleSave}>
            Зареєструватись
          </button>
          <p className="login-link" onClick={() => setView("login")}>
            Вже є акаунт? Увійти
          </p>
        </main>
      )}

      {view === "login" && (
        <main className="profile-form">
          <h1>Профіль</h1>
          <input placeholder="Ім'я" />
          <input placeholder="Прізвище" />
          <button className="btn-primary" onClick={() => setView("details")}>
            Увійти
          </button>
        </main>
      )}

      {view === "details" && (
        <main className="profile-details">
          <h1>Профіль</h1>
          <div className="user-info">
            <p className="info-label">Ім'я Прізвище</p>
            <p className="info-value">
              {user.firstName} {user.lastName}
            </p>
            <p className="info-label">Електронна пошта</p>
            <p className="info-value">{user.email}</p>
            <p className="info-label">Дата народження</p>
            <p className="info-value">{user.birthday}</p>
          </div>
          <div className="weight-edit">
            <span>Вага</span>
            <input
              value={user.weight}
              onChange={(e) => handleWeightChange(e.target.value)}
            />
            <img src="/images/edit-icon.svg" alt="edit" className="edit-icon" />
          </div>
          <button
            className="btn-secondary"
            onClick={() => {
              localStorage.removeItem("user");
              setView("register");
            }}
          >
            Вийти
          </button>
        </main>
      )}
    </div>
  );
};
