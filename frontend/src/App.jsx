import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Planner from "./pages/Planner/Planner";
import Profile from "./pages/Profile/Profile";
import TripDetails from "./pages/TripDetails/TripDetails";


function App() {

return (

<BrowserRouter>

  <Navbar />

  <Routes>

    <Route path="/" element={<Home />} />

    <Route path="/login" element={<Login />} />

    <Route path="/signup" element={<Signup />} />


    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />


    <Route
      path="/planner"
      element={
        <ProtectedRoute>
          <Planner />
        </ProtectedRoute>
      }
    />


    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />


    <Route
      path="/trip-details"
      element={
        <ProtectedRoute>
          <TripDetails />
        </ProtectedRoute>
      }
    />

    <Route
  path="/trip/:id"
  element={
    <ProtectedRoute>
      <TripDetails />
    </ProtectedRoute>
  }
/>


  </Routes>

</BrowserRouter>

);

}

export default App;