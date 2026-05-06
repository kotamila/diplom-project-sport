import { useState, useMemo } from "react";
import Calendar from "react-calendar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Header } from "./Header";
import { Menu } from "./Menu";
import "react-calendar/dist/Calendar.css";
import "./Analytics.css";

export const Analytics = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = useMemo(
    () => !!localStorage.getItem("currentUser"),
    [],
  );

  const history = useMemo(() => {
    if (!isAuthenticated) return [];
    return JSON.parse(localStorage.getItem("workoutHistory") || "[]");
  }, [isAuthenticated]);

  const weightHistory = useMemo(() => {
    if (!isAuthenticated) return [];
    const data = JSON.parse(localStorage.getItem("weightHistory") || "[]");
    return data.sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));
  }, [isAuthenticated]);

  const workoutDates = useMemo(
    () => history.map((w) => new Date(w.date).toDateString()),
    [history],
  );

  const activityData = useMemo(() => {
    const activity = history.reduce((acc, curr) => {
      const date = new Date(curr.date);
      const day = date.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "short",
      });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(activity).map((key) => ({
      name: key,
      count: activity[key],
    }));
  }, [history]);

  const getTileClassName = ({ date, view }) => {
    if (view === "month" && workoutDates.includes(date.toDateString())) {
      return "workout-day-highlight";
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    if (view === "month" && workoutDates.includes(date.toDateString())) {
      return <div className="fire-icon">🔥</div>;
    }
    return null;
  };

  return (
    <div className="page-container">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="analytics-main">
        <section className="analytics-section">
          <h2>Календар тренувань</h2>
          <div className="calendar-wrapper">
            <Calendar
              tileContent={tileContent}
              tileClassName={getTileClassName}
            />
          </div>
        </section>

        <section className="analytics-section">
          <h2>Моніторинг щотижневої активності</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={activityData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  stroke="#1C39A1"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#1C39A1"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, "dataMax + 2"]}
                  ticks={[0, 2, 4, 6, 8, 10]}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1C39A1"
                  strokeWidth={4}
                  dot={{
                    r: 6,
                    fill: "#1C39A1",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="analytics-section">
          <h2>Моніторинг ваги</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weightHistory}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="date"
                  stroke="#1C39A1"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  stroke="#1C39A1"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[40, 170]}
                  ticks={[40, 60, 80, 100, 120, 140, 160, 170]}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#FF4D4D"
                  strokeWidth={4}
                  dot={{
                    r: 6,
                    fill: "#FF4D4D",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
};
