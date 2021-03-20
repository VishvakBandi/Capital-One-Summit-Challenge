import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import "../css/Tools.css";

const Tools = (props) => {
    return (
        <div className="tools-component">
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
