import React from 'react'

const PersonsMap = ({personsToMap}) => {
    return(
        <div>
            {personsToMap.map((person) => 
                <div key={person.id}>
                    {person.name} {person.number}
                </div>
            )}
        </div>
    )
}

export default PersonsMap