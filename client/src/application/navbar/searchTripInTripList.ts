export const searchTripInTripList = (navigate, event, searchTerm) => {
    event.preventDefault();
    if(event.key === 'Enter' && searchTerm !== ''){
        const url = `/search?keyword=${searchTerm}`;
        navigate(url);
    }
}