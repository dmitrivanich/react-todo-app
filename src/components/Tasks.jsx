import React, { useState, useEffect } from 'react'
import { IoIosClose } from 'react-icons/io';
import { BiCheck } from 'react-icons/bi';
import { FiEdit3 } from 'react-icons/fi';
// import Timer from './Timer'
import './Tasks.scss'

function Tasks({ folder, whenTaskRemove, whenTaskComplete }) {

  const date = new Date()
  const nowTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  const [times, setTimes] = useState('00:00:01')
  const [openedTask, setOpenedTask] = useState([null, null])

  const openTask = (ind) => {
    if (openTask !== null && openedTask[0] === folder.id && openedTask[1] === ind) { setOpenedTask([null, null]) }
    else { setOpenedTask([folder.id, ind]) }
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
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimes(folder.tasks.map(t => {
        return minusTime(userTaskTime(t.postTime, t.time), nowTime)
      }))
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    times &&
    <ul className="task ul">
      {folder.tasks.map((task, index) => (
        <ul
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
              onClick={() => completeTask(folder.id, index)}
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



          <h4 className="task__name">{task.name} {task.time && <p className="time">
            {toSecond(times[index]) > 0 ?
              !task.completed && times[index] :
              !task.completed && "is over"}
          </p>}</h4>

          <p className="task__discription"
            style={{
              height: openedTask && openedTask[0] === folder.id && openedTask[1] === index ? "auto" : "10vh"
            }}
            onClick={() => console.log(folder.id, index)}
          >{task.discription}</p>

          <button className="openTask"
            onClick={() => openTask(index)}
          >{openedTask && openedTask[0] === folder.id && openedTask[1] === index ? "↑ hide ↑" : "↓ show more ↓"}</button>
        </ul>
      ))
      }
    </ul >
  )
}

export default Tasks

// {setLeftTime(minusTime(userTaskTime(task.postTime, task.time), '00:02:02'))}