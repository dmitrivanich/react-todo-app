import React, { useState } from 'react'
import './AddTaskForm.scss'
import { IoIosClose } from 'react-icons/io';

function AddTaskForm({ folder, index, addTaskOnFolders, closeAddTaskForm }) {
  const [name, setName] = useState('')
  const [disk, setDisk] = useState('')

  const onAddTask = () => {
    setName('')
    setDisk('')
    addTaskOnFolders(name, disk, index, folder.id)
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

        <input className="disk"
          type="text"
          value={disk}
          placeholder="Enter task discription..."
          onChange={e => { setDisk(e.target.value) }}
        />

        <button onClick={onAddTask}>AddTask</button>


      </div>
    </div>
  )
}

export default AddTaskForm
