import React, { useState } from 'react';
import classNames from 'classnames';
import { HiOutlineFolderRemove } from "react-icons/hi";
import { VscCircleLargeFilled } from "react-icons/vsc"

function Folders({ folders }) {
  const [state] = useState(true)
  return (
    <ul className="nav__folders">

      {folders.map((folder, index) => (
        <li className={classNames("nav__folders-folder", { "active": state })} key={index} >
          <VscCircleLargeFilled className="nav__folders-circle" color={folder.color} />
          <p>{folder.name}</p>
          <HiOutlineFolderRemove className="nav__folders-folderRemove" />
        </li>
      ))
      }

    </ul >
  )
}

export default Folders
