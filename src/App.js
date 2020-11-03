import React from 'react';
import s from './App.module.css';
import ToDoContainer from "./ToDoContainer";
import InputToDoContainer from "./Container/InputToDo/InputToDoContainer";

/*
import s from 'App.module.css';
*/

function App() {
  return (
      
    <div className={s.app}>
        <div className={s.main}>
            <div className={s.logo}>
                <span>Список задач</span>
            </div>
            <InputToDoContainer />
            <ToDoContainer />
        </div>
    </div>
  );
}

export default App;
