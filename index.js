const axios = require('axios');

const API_KEY = '<YOUR_SKYSCANNER_API_KEY>';

async function getFlightPrices(source, destination, date) {
  try {
    const response = await axios.get(
      `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/US/USD/en-US/${source}-sky/${destination}-sky/${date}?apiKey=${API_KEY}`
    );

    const prices = {};

    if (response.data && response.data.Quotes) {
      response.data.Quotes.forEach((quote) => {
        prices[quote.Name] = `₹${quote.MinPrice}`;
      });
    }

    return prices;
  } catch (error) {
    console.error('Error fetching flight prices:', error);
    throw error;
  }
}

// Example usage
const source = 'Delhi';
const destination = 'Jaipur';
const date = '2023-04-15';

getFlightPrices(source, destination, date)
  .then((prices) => {
    console.log(prices);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
