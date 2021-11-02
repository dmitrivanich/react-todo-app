import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Content.scss'

const Content = ({ folders, whenAddTask }) => {

  const [title, setTitle] = useState(null) //Новое название папки
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(null) //индекс изменяемого заголовка папки
  const [titles, addTitle] = useState(null) // массив, содержащий имена папкок

  const editTitle = (index, value) => {
    setTitle(value)
    setSelectedTitleIndex(index)
  }

  useEffect(() => {
    folders && addTitle(folders.map(folder => (folder.name)))
    console.log('useEffect')
  }, [folders])

  const comfirmTitle = (index, value) => {
    if (index !== null && value) {
      axios.patch(`http://localhost:3001/folders/${folders[index].id}`, {
        name: value
      })
      addTitle(titles.map((title, ind) => {
        if (ind === index) {
          return value
        } else {
          return title
        }
      }))
    }
  }

  return (
    <div className="foldersBox">
      <ul className="foldersList grid">

        {
          folders &&

          folders.map((folder, index) => (

            folder.name && //Если существует имя папки, произойдет рендер

            <li className="folder" key={index}>
              <input
                className="folder__name"
                type="text"
                style={{ color: folder.color }}
                value={selectedTitleIndex === index ? title : titles ? titles[index] : folder.name}
                onChange={(e) => { editTitle(index, e.target.value) }}
                onKeyPress={e => { e.key === 'Enter' && comfirmTitle(selectedTitleIndex, title) }}
              />

              <ul className="task ul">
                {folder.tasks.map((tasks, index) => (
                  <ul className="task li" key={index}>
                    <h4 className="task__name">{tasks.name}</h4>
                    {/* <input
                      className="task__name"
                      type="text"
                      value={tasks.name} /> */}
                    <p className="task__discription">{tasks.discription}</p>
                  </ul>
                ))}
              </ul>
              <div className="addTask">
                <p className="addTask-btn" onClick={() => whenAddTask(folder.id)}>+ Add task...</p>
              </div>
            </li>
          ))
        }


      </ul>
    </div >
  );
}



export default Content;
