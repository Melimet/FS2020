import React from "react";
import ContactService from "../services/ContactService";

const Contacts = ({persons, newFilter, setPersons, setMessage}) => {

  const removeContact = id => {

    window.confirm(`Are you sure you want to delete this contact?`) &&
      ContactService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          const newMessage = {
            type : 'success',
            text : 'Successfully removed contact'
          }
          setMessage(newMessage);
        })
        .catch(() => {
          const newMessage = {
            type: 'error',
            text: 'This contact has already been removed from the server'
          }
          setMessage(newMessage)
          setPersons(persons.filter(p => p.id !== id))
        })
  }

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
        {person.name} {person.number} <button onClick={() => removeContact(person.id)}>Remove</button> </div>)}
    </div>
  )
}

export default Contacts