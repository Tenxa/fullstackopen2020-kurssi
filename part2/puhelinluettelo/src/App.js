import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsMap from './components/PersonsMap'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const getAll = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(() => {
    getAll()
  }, [])



  const addPerson = (event) => {
    event.preventDefault()

    let personObj = {
      name: newName,
      number: newNumber,
      id: ""
    }

    var boolFlag = false
    persons.forEach(person => {
      if (person.name === newName) {
        window.alert(`${newName} is alreadyy added to phonebook`)
        if (person.number !== newNumber) {
          if (window.confirm(`Replace ${newName} number?`)) {
            personObj.number = newNumber
            personObj.id = person.id
            console.log(`Person: ${person} -- personObj: ${personObj}`)
          }
          personService
            .update(person.id, personObj)
            .then(returnedPerson => {
              console.log(returnedPerson)
              getAll()
            })
            .catch(error => {
              console.log(error)
              console.log(`PersonObj -> ${personObj}`)
              setErrorMessage(
                `Information of ${person.name} has already been removed from server`
              )
              getAll()
              setTimeout(() => {
                setErrorMessage('')
                
              }, 5000)
            })
        }
        boolFlag = true
      }
    })

    if (boolFlag === false) {


      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(`Added ${personObj.name}`)
          setNewName('')
          setNewNumber('')

        })

    }

  }


  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleID(person.id, person)
        .then(response => {
          getAll()
          setErrorMessage(`Deleted ${person.name}`)
        })
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
      <Notification message={errorMessage} />
      <Filter filterText={newFilter} handleChangeFilterText={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm handleAddPerson={addPerson} nameText={newName} numberText={newNumber} handleChangeNameText={handleNameChange} handleNumberChangeText={handleNumberChange} />

      <h2>Numbers</h2>
      <PersonsMap personsToMap={personsToShow} deletePerson={deletePerson} />

    </div>
  )

}

export default App