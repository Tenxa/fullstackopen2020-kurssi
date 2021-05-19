
import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState('all genres')
  const [books, setBooks] = useState(null)
  const [getBooks, { data, loading }] = useLazyQuery(BOOKS_BY_GENRE, {
    fetchPolicy: "cache-and-network"
  })

  useEffect(() => {
    if (filter !== 'all genres') {
      getBooks({ variables: { genre: filter } })
    }
    if (filter === 'all genres') {
      getBooks({ variables: { genre: '' } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    }
  }, [data])

  if (books === null || !books) {
    return null
  }
  if (!props.show) return null
  if (loading && props.show) {
    return <div>loading...</div>
  }

  const genres = ['refactoring', 'agile', 'patterns', 'design', 'crime', 'classic', 'all genres']

  return (
    <div>
      <h2>books</h2>

      <p>in genre <strong>{filter}</strong></p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((element, i) =>
            <tr key={i}>
              <td>{element.title}</td>
              <td>{element.author.name}</td>
              <td>{element.published}</td>
            </tr>
          )
          }
        </tbody>
      </table>

      <div>
        {genres.map((genre, i) =>
          <button key={i} value={genre} onClick={({ target }) => setFilter(target.value)}>{genre}</button>
        )}
      </div>

    </div>
  )
}

export default Books