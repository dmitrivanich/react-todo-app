import React from 'react';
import Folders from "./Folders.jsx"
import AddFolderForm from './AddFolderForm.jsx';
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

        <AddFolderForm />

      </div>


    </nav>
  );
}

export default App;
