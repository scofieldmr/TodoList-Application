package com.project.controller;

import com.project.dto.TaskDto;
import com.project.dto.TaskViewDto;
import com.project.exception.ResourceNotFoundException;
import com.project.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/taskapp")
public class TaskController {

    @Autowired
    TaskService taskService;

    //To add the Task
    @PostMapping("/addTask")
    public ResponseEntity<?> addNewTask(@RequestBody TaskDto taskDto){
        try{
            TaskViewDto newTaskViewDto = taskService.addNewTask(taskDto);

            return ResponseEntity.ok().body(newTaskViewDto);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //To view all task
    @GetMapping("/allTask")
    public ResponseEntity<?> getAllTaskDetails(){
        try{
            List<TaskViewDto> taskViewDtoList = taskService.getALlTasks();

            return ResponseEntity.ok().body(taskViewDtoList);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //To get task by Id
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getTaskDetailsById(@PathVariable("id") Long taskId){
        try{
            TaskViewDto taskViewDto = taskService.getTaskById(taskId);

            return ResponseEntity.ok().body(taskViewDto);
        }
        catch (ResourceNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //To delete the task by Id
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTaskById(@PathVariable("id") Long taskId){
        try{
            taskService.deleteTaskById(taskId);

            return ResponseEntity.ok().body("Task Id : "+ taskId + " deleted successfully.");
        }
        catch (ResourceNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //To update the task by Id
    @PostMapping("/update/{id}")
    public ResponseEntity<?> updateTaskDetailsById(@PathVariable("id") Long taskId){
        try{
            TaskViewDto updateTaskDto = taskService.updateTaskById(taskId);

            return ResponseEntity.ok().body(updateTaskDto);
        }
        catch (ResourceNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
