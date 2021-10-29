import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx'
import Content from './Content.jsx'
import './App.scss';
import DB from '../assets/db.json'


function App() {

  const [folders, setFolders] = useState(DB.folders)


  const whenCreatedNewFolder = (newFolder) => {
    const newFolders = [...folders, newFolder]
    newFolders[newFolders.length - 1].id = folders.length
    setFolders(newFolders)
  }

  return (
    <div className="all">
      <Sidebar newFolder={whenCreatedNewFolder} folders={folders} />
      <Content folders={folders} />
    </div>
  );
}

export default App;


//РАЗРАБОТАТЬ УДАЛЕНИЕ ПАПКИ