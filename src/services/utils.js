// Returns the ccurrent date in string format
export const getCurrentDate = (separator = "-") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
        month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
};

// Finds the appropriate symbol to use based on the user's currency selection
export const getCurrencySymbol = (currencies, currency) => {
    for (var i = 0; i < currencies.length; i++) {
        if (currencies[i].Code === currency) {
            return currencies[i].Symbol;
        }
    }
};
