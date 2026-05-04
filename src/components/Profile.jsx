import { useState } from "react";
import { Header } from "./Header";
import { Menu } from "./Menu";
import "./Profile.css";
import "./common.css";

export const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved
      ? JSON.parse(saved)
      : { firstName: "", lastName: "", email: "", birthday: "", weight: "" };
  });

  const [loginData, setLoginData] = useState({ firstName: "", lastName: "" });

  const [view, setView] = useState(() => {
    return localStorage.getItem("user") ? "details" : "register";
  });

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isRegisterFormValid =
    user.firstName.trim() !== "" &&
    user.lastName.trim() !== "" &&
    isEmailValid(user.email) &&
    user.birthday.trim() !== "" &&
    user.weight.trim() !== "";

  const isLoginFormValid =
    loginData.firstName.trim() !== "" && loginData.lastName.trim() !== "";

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setView("details");
  };

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser) {
      setUser(savedUser);
    } else {
      const newUser = {
        ...user,
        firstName: loginData.firstName,
        lastName: loginData.lastName,
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    }
    setView("details");
  };

  const handleWeightChange = (newWeight) => {
    const updated = { ...user, weight: newWeight };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      birthday: "",
      weight: "",
    });
    setLoginData({ firstName: "", lastName: "" });
    setView("register");
  };

  return (
    <div className="page-container">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {view === "register" && (
        <main className="profile-form">
          <h1>Профіль</h1>
          <input
            type="text"
            placeholder="Ім'я"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Прізвище"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Електронна пошта"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="date"
            placeholder="Дата народження"
            value={user.birthday}
            onChange={(e) => setUser({ ...user, birthday: e.target.value })}
          />
          <input
            type="number"
            placeholder="Вага"
            value={user.weight}
            onChange={(e) => setUser({ ...user, weight: e.target.value })}
          />
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={!isRegisterFormValid}
          >
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
          <input
            type="text"
            placeholder="Ім'я"
            value={loginData.firstName}
            onChange={(e) =>
              setLoginData({ ...loginData, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Прізвище"
            value={loginData.lastName}
            onChange={(e) =>
              setLoginData({ ...loginData, lastName: e.target.value })
            }
          />
          <button
            className="btn-primary"
            onClick={handleLogin}
            disabled={!isLoginFormValid}
          >
            Увійти
          </button>
          <p className="login-link" onClick={() => setView("register")}>
            Немає акаунту? Реєстрація
          </p>
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
            <p className="info-value">{user.email || "Не вказано"}</p>
            <p className="info-label">Дата народження</p>
            <p className="info-value">{user.birthday || "Не вказано"}</p>
          </div>
          <div className="weight-edit">
            <span>Вага</span>
            <input
              type="number"
              value={user.weight}
              onChange={(e) => handleWeightChange(e.target.value)}
            />
          </div>
          <button className="btn-secondary" onClick={handleLogout}>
            Вийти
          </button>
        </main>
      )}
    </div>
  );
};
