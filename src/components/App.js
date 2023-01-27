import React, {useEffect, useState} from 'react';
import CreateTask from './CreateTask';
import Tasks from './Tasks';
function App() {

  const [taskList, setTaskList] = useState(()=>JSON.parse(localStorage.getItem('taskList')) || []);

  useEffect(()=>{
    localStorage.setItem("taskList", JSON.stringify(taskList))
  }, [taskList])

  function addNote(note){
    setTaskList(prevList=>[...prevList, note])
  }

  function updateNote(id,newNote){
    const updatedList = taskList.map((noteItem) => {
      if(noteItem.id === id){
        return {...noteItem, title:newNote.title, content: newNote.content}
      }
      return {...noteItem}
    })
    setTaskList(updatedList)
    
  }

  function checkTask(id){

    const newList = taskList.map((noteItem) => {
      if(id===noteItem.id){
        return {...noteItem, isChecked:!noteItem.isChecked}
      }
      return {...noteItem}
    })
    setTaskList(newList)
    localStorage.setItem("taskList", JSON.stringify(newList))
    
    }

  function deleteNote(id){
    console.log("delete")
    setTaskList(prevList=>{
      const newList = prevList.filter((noteItem, index)=>{
        return id!==noteItem.id
      })
      return newList
    })
  }
  
  const date = new Date()
  const year = date.getFullYear();
  return (
    <div>
      <h1 className='header'>Todo List</h1>
      <CreateTask addNote={addNote} />
      <Tasks taskList={taskList} checkTask={checkTask} onUpdate={updateNote} onDelete={deleteNote}/>
      <footer>
        <h5> {` Copyright © ${year} \n Desenvolvido por Antonio Barbosa.`}</h5>
      </footer>
    </div>
  );
}


export default App;