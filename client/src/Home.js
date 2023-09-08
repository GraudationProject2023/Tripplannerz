import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";

const Home = () => {
    return(
        <>
         <NavBar />
         <Outlet />
        </>
    )
}

export default Home;