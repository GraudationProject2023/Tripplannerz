import axios from 'axios';

export const postMemberRegister = async(name: string, gender: string, email: string, pw: string, types: string[]) => {
    
    const postToServer = {
        name: name,
        gender: gender,
        email: email,
        pw: pw,
        types: types
    };

    const response = axios.post('http://localhost:8080/api/members/register', postToServer); 
    
    return response;    
}