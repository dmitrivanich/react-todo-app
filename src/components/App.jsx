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

  const addNewFolder = (newFolder) => {
    axios.post('http://localhost:3001/folders', { ...newFolder }).then(({ data }) => {
      setFolders([...folders, data])
    })
  }

  const whenRemove = (index) => {
    const newFolders = [...folders]
    newFolders.splice(index, 1)
    console.log(newFolders)

    setFolders([...newFolders])

    axios.delete(`http://localhost:3001/folders/${folders[index].id}`)
  }


  const whenTaskRemove = (folderID, taskIndex) => {
    console.log(folderID, taskIndex)

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


  const addTaskOnFolders = (name, time, disk, index, id) => {
    var newFolders = [...folders]
    var folder = folders[index]
    var newTasks = folder.tasks

    if (name && disk) {
      newTasks.push({
        "name": name,
        "postTime": `${new Date().getHours().toString()}:${new Date().getMinutes().toString()}:${new Date().getSeconds().toString()}`,
        "time": time,
        "discription": disk
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




  return (

    <div className="all">
      <Sidebar
        addNewFolder={addNewFolder}
        folders={folders}
        whenRemove={whenRemove}
      />

      <Content
        folders={folders}
        addTaskOnFolders={addTaskOnFolders}
        whenRemoveFolder={whenRemove}
        whenTaskRemove={whenTaskRemove}
      />
    </div>

  );

}


export default App;
