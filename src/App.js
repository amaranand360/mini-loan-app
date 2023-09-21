import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import LoanDetails from './pages/LoanDetails';
import RepaymentForm from './components/RepaymentForm'

const App = ()=> {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/repayment/:id" element={<RepaymentForm />} />
          <Route path="/loan-details/:id" element={<LoanDetails />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
