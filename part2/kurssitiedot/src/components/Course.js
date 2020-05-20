import React from 'react'
import Part from './Part'

const Course = ({ course }) => {
    //console.log('From course', course)
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map((c) => {
                console.log(c)
                return (
                    <div>
                        <li key={c.id}>
                            <Part name={c.name} exercise={c.exercises}/>
                        </li>
                    </div>
                )
            })}
            <b>Total of {Sum(course)} excerices</b>
        </div>
    )
}


const Sum = (props) => {
    const total = props.parts.reduce((prev, next) =>
        prev + next.exercises, 0
    )

    return (total)
}


export default Course