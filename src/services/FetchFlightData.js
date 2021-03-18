export const fetchPlaces = (props) => {
    // console.log(props);
    return getPlaces(props);

    async function getPlaces(location) {
        const reqOptions = {
            method: "GET",
            headers: {
                "x-rapidapi-key": `${process.env.REACT_APP_SKYSCANNER_KEY}`,
                "x-rapidapi-host":
                    "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                useQueryString: true,
            },
        };

        try {
            let response = await fetch(
                "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?" +
                    new URLSearchParams({ query: location }),
                reqOptions
            );

            if (response.ok) {
                response = await response.json();

                // console.log(response);

                return { status: 200, data: response.Places[0].PlaceId };
            } else {
                throw new Error("Place not found");
            }
        } catch (err) {
            console.log(err);
            return { status: 500, error: err };
        }
    }
};

export const fetchFlightWithDate = (
    currency,
    originPlaceId,
    destinationPlaceId,
    departure,
    arrival
) => {
    return getFlightsWithDate();

    async function getFlightsWithDate() {
        const reqOptions = {
            method: "GET",
            headers: {
                "x-rapidapi-key": `${process.env.REACT_APP_SKYSCANNER_KEY}`,
                "x-rapidapi-host":
                    "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                useQueryString: true,
            },
        };
        try {
            let response = await fetch(
                `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/${currency}/en-US/${originPlaceId}/${destinationPlaceId}/${departure}?inboundpartialdate=${arrival}`,
                reqOptions
            );

            if (response.ok) {
                response = await response.json();

                console.log(response);

                if (response.Quotes.length === 0) {
                    throw new Error("No flights were found");
                }

                return { status: 200, data: response };
            } else {
                throw new Error("No flights were found");
            }
        } catch (err) {
            console.log("ERROR:" + err);
            return { status: 500, error: err };
        }
    }
};
