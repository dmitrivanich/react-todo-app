import React from 'react';
import Folders from "./Folders.jsx"
import AddFolderMenu from './AddFolderMenu.jsx';
import { AiFillFolderAdd } from 'react-icons/ai';
import { ImHome } from "react-icons/im";
import './App.scss';


function App() {
  var folders = [
    {
      name: "Homework",
      color: "rgb(231, 122, 46)",
      active: false,
      todos: [{
        name: "NotebookWork",
        discription: "Do React App!"
      },
      {
        name: "Books",
        discription: "Read more books!"
      }]
    },
    {
      name: "Work",
      color: "rgb(46, 62, 131)",
      active: false,
      todos: [{
        name: "NotebookWork",
        discription: "Do React App!"
      },
      {
        name: "Books",
        discription: "Read more books!"
      }]
    }
  ];
  // console.log(folders)


  return (
    <nav className="nav">
      <div className="nav__sidebar">

        <ul className="nav__menu">
          <li className="nav__menu-list">
            <ImHome size="1em" />
            <p>ALL TASKS</p>
          </li>
        </ul>

        <Folders folders={folders} />

        <div className="nav__addFolder">
          <AiFillFolderAdd className="nav__addFolder-icon" />
          <p className="nav__addFolder-text">Add forlder</p>
        </div>
      </div>

      <AddFolderMenu />
    </nav>
  );
}

export default App;
