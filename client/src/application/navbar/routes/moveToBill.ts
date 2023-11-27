import { useNavigate } from "react-router-dom"

export const MoveToBill = () => {
    const navigate = useNavigate();
    navigate('/bill');
}
