import React,{Suspense} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route 
} from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path ="/" element={<LoginPage />} />
          <Route path ="/login" element={<LoginPage />} />
          <Route path ="/register" element={<RegisterPage />} />
         </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
