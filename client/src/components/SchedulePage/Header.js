import React, {useEffect} from 'react';

function Header({calendarYM, today, moveMonth}) {


    return (
        <div className="RCA-header-container">
            <h2 className="RCA-header-calendarYM RCA-header-middle">
                {calendarYM}
            </h2>
            <h3 className="RCA-header-today RCA-header-middle">
                {today}
            </h3>
            <ul className="RCA-header-buttons RCA-header-middle">
                <li>
                    <i className="move-button left-img icon" onClick={() => moveMonth(-1)}>

                    </i>
                </li>
                <li>
                    이동
                </li>
                <li>
                    <i className="move-button right-img icon" onClick={() => moveMonth(1)}>

                    </i>
                </li>
            </ul>
        </div>
    )
}

export default Header;
