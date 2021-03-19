import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../css/Search.css";

import Results from "./Results";
import Tools from "./Tools";

import { fetchPlaces, fetchFlightWithDate } from "../services/FetchFlightData";
import { getCurrentDate } from "../services/utils";
import SearchForm from "./SearchForm";

function Search() {
    const classes = useStyles();

    const [currency, setCurrency] = useState("USD");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departure, setDeparture] = useState(getCurrentDate());
    const [arrival, setArrival] = useState("");

    const [monthDeparture, setMonthDeparture] = useState("");
    const [monthArrival, setMonthArrival] = useState("");
    const [monthFlightData, setMonthFlightData] = useState();

    const [originPlaceId, setOriginPlaceId] = useState("");
    const [destinationPlaceId, setDestinationPlaceId] = useState("");

    const [showMonthFlights, setShowMonthFlights] = useState(false);
    const [showFlights, setShowFlights] = useState(false);
    const [showErr, setShowErr] = useState(false);
    const [flightData, setFlightData] = useState();

    const [getFlightData, setGetFlightData] = useState(false);

    const [lowHigh, setLowHigh] = useState("lowHigh");

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

                setMonthFlightData(
                    await fetchFlightWithDate(
                        currency,
                        originPlaceId,
                        destinationPlaceId,
                        monthDeparture,
                        monthArrival
                    )
                );

                console.log(flightData);

                setGetFlightData(false);
            }
        })();
    }, [getFlightData]);

    useEffect(() => {
        (async () => {
            if (flightData === undefined) {
                return;
            } else if (flightData.status === 200) {
                setShowFlights(true);
            } else {
                setShowErr(true);
            }
        })();
    }, [flightData]);

    useEffect(() => {
        (async () => {
            if (monthFlightData === undefined) {
                return;
            } else if (monthFlightData.status === 200) {
                setShowMonthFlights(true);
            } else {
                setShowErr(true);
            }
        })();
    }, [monthFlightData]);

    function handleSubmit(event) {
        event.preventDefault();

        setShowFlights(false);
        setShowMonthFlights(false);
        setShowErr(false);
        setGetFlightData(false);

        console.log(destination);
        console.log("HELLO");

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

        setMonthDeparture(departure.slice(0, 7));
        setMonthArrival(arrival.slice(0, 7));

        return true;
    }

    async function callAPI() {
        setOriginPlaceId((await fetchPlaces(origin)).data);
        setDestinationPlaceId((await fetchPlaces(destination)).data);

        setGetFlightData(true);
    }

    function handleDropdownChange(event) {
        setLowHigh(event.target.value);
    }

    console.log("rerender");

    // maybe have everything next to each other
    return (
        <div className="Search">
            <header className="Search-header">
                <SearchForm
                    handleSubmit={handleSubmit}
                    departure={departure}
                    setCurrency={setCurrency}
                    setOrigin={setOrigin}
                    setDestination={setDestination}
                    setDeparture={setDeparture}
                    setArrival={setArrival}
                />
                {showFlights ? (
                    <>
                        <Tools
                            originPlaceId={originPlaceId}
                            destinationPlaceId={destinationPlaceId}
                            setOriginPlaceId={setOriginPlaceId}
                            setDestinationPlaceId={setDestinationPlaceId}
                            setGetFlightData={setGetFlightData}
                            lowHigh={lowHigh}
                            handleDropdownChange={handleDropdownChange}
                        />
                        <div>
                            <p className="mid-text">
                                Flights for the selected dates
                            </p>
                            <Results
                                flightInfo={flightData}
                                lowHigh={lowHigh}
                            ></Results>
                        </div>
                    </>
                ) : (
                    <></>
                )}

                {showMonthFlights ? (
                    <>
                        <p className="mid-text">
                            Flight options for selected month
                        </p>
                        <Results
                            flightInfo={monthFlightData}
                            showDate={true}
                            lowHigh={lowHigh}
                        ></Results>
                    </>
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
