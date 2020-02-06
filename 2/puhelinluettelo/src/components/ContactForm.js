import React from "react";
import ContactService from "../services/ContactService";


const ContactForm = ({newName, newNumber, persons, setPersons, setNewName, setNewNumber, setMessage}) => {

  const addContact = (event) => {
    event.preventDefault();

    const newContact = {
      name: newName,
      number: newNumber
    };

    persons.filter(person => person.name === newName).length ?
      window.confirm(`${newName} is already in the phonebook, update current info?`) && updateContact(newContact)
      : createNewContact(newContact)
  };

  const createNewContact = (newContact) => {
    ContactService
      .create(newContact)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        const newMessage = {
          type: 'success',
          text: 'Successfully added a new contact!'
        }
        setMessage(newMessage)
      });

    setNewName('');
    setNewNumber('');
  }

  const updateContact = (newContact) => {

    const person = persons.find(person => newContact.name === person.name)

    ContactService
      .update(person.id, newContact)
      .then(returnedContact => {
        setPersons(persons.map(contact => contact.id !== person.id ? contact : returnedContact))
        const newMessage = {
          type: 'success',
          text: 'Successfully updated contact!'
        }
        setMessage(newMessage)
      })
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Add a new contact</h2>
      <form onSubmit={addContact}>
        <p>Name:<input value={newName}
                       onChange={handleNameChange}/></p>
        <p>Number:<input value={newNumber}
                         onChange={handleNumberChange}/></p>
        <div>
          <button type="submit">add contact</button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm