import React, { useState, useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [showNoti, setShowNoti] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])

  useEffect(() => {
    console.log(showNoti)
    if (showNoti === true) {
      const interval = setInterval(() => {
        setShowNoti(false)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [showNoti])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification show={showNoti} setShow={setShowNoti} />
      <AnecdoteList setShow={setShowNoti} />
      <AnecdoteForm show={showNoti} setShow={setShowNoti} />
    </div>
  )
}

export default App