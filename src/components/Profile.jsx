import { useState } from "react";
import { Header } from "./Header";
import { Menu } from "./Menu";
import "./Profile.css";
import "./common.css";

export const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const [user, setUser] = useState(() => {
    const activeSession = localStorage.getItem("currentUser");
    return activeSession
      ? JSON.parse(activeSession)
      : { firstName: "", lastName: "", email: "", birthday: "", weight: "" };
  });

  const [loginData, setLoginData] = useState({ firstName: "", lastName: "" });

  const [view, setView] = useState(() => {
    return localStorage.getItem("currentUser") ? "details" : "register";
  });

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isRegisterFormComplete =
    user.firstName.trim() !== "" &&
    user.lastName.trim() !== "" &&
    user.email.trim() !== "" &&
    user.birthday.trim() !== "" &&
    user.weight.trim() !== "";

  const isLoginFormValid =
    loginData.firstName.trim() !== "" && loginData.lastName.trim() !== "";

  const updateWeightHistory = (weightValue) => {
    if (!weightValue) return;
    const history = JSON.parse(localStorage.getItem("weightHistory") || "[]");
    const lastEntry = history[history.length - 1];

    if (lastEntry && lastEntry.weight === Number(weightValue)) return;

    const now = new Date();
    const timeLabel = now.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateLabel = now.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "short",
    });

    const newEntry = {
      date: `${dateLabel} ${timeLabel}`,
      weight: Number(weightValue),
      fullDate: now.toISOString(),
    };

    localStorage.setItem(
      "weightHistory",
      JSON.stringify([...history, newEntry]),
    );
  };

  const handleSave = () => {
    if (!isRegisterFormComplete) {
      setRegisterError("Будь ласка, введіть всі дані.");
      return;
    }

    if (!isEmailValid(user.email)) {
      setRegisterError("Будь ласка, введіть коректну електронну пошту.");
      return;
    }

    localStorage.setItem("registeredUser", JSON.stringify(user));
    localStorage.setItem("currentUser", JSON.stringify(user));

    updateWeightHistory(user.weight);
    setRegisterError("");
    setView("details");
  };

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      savedUser &&
      savedUser.firstName.toLowerCase() === loginData.firstName.toLowerCase() &&
      savedUser.lastName.toLowerCase() === loginData.lastName.toLowerCase()
    ) {
      setUser(savedUser);
      localStorage.setItem("currentUser", JSON.stringify(savedUser));
      updateWeightHistory(savedUser.weight);
      setLoginError("");
      setView("details");
    } else {
      setLoginError(
        "Акаунт не знайдено. Перевірте дані або зареєструйтесь (пам'ятайте про регістр).",
      );
    }
  };

  const handleWeightChange = (newWeight) => {
    const updatedUser = { ...user, weight: newWeight };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("registeredUser", JSON.stringify(updatedUser));
  };

  const handleWeightBlur = () => {
    if (user.weight && user.weight.trim() !== "") {
      updateWeightHistory(user.weight);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      birthday: "",
      weight: "",
    });
    setLoginData({ firstName: "", lastName: "" });
    setView("login");
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
            onChange={(e) => {
              setUser({ ...user, firstName: e.target.value });
              setRegisterError("");
            }}
          />
          <input
            type="text"
            placeholder="Прізвище"
            value={user.lastName}
            onChange={(e) => {
              setUser({ ...user, lastName: e.target.value });
              setRegisterError("");
            }}
          />
          <input
            type="email"
            placeholder="Електронна пошта"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
              setRegisterError("");
            }}
          />

          <input
            type="date"
            placeholder="Дата народження"
            value={user.birthday}
            onChange={(e) => {
              setUser({ ...user, birthday: e.target.value });
              setRegisterError("");
            }}
          />

          <input
            type="number"
            placeholder="Вага"
            value={user.weight}
            onChange={(e) => {
              setUser({ ...user, weight: e.target.value });
              setRegisterError("");
            }}
          />

          <button className="btn-primary" onClick={handleSave}>
            Зареєструватись
          </button>

          {registerError && (
            <p
              className="error-message"
              style={{ color: "red", marginTop: "10px", fontSize: "14px" }}
            >
              {registerError}
            </p>
          )}

          <p
            className="login-link"
            onClick={() => {
              setView("login");
              setLoginError("");
              setRegisterError("");
            }}
          >
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
            onChange={(e) => {
              setLoginData({ ...loginData, firstName: e.target.value });
              setLoginError("");
            }}
          />
          <input
            type="text"
            placeholder="Прізвище"
            value={loginData.lastName}
            onChange={(e) => {
              setLoginData({ ...loginData, lastName: e.target.value });
              setLoginError("");
            }}
          />
          <button
            className="btn-primary"
            onClick={handleLogin}
            disabled={!isLoginFormValid}
          >
            Увійти
          </button>

          {loginError && (
            <p
              className="error-message"
              style={{ color: "red", marginTop: "10px", fontSize: "14px" }}
            >
              {loginError}
            </p>
          )}

          <p
            className="login-link"
            onClick={() => {
              setView("register");
              setLoginError("");
              setRegisterError("");
            }}
          >
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
            <span>Вага (кг)</span>
            <input
              type="number"
              value={user.weight}
              onChange={(e) => handleWeightChange(e.target.value)}
              onBlur={handleWeightBlur}
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
