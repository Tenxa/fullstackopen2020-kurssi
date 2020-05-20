import React from 'react'
import Part from './Part'

const Content = ({course}) => {
    return (
        <div>
            {course.parts.map((c) => 
                <Part key={c.id} name={c.name} exercise={c.exercises}/>
            )}
        </div>
    ) 
}
export default Content