import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StartAnimation from './components/StartPage/StartAnimationPage'
import MainPage from "./components/MainPage/MainPage";
import Search from "./components/SearchPage/SearchPage";
import SearchResult from "./components/SearchPage/SearchResultPage";
import Find from "./components/FindPage/FindPage";
import MyPage from "./components/MyPage/MyPage";
import MyResult from "./components/MyPage/MyResultPage";
import Notice from "./components/NoticePage/NoticePage";


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
          <Route path="/find" element={<Find />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/notice" element={<Notice />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
