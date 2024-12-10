import React, { useEffect, useState, useNavigate } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { addNewTask, deleteTaskById, getAllTask, getTaskById, updateTaskById } from '../service/TodoListService';


const TodoComp = () => {

    const [todolists, setTodolists] = useState([]);

    const [taskName, setTaskName] = useState('');
    const [taskStatus, setTaskStatus] = useState(false);

    const [error, setErrors] = useState({
        taskName: '',
    });

    // Get the list of all tasks on component
    useEffect(() => {
        getAllTaskList();
    }, []);

    // Function to fetch all tasks
    function getAllTaskList() {
        getAllTask().then((response) => {
            setTodolists(response.data);
        })
            .catch((error) => {
                console.error(error);
            })
    }

   
   // To validate the task field
    function validation() {
        const errorsCopy = { ...error };

        let valid = true;

        if (taskName.trim()) {
            errorsCopy.taskName = ''
        }
        else {
            errorsCopy.taskName = 'Task Name Required!'
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;

    }

    //To add new task 
    function addTask(e) {
        e.preventDefault();

        if (validation()) {

            let ntask = { taskName, taskStatus };

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

    //To delete the task
    function deleteTask(id) {
        const delTask = getTaskById(id).then((response)=>{
            console.log(response.data.taskName);
        })
        .catch((error)=>{
            console.error(error);
        })

        deleteTaskById(id).then(() => {
            getAllTaskList();
        })
            .catch((error) => {
                console.error(error);
            })
    }

    //To update the task status
    function toggleStatus(id) {
        // const updatedTasks = todolists.map((task) =>
        //   task.id === id
        //     ? { ...task, taskStatus: !task.taskStatus } // Toggle task status (completed / not completed)
        //     : task
        // );
        // setTodolists(updatedTasks);

        const updatedTask = getTaskById(id).then((response)=>{
            console.log(response.data.taskName);
        })
        .catch((error)=>{
            console.error(error);
        })

        updateTaskById(id).then(() => {
          getAllTaskList();
        }).catch((error) => {
          console.error(error);
        });
      }

    return (
        <div>
            <div className='container'>
                <div className='card col-md-6 offset-md-3 offset-md-3' style={{ marginTop: '10px' }}>
                    <h2 className='text-center' style={{ color: 'red', marginTop: '5px' }}>Add New Task </h2>
                    <form style={{ padding: '20px' }}>
                        <div className='form-group mb-6'>
                            <input
                                type='text'
                                placeholder='Enter new Task'
                                name='taskName'
                                value={taskName}
                                className={`form-control ${error.taskName ? 'is-invalid' : ' '}`}
                                onChange={(e) => setTaskName(e.target.value)}
                            ></input>

                            {error.taskName && <div className='invalid-feedback'>{error.taskName}</div>}
                        </div>
                        <button className='btn btn-success' style={{ marginTop: '10px' }}
                            onClick={addTask}>Add Task</button>
                    </form>
                </div>
                <div className='card-body col-md-6 offset-md-3'>
                        {todolists.map((task) => (
                            <div
                              key={task.id} 
                              className='card'
                              style={{margin: '10px',display: 'flex'}}>
                                <p
                                 style={{margin : '10px', width:'70%', fontSize:'20px', textDecoration: task.taskStatus? '2px line-through' : 'none'}}> 
                                    {task.taskName}
                                    <button className='btn btn-outline-secondary' 
                                     style={{position:'absolute',right:'60px',width:'15%',borderRadius:'15px',bottom:'5px'
                                     }}
                                     
                                      onClick={()=>toggleStatus(task.id)}
                                     >
                                        Toggle</button>
                                    <button className='btn btn-danger' 
                                      style={{position:'absolute',right:'10px',bottom:'5px',width:'7%',borderRadius:'15px'}}
                                      onClick={()=>deleteTask(task.id)}
                                    >
                                        X</button>
                                </p>
                            </div>
                        ))}
                
                </div>
            </div>
        </div >
    )
}

export default TodoComp