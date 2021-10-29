import React, { useState } from 'react';
import Folders from "./Folders.jsx"
import AddFolderForm from './AddFolderForm.jsx';
import { ImHome } from "react-icons/im";
import classNames from 'classnames';
import './Sidebar.scss';

function Sidebar({ newFolder, folders }) {
  const [active, setActive] = useState(false)
  return (
    <div className="nav">
      <div className="nav__sidebar">

        <ul className="nav__menu">
          <li className={classNames('nav__menu-list', { 'active': active })} onClick={() => setActive(!active)}>
            <ImHome size="1em" />
          </li>
        </ul>

        <Folders folders={folders} />

        <AddFolderForm newFolder={newFolder} />

      </div>
    </div >
  )
}

export default Sidebar
