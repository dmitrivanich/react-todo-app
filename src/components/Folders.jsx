import React, { useState } from 'react';
import classNames from 'classnames';
import { HiOutlineFolderRemove } from "react-icons/hi";
import { AiFillFolder } from "react-icons/ai"
import { AiFillFolderOpen } from "react-icons/ai"





function Folders({ folders, whenRemove, activeFolder }) {
  const [selectedFolder, setSelectedFolder] = useState(null)


  const setActiveFolder = (index) => {
    setSelectedFolder(index);
    activeFolder(index)
    if (index === selectedFolder) {
      setSelectedFolder(null)
      activeFolder(null)
    }


  }


  return (
    <ul className="nav__folders">

      {folders &&
        folders.map((folder, index) => (
          folder.name && //Если сущeствует имя папки, произойдет рендер


          <li className={classNames("nav__folders-folder", { "active": selectedFolder === index })} key={index} onClick={() => setActiveFolder(index)} >

            {!(selectedFolder === index) && <AiFillFolder className="nav__folders-folderIcon" color={folder.color} />}
            {(selectedFolder === index) && <AiFillFolderOpen className="nav__folders-folderIcon" color={folder.color} />}
            <div className="folderInfo" >
              <p className="folderInfo-text">{folder.name}</p>
              <HiOutlineFolderRemove
                className="removeFolder"
                onClick={() => whenRemove(index)}
              />
            </div>

          </li>

        ))
      }

    </ul >
  )
}

export default Folders


