import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      id: 1
    }
  ])
  const [newName, setNewName] = useState('')

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
        id: persons.length + 1
      }

      setPersons(persons.concat(personObj))
      setNewName('')
      console.log(boolFlag)
    }

  }



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  //console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) =>
        <div key={i}>{person.name}</div>
      )}

    </div>
  )

}

export default App