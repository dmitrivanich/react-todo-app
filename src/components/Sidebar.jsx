import React, { useState } from 'react';
import Folders from "./Folders.jsx"
import AddFolderForm from './AddFolderForm.jsx';
import { ImHome } from "react-icons/im";
import classNames from 'classnames';
import './Sidebar.scss';
import DB from '../assets/db.json'

function Sidebar() {
  const [active, setActive] = useState(false)
  return (
    <div className="nav">
      <div className="nav__sidebar">

        <ul className="nav__menu">
          <li className={classNames('nav__menu-list', { 'active': active })} onClick={() => setActive(!active)}>
            <ImHome size="1em" />
            <p className="nav__menu-name">ALL TASKS</p>
          </li>
        </ul>

        <Folders folders={DB.folders} />

        <AddFolderForm />

      </div>
    </div >
  )
}

export default Sidebar
