import React, { useState } from 'react';
import classNames from 'classnames';
import {HiOutlineFolderRemove} from "react-icons/hi";

function Folders({ folders }) {
  const [state] = useState(true)
  return (
    <ul className="nav__folders">

      {folders.map((folder, index) => (
        <li className={classNames("nav__folders-folder", { "active": state })} key={index} >
          <svg className="nav__folders-circle">
            <circle cx="5" cy="5" r="5px" fill={folder.color} />
          </svg>
          <p>{folder.name}</p>
          <HiOutlineFolderRemove className="nav__folders-folderRemove"/>
        </li>
      ))
      }

    </ul >
  )
}

export default Folders
