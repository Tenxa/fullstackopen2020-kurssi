import React from 'react';


interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Content = ({ courseParts }: { courseParts: ContentProps[] }) => {
  return (
    <div>
      {courseParts.map((course, i) => {
        return <p key={i}>{course.name} {course.exerciseCount}</p>
      })}
    </div>
  );
};

export default Content;