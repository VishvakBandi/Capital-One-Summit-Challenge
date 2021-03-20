import React, { useEffect, useState } from "react";
import "../css/Search.css";

import Results from "./Results";
import Tools from "./Tools";

import {
    fetchPlaces,
    fetchFlightWithDate,
    fetchCurrencies,
} from "../services/FetchFlightData";
import { getCurrentDate, getCurrencySymbol } from "../services/utils";
import SearchForm from "./SearchForm";

function Search() {
    const [currency, setCurrency] = useState("USD");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departure, setDeparture] = useState(getCurrentDate());
    const [arrival, setArrival] = useState("");
    const [currencySymbol, setCurrencySymbol] = useState();

    const [monthDeparture, setMonthDeparture] = useState("");
    const [monthArrival, setMonthArrival] = useState("");

    const [getFlightData, setGetFlightData] = useState(false);

    const [originPlaceId, setOriginPlaceId] = useState("");
    const [destinationPlaceId, setDestinationPlaceId] = useState("");

    const [flightData, setFlightData] = useState();
    const [monthFlightData, setMonthFlightData] = useState();

    const [showMonthFlights, setShowMonthFlights] = useState(false);
    const [showFlights, setShowFlights] = useState(false);
    const [showMonthErr, setShowMonthErr] = useState(false);
    const [showDayErr, setShowDayErr] = useState(false);

    const [lowHigh, setLowHigh] = useState("lowHigh");
    const [currencies, setCurrencies] = useState();

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

    useEffect(() => {
        (async () => {
            setCurrencies((await fetchCurrencies()).data);
        })();
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        setShowFlights(false);
        setShowMonthFlights(false);
        setShowMonthErr(false);
        setShowDayErr(false);
        setGetFlightData(false);

        setCurrencySymbol(getCurrencySymbol(currencies, currency));

        if (validateInput()) {
            callAPI();
        }
    }

    function validateInput() {
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

    // maybe have everything next to each other
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
                                currencySymbol={currencySymbol}
                            ></Results>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="error">
                            There are no departing flights on the selected day.
                            Other options are below
                        </p>
                    </>
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
