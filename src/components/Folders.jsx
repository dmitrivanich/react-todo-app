import React, { useState } from 'react';
import classNames from 'classnames';
import { HiOutlineFolderRemove } from "react-icons/hi";
import { AiFillFolder } from "react-icons/ai"
import { AiFillFolderOpen } from "react-icons/ai"


function Folders({ folders }) {
  const [selectedFolder, setSelectedFolder] = useState(null)

  return (
    <ul className="nav__folders">

      {folders.map((folder, index) => (
        <li className={classNames("nav__folders-folder", { "active": selectedFolder === index })} key={index} onClick={() => {
          setSelectedFolder(index)
        }} >
          {!(selectedFolder === index) && <AiFillFolder className="nav__folders-folderIcon" color={folder.color} />}
          {(selectedFolder === index) && <AiFillFolderOpen className="nav__folders-folderIcon" color={folder.color} />}
          <div className="folderInfo" >
            <p className="folderInfo-text">{folder.name}</p>
            <HiOutlineFolderRemove className="removeFolder" />
          </div>
        </li>
      ))
      }

    </ul >
  )
}

export default Folders
