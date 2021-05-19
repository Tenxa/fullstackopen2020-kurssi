import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { BOOKS_BY_GENRE, GET_CURRENT_USER } from '../queries'

const Recommendations = ({ show }) => {
  const result = useQuery(GET_CURRENT_USER)
  const [getBooks, { data, loading }] = useLazyQuery(BOOKS_BY_GENRE)

  useEffect(() => {
    if (result.data) {
      getBooks({ variables: { genre: result.data.me.favoriteGenre } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  if (!show) return null
  if (!result) return null
  if (loading && show) {
    return <div>loading... reco</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre <strong>{result.data.me.favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((book, i) =>
            <tr key={i}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations