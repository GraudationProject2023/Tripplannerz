import React,{Suspense} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route 
} from 'react-router-dom';

import StartPage from './components/StartPage/StartPage';
import MainPage from './components/MainPage/MainPage';
import InitPage from './components/InitPage/InitPage';
import LoginCallbackpage from './components/StartPage/Kakao/LoginCallbackpage';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path ="/" element={<StartPage />} />
          <Route path ="/main" element={<MainPage />} />
          <Route path ="/schedule" element={<InitPage />} />
          <Route path ="/logincallback" element={<LoginCallbackpage />} />
          <Route path ="/chat" element={<Chat />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
