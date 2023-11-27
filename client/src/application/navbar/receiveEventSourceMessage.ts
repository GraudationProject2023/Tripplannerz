export const ReceiveEventSourceMessage = ({dispatch, event, eventSource, eventSourceRef}) => {
    const newMessage = event.data;

    if(newMessage[0] === '{') {
        const jsonData = JSON.parse(newMessage);

        const messageContent = {
            senderName: jsonData.senderName,
            review: jsonData.review,
            postDate: jsonData.postDate
        }

        const notificationString = `${messageContent.senderName}님이 \n 
        ${messageContent.review.slice(0,4)}..를 입력하였습니다.\n 
        ${messageContent.postDate}`;
        dispatch(notificationString);
    }

    eventSource.addEventListener('SSE', ReceiveEventSourceMessage);

    if(!eventSourceRef.current) {
        eventSource.onopen = () => {
            console.log('SSE Connection Opened.');
        }
    }

    eventSource.onerror = (error) => {
        console.log('SSE Connection Closed.', error);
    }

    return () => {
        if(eventSourceRef.current){
            eventSource.removeEventListener('SSE', ReceiveEventSourceMessage);
        }

        eventSource.close();
    }
}