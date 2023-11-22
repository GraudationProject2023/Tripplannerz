import axios from 'axios';

export const postLoginJwt = async(email: string, pw: string) => {
    
    const postToServer = {
        email: email,
        pw: pw
    };

    const response = axios.post('http://localhost:8080/api/members/loginJWT', postToServer); 
    
    return response;    
}