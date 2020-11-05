import React from 'react'

const PersonsMap = ({personsToMap, deletePerson}) => {
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