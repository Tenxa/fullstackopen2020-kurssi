import React, { useState, useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  const [showNoti, setShowNoti] = useState(false)

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