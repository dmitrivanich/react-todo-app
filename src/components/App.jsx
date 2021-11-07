import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx'
import Content from './Content.jsx'
import './App.scss';
import axios from 'axios';


function App() {

  const [folders, setFolders] = useState(null)
  const [activeFolders, setActiveFolders] = useState(folders)
  const [actFolderIndex, setActFolderIndex] = useState([0])


  useEffect(() => {
    axios.get('http://localhost:3001/folders').then(({ data }) => {
      setFolders(data)
      setActiveFolders(data)
    })

  }, [])

  const addNewFolder = (newFolder) => {
    axios.post('http://localhost:3001/folders', { ...newFolder }).then(({ data }) => {
      setFolders([...folders, data])
      setActiveFolders([...folders, data])
    })
  }

  const whenRemove = (index) => {
    const newFolders = [...folders]
    newFolders.splice(index, 1)
    console.log(newFolders)

    setFolders([...newFolders])
    setActiveFolders([...newFolders])
    axios.delete(`http://localhost:3001/folders/${folders[index].id}`)
  }

  const whenSelected = (index) => {
    setActiveFolders([folders[index]])
  }

  const addTaskOnFolders = (name, disk, index, id) => {
    var newFolders = [...folders]
    var folder = folders[index]
    var newTasks = folder.tasks

    if (name && disk) {
      newTasks.push({
        "name": name,
        "discription": disk
      })

      folder.tasks = [...newTasks]
      newFolders.splice(index, 1, folder)
      setFolders(newFolders)

      axios.patch(`http://localhost:3001/folders/${id}`, {
        tasks: newTasks
      })
    }
  }

  const activeFolder = (index) => {
    console.log("Выбрана папка с индексом " + index)
    setActFolderIndex(index)

  }

  return (

    <div className="all">
      <Sidebar
        addNewFolder={addNewFolder}
        folders={folders}
        whenRemove={whenRemove}
        whenSelected={whenSelected}
        activeFolder={activeFolder}
      />

      <Content
        folders={activeFolders &&
          actFolderIndex ? [activeFolders[actFolderIndex]] : activeFolders
        }
        addTaskOnFolders={addTaskOnFolders}
        whenRemoveFolder={whenRemove}
      />
    </div>

  );

}


export default App;
