import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import CompanyPage from './Pages/CompanyPage';
import EmployerPage from './Pages/Employerage';
import Dashboard from './Components/Dashboard';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50">
        {/* Navbar Component */}
        <Navbar />
        
        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/companies" element={<CompanyPage />} />
          <Route path="/employees" element={<EmployerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
