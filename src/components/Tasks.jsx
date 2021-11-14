import React, { useState, useEffect } from 'react'
import { IoIosClose } from 'react-icons/io';
// import Timer from './Timer'
import './Tasks.scss'

function Tasks({ folder, whenTaskRemove }) {

  const date = new Date()
  const nowTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  const [times, setTimes] = useState('0:0:0')

  const toSecond = (time) => {
    if (time !== null) {
      var converting = time.split(':').map((element, index) => index === 0 ? Number(element) * 3600 : index === 1 ? Number(element) * 60 : Number(element))

      var result = null

      converting.map(el => result += el)

      return result
    } else {
      return "1:1:1"
    }
  }

  const toNormalTime = (sec) => {
    var hours = (sec - (sec % 3600)) / 3600
    var minutes = (sec - (sec % 60)) / 60
    var seconds = sec % 3600 % 60

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

  useEffect(() => {
    let interval = setInterval(() => {
      setTimes(folder.tasks.map((t, i) => {
        return minusTime(userTaskTime(t.postTime, t.time), nowTime)
      }))
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <ul className="task ul">
      {folder.tasks.map((task, index) => (

        <ul
          className="task li"
          key={index}
          style={{ filter: toSecond(times[index]) < 0 ? "opacity(0.2)" : "opacity(1)" }}
        >


          <IoIosClose
            className="removeTask"
            onClick={() => removeTask(folder.id, index)}
          />

          <h4 className="task__name"
          // style={{ color: toSecond(time[index]) < 0 ? "gray" : folder.color }}
          >{task.name} {task.time && <p className="time">
            {times && times[index]}
          </p>}</h4>

          <p className="task__discription">{task.discription}</p>

        </ul>
      ))
      }
    </ul >
  )
}

export default Tasks

// {setLeftTime(minusTime(userTaskTime(task.postTime, task.time), '00:02:02'))}