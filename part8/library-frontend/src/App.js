import React, { useEffect, useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED, BOOKS_BY_GENRE } from './queries'
//import { GET_CURRENT_USER,  } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const loggedIn = window.localStorage.getItem('token')
    if (loggedIn) {
      setToken(loggedIn)
    }
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCacheWith = (addedBook) => {
    //Katsotaan titlejä, koska ne ovat unique.
    const includedIn = (set, object) => set.map(p => p.title).includes(object.title)

    // Ensin luetaan ja kirjoitetaan cacheen, jossa kaikki kirjat ovat.
    const dataInStore = client.readQuery({
      query: BOOKS_BY_GENRE,
      variables: { genre: '' }
    })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: BOOKS_BY_GENRE,
        variables: { genre: '' },
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })

      // katsotaan, jos on genrejä määritelty niin lisätään, jokaisen genre kohtaisen kyselyn cacheen.
      if (addedBook.genres) {
        addedBook.genres.forEach(genre => {
          const dataInStoreByGenre = client.readQuery({
            query: BOOKS_BY_GENRE,
            variables: { genre: genre }
          })
          if (dataInStoreByGenre) {
            client.writeQuery({
              query: BOOKS_BY_GENRE,
              variables: { genre: genre },
              data: { allBooks: dataInStoreByGenre.allBooks.concat(addedBook) }
            })
          }
        })
      }
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(addedBook.title)
      updateCacheWith(addedBook)
    }
  })

  if (token === null) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>Login</button>
        </div>

        <Notify errorMessage={errorMessage} />

        <Authors
          show={page === 'authors'}
        />

        <Books
          show={page === 'books'}
        />

        <Login
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
          setPage={setPage}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <Recommendations
        show={page === 'recommendations'}
      />

    </div>
  )
}

export default App