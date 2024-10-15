import React, { useState } from 'react';
import axios from 'axios';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const RegionFilter = ({ setCountries }) => {
  const [region, setRegion] = useState('');

  const handleRegionChange = async (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);

    try {
      const response = await axios.get(`http://localhost:5000/countries/region/${selectedRegion}`);
      setCountries(response.data); // Update countries list based on region
    } catch (error) {
      console.error('Error fetching countries by region:', error);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Region</InputLabel>
      <Select value={region} onChange={handleRegionChange} label={"Region"}>
        <MenuItem value="Africa">Africa</MenuItem>
        <MenuItem value="Americas">Americas</MenuItem>
        <MenuItem value="Asia">Asia</MenuItem>
        <MenuItem value="Europe">Europe</MenuItem>
        <MenuItem value="Oceania">Oceania</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RegionFilter;
