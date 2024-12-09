import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignUp, Login, Profile, Home, NotFound } from "./Pages/page";
import { Navbar } from "./Components/index";
import { useAuth } from "./Zustand/useAuth";

const App = () => {
  const { userData } = useAuth();
  return (
    <div className="h-screen">
      <Navbar />
      <Routes>
        {/* Home route - show Home if user is logged in, else show SignUp */}
        <Route path="/" element={userData ? <Home /> : <Navigate to={"/login"} />} />
        
        {/* SignUp route - prevent logged-in users from accessing signup */}
        <Route path="/signup" element={userData ? <Navigate to="/" /> : <SignUp />} />
        
        {/* Login route - prevent logged-in users from accessing login */}
        <Route path="/login" element={userData ? <Navigate to="/" /> : <Login />} />
        
        {/* Profile route - redirect to login if not logged in */}
        <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/login" />} />
        
        {/* Catch-all route for non-existent paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
