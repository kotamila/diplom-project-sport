import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { Training } from "./components/Training";
import { History } from "./components/History";
import { HistoryInfo } from "./components/HistoryInfo";

const AnalyticsPlaceholder = () => (
  <div className="page-container">
    <h1 style={{ padding: "20px" }}>Аналітика (в розробці)</h1>
  </div>
);

export function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/training" element={<Training />} />

          <Route path="/history" element={<History />} />

          <Route path="/history-info/:id" element={<HistoryInfo />} />

          <Route path="/analytics" element={<AnalyticsPlaceholder />} />
        </Routes>
      </div>
    </Router>
  );
}

