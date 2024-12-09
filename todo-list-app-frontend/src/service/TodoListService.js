import axios from "axios";

export const getAllTask = () => axios.get("http://localhost:5000/api/v1/taskapp/allTask");

export const getTaskById = (taskId)=> axios.get(`http://localhost:5000/api/v1/taskapp/get/${taskId}`);

export const addNewTask = (task)=> axios.post("http://localhost:5000/api/v1/taskapp/addTask",task);

export const deleteTaskById = (taskId)=> axios.delete(`http://localhost:5000/api/v1/taskapp/delete/${taskId}`);

export const updateTaskById = (taskId)=> axios.post(`http://localhost:5000/api/v1/taskapp/update/${taskId}`);