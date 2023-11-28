import { EventSourcePolyfill } from 'event-source-polyfill';

export const getEventSoruce = (token: string) => {
    const response = new EventSourcePolyfill('http://localhost:8080/api/sub',{
        headers: {'Authorization': `Bearer ${token}`},
        withCredentials: true,
        heartbeatTimeout: 300000,
    })

    return response;
}