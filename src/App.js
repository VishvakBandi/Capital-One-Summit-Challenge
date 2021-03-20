import React from "react";
import "./App.css";

import Search from "./components/search";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="App">
            <Header title="FlightFinder"></Header>
            <Search></Search>
            <Footer
                title="Finding flights made easy. FlightFinder will show you flights and their associated costs."
                footnote="Made by Vishvak Bandi. Powered by the SkyScanner API & React.js. Hosted on Netlify."
            ></Footer>
        </div>
    );
}

export default App;
