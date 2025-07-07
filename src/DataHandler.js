import StorageHandler from "./StorageHandler.js";
import AuxHandler from "./AuxHandler";
import { Project, projectList } from "./project";
import { ProjectUIHandler } from "./UIHandler";
import ToDo from "./todo.js";

// This will oversee the creation and modification of data acquired through the GUI

const DataHandler = (function() {

    const newProjectForm = document.getElementById("new-project-form");
    // This will be the project that is currently being displayed
    let project;

    // Saves project user data
    function saveUserData(){
        StorageHandler.saveProjects(projectList);
    }
    
    // Adds a new project to the project list after it's created
    async function addNewProject() {
        const newProjectData = new FormData(newProjectForm);
        const projectID = AuxHandler.createID();
        ProjectUIHandler.appendNewProjectToList(newProjectData.get("name"), projectID);
        new Project(newProjectData.get("name"), newProjectData.get("type"), newProjectData.get("date"), projectID);
        newProjectForm.reset();
        saveUserData();
    }

    // Handles form submission to create a new project
    newProjectForm.addEventListener("submit", (e) => {
        addNewProject();
        e.preventDefault();
    });

    // Returns a project by its ID
    function returnProjectByID(projectID) {
        // Whenever this function is called it means this project was clicked and brought up, meaning this is the current project being looked at
        project = projectList.filter((project) => project.id == projectID)[0];
        return project;
    }

    // Returns a task by its ID
    function findTaskByID(taskID) {
        return project.todos.filter((todo) => todo.taskID == taskID)[0];
    }

    // Adds a task to a  project after it's created
    async function addNewTaskToProject() {
        const newTaskForm = document.getElementById("new-task-form");
        const newTaskData = new FormData(newTaskForm);
        const newTaskID = AuxHandler.createID();
        const newTask = new ToDo(newTaskData.get("task-name"), newTaskData.get("task-due-date"), newTaskData.get("task-priority"), newTaskData.get("task-notes"), newTaskID);
        // We'll add the new task to the project, note that this notation appends it (refer to setter method)
        project.addNewTaskToList(newTask);
        ProjectUIHandler.appendNewTaskToList(newTask);
        saveUserData();
    }

    // Updates a task's info after it's updated
    function updateTaskInfo(task, form) {
        task.name = form.get("edited-task-name");
        task.dueDate = form.get("edited-due-date");
        task.priority = form.get("edited-priority");
        task.notes = form.get("edited-notes");
        saveUserData();
    }


    async function editExistingTask() {
        const editTaskForm = document.getElementById("edit-task-form");
        const updatedTaskData = new FormData(editTaskForm);
        const taskID = document.querySelector(".edit-task-dialog").id;
        const taskToUpdate = findTaskByID(taskID);
        updateTaskInfo(taskToUpdate, updatedTaskData);
        ProjectUIHandler.editDisplayedTask(taskToUpdate);
    }

    // This deletes a task with the given ID from the project
    async function deleteExistingTask(id) {
        project.todos = project.todos.filter(todo => todo.taskID != id);
        saveUserData();
    }

    function returnProjectList() {
        return projectList;
    }

    function reconstructProjectList() {
        for(let index = 0; index < projectList.length; index++) {
            ProjectUIHandler.appendNewProjectToList(projectList[index].name, projectList[index].id);
        }
    }

    return { returnProjectByID, addNewTaskToProject, findTaskByID, editExistingTask, deleteExistingTask, returnProjectList };

})();

export default DataHandler;