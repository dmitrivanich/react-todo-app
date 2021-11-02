import React from 'react';
import './Content.scss'



const Content = ({ folders, whenAddTask }) => {

  return (
    <div className="foldersBox">
      <ul className="foldersList grid">

        {
          folders &&

          folders.map((folder, index) => (

            folder.name && //Если существует имя папки, произойдет рендер

            <li className="folder" key={index}>
              <p className="folder__name" style={{ color: folder.color }}>{folder.name}</p>
              <ul className="task ul">
                {folder.tasks.map((tasks, index) => (
                  <ul className="task li" key={index}>
                    <h4 className="task__name">{tasks.name}</h4>
                    <p className="task__discription">{tasks.discription}</p>
                  </ul>
                ))}
              </ul>
              <div className="addTask">
                <p className="addTask-btn" onClick={() => whenAddTask(folder.id)}>+ Add task...</p>
              </div>
            </li>
          ))
        }


      </ul>
    </div >
  );
}



export default Content;
