import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Planner from "./pages/Planner/Planner";
import Profile from "./pages/Profile/Profile";
import MyTrips from "./pages/MyTrips/MyTrips";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* MAIN PAGES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-trips" element={<MyTrips />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;