import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h1>Velkommen til Fixmatch 🚀</h1>;
}

function Login() {
  return <h2>Login-side</h2>;
}

function Register() {
  return <h2>Tilmeldings-side</h2>;
}

export default function App() {
  return (
    <Router>
      <nav style={{ padding: 10 }}>
        <Link to="/" style={{ marginRight: 10 }}>Hjem</Link>
        <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
        <Link to="/register">Tilmeld</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}