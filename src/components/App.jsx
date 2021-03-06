import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx'
import Content from './Content.jsx'
import './App.scss';
import axios from 'axios';


function App() {

  const [folders, setFolders] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:3001/folders').then(({ data }) => {
      setFolders(data)
    })

  }, [])

  const whenCreateFolder = (newFolder) => {
    axios.post('http://localhost:3001/folders', { ...newFolder }).then(({ data }) => {
      setFolders([...folders, data])
    })
  }

  const whenRemoveFolder = (folderIndex) => {
    const newFolders = [...folders]
    newFolders.splice(folderIndex, 1)

    setFolders([...newFolders])

    axios.delete(`http://localhost:3001/folders/${folders[folderIndex].id}`)
  }

  const whenTaskRemove = (folderID, taskIndex) => {

    let folder = folders.filter(folder => (
      folder.id === folderID
    )) //Получаем папку по ID

    let newTask = folder[0].tasks.filter((task, index) => (
      index !== taskIndex
    ))

    let newFolders = folders.map(oldFolder => (
      folder.id !== folderID ? oldFolder : folder
    ))

    folder[0].tasks = newTask //Заменяю прошлые такски отфильтрованными
    setFolders(newFolders)

    axios.patch(`http://localhost:3001/folders/${folderID}`, {
      tasks: newTask
    })
  }

  const whenTaskComplete = (folderID, taskIndex) => {

    let folder = folders.filter(folder => (
      folder.id === folderID
    )) //Получаем папку по ID

    let newTask = folder[0].tasks.filter((task, index) => (
      index === taskIndex
    )) //Получаем задачу по индексу

    newTask[0].completed = !newTask[0].completed
    //Замена статуса выполнения задачи на противоположный

    let newFolders = folders.map(oldFolder => (
      folder.id !== folderID ? oldFolder : folder
    ))

    setFolders(newFolders)

    axios.patch(`http://localhost:3001/folders/${folderID}`, {
      tasks: folder[0].tasks
    })
  }

  const whenChangeFolderName = (folderIndex, newFoldername) => {
    console.log(folderIndex, newFoldername)
    const newFolders = [...folders]
    newFolders[folderIndex].name = newFoldername
    setFolders(newFolders)
  }

  const addTaskOnFolder = (name, leftTime, disk, index, id,) => {
    var newFolders = [...folders]
    var folder = folders[index]
    var newTasks = folder.tasks

    if (name && disk) {

      newTasks.push({
        "name": name,
        "postTime": `${new Date().getHours().toString()}:${new Date().getMinutes().toString()}:${new Date().getSeconds().toString()}`,
        "postDay": `${new Date().getDate().toString()}`,
        "time": leftTime,
        "discription": disk,
        "completed": false
      })

      folder.tasks = [...newTasks]
      newFolders.splice(index, 1, folder)
      setFolders(newFolders)

      axios.patch(`http://localhost:3001/folders/${id}`, {
        tasks: newTasks
      })
    } else {
      alert("Please, enter Name and Discription!")
    }
  }

  const whenTaskEdit = (folderId, taskIndex, name, disk, time) => {

    var newFolders = [...folders]
    var folder = folders.map(folder => folder.id === folderId)
    var folderIndex = folder.indexOf(true)

    var newTasks = folders[folderIndex].tasks

    var newTask = {
      completed: newTasks[taskIndex].completed,
      discription: disk,
      name: name,
      postTime: `${new Date().getHours().toString()}:${new Date().getMinutes().toString()}:${new Date().getSeconds().toString()}`,
      postDay: newTasks[taskIndex].postDay,
      time: time
    }

    newTasks.splice(taskIndex, 1, newTask)
    newFolders[folderIndex].tasks = newTasks

    setFolders(newFolders)

    axios.patch(`http://localhost:3001/folders/${folderId}`, {
      tasks: newTasks
    })
  }

  const whenFolderIconClick = (index) => {
    var newFolders = folders
    var selectedFolder = folders[index]

    newFolders.splice(index, 1)
    newFolders = [selectedFolder, ...newFolders]

    setFolders(newFolders)

  }


  return (

    <div
      className="all"
    >
      <Sidebar
        addNewFolder={whenCreateFolder}
        folders={folders}
        whenRemove={whenRemoveFolder}
        whenFolderIconClick={whenFolderIconClick}
      />

      <Content
        folders={folders}
        addTaskOnFolder={addTaskOnFolder}
        whenRemoveFolder={whenRemoveFolder}
        whenChangeFolderName={whenChangeFolderName}
        whenTaskRemove={whenTaskRemove}
        whenTaskComplete={whenTaskComplete}
        whenTaskEdit={whenTaskEdit}
      />
    </div>

  );

}


export default App;
