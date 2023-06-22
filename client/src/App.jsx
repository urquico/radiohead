import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Profile from "./routes/Profile";

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/profile"} element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
