import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import "../App.css";

function Search() {
    const [currency, setCurrency] = useState("USD");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [] = useState("");

    function getCurrentDate(separator = '-') {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }

    // maybe have everything next to each other
    return (
        <div className="App">
            <header className="App-header">
                <form noValidate autoComplete="off" >
                    <TextField style={{ width: "13%" }}
                        required id="outlined-basic" label="Currency" variant="outlined" defaultValue="USD" />
                    <TextField required id="outlined-basic" label="Origin Destination" variant="outlined" />
                    <TextField required id="outlined-basic" label="Final Destination" variant="outlined" />
                    <div>
                        <TextField
                            required
                            id="date"
                            label="Departure Date"
                            type="date"
                            defaultValue={getCurrentDate().toString()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            id="date"
                            label="Arrival Date"
                            type="date"
                            defaultValue=""
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div>
                        <Button variant="contained" color="primary" >Search</Button>
                    </div>
                </form>
            </header>
        </div>
    );
}

export default Search;
