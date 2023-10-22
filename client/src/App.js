import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StartAnimation from './pages/StartPage/StartAnimationPage'
import MainPage from './pages/MainPage/MainPage'
import Search from "./pages/SearchPage/SearchPage";
import SearchResult from "./pages/SearchPage/SearchResultPage";
import MyPage from "./pages/MyPage/MyPage";
import MyResult from "./pages/MyPage/MyResultPage";
import Notice from "./pages/NoticePage/NoticePage";
import Billing from './pages/BillingPage/BillingPage';


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<StartAnimation />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/main/:postId" element={<MyPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/my/:postId" element={<MyResult />} />
          <Route path="/search/:postId" element={<SearchResult />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/bill" element={<Billing />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
