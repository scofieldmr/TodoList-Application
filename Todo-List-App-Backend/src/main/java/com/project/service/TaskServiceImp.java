package com.project.service;

import com.project.Repository.TaskRepository;
import com.project.dto.TaskDto;
import com.project.dto.TaskViewDto;
import com.project.entity.Task;
import com.project.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskServiceImp implements TaskService{

    @Autowired
    TaskRepository taskRepository;

    @Override
    public TaskViewDto addNewTask(TaskDto newtask) {
        Task task = new Task();

        task.setTaskName(newtask.getTaskName());
        task.setTaskStatus(newtask.isTaskStatus());

        taskRepository.save(task);

        return new TaskViewDto(task.getId() ,task.getTaskName(),task.isTaskStatus());
    }

    @Override
    public List<TaskViewDto> getALlTasks() {
        List<Task> taskList = taskRepository.findAll();

        List<TaskViewDto> taskViewDtosList = new ArrayList<>();

        for(Task task : taskList){
            TaskViewDto taskViewDto = new TaskViewDto();

            taskViewDto.setId(task.getId());
            taskViewDto.setTaskName(task.getTaskName());
            taskViewDto.setTaskStatus(task.isTaskStatus());

            taskViewDtosList.add(taskViewDto);
        }

        return taskViewDtosList;
    }

    @Override
    public TaskViewDto getTaskById(Long taskId) {
        Task taskDetails = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task Id not found : " + taskId));

        TaskViewDto taskViewDto = new TaskViewDto();

        taskViewDto.setId(taskDetails.getId());
        taskViewDto.setTaskName(taskDetails.getTaskName());
        taskViewDto.setTaskStatus(taskDetails.isTaskStatus());

        return taskViewDto;
    }

    @Override
    public TaskViewDto updateTaskById(Long taskId, TaskDto updateTaskDto) {
        Task taskDetails = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task Id not found : " + taskId));

        taskDetails.setTaskName(updateTaskDto.getTaskName());
        taskDetails.setTaskStatus(updateTaskDto.isTaskStatus());

        taskRepository.save(taskDetails);

        return new TaskViewDto(taskDetails.getId() ,taskDetails.getTaskName(),taskDetails.isTaskStatus());
    }

    @Override
    public void deleteTaskById(Long taskId) {

        Task deleteTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task Id not found : " + taskId));


        taskRepository.delete(deleteTask);
    }
}
