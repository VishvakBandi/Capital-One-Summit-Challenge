import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import classes from "../css/Search.css";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { getCurrentDate } from "../services/utils";

const SearchForm = ({
    handleSubmit,
    departure,
    setCurrency,
    setOrigin,
    setDestination,
    setDeparture,
    setArrival,
}) => {
    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={2}>
                    <TextField
                        error={false}
                        required
                        id="outlined-basic"
                        label="currency"
                        variant="outlined"
                        defaultValue="USD"
                        onChange={(e) => setCurrency(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Origin Destination"
                        variant="outlined"
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Final Destination"
                        variant="outlined"
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        required
                        InputProps={{
                            inputProps: {
                                min: getCurrentDate().toString(),
                            },
                        }}
                        id="date"
                        label="Departure Date"
                        type="date"
                        defaultValue={getCurrentDate().toString()}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setDeparture(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
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
                </Grid>
                <Grid item xs={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default withStyles(classes)(SearchForm);
