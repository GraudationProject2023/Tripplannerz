export const handleSearch = (navigate, event, searchTerm) => {
    if(event.key === "Enter" && searchTerm !== ""){
        event.preventDefault();
        const url = `/search?keyword=${searchTerm}`;
        navigate(url);
    }
}

export const handleSearchClick = (navigate, event, searchTerm) => {
    if(searchTerm !== ""){
        event.preventDefault();
        const url = `/search?keyword=${searchTerm}`;
        navigate(url);
    }
    
}