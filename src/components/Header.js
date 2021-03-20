import React from "react";
import "../css/Header.css";

// header - contains nae with an embedded link back to the app
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
