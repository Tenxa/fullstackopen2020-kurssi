import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CountriesToShow from './components/CountriesToShow'

function App() {
  const [countries, setCountries] = useState([])
  const [countryFind, setCountryFind] = useState('')


  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])


  const handleChangeFind = (event) => {
    console.log(event.target.value)
    setCountryFind(event.target.value)
  }


  const filterCountries = countries.filter(country => country.name.toLowerCase().indexOf(countryFind.toLowerCase()) === 0)

  return (
    <div>
      <form>
        <div>Find countries: <input value={countryFind} onChange={handleChangeFind} /></div>
      </form>

      <div>
        <CountriesToShow countriesToMap={filterCountries} size={filterCountries.length} />
      </div>
    </div>
  );
}

export default App;
