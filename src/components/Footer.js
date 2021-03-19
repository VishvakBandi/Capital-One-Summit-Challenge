import React from "react";
import "../css/Footer.css";

const Footer = (props) => {
    return (
        <div className="footerTitle">
            <div>{props.title}</div>
            <div className="footerNote">{props.footnote}</div>
        </div>
    );
};

export default Footer;
