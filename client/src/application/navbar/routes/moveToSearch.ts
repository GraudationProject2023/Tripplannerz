import { useNavigate } from "react-router-dom"

export const MoveToSearch = () => {
    const navigate = useNavigate();
    navigate(`/search?keyword=`);
}