import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx'
import Content from './Content.jsx'
import './App.scss';
import axios from 'axios';


function App() {

  const [folders, setFolders] = useState(null)
  const [activeFolders, setActiveFolders] = useState(folders)

  // const [removedFolder, setRemovedFolder] = useState(null)



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
    const arr = [...folders]
    arr.splice(index, 1)
    setFolders(arr)
    axios.delete(`http://localhost:3001/folders/${folders[index].id}`)
  }

  const whenAddTask = (index) => {
    console.log(index)
  }

  const whenSelected = (index) => {
    setActiveFolders([folders[index]])
  }

  const whenMenuActive = () => {
    setActiveFolders(folders)
  }

  return (
    <div className="all">
      <Sidebar
        addNewFolder={addNewFolder}
        folders={folders}
        whenRemove={whenRemove}
        whenSelected={whenSelected}
        whenMenuActive={whenMenuActive}
      />
      <Content
        folders={activeFolders}
        whenAddTask={whenAddTask}
      />
    </div>
  );
}

export default App;


//РАЗРАБОТАТЬ УДАЛЕНИЕ ПАПКИ