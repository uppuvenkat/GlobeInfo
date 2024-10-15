const express = require('express');
const axios = require('axios'); 
const cors = require('cors');

const app = express();
app.use(cors());
// Base URL for REST Countries API
const COUNTRIES_API_URL = 'https://restcountries.com/v3.1';


// Helper function to filter necessary fields
const filterCountryData = (country) => ({
    name: country.name.common,                       
    population: country.population,                  
    flag: country.flags?.svg || country.flags?.png,
    region: country.region,           
    code: country.cioc,           
    currency: Object.values(country.currencies || {}).map(currency => ({
        name: currency.name,
        symbol: currency.symbol
    }))[0]
});

// GET /countries: Fetch a list of all countries

app.get('/countries', async (req, res) => {
    try {
        const response = await axios.get(`${COUNTRIES_API_URL}/all`);
        const filteredData = response.data.map(filterCountryData);
        res.json(filteredData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching countries data', error });
    }
});

app.get('/countries/:code', async (req, res) => {
    const countryCode = req.params.code.toUpperCase();
    try {
        const response = await axios.get(`${COUNTRIES_API_URL}/alpha/${countryCode}`);
        const filteredData = response.data.map(filterCountryData);
        res.json(filteredData);
    } catch (error) {
        res.status(404).json({ message: `Country with code ${countryCode} not found`, error });
    }
});

app.get('/countries/region/:region', async (req, res) => {
    const region = req.params.region;
    try {
        const response = await axios.get(`${COUNTRIES_API_URL}/region/${region}`);
        const filteredData = response.data.map(filterCountryData);
        res.json(filteredData);
    } catch (error) {
        res.status(404).json({ message: `Region ${region} not found`, error });
    }
});

app.get('/country/search', async (req, res) => {
    const name = req.query.name;
    console.log('name>>', name)
    if (!name) {
        return res.status(400).json({ message: 'Please provide a country name to search' });
    }
    try {
        const response = await axios.get(`${COUNTRIES_API_URL}/name/${name}`);
        const filteredData = response.data.map(filterCountryData);
        res.json(filteredData);
    } catch (error) {
        res.status(404).json({ message: `Country with name ${name} not found`, error });
    }
});

app.listen(5000, ()=>{
    console.log('server started...')
})
