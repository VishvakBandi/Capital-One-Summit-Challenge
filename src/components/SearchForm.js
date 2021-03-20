import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/core/Autocomplete";

import { getCurrentDate } from "../services/utils";

const SearchForm = ({
    handleSubmit,
    departure,
    setCurrency,
    setOrigin,
    setDestination,
    setDeparture,
    setArrival,
    currencies,
}) => {
    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={2}>
                    <Autocomplete
                        fullWidth
                        id="currencies-box"
                        options={currencies}
                        getOptionLabel={(option) => option.Code}
                        onChange={(e, newValue) => {
                            setCurrency(newValue.Code);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Currency"
                                variant="outlined"
                                required
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={2}>
                    <TextField
                        required
                        id="outlined-basic-origin"
                        label="Origin Destination"
                        variant="outlined"
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        required
                        id="outlined-basic-destination"
                        label="Final Destination"
                        variant="outlined"
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        fullWidth
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
                        fullWidth
                        InputProps={{
                            inputProps: {
                                min: departure,
                            },
                        }}
                        required
                        id="arrivalDate"
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
                        fullWidth
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

export default SearchForm;
