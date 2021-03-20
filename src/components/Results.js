import React from "react";

import { Card, CardContent, Typography, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import "../css/Search.css";

function Results({ flightInfo, showDate, lowHigh, currencySymbol }) {
    const classes = useStyles();

    const data = flightInfo.data;

    var quotes = data.Quotes;

    var cheapest;

    // Checks if user wants results ordered, and sorts data response accordingly
    // Sets cheapest equal to the first element
    if (lowHigh !== "lowHigh") {
        quotes.sort((a, b) => {
            return b.QuoteId - a.QuoteId;
        });
        cheapest = quotes[quotes.length - 1].QuoteId;
    } else {
        quotes.sort((a, b) => {
            return a.QuoteId - b.QuoteId;
        });
        cheapest = quotes[0].QuoteId;
    }

    // Extracts the carrier name from API response, taking the carrierId as an argument
    function findCarrier(carrierId) {
        for (var i = 0; i < data.Carriers.length; i++) {
            if (data.Carriers[i].CarrierId === carrierId) {
                return data.Carriers[i].Name;
            }
        }
    }

    // Extracts the airport name from API response, taking the airportId as an argument
    function findAirport(airportId) {
        for (var i = 0; i < data.Places.length; i++) {
            if (data.Places[i].PlaceId === airportId) {
                return data.Places[i].Name;
            }
        }
    }

    // Displays flight date if needed (when rendering flights for month)
    function displayDate(date) {
        if (showDate === true) {
            return (
                <Typography color="textSecondary">
                    Departure Date: {date}
                </Typography>
            );
        }
    }

    // Returns how elements need to be placed, if there are less than 3 results
    function determineSpacing() {
        if (quotes.length === 1) return 12;
        else if (quotes.length === 2) return 6;
        else return 4;
    }

    // Returns a grid of ccards, each with information regarding the flight
    // Each card will have Price, Carrier Information, and information regarding the origin and destination airports
    // If the results are for flights over a general period (one month, etc), the card will also display the specific departure date
    // If the current card is the cheapest flight, it will add a flag highlighting the cheapest option
    return (
        <div className="resultsBox">
            <Grid container item xs={12} spacing={3}>
                {quotes.map((quote, index) => {
                    return (
                        <Grid key={index} item xs={determineSpacing()}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        Flight Information
                                    </Typography>
                                    {quote.QuoteId === cheapest ? (
                                        <Typography
                                            fontSize={14}
                                            color="blue"
                                            variant="overline"
                                        >
                                            Cheapest Flight option
                                        </Typography>
                                    ) : (
                                        <></>
                                    )}
                                    <Typography variant="h5" component="h2">
                                        {currencySymbol + quote.MinPrice}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Carrier:{" "}
                                        {findCarrier(
                                            quote.OutboundLeg.CarrierIds[0]
                                        )}
                                    </Typography>
                                    {showDate ? (
                                        displayDate(
                                            quote.OutboundLeg.DepartureDate.slice(
                                                5,
                                                10
                                            )
                                        )
                                    ) : (
                                        <></>
                                    )}
                                    <Typography variant="body2" component="p">
                                        {findAirport(
                                            quote.OutboundLeg.OriginId
                                        )}{" "}
                                        to{" "}
                                        {findAirport(
                                            quote.OutboundLeg.DestinationId
                                        )}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

// Style is used to enhance the card when hovered over
const useStyles = makeStyles({
    root: {
        minWidth: 350,
        maxWidth: 450,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.6)",
        },
    },
});

export default Results;
