
import React from "react";
import TaskShow from "./TaskShow";


function Tasks({ taskList, addTask, checkTask, onUpdate, onDelete }){
    let completedTasks = 0;
    taskList.forEach((task) => {
      if(task.isChecked){
        completedTasks += 1;
      }
    })
    console.log(`${completedTasks}/${taskList.length}`)

    return (
      <div>
          <div className="white-bg panel">
            <div className="container-row">
            <h2>{`Tarefas: ${completedTasks}/${taskList.length} `}</h2>
          </div>
          <div className="project-container">
            {taskList.map((task) => {
              return <TaskShow key={task.id} item={task} onUpdate={onUpdate} checkTask={checkTask} onDelete={onDelete} />
            })}
          </div>
        </div>
      </div>
    );
}
export default Tasks;