import React from "react";
import "./App.css";
import Search from "./components/search";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="App">
            <Header title="Flight Search"></Header>
            <Search></Search>
            <Footer title="Flights"></Footer>
        </div>
    );
}

export default App;
