import React, {useState, useEffect} from 'react'
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import ContactService from "./services/ContactService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState({})

  useEffect(() => {
    ContactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts);
      })
  }, [])

    return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <ContactForm newName={newName} setNewName={setNewName} persons={persons} setPersons={setPersons}
                   newNumber={newNumber} setNewNumber={setNewNumber} setMessage={setMessage}/>
      <Contacts persons={persons} newFilter={newFilter} setPersons={setPersons} setMessage={setMessage}/>
    </div>
  )
};

export default App