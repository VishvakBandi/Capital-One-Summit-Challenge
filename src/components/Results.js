import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import "../css/Search.css";

function Results({ flightInfo, showDate, lowHigh, currencySymbol }) {
    const classes = useStyles();

    const data = flightInfo.data;

    var quotes = data.Quotes;

    var cheapest;

    if (lowHigh !== "lowHigh") {
        quotes.sort((a, b) => {
            return b.QuoteId - a.QuoteId;
        });
        cheapest = quotes[quotes.length - 1].QuoteId;
    } else if (quotes[0].QuoteId !== 1) {
        quotes.sort((a, b) => {
            return a.QuoteId - b.QuoteId;
        });
        cheapest = quotes[0].QuoteId;
    } else {
        cheapest = quotes[0].QuoteId;
    }

    function findCarrier(carrierId) {
        for (var i = 0; i < data.Carriers.length; i++) {
            if (data.Carriers[i].CarrierId === carrierId) {
                return data.Carriers[i].Name;
            }
        }
    }

    function findAirport(airportId) {
        for (var i = 0; i < data.Places.length; i++) {
            if (data.Places[i].PlaceId === airportId) {
                return data.Places[i].Name;
            }
        }
    }

    function displayDate(date) {
        if (showDate === true) {
            return (
                <Typography color="textSecondary">
                    Departure Date: {date}
                </Typography>
            );
        }
    }

    function determineSpacing() {
        if (quotes.length === 1) return 12;
        else if (quotes.length === 2) return 6;
        else return 4;
    }

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
