import React, { useState } from 'react';
import Folders from "./Folders.jsx"
import AddFolderForm from './AddFolderForm.jsx';
import { MdGpsFixed, MdGpsNotFixed } from "react-icons/md";

import './Sidebar.scss';




function Sidebar({ addNewFolder, folders, whenRemove, whenFolderIconClick }) {

  const [sidebarView, setSidebarView] = useState(true)

  const menu = () => {
    setSidebarView(!sidebarView)
  }



  return (
    <div className="nav" style={sidebarView ? { bottom: "0px", padding: "0px" } : {}} >
      <div className="nav__sidebar">

        <ul className="nav__menu" onClick={() => menu()}>
          <li className='nav__menu-list' >
            {sidebarView ? <MdGpsFixed /> : <MdGpsNotFixed />}
          </li>
        </ul>

        <Folders
          folders={folders}
          whenRemove={whenRemove}
          whenFolderIconClick={whenFolderIconClick}
        />

        <AddFolderForm
          addNewFolder={addNewFolder}
          sidebarView={sidebarView}
        />

      </div>
    </div >
  )
}

export default Sidebar
