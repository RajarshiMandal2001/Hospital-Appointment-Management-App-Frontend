// src/components/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen border">
      <h1 className="text-blue-600 mb-6">Welcome</h1>
      <div className="flex justify-center gap-x-4">
        <button className="btn btn-outline btn-secondary" onClick={() => navigate("/patient")} type="button">
          Patient
        </button>
        <button className="btn btn-outline btn-primary" onClick={() => navigate("/doctor")}>Doctor</button>
      </div>
    </div>
  );
};

export default HomePage;
