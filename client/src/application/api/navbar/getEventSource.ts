import { EventSourcePolyfill } from "event-source-polyfill";

export const GetEventSource = (token: string | null) => {
    if(token){
        const response = new EventSourcePolyfill('http://localhost:8080/api/sub',{
            headers: {'Authorization': `Bearer ${token}`},
            withCredentials: true,
            heartbeatTimeout: 300000,
        })
        return response;
    }
    
    throw new Error('Token is not valid');
}