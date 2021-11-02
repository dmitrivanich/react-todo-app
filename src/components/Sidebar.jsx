import React, { useState } from 'react';
import Folders from "./Folders.jsx"
import AddFolderForm from './AddFolderForm.jsx';
import { ImHome } from "react-icons/im";
import classNames from 'classnames';
import './Sidebar.scss';

function Sidebar({ addNewFolder, folders, whenRemove, whenSelected, whenMenuActive }) {
  const [active, setActive] = useState(false)

  const menu = () => {
    setActive(!active)
    whenMenuActive()
  }


  return (
    <div className="nav">
      <div className="nav__sidebar">

        <ul className="nav__menu">
          <li className={classNames('nav__menu-list', { 'active': active })} onClick={() => menu()}>
            <ImHome size="1em" />
          </li>
        </ul>

        <Folders
          folders={folders}
          whenRemove={whenRemove}
          whenSelected={whenSelected}
        />

        <AddFolderForm addNewFolder={addNewFolder} />

      </div>
    </div >
  )
}

export default Sidebar
