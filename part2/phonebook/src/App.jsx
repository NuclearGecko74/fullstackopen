import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: '' }), 4000)
  }

  const addPerson = (e) => {
    e.preventDefault()

    const existing = persons.find(p => p.name === newName)

    if (existing) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updated = { ...existing, number: newNumber }
        personService
          .update(existing.id, updated)
          .then(returned => {
            setPersons(persons.map(p => p.id !== existing.id ? p : returned))
            showNotification(`Updated ${newName}`)
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            showNotification(`Information of ${newName} has already been removed from server`, 'error')
            setPersons(persons.filter(p => p.id !== existing.id))
          })
      }
      return
    }

    const newPerson = { name: newName, number: newNumber }
    personService
      .create(newPerson)
      .then(returned => {
        setPersons(persons.concat(returned))
        showNotification(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${name}`)
        })
    }
  }

  const filtered = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />

      <Filter filter={filter} onChange={e => setFilter(e.target.value)} />

      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={e => setNewName(e.target.value)}
        newNumber={newNumber}
        onNumberChange={e => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <Persons persons={filtered} onDelete={deletePerson} />
    </div>
  )
}

export default App