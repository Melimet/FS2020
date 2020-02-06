import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleClick = (countryName) => {setFilter(countryName)}

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter}/>
      <Countries countries={countries} filter={filter} handleClick={handleClick}/>
    </div>
  )
}

export default App;
