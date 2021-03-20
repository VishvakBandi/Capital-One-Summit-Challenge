import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
    Tooltip,
} from "@material-ui/core";

import "../css/Tools.css";

// Renders 2 search options if results are valid
// 1. Flip search, which will flip the destinations and trigger another seaarcch
// 2. Sort By, which will sort the flight resultss by price
const Tools = (props) => {
    return (
        <div className="tools-component">
            <Tooltip title="Swap search locations" placement="top-start">
                <Button
                    onClick={() => {
                        const temp = props.originPlaceId;
                        props.setOriginPlaceId(props.destinationPlaceId);
                        props.setDestinationPlaceId(temp);
                        props.setGetFlightData(true);
                    }}
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{
                        marginRight: "20px",
                    }}
                >
                    Flip Search
                </Button>
            </Tooltip>
            <FormControl>
                <InputLabel>Sort By</InputLabel>
                <Select
                    value={props.lowHigh}
                    onChange={props.handleDropdownChange}
                >
                    <MenuItem value="lowHigh">
                        <em>Lowest Price</em>
                    </MenuItem>
                    <MenuItem value={"highLow"}>Highest Price</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default Tools;
