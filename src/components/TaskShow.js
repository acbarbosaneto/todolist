import { GoPencil, GoTrashcan, GoChevronDown, GoChevronRight, GoCheck, GoX } from "react-icons/go";
import { useState } from 'react';


function TaskShow({ item, onDelete, onUpdate, checkTask}){
    const [isExpanded, setIsExpanded] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const[newNote, setNewNote] = useState(item)

    function handleDelete(){
        onDelete(item.id)
    }
    function handleUpdate(){
        onUpdate(item.id, newNote);
        setEditMode(false);
    }

    function handleClick() {
        setIsExpanded(!isExpanded)
        if(isExpanded)
            setEditMode(false)
    }

    function handleCheck(){
        checkTask(item.id);
    }

    function handleEdit(event){
        setEditMode(!editMode)
        event.stopPropagation();
        event.preventDefault();
    }

    function handleChange(event){
        const {name,value} = event.target;
        setNewNote(prevValue=>{
            return {
                ...prevValue,
                [name]: value,
            }
        })
    }

    let titleShow = ""

    if(isExpanded){
        titleShow=item.title
    }else{
        if(item.title.length>30){
            titleShow = `${item.title.slice(0, 30)}...`
        } else {
            titleShow = item.title;
        }
    }

    
    return (
        <div className="project-show">
            <div className="project-show-header" onClick={handleClick}>  
                <div className="container-row">
                    <input className="project-show-checkbox" type='checkbox' checked={item.isChecked} onClick={(e)=>e.stopPropagation()} onChange={handleCheck}></input>
                    {isExpanded ? <GoChevronDown /> : <GoChevronRight />}
                    {editMode ? <input className="input" onClick={(e)=>e.stopPropagation()} onChange={handleChange} name="title" value={newNote.title} placeholder={newNote.title}></input> : <h5 className="">{titleShow}</h5> }
                </div>
                {isExpanded && (editMode ?
                <div>
                    <button className="project-show-button" onClick={handleEdit}><GoX /></button>
                    <button className="project-show-button" onClick={handleUpdate} ><GoCheck /></button>
                </div>
                :
                <div>
                    <button className="project-show-button" onClick={handleEdit} ><GoPencil /></button>
                    <button className="project-show-button" onClick={handleDelete}><GoTrashcan /></button>
                </div>
                )}
                
            </div>
            {isExpanded && (editMode ?  <textarea className="input comment" onChange={handleChange} name="content" value={newNote.content} placeholder="Content"></textarea> : <div className="input comment">{item.content}</div>)}
        </div>

    )
}

export default TaskShow;