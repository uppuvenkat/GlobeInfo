import React, {Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryDetails from './components/CountryDetails';
const CountriesList = React.lazy(() => import('./components/CountriesList'));
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<>Loading...</>}>
            <CountriesList />
          </Suspense>
        } />
        <Route path="/country/:code" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
