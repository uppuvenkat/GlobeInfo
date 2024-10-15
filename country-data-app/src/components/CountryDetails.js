// src/components/CountryDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const CountryDetails = () => {
  const { code } = useParams();  // Assuming you're using React Router
  const [country, setCountry] = useState(null);
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/countries/${code}`);
        setCountry(response.data[0]);
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };
    fetchCountry();
  }, [code]);

  if (!country) return <div>Loading...</div>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{country.name}</Typography>
        <Typography>Population: {country.population}</Typography>
        <Typography>Region: {country.region}</Typography>
        <Typography>
            Currency: {country.currency.name} {country.currency.symbol && `(${country.currency.symbol})`}
        </Typography>
        <img src={country.flag} alt={`${country.name} flag`} width={100} />
      </CardContent>
    </Card>
  );
};

export default CountryDetails;
