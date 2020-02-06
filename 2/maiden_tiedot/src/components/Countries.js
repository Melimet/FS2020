import React, {useEffect, useState} from "react";
import Country from "./Country";

const Countries = ({countries, filter, handleClick}) => {

  const filterList = (country) => {
    return (
      country.name.toLowerCase().includes(filter.toLowerCase())
    )
  }

  if(countries.length===0){
    return (
      <div>
        <p>No countries found</p>
      </div>
    )
  }

  const list = countries.filter(filterList);

  if (list.length > 10) {
    return (
      <div>
        <p>Too many matches, please be more specific :))</p>
      </div>
    )
  } else if (list.length === 1) {
    return (
      <div>
        {Country(list[0])}
      </div>
    )
  }
  return <div>
    {list.map(country => <div key={country.name}>
      {country.name}
      <button onClick={() => handleClick(country.name)}>Show info</button>
    </div>)}
  </div>
}



export default Countries