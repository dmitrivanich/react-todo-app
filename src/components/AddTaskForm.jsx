import React, { useState } from 'react'
import './AddTaskForm.scss'
import { IoIosClose } from 'react-icons/io';

function AddTaskForm({ folder, index, addTaskOnFolders, closeAddTaskForm }) {
  const [name, setName] = useState('')
  const [disk, setDisk] = useState('')
  const [time, setTime] = useState(``)


  const onAddTask = () => {
    setName('')
    setDisk('')
    addTaskOnFolders(name, time, disk, index, folder.id)
  }

  const onClose = () => {
    setName('')
    setDisk('')
    closeAddTaskForm()
  }

  return (
    <div className="addTaskForm">
      <div className="addTaskForm-box">

        <IoIosClose
          className="close"
          onClick={() => onClose()}
        />

        <input className="name"
          type="text"
          value={name}
          placeholder="Enter task name..."
          onChange={e => { setName(e.target.value) }}
        />

        <input
          name="Время на выполнение"
          className="time"
          type="time"
          step="2"
          value={time}
          placeholder="fff"
          onChange={e => { setTime(e.target.value) }}
        />

        <textarea className="disk"
          cols="20"
          type="text"
          rows="5"
          required
          value={disk}
          placeholder="Enter task discription..."
          onChange={e => { setDisk(e.target.value) }}
        />


        <button onClick={onAddTask}>+ AddTask +</button>


      </div>
    </div>
  )
}

export default AddTaskForm
