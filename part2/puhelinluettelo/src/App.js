import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  
  const addPerson = (event) => {
    event.preventDefault()

    var boolFlag = false
    persons.forEach(person => {
      if (person.name === newName) {
        window.alert(`${newName} is already added to phonebook`)
        boolFlag = true
      }
    })

    if (boolFlag === false) {
      const personObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(personObj))
      setNewName('')
      
    }

  }

  //onChange handlers
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    if (event.target.value !== '') {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //filtering
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) === 0)


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={newFilter} handleChangeFilterText={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm handleAddPerson={addPerson} nameText={newName} numberText={newNumber} handleChangeNameText={handleNameChange} handleNumberChangeText={handleNumberChange}/>

      <h2>Numbers</h2>

      <div>{personsToShow.map((person) =>
        <div key={person.id}>{person.name} {person.number}</div>
      )}
      </div>

    </div>
  )

}

export default App