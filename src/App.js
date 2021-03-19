import React from "react";
import "./App.css";
import Search from "./components/search";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { StylesProvider } from "@material-ui/core/styles";

function App() {
    return (
        <StylesProvider injectFirst>
            <div className="App">
                <Header title="Flight Search"></Header>
                <Search></Search>
                <Footer title="Flights"></Footer>
            </div>
        </StylesProvider>
    );
}

export default App;
