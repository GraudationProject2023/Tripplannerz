import axios from 'axios';

export const getEntireTripList = async(token: string | null) => {
    if(token){
        const response = await axios.get(`http://localhost:8080/api/trip/entireTripList`,{
            headers: {'Authorization': `Bearer ${token}` }
        }) 
        return response;
    }
    throw new Error('Token is Not Defined');
}