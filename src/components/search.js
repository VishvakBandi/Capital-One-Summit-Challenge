import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

import Results from "./Results";

import { fetchPlaces, fetchFlightWithDate } from "../services/FetchFlightData";

function Search() {
    const [currency, setCurrency] = useState("USD");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departure, setDeparture] = useState(getCurrentDate());
    const [arrival, setArrival] = useState("");

    const [originPlaceId, setOriginPlaceId] = useState("");
    const [destinationPlaceId, setDestinationPlaceId] = useState("");

    const [showFlights, setShowFlights] = useState(false);
    const [showErr, setShowErr] = useState(false);
    const [flightData, setFlightData] = useState();

    const [getFlightData, setGetFlightData] = useState("false");

    const classes = useStyles();

    // let originPlaceId = "";
    //let destinationPlaceId = "";

    function getCurrentDate(separator = "-") {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${
            month < 10 ? `0${month}` : `${month}`
        }${separator}${date}`;
    }

    useEffect(() => {
        (async () => {
            if (getFlightData === true) {
                console.log(originPlaceId);
                console.log(destinationPlaceId);

                setFlightData(
                    await fetchFlightWithDate(
                        currency,
                        originPlaceId,
                        destinationPlaceId,
                        departure,
                        arrival
                    )
                );

                console.log(flightData);

                setGetFlightData(false);

                // console.log(flightData);
            }
        })();
    }, [getFlightData, flightData]);

    useEffect(() => {
        (async () => {
            if (flightData !== undefined && flightData.status === 200) {
                setShowFlights(true);
            } else if (flightData === undefined) {
                return;
            } else {
                setShowErr(true);
            }
        })();
    }, [flightData]);

    function handleSubmit(event) {
        event.preventDefault();
        if (validateInput()) {
            callAPI();
        }
    }

    function validateInput() {
        console.log(`${process.env.REACT_APP_SKYSCANNER_KEY}`);
        console.log(currency);
        console.log(origin);
        console.log(destination);
        console.log(departure);
        console.log(arrival);
        return true;
    }

    async function callAPI() {
        // originPlaceId = await getPlaces(origin);
        // destinationPlaceId = await getPlaces(destination);

        //const temp = await getPlaces(origin);

        //console.log(await fetchPlaces(origin));

        setOriginPlaceId((await fetchPlaces(origin)).data);
        setDestinationPlaceId((await fetchPlaces(destination)).data);

        setGetFlightData(true);

        //console.log(originId);
        // console.log(destinationPlaceId);
    }
    console.log(showErr);
    // maybe have everything next to each other
    return (
        <div className="App">
            <header className="App-header">
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        error={false}
                        style={{ width: "13%" }}
                        required
                        id="outlined-basic"
                        label="Currency"
                        variant="outlined"
                        defaultValue="USD"
                        onChange={(e) => setCurrency(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-basic"
                        label="Origin Destination"
                        variant="outlined"
                        defaultValue={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-basic"
                        label="Final Destination"
                        variant="outlined"
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <div>
                        <TextField
                            InputProps={{
                                inputProps: {
                                    min: getCurrentDate().toString(),
                                },
                            }}
                            required
                            id="date"
                            label="Departure Date"
                            type="date"
                            defaultValue={getCurrentDate().toString()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setDeparture(e.target.value)}
                        />
                        <TextField
                            InputProps={{
                                inputProps: {
                                    min: departure,
                                },
                            }}
                            required
                            id="date"
                            label="Arrival Date"
                            type="date"
                            defaultValue=""
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setArrival(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Search
                        </Button>
                    </div>
                </form>
                {showFlights ? (
                    <Results flightInfo={flightData}></Results>
                ) : (
                    <></>
                )}
                {showErr ? (
                    <div>
                        <p className={classes.errorText}>
                            There are no flights availible for your selections
                        </p>
                    </div>
                ) : (
                    <></>
                )}
            </header>
        </div>
    );
}

const useStyles = makeStyles({
    errorText: {
        fontSize: 14,
        color: "red",
    },
});

export default Search;
