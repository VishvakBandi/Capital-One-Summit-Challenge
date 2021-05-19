# FlightFinder
---
## Submission for Capital One Software Engineering Summit
## The deployed version has been taken down. If you would like to try this application, send me an email!
---
### Summary
Website link: [https://find-flights.netlify.app/](https://find-flights.netlify.app/)

FlightFinder is a React application built around the [SkyScanner API](https://rapidapi.com/skyscanner/api/skyscanner-flight-search/endpoints). FlightFinder gives you a MaterialUI interface to search and browse through various flight options, with support for multiple currencies.

---
### Demo
![gif](public/Demo.gif)

---
### Deploying your own version
Requires NPM & Git.
1. Clone the repository to your computer
2. Install all dependenccies with `npm install`
3. Replace the API key in `.env` with your own, generated at the [SkyScanner API Website](https://rapidapi.com/skyscanner/api/skyscanner-flight-search/endpoints). The free tier supports 50 requests a minute.
4. `npm start` will start a local development server on `localhost:3000`

---
### Technical Details
---
FlightFinder uses React.js and material-ui for the front-end and is deployed on Netlify. The application consists of one page with a persistant search bar, and requisite results or errors are displayed once the search criteria is submitted.

---
#### App.js
This file brings the whole app together - it displayed the Header, then the search screen, and finall the footer.

---
#### Search.js
This file contains and renders most of what the user will see. It contains state variables to store the following.
1. Valid currencies
2. User input to the search fields
3. Processed user input
4. PlaceId of the origin and destination
5. Main flight API response
6. Display settings
7. Error flags

These state variables are how the custom components used in this app "communicate" with each other.

Initially, only the search component is rendered. When the user presses the submit button, input is processed, and the SkyScanner API is called. If the call returns successfully, result components are shown. If not, a helpful error message is displayed.

---
#### SearchForm.js
This component renders the persistant search bar. It is composed of 6 different elements, all of which is passed back to the main component using state.
1. Dropdown menu to select currency
2. Field to enter original destination
3. Field to enter final destination
4. Date picker to select departure date
5. Date picker to select arrival date
6. Search button to submit form

All of these visual components are from the material-ui component library, and I use the Grid component to position all of the elements evenly accross the screen.

---
#### Tools.js
Tools.js contains 2 tools to modify displayed results.
1. Swap Search
2. Sort by

Both of these tools allow the user to modify the way results are displayed to them. Swap Search will switch the origin and destination locations and display new results. Sort by allows the user to sort the displayed results by price.

---
#### Results.js
Results.js is passed the flight data object and processes the data, then displays all flight options in individual cards.

Data is initially extracted and split into seperate objects and processed individually. Airport and Carrier data is split into a seperate object and the quotes object is sorted by price. The component then renders cards, with information about each flight (price, carrier, and airports). The flight's specific date is shown only if the component is showing information about all flight options in a month.

---
#### FetchFlightData.js
This file contains all interacctions with the SkyScanner API. It contains three functions.
1. fetchCurrencies
2. fetchPlaces
3. fetchFlightWithDate

Each of these functions will call the SkyScanner API returning a status code and either an error or data.

fetchCurrencies is used to fetch the list of currencies that SkyScanner supports when the app is initially rendered.

fetchPlaces is used to fetch the 2 different PlacceIds of the locations entered by the user.

fetchFlightWithDate is used to fetch a list of flight options for the search parameters provided. It supports specific dates, and a general search over a month.

----
#### utils.js
This file contains 2 functions.
1. getCurrentDate
2. getCurrencySymbol

getCurrentDate will return today's date, to allow for post processing of user input.

getCurrencySymbol will return the corresponding symbol for the currency the user selects.

---
