import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login';
import Turno from './pages/turno';
import DashboardPage from './pages/dashboard';
import CrearPaciente from './pages/pacientes';
import Atencion from './pages/atencion';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/turno" element={<Turno />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/pacientes" element={<CrearPaciente />} />
      <Route path="/atencion" element={<Atencion />} />
    </Routes>
  </BrowserRouter>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
