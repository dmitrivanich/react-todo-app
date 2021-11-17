import React, { useState, useEffect } from 'react';
import Tasks from './Tasks';
import AddTaskForm from './AddTaskForm';
import './Content.scss'
import classNames from 'classnames';
import axios from 'axios';
import { IoIosClose } from 'react-icons/io';


const Content = ({
  folders,
  addTaskOnFolders,
  whenRemoveFolder,
  whenChangeFolderName,
  whenTaskRemove,
  whenTaskComplete,
  whenTaskEdit
}) => {

  const [title, setTitle] = useState(null) //Новое название папки
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(null) //индекс изменяемого заголовка папки
  const [titles, addTitle] = useState(null) // массив, содержащий имена папкок
  const [addTaskFolder, setAddTaskFolder] = useState(null)
  const [info, setInfo] = useState(false)



  const editTitle = (index, value) => {
    setTitle(value)
    setSelectedTitleIndex(index)
    setInfo(true)
  }

  useEffect(() => {
    folders && addTitle(folders.map(folder => (folder.name)))
    setSelectedTitleIndex(null)
  }, [folders]) //каждый раз, когда обновляется состояние folder, обновляется состояние titles


  const comfirmTitle = (index, value) => {
    if (index !== null && value) {
      axios.patch(`http://localhost:3001/folders/${folders[index].id}`, {
        name: value
      })

      whenChangeFolderName(index, value)

      addTitle(titles.map((title, ind) => {
        if (ind === index) {
          return value
        } else {
          return title
        }
      }))
    }
    setInfo(false)
  }


  const closeAddTaskForm = () => {
    setAddTaskFolder(null)
  }



  return (
    <div className="foldersBox">
      <ul className="foldersList grid">

        {
          folders &&


          folders.map((folder, index) => (

            folder.name && //Если существует имя папки, произойдет рендер

            <li className="folder"
              key={index}
            >
              <IoIosClose
                className="closeFolder"
                onClick={() => whenRemoveFolder(index)}
              />
              <span
                className={classNames("enter", { "active": selectedTitleIndex === index && info })}
              >Press "Enter" for save...</span>
              <input
                className="folder__name"
                type="text"
                style={{ color: folder.color }}
                value={selectedTitleIndex === index ? title : titles ? titles[index] : folder.name}
                onChange={(e) => { editTitle(index, e.target.value) }}
                onKeyPress={e => { e.key === 'Enter' && comfirmTitle(selectedTitleIndex, title) }}
              />

              <Tasks
                folder={folder}
                whenTaskRemove={whenTaskRemove}
                whenTaskComplete={whenTaskComplete}
                whenTaskEdit={whenTaskEdit}
              />

              {index === addTaskFolder &&
                <AddTaskForm
                  folder={folder}
                  index={index}
                  addTaskOnFolders={addTaskOnFolders}
                  closeAddTaskForm={closeAddTaskForm}
                />
              }
              {index !== addTaskFolder &&
                <div className="addTask">
                  <p className="addTask-btn" onClick={() => setAddTaskFolder(index)}>+ Add task...</p>
                </div>
              }
            </li>


          ))
        }


      </ul>
    </div >
  );
}



export default Content;
