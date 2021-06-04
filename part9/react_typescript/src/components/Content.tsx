import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';


const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((course, i) => <Part coursePart={course} key={i}/>)}
    </div>
  );
};

export default Content;