import React, {useEffect, useState} from "react";
import axios from "axios";

const Country = (country) => {
  const api_key = process.env.REACT_APP_API_KEY

  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        const responseData = response.data.current
        const weatherData = {
          temperature: responseData.temperature,
          iconURL: responseData.weather_icons
        }
        setWeather(weatherData)
      })
  }, [])

  const weatherBuild = () => {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {weather.temperature} :)</p>
        <img src={weather.iconURL}></img>
      </div>
    )
  }

  const languages = (country) => {
    console.log(country.languages)
    return (
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
    )
  }
  const oneCountry = (country) => {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>
        <h2>Languages</h2>
        {languages(country)}
        <img src={country.flag} height="50"></img>
        {weatherBuild()}
      </div>
    )
  }
  return (
    <div>
      {oneCountry(country)}
    </div>
  )
}

export default Country