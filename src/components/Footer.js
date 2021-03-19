import React from "react";
import "../css/Footer.css";

function Footer(props) {
    return (
        <div className="footerTitle">
            <div>{props.title}</div>
            <div className="footerNote">{props.footnote}</div>
        </div>
    );
}

export default Footer;
