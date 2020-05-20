import React from 'react'
import Course from './components/Course'
import Header from './components/Header'

const App = ({ course }) => {


    return (
        <div>
            <Header course={course}/>
            <Course course={course} />
        </div>
    )
}



export default App