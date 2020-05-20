import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'


/*const Total = (props) => {
    return (
        <div>
            <p>Total Excersices: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
        </div>
    )
}
*/

const course = {
  name: 'Half Stack application development',
  id: 1,
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
      id: 1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id: 2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id: 3
    }
  ]
}

ReactDOM.render(<App course={course}/>, document.getElementById('root'))