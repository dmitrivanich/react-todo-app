import React from 'react';
import { ImHome } from "react-icons/im";
import './App.scss';
import Task from "./Task"


function App() {

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <div className="todo__list">
          <ImHome size="1em" />
          <li> ALL TASKS</li>
        </div>
        <ul className="todo__tasks">
          <Task />
        </ul>
      </div>
    </div>
  );
}

export default App;
