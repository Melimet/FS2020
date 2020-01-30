import React from "react";

const Header = ({name}) => {
  return (
    <h1>
      {name}
    </h1>
  )
};

const Content = ({parts}) => {
  return (
    <ul>
      {parts.map(part => <li key={part.id}>
          {Part(part)}
        </li>
      )}
    </ul>
  )
};

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  )
};
const Total = ({parts}) => {
  return (
    <div>
      <b>Total exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</b>
    </div>
  )
};
const Course = ({name, parts}) => {
  return (
    <div>
      <Header name={name}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}
const Courses = ({courses}) => {
  console.log('spagu', courses)
  return (
    <div>
      {courses.map(course => <div key={course.id}>
          {Course(course)}
        </div>
      )}
    </div>
  )
}

export default Courses