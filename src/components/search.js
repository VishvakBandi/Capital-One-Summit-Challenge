import React, { useEffect, useState } from "react";
import "../css/Search.css";

import Results from "./Results";
import Tools from "./Tools";
import SearchForm from "./SearchForm";

import {
    fetchPlaces,
    fetchFlightWithDate,
    fetchCurrencies,
} from "../services/FetchFlightData";
import { getCurrentDate, getCurrencySymbol } from "../services/utils";

function Search() {
    // Stores list of currencies which are retrived on the first render
    const [currencies, setCurrencies] = useState();

    // Tracks user input for the forms
    const [currency, setCurrency] = useState("USD");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departure, setDeparture] = useState(getCurrentDate());
    const [arrival, setArrival] = useState("");
    const [currencySymbol, setCurrencySymbol] = useState();

    // Stores modified dates from user input
    const [monthDeparture, setMonthDeparture] = useState("");
    const [monthArrival, setMonthArrival] = useState("");

    // Stores the "PlaceId" of each location the user enters
    // "PlaceId" is an Id attached to a general location or airport
    const [originPlaceId, setOriginPlaceId] = useState("");
    const [destinationPlaceId, setDestinationPlaceId] = useState("");

    // Get main flight data (price, time, carrier, etc) when true
    // Changes to true after the 3 groups of state above are set successfully
    const [getFlightData, setGetFlightData] = useState(false);

    // Stores data recieved from API call
    // API is called twice - for specccificcc date and general month
    const [flightData, setFlightData] = useState();
    const [monthFlightData, setMonthFlightData] = useState();

    // Controls if the user sees the flight data
    // Sets to true if the data is successfully recieved
    const [showMonthFlights, setShowMonthFlights] = useState(false);
    const [showFlights, setShowFlights] = useState(false);

    // Controls if the user sees an error
    // Sets to true on code 500
    const [showMonthErr, setShowMonthErr] = useState(false);
    const [showDayErr, setShowDayErr] = useState(false);

    // Tracks changes in how results are sorted
    const [lowHigh, setLowHigh] = useState("lowHigh");

    // calls API when getFlightData is set to true
    useEffect(() => {
        (async () => {
            if (getFlightData === true) {
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

                setGetFlightData(false);
            }
        })();
    }, [getFlightData]);

    // Validates API response stored in flightData when the state is updated
    useEffect(() => {
        (async () => {
            if (flightData === undefined) {
                return;
            } else if (flightData.status === 200) {
                setShowFlights(true);
            } else {
                setShowDayErr(true);
            }
        })();
    }, [flightData]);

    // validates API response stored in monthFlightData when the state is updated
    useEffect(() => {
        (async () => {
            if (monthFlightData === undefined) {
                return;
            } else if (monthFlightData.status === 200) {
                setShowMonthFlights(true);
            } else {
                setShowMonthErr(true);
            }
        })();
    }, [monthFlightData]);

    // Fetches list of currencies on initial render
    useEffect(() => {
        (async () => {
            setCurrencies((await fetchCurrencies()).data);
        })();
    }, []);

    // if submit is pressed
    // reset all of the show data flags
    // get the preferred currency symbol from the list retrieved on initial render
    // process the user input
    // call initial APIs
    function handleSubmit(event) {
        event.preventDefault();

        setShowFlights(false);
        setShowMonthFlights(false);
        setShowMonthErr(false);
        setShowDayErr(false);
        setGetFlightData(false);

        setCurrencySymbol(getCurrencySymbol(currencies, currency));

        processInput();
        callAPI();
    }

    // Takes the user's dates and extracts month & year (removes day)
    function processInput() {
        setMonthDeparture(departure.slice(0, 7));
        setMonthArrival(arrival.slice(0, 7));
    }

    // Call initial APIs
    // Gets PlaceId of Origin and Final Destinations
    // Sets flag to call main API
    async function callAPI() {
        setOriginPlaceId((await fetchPlaces(origin)).data);
        setDestinationPlaceId((await fetchPlaces(destination)).data);

        setGetFlightData(true);
    }

    // Handles changes in results display menu
    function handleDropdownChange(event) {
        setLowHigh(event.target.value);
    }

    // Renders the search bar oncce the currency list is retreived
    // If there is a valid result (either for the month of specific data), render results settings
    // Renders date/month's flight data if the respective state indicates the data is valid
    // Shows a specific error if one is not available, and a general error if user input is incorrect
    return (
        <div className="Search">
            <header className="Search-header">
                {currencies ? (
                    <SearchForm
                        handleSubmit={handleSubmit}
                        departure={departure}
                        setCurrency={setCurrency}
                        setOrigin={setOrigin}
                        setDestination={setDestination}
                        setDeparture={setDeparture}
                        setArrival={setArrival}
                        currencies={currencies}
                        setCurrencySymbol={setCurrencySymbol}
                    />
                ) : (
                    <></>
                )}

                {showFlights || showMonthFlights ? (
                    <Tools
                        originPlaceId={originPlaceId}
                        destinationPlaceId={destinationPlaceId}
                        setOriginPlaceId={setOriginPlaceId}
                        setDestinationPlaceId={setDestinationPlaceId}
                        setGetFlightData={setGetFlightData}
                        lowHigh={lowHigh}
                        handleDropdownChange={handleDropdownChange}
                    />
                ) : (
                    <></>
                )}

                {showFlights ? (
                    <>
                        <div>
                            <p className="mid-text">
                                Flights for the selected dates
                            </p>
                            <Results
                                flightInfo={flightData}
                                lowHigh={lowHigh}
                                currencySymbol={currencySymbol}
                            ></Results>
                        </div>
                    </>
                ) : showDayErr ? (
                    <p className="error">
                        There are no departing flights on the selected day.
                        Other flight options are below.
                    </p>
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
                            currencySymbol={currencySymbol}
                        ></Results>
                    </>
                ) : (
                    <></>
                )}

                {showMonthErr && showDayErr ? (
                    <div>
                        <p className="error">
                            There are no flights available for your selections.
                            Please try changing your search criteria.
                        </p>
                    </div>
                ) : (
                    <></>
                )}
            </header>
        </div>
    );
}

export default Search;
