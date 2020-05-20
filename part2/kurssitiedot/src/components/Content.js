import React from 'react'
import Part from './Part'

const Content = ({course}) => {
    return (
        <div>
            {course.parts.map((course) => 
                <Part key={course.id} name={course.name} exercise={course.exercises}/>
            )}
        </div>
    ) 
}
export default Content