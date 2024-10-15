import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';
import Grid from '@mui/material/Grid2'
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/countries');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  return (<>

    <Grid container spacing={3}>
      <Grid size={5}>
      </Grid>
      <Grid size={4}>
        <SearchBar setCountries={(e) => { setCountries(e) }} />
      </Grid>
      <Grid size={3}>
        <RegionFilter setCountries={(e) => { setCountries(e) }} />
      </Grid>
    </Grid>
    <br></br>
    <Grid container spacing={2}>
      {countries.length>0  && countries.map((country) => (
        <Grid item xs={12} sm={6} md={4} key={country.name}>
          <CardActionArea onClick={()=>{ window.open(`/country/${country.code}`);}}>
          <Card sx={{ minWidth: 350, maxWidth: 350 }}>
            <CardContent>
              <Typography variant="h5">{country.name}</Typography>
              <Typography>Population: {country.population}</Typography>
              <Typography>Region: {country.region}</Typography>
              <img src={country.flag} alt={`${country.region} flag`} width={100} height={50} />
            </CardContent>
          </Card>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
  </>
  );
};

export default CountriesList;
