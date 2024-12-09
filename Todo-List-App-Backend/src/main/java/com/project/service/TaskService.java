package com.project.service;

import com.project.dto.TaskDto;
import com.project.dto.TaskViewDto;

import java.util.List;

public interface TaskService {

    TaskViewDto addNewTask(TaskDto newtask);

    List<TaskViewDto> getALlTasks();

    TaskViewDto getTaskById(Long taskId);

    TaskViewDto updateTaskById(Long taskId,TaskDto updateTaskDto);

    void deleteTaskById(Long taskId);


}
