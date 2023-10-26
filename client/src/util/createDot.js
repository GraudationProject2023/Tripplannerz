import React from "react";

export const createDot = () => {
    let html = [];
    html.push(<div className="dot"></div>)
    return(
        <>
         <div className="flex justify-center items-center absoluteDiv">
            {html}
         </div>
        </>
    )
}