import React from "react";


const ContactForm = ({newName, newNumber, persons, setPersons, setNewName, setNewNumber}) => {

  const addContact = (event) => {
    event.preventDefault();

    const newContact = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    persons.filter(person => person.name === newName).length ?
      window.alert(`${newName} is already in the phonebook`)
      : createNewContact(newContact)
  };

  const createNewContact = (newContact) => {
    setPersons(persons.concat(newContact))
    setNewName('');
    setNewNumber('');
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