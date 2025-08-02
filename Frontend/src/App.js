import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import BiographyPage from './pages/BiographyPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/biografia/:id" element={<BiographyPage />} />
      </Routes>
    </Router>
  );
}

export default App;