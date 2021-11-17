import React, { useState } from 'react'
import './AddTaskForm.scss'
import { IoIosClose } from 'react-icons/io';
import { BiMessageAltAdd } from 'react-icons/bi';

function AddTaskForm({ folder, index, addTaskOnFolders, closeAddTaskForm }) {
  const [name, setName] = useState('')
  const [disk, setDisk] = useState('')
  const [time, setTime] = useState('')

  const onAddTask = () => {
    if (disk.length > 1000000 || name.length > 55) {
      return
    }

    addTaskOnFolders(name, time, disk, index, folder.id)
    setName('')
    setDisk('')
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

        <p className="formInfo">{name.length > 55 && `Maximum number of characters! (${name.length} of 55)`}</p>

        <input className="name"
          type="text"
          value={name}
          placeholder="Enter task name..."
          onChange={e => { setName(e.target.value) }}
        />


        <input
          className="time"
          type="time"
          step="2"
          value={time}
          onChange={e => { setTime(e.target.value) }}
        />




        <p className="formInfo">{disk.length > 100000 && `Maximum number of characters! (${disk.length} of 100000)`}</p>

        <textarea className="disk"
          type="text"
          rows="5"
          required
          value={disk}
          placeholder="Enter task discription..."
          onChange={e => { setDisk(e.target.value.replace(/^ |(?<= ) /g, '\u00A0')) }}

        />


        <button className="addBtn" onClick={onAddTask}><BiMessageAltAdd /> Add task <BiMessageAltAdd /></button>


      </div>
    </div>
  )
}

export default AddTaskForm
