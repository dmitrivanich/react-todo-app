import React, { useState, useEffect } from 'react'
import { IoIosClose } from 'react-icons/io';
import { BiCheck } from 'react-icons/bi';
import { FiEdit3 } from 'react-icons/fi';
import EditTaskForm from './EditTaskForm'
// import Timer from './Timer'
import './Tasks.scss'

function Tasks({
  folder,
  whenTaskRemove,
  whenTaskComplete,
  whenTaskEdit
}) {

  const date = new Date()
  const nowTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  const [times, setTimes] = useState('00:00:01')
  const [openedTask, setOpenedTask] = useState([null, null])
  const [editableTask, setEditableTask] = useState([null, null])

  useEffect(() => {
    let interval = setInterval(() => {
      setTimes(folder.tasks.map(t => {
        return minusTime(userTaskTime(t.postTime, t.time), nowTime)
      }))
    }, 1000)
    return () => clearInterval(interval)
  })

  useEffect(() => {
    setEditableTask([null, null])
  }, [folder])


  const openTask = (ind) => {
    if (openTask !== null && openedTask[0] === folder.id && openedTask[1] === ind) { setOpenedTask([null, null]) }
    else { setOpenedTask([folder.id, ind]) }
    console.log(folder.tasks[ind].discription.split('').length)
  }

  const toSecond = (time) => {
    if (time === "00:00:00") {
      return 0
    }
    if (time !== undefined) {
      var converting = time.split(':').map((element, index) => index === 0 ? Number(element) * 3600 : index === 1 ? Number(element) * 60 : Number(element))

      var result = null

      converting.map(el => result += el)
      return result
    }
  }

  const toNormalTime = (sec) => {
    if (sec <= 0) {
      return (`00:00:00`)
    }
    // console.log(sec)
    var hours = (sec - (sec % 3600)) / 3600
    var minutes = (sec - (sec % 60)) / 60
    var seconds = sec % 60


    if (seconds > 59) {
      seconds = seconds % 60
      minutes = minutes + 1
    }

    if (minutes > 59) {
      minutes = minutes % 60
    }

    return (`${hours}:${minutes}:${seconds}`)
  }

  const userTaskTime = (time1, time2) => {
    return toNormalTime(toSecond(time1) + toSecond(time2))
  }

  const minusTime = (time1, time2) => {
    return toNormalTime(toSecond(time1) - toSecond(time2))
  }

  const removeTask = (folderID, taskIndex) => {
    whenTaskRemove(folderID, taskIndex)
  }

  const completeTask = (folderID, taskIndex, cheked) => {
    whenTaskComplete(folderID, taskIndex, cheked)
    setEditableTask([null, null])
  }

  const editTask = (folderID, taskIndex) => {
    if (editableTask[0] === folderID && editableTask[1] === taskIndex) {
      setEditableTask([null, null])
      return
    } else {
      setEditableTask([folderID, taskIndex])
    }
  }

  const confirmChanges = (folderId, taskIndex, name, disk, time) => {
    whenTaskEdit(folderId, taskIndex, name, disk, time)
    // console.log([id, index, name, disk, time])
    setEditableTask([null, null])
  }


  return (
    times &&
    <ul className="task ul">
      {folder.tasks.map((task, index) => (

        <li
          className="task li"
          key={index}
          style={{
            filter: toSecond(times[index]) < 0 ?
              task.completed ? "opacity(0.5)" : "opacity(0.2)" :
              task.completed ? "opacity(0.5)" : "opacity(1)",
            textDecoration: task.completed ? "line-through" : "none"
          }}
        >
          <nav className="taskTools">
            <FiEdit3
              className="editTask"
              onClick={() => editTask(folder.id, index)}
            />
            <BiCheck
              className="completeTask"
              onClick={() => completeTask(folder.id, index)}
              style={{
                color: task.completed ? "rgb(51, 255, 0)" : "",
              }}
            />
            <IoIosClose
              className="removeTask"
              onClick={() => removeTask(folder.id, index)}
            />

          </nav>

          {editableTask[0] && editableTask[0] === folder.id && editableTask[1] === index &&
            <EditTaskForm
              folderId={folder.id}
              taskIndex={index}
              taskName={task.name}
              taskTime={task.time}
              taskDiscription={task.discription}
              confirmChanges={confirmChanges}
            />
          }

          {editableTask[1] !== index &&
            <h4 className="task__name">{task.name} {task.time &&
              <p className="time">
                {toSecond(times[index]) > 0 ?
                  task.completed ? "completed" : times[index] :
                  task.completed ? "completed" : "is over"}
              </p>}
            </h4>}



          {editableTask[1] !== index &&
            <p className="task__discription"
              style={{
                height: openedTask && openedTask[0] === folder.id && openedTask[1] === index ? "auto" : "10vh"
              }}
              onClick={() => console.log(folder.id, index)}
            >{task.discription}
            </p>}

          {editableTask[1] !== index && task.discription.length > 80 &&
            <button className="openTask"
              onClick={() => openTask(index)}
            >{openedTask && openedTask[0] === folder.id && openedTask[1] === index ? "↑ hide ↑" : "↓ show more ↓"}
            </button>}

        </li>
      ))
      }
    </ul >
  )
}

export default Tasks

// {setLeftTime(minusTime(userTaskTime(task.postTime, task.time), '00:02:02'))}