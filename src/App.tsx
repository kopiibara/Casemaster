import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/login/SignIn";
import DashboardPage from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Include Login */}
        <Route path="/" element={<SignIn />} />
        {/* Include Dashboard */}
        <Route path="/dashboard/*" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
