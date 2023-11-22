import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "@/ui/main/main";

function App() {
  return(
    <Router>
      <Suspense fallback = {<div>Loading...</div>}>
        <Routes>
          <Route path="/main" element={<MainPage />}></Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App;