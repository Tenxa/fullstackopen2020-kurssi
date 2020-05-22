import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

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
      setNewNumber('')

    }

  }

  //Handlers
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
      <Filter filterText={newFilter} handleChangeFilterText={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm handleAddPerson={addPerson} nameText={newName} numberText={newNumber} handleChangeNameText={handleNameChange} handleNumberChangeText={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons personsToMap={personsToShow} />

    </div>
  )

}

export default App