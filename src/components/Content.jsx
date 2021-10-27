import React from 'react';
import './Content.scss'
import DB from '../assets/db.json'


const Content = () => {
  return (
    <div className="foldersBox">
      <ul className="foldersList grid">

        {DB.folders.map(folder => (
          <li className="folder">
            <p className="folder__name" style={{ color: folder.color }}>{folder.name}</p>
            <ul className="task ul">
              {folder.tasks.map(tasks => (
                <ul className="task li">
                  <h4 className="task__name">{tasks.name}</h4>
                  <p className="task__discription">{tasks.discription}</p>
                </ul>
              ))}
            </ul>
            <div className="addTask">
              <p className="addTask-btn">+ Add task...</p>
            </div>
          </li>
        ))}


      </ul>
    </div >
  );
}

export default Content;
