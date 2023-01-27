import React, {useState} from "react";
import { MdAdd, MdOutlineCompress } from "react-icons/md";

function CreateTask(props){
    const [isExpanded, setIsExpanded] = useState(false);

    const [task, setTask] = useState({
        title:"",
        content:"",
        isChecked:false,
        id:""
    })

    function handleClick() {
        setIsExpanded(!isExpanded)
    }

    function handleChange(event){
        const {name,value} = event.target;
        setTask(prevValue=>{
            return {
                ...prevValue,
                [name]: value,
            }
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        props.addNote({...task,id:crypto.randomUUID().replace(/_/g,"")});
        setTask({
            title:"",
            content:"",
            isChecked:false,
            id:""
        })
        setIsExpanded(false)
    }

    return(
        <div onClick={handleClick} className="container-column card">
            <button className="button" onClick={handleClick}>{isExpanded ? <MdOutlineCompress /> : <MdAdd />}</button>
            <div>Nova Tarefa</div>
            {isExpanded && <div>
            <input className="card-input" onClick={(e)=>e.stopPropagation()} onChange={handleChange} name="title" value={task.title} placeholder="Title"></input>
            <textarea className="card-input" onClick={(e)=>e.stopPropagation()} onChange={handleChange} name="content" value={task.content} placeholder="Content"></textarea>
            <button className="button1" onClick={handleSubmit}>Criar Nota</button>
            </div>}
        </div>
    );
}

export default CreateTask;