# TodoList-Application

This is a Todo List application built with React for the frontend, Spring Boot for the backend, and MySQL for the database. The app allows users to add, delete, and mark tasks as completed, with task data being persisted in a MySQL database via a Spring Boot backend.

# Features
# Add Task: 
Users can enter a task name and add it to the list.
# Delete Task: 
Tasks can be deleted from the list.
# Toggle Task Status:
Users can mark tasks as completed by clicking the "Toggle" button, which will cross out the task name.

# Technologies Used
# Frontend:
React: For building the user interface and handling state management.
Bootstrap: For responsive design and styling.
Axios: For making HTTP requests to interact with the backend API.
CSS: For additional styling, including word wrapping for long task names.
# Backend:
Spring Boot: For creating the RESTful API that handles tasks, including adding, deleting, and toggling the task status.
MySQL: For storing tasks in a database, ensuring that data persists even after application restarts.
# Database:
MySQL: A relational database used to store and manage tasks, including their names and statuses.

# How It Works
Frontend (React) interacts with the Backend (Spring Boot) using REST APIs:
The frontend sends requests to the backend to add, delete, or update tasks.
The backend communicates with the MySQL database to store and retrieve task data.

# Adding a Task: 
The user enters a task name and clicks the "Add Task" button. The task is saved to the MySQL database via the Spring Boot backend and displayed in the list.

# Marking a Task as Completed: 
The user clicks the "Toggle" button to mark the task as completed. The task status is updated in the database and the task name is crossed out in the frontend.

# Deleting a Task: 
The user can click the "X" button to delete a task. The task is removed from both the list and the MySQL database.

# Responsive Design: 
The app uses Bootstrap to ensure the UI adapts to different screen sizes, providing an optimal experience on both desktop and mobile devices.
