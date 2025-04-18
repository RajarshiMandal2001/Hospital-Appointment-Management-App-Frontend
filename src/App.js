// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import PatientPage from "./components/PatientPage";
import DoctorPage from "./components/DoctorPage";
import LoginForm from "./components/LoginForm";
import DoctorRegistration from "./components/DoctorRegistration";
import PatientRegistration from "./components/PatientRegistration";

const ProtectedRoute = ({ children }) => {
  const tokenInfo = localStorage.getItem('token');
  const isAuthenticated = !!tokenInfo;

  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/patient"
          element={
            <ProtectedRoute>
              <PatientPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <DoctorPage />
            </ProtectedRoute>
          }
        />
        <Route path="/doctor/register" element={<DoctorRegistration />} />
        <Route path="/patient/register" element={<PatientRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
