import axios from 'axios';

export const postEmailSend = async(email: string) => {
    
    const postToServer = {
        email: email
    };

    const response = axios.post('http://localhost:8080/api/members/emailConfirm', postToServer); 
    
    return response;    
}