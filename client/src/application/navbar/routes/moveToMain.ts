import { useNavigate } from "react-router-dom";

export const MoveToMain = () => {
    const navigate = useNavigate();
    navigate('/main');
}