import React, { Fragment } from 'react';
import { CoursePart } from '../types';

const style = {
  border: "4px black dotted",
  borderRadius:" 10px 75px / 120px",
  padding: "0px 0px 15px 15px",
  margin: "10px"
}

const CourseHeader = ({ coursePart }: { coursePart: CoursePart }) => {
  return (
    <p><strong>{coursePart.name} {coursePart.exerciseCount}</strong></p>
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case "normal": {
      return (
        <div style={style}>
          <CourseHeader coursePart={coursePart}/>
          <i>{coursePart.description}</i>
        </div>
      );
    }
    case "groupProject": {
      return (
        <div style={style}>
          <CourseHeader coursePart={coursePart}/>
          <p>project exercises {coursePart.groupProjectCount}</p>
        </div>
      );
    }
    case "submission": {
      return (
        <div style={style}>
          <CourseHeader coursePart={coursePart}/>
          <i>{coursePart.description}</i>
          <p>submit to: <a>{coursePart.exerciseSubmissionLink}</a></p>
        </div>
      );
    }
    case "special": {
      return (
        <div style={style}>
          <CourseHeader coursePart={coursePart}/>
          <i>{coursePart.description}</i>
          <p>required skills: {" "}
            {coursePart.requirements.map((r) => <Fragment key={r}>{" "} {r}</Fragment>)}
          </p>
        </div>
      );
    }
    default: {
      return <></>
    }
  }
};

export default Part;