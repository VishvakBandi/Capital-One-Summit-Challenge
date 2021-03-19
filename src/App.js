import React from "react";
import "./App.css";
import Search from "./components/search";
import Header from "./components/Header";

function App() {
    return (
        <div>
            <Header title="Flight Search"></Header>
            <Search></Search>
        </div>
    );
}

export default App;
