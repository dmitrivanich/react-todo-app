import React from 'react'

function Task(props) {
  var taskColor = "#42B883"
  var taskName = "Homework"

  return (
    <li className="todo__tasks-task">
      <svg className="circle" viewBox="0 0 5px 5px">
        <circle cx="5" cy="5" r="5px" fill={taskColor} />
      </svg>
      <p>{taskName}</p>
    </li>
  )
}

export default Task
