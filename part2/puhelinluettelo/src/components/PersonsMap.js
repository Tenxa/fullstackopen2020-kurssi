import React from 'react'
import personService from '../services/persons'

const deletePerson = (person) => {
    console.log(person)
    if (window.confirm(`Delete ${person.name} ?`)){
      personService
        .deleID(person.id, person)
        .then(response => {
          console.log(response)
        })
    }
  }

const PersonsMap = ({personsToMap}) => {
    return(
        <div>
            {personsToMap.map((person) => 
                <div key={person.id}>
                    {person.name} {person.number}
                    <button type='submit' onClick={() => deletePerson(person)}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default PersonsMap