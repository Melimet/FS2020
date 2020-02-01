import React, {useState} from 'react'
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('')


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <ContactForm newName = {newName} setNewName ={setNewName} persons = {persons} setPersons = {setPersons} newNumber = {newNumber} setNewNumber = {setNewNumber}/>
      <Contacts persons={persons} newFilter={newFilter}/>
    </div>
  )

};

export default App