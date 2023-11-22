import axios from 'axios';

export const postEmailConfirm = async(email: string, emailConfirmCode: string) => {
    
    const postToServer = {
        emailConfirmCode: emailConfirmCode,
        email: email
    };

    const response = axios.post('http://localhost:8080/api/members/loginJWT', postToServer); 
    
    return response;    
}