import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { SET_BIRTHYEAR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const BirthyearForm = ({ authors }) => {
  //const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const [setBirthyear, result] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log(`result.data: ${result.data}`)
      console.log(`result.data.editAuthor ${result.data.editAuthor}`)
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()

    setBirthyear({ variables: { name: selectedOption.value, setBornTo: born * 1 } })

    setSelectedOption(null)
    setBorn('')
  }

const options = authors.map(author => ({ value: author.name, label: author.name }))


  return (
    <div>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        {/* select tag toteutus
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author, i) => 
              <option key={i} value={author.name}>{author.name}</option>
            )}
          </select>
        </div>
        */}
        <div>
          <Select 
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthyearForm