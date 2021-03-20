import React from "react";
import "../css/Header.css";

const Header = (props) => {
    return (
        <div>
            <a href="https://find-flights.netlify.app/" className="header">
                {props.title}
            </a>
        </div>
    );
};

export default Header;
