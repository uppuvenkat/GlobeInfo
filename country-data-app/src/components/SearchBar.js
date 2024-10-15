// src/components/SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const SearchBar = ({ setCountries }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/country/search?name=${searchTerm}`);
      console.log(response)
      setCountries(response.data);
    } catch (error) {
      console.error('Error searching for country:', error);
    }
  };

  return (
    <div>
      <TextField 
        label="Search Country" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
