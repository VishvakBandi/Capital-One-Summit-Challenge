import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import "../css/Tools.css";

const Tools = (props) => {
    return (
        <div className="tools-component">
            <>
                <Button
                    className="tool"
                    onClick={(event) => {
                        const temp = props.origin;
                        props.setOrigin(props.destination);
                        props.setDestination(temp);
                        props.handleSubmit(event);
                    }}
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    Flip Search
                </Button>
            </>

            <FormControl>
                <InputLabel>Sort By</InputLabel>
                <Select
                    value={props.lowHigh}
                    onChange={props.handleDropdownChange}
                >
                    <MenuItem value="lowHigh">
                        <em>Low to High</em>
                    </MenuItem>
                    <MenuItem value={"highLow"}>High to Low</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default Tools;
