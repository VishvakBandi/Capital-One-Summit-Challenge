import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import "../css/Search.css";

function Results({ flightInfo, showDate, lowHigh }) {
    const classes = useStyles();

    const data = flightInfo.data;

    var quotes = data.Quotes;

    if (lowHigh !== "lowHigh") {
        quotes.sort((a, b) => {
            return b.QuoteId - a.QuoteId;
        });
    } else if (quotes[0].QuoteId !== 1) {
        quotes.sort((a, b) => {
            return a.QuoteId - b.QuoteId;
        });
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
                <Typography className={classes.pos} color="textSecondary">
                    Departure Date: {date}
                </Typography>
            );
        }
    }

    return (
        <div className="resultsBox">
            <Grid container item xs={12} spacing={3}>
                {quotes.map((quote, index) => {
                    return (
                        <Grid key={index} item xs={4}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography
                                        className={classes.title}
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        Flight Information
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        ${quote.MinPrice}
                                    </Typography>
                                    <Typography
                                        className={classes.pos}
                                        color="textSecondary"
                                    >
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
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default Results;
