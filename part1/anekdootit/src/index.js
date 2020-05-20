import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = props => <div>has {props.value} votes</div>

const RandomValue = (min, max) => {
  return (Math.floor(Math.random() * (max - min + 1)) + min)
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(0)

  const setSelectedValue = (newValue) => {
    setSelected(newValue)
  }

  const voteFor = () => {
    anecdotes[selected].votes += 1
    setVote(vote + 1)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>

      {props.anecdotes[selected].content}<br />

      <Display value={props.anecdotes[selected].votes} />
      <div>
        <Button handleClick={() => voteFor()} text='Vote'></Button>
        <Button handleClick={() => setSelectedValue(RandomValue(0, 5))} text='Next Anecdote'></Button>
      </div>

      <h1>Anecdote with most votes</h1>
      {getMostVoted()}


    </div>

  )
}

const anecdotes = [
  { content: 'If it hurts, do it more often', votes: 0 },
  { content: 'Adding manpower to a late software project makes it later!', votes: 0 },
  { content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
  { content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
  { content: 'Premature optimization is the root of all evil.', votes: 0 },
  { content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 }
]

const getMostVoted = () => {
  const temp = anecdotes.slice(0)
  temp.sort((a, b) => a.votes - b.votes)
  return (
    <>
      <div>
        {temp[5].content}
      </div>
      {temp[5].votes}
    </>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)