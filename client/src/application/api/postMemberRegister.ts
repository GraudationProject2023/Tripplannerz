import axios from 'axios';

export const postMemberRegister = async(name: string, gender: string, pw: string, email: string, types: string | null) => {
    
    const postToServer = {
        name: name,
        gender: gender,
        pw: pw,
        email: email,
        types: types
    };

    const response = axios.post('http://localhost:8080/api/members/register', postToServer); 
    
    return response;    
}