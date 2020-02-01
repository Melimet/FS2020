import React from "react";

const Contacts = ({persons, newFilter}) => {

  const filterList = (person) => {
    return (
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    )
  }

  const list = persons.filter(filterList);
  return (

    <div>
      <h2>Numbers</h2>
      {list.map(person => <div key={person.name}>
        {person.name} {person.number}</div>)}
    </div>
  )
}

export default Contacts