import React from 'react'

const PersonForm = ({handleAddPerson, nameText, numberText, handleChangeNameText, handleNumberChangeText}) => {
    return (
        <div>
            <form onSubmit={handleAddPerson}>
                <div>name: <input value={nameText} onChange={handleChangeNameText} /></div>
                <div>number: <input value={numberText} onChange={handleNumberChangeText} /></div>
                <div><button type="submit">add</button></div>
            </form>
        </div>
    )
}

export default PersonForm