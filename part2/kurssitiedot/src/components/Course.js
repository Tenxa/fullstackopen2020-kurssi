import React from 'react'
import Content from './Content'

const Course = ({ course }) => {
    return (
        <div>
            <Content course={course} />
            <b>Total of {Sum(course)} excerices</b>
        </div>
    )
}

const Sum = (props) => {
    const total = props.parts.reduce((prev, next) =>
        console.log('what is happening', prev, next) || prev + next.exercises, 0
    )

    return (total)
}


export default Course