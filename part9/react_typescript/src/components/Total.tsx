import React from 'react';

interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Total = ({ courseParts }: { courseParts: ContentProps[] }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

export default Total;