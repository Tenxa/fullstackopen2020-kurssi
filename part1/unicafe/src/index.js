import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = props => <div>{props.text} {props.value} {props.symbol}</div>


const Statistics = (good, neutral, bad, all, average, positive) => {
  if (good <= 0 && neutral <= 0 && bad <= 0) {
    return (
      <div>
        No Feedback Given
      </div>
    )
  } else {
    return (
      <div>
        <table>
          <tbody>

            <tr>
              <td><StatisticsLine text='Good' /></td>
              <td><StatisticsLine value={good} /></td>
            </tr>

            <tr>
              <td><StatisticsLine text='Neutral' /></td>
              <td><StatisticsLine value={neutral} /></td>
            </tr>

            <tr>
              <td><StatisticsLine text='Bad' /></td>
              <td><StatisticsLine value={bad} /></td>
            </tr>

            <tr>
              <td><StatisticsLine text='All' /></td>
              <td><StatisticsLine value={all} /></td>
            </tr>

            <tr>
              <td><StatisticsLine text='Average' /></td>
              <td><StatisticsLine value={average} /></td>
            </tr>

            <tr>
              <td><StatisticsLine text='Positive' /></td>
              <td><StatisticsLine value={positive} /></td>
              <td><StatisticsLine symbol='%'/></td>
            </tr>
          </tbody>

        </table>

      </div>
    )
  }

}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //Statistics calculations
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  const setGoodValue = (newValue) => {
    setGood(newValue)
  }

  const setNeutralValue = (newValue) => {
    setNeutral(newValue)
  }

  const setBadValue = (newValue) => {
    setBad(newValue)
  }


  return (
    <div>
      <span>
        <h1>Give Feedback</h1>
      </span>
      <Button handleClick={() => setGoodValue(good + 1)} text='Good'></Button>
      <Button handleClick={() => setNeutralValue(neutral + 1)} text='Neutral'></Button>
      <Button handleClick={() => setBadValue(bad + 1)} text='Bad'></Button>

      <h1>Statistics</h1>
      {Statistics(good, neutral, bad, average, all, positive)}


    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)