import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "../App.css";

import { fetchPlaces } from "../services/FetchPlaces";

function Search() {
    const [currency, setCurrency] = useState("USD");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departure, setDeparture] = useState(getCurrentDate());
    const [arrival, setArrival] = useState("");

    const [originPlaceId, setOriginPlaceId] = useState("");
    const [destinationPlaceId, setDestinationPlaceId] = useState("");

    let flightsData;
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
            if (originPlaceId !== "" && destinationPlaceId !== "") {
                console.log(originPlaceId);
                console.log(destinationPlaceId);

                flightsData = await getFlightsWithDate();
                console.log(flightsData);
            }
        })();
    }, [originPlaceId, destinationPlaceId]);

    function handleSubmit(event) {
        event.preventDefault();
        if (validateInput()) {
            callAPI();
        }

        return (
            <Button variant="contained" color="primary">
                test
            </Button>
        );
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

        //console.log(originId);
        // console.log(destinationPlaceId);
    }

    async function getFlightsWithDate() {
        const reqOptions = {
            method: "GET",
            headers: {
                "x-rapidapi-key": `${process.env.REACT_APP_SKYSCANNER_KEY}`,
                "x-rapidapi-host":
                    "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                useQueryString: true,
            },
        };
        try {
            let response = await fetch(
                `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/${currency}/en-US/${originPlaceId}/${destinationPlaceId}/${departure}?inboundpartialdate=${arrival}`,
                reqOptions
            );
            response = await response.json();

            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

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
            </header>
        </div>
    );
}

export default Search;
