import React, { useEffect, useState, useNavigate } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { addNewTask, deleteTaskById, getAllTask, getTaskById, updateTaskById } from '../service/TodoListService';


const ListComp = () => {

    const [todolists, setTodolists] = useState([]);

    // const [taskid, setTaskid] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskStatus, setTaskStatus] = useState(false);


    useEffect(() => {
        getAllTaskList();
    }, []);

    function getAllTaskList() {
        getAllTask().then((response) => {
            setTodolists(response.data);
        })
            .catch((error) => {
                console.error(error);
            })
    }

    const[error ,setErrors] = useState({
        taskName : '',
    });

    function validation(){
        const errorsCopy = {...error};

        let valid = true;

        if(taskName.trim()){
            errorsCopy.taskName = ''
        }
        else{
            errorsCopy.taskName = 'Task Name Required!'
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;

    }

    function addTask(e) {
        e.preventDefault();
        
         if(validation()){
            
         let ntask = {taskName,taskStatus};

         addNewTask(ntask).then((response) => {
            console.log(response.data);
            setTaskName('');
            setTaskStatus(false);
            getAllTaskList();
         })
         .catch((error) => {
            console.error(error);
         })
         }

    }

    function deleteTask(id){
        deleteTaskById(id).then(()=> {
            getAllTaskList();
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    function toggleStatus(id){
       updateTaskById(id).then(()=>{
        getAllTaskList();
       })
       .catch((error)=>{
        console.error(error);
       })
    }

    return (
        <div>
            <div className='container'>
                <div className='card col-md-6 offset-md-3 offset-md-3' style={{marginTop:'10px'}}>
                    <h2 className='text-center' style={{color:'Red',margin:'10px'}}>Add New Task </h2>
                    <form style={{padding:'20px'}}>
                        <div className='form-group mb-6'>
                        <input
                            type='text'
                            placeholder='Enter new Task'
                            name='taskName'
                            value={taskName}
                            className={`form-control ${error.taskName ? 'is-invalid' : ' '}`}
                            onChange={(e)=>setTaskName(e.target.value)}
                        ></input>

                        {error.taskName && <div className='invalid-feedback'>{error.taskName}</div>}
                        </div>
                        <button className='btn btn-success' style={{marginTop:'10px'}}
                                onClick={addTask}>Add Task</button>
                    </form>
                </div>
                <hr></hr>
                <h2 className='text-center' style={{color:'Red'}} >Task List</h2>
                <hr></hr>

                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Task Id </th>
                            <th>Task Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            todolists.map(task =>
                                <tr key={task.id} className={task.taskStatus ? 'completed-task' : ''}>
                                    <td>{task.id}</td>
                                    <td>{task.taskName}</td>
                                    <td>
                                        <button className='btn btn-success' onClick={()=>toggleStatus(task.id)}>Completed</button>
                                        <button className='btn btn-danger' style={{marginLeft : '10px'}}
                                                   onClick={()=>deleteTask(task.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default ListComp