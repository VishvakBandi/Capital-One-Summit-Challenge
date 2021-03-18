import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function Results({ flightInfo }) {
    const classes = useStyles();

    const data = flightInfo.data;

    console.log(data.data);

    const quotes = data.Quotes;

    console.log(quotes);

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

    return (
        <div>
            {quotes.map((quote, index) => {
                return (
                    <Card key={index} className={classes.root}>
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
                                {findCarrier(quote.OutboundLeg.CarrierIds[0])}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {findAirport(quote.OutboundLeg.OriginId)} to{" "}
                                {findAirport(quote.OutboundLeg.DestinationId)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                );
            })}
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