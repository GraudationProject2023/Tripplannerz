import axios from "axios";

export const postTripInfo = async(token :string, formData: FormData) => {
    const response = await axios.post('http://localhost:8080/api/trip/create', formData, {
        headers: {"Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`}
    })
        
    return response;
}