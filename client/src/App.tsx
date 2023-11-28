import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "@/ui/navbar/navbar";

import StartPage from "@/ui/start/start";
import MainPage from "@/ui/main/main";


function App() {

  const token: string | null = useSelector((state: any) => state.token.token);

  return(
    <Router>
      <Suspense fallback = {<div>Loading...</div>}>
        {token && <Navbar />}
        <Routes>
          <Route path="/" element={<StartPage />}></Route> 
          {token && <Route path="/main" element={<MainPage />}></Route>}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App;