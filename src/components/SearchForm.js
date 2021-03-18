import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
            <TextField
                error={false}
                style={{ width: "13%" }}
                required
                id="outlined-basic"
                label="currency"
                variant="outlined"
                defaultValue="USD"
                onChange={(e) => setCurrency(e.target.value)}
            />
            <TextField
                required
                id="outlined-basic"
                label="Origin Destination"
                variant="outlined"
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
                <Button type="submit" variant="contained" color="primary">
                    Search
                </Button>
            </div>
        </form>
    );
};

export default SearchForm;
