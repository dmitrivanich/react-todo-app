import React, { useState } from 'react'
import './EditTaskForm.scss'
import { VscSaveAs } from 'react-icons/vsc';

function AddTaskForm({
  folderId,
  taskIndex,
  taskName,
  taskTime,
  taskDiscription,
  confirmChanges
}) {
  const [name, setName] = useState(taskName)
  const [disk, setDisk] = useState(taskDiscription)
  const [time, setTime] = useState(taskTime)


  const onEdit = () => {
    if (disk.length > 1000000 || name.length > 55) {
      return
    }

    confirmChanges(folderId, taskIndex, name, disk, time)
    // addTaskOnFolders(name, time, disk, index, folder.id)
    setName('')
    setDisk('')
    setTime('')
  }


  return (
    <div className="addTaskForm">
      <div className="addTaskForm-box">


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
          placeholder="fff"
          onChange={e => { setTime(e.target.value) }}
        />

        <p className="formInfo">{disk.length > 100000 && `Maximum number of characters! (${disk.length} of 100000)`}</p>

        <textarea className="disk"
          type="text"
          rows="5"
          required
          value={disk}
          placeholder="Enter task discription..."
          onChange={e => { setDisk(e.target.value) }}
        />


        <button className="editBtn" onClick={onEdit}><VscSaveAs /> Save changes</button>


      </div>
    </div>
  )
}

export default AddTaskForm
