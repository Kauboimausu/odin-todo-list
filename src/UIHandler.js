import AuxHandler from "./AuxHandler.js";
import DataHandler from "./DataHandler.js";
import trash from "./img/papelera.png";
import edit from "./img/editar.png";

const contentSection = document.getElementById("content");


// This handles the portion of the HTML that shows the projects 

const ProjectUIHandler = (function() {

    // This is the element appended when a project is clicked so its info is shown

    const projectTab = document.createElement("div");
    projectTab.id = "project-tab";

    const projectHeader = document.createElement("div");
    projectHeader.classList.add("project-header");

    const projectName = document.createElement("h2");
    projectName.classList.add("project-name");

    const projectDueDate = document.createElement("p");
    projectDueDate.classList.add("project-due-date");

    const projectRemainingTime = document.createElement("p");
    projectRemainingTime.classList.add("project-remaining-time");

    const projectType = document.createElement("p");
    projectType.classList.add("project-type");

    const projectToDoList = document.createElement("ul");
    projectToDoList.classList.add("project-todo-list");


    projectTab.appendChild(projectHeader);
    projectHeader.appendChild(projectName);
    projectHeader.appendChild(projectDueDate);
    projectHeader.appendChild(projectRemainingTime);
    projectHeader.appendChild(projectType);

    projectTab.appendChild(projectToDoList);


    // Function that creates a new form to create new tasks for the project
    // Note that we're adding each element to the form after we create them
    function createNewTaskForm(){

        // We create the form to add tasks
        const taskForm = document.createElement("form");
        taskForm.action = "UIHandler.js";
        taskForm.id = "new-task-form";

        // Then we'll create each of the necessary elements for the form
        const taskHeader = document.createElement("h2");
        taskHeader.textContent = "Add New Task";
        taskHeader.classList.add("new-task-header");
        taskForm.appendChild(taskHeader);

        const taskNameDiv = document.createElement("div");
        taskNameDiv.classList.add("task-name-div");
        const taskNameLabel = document.createElement("label");
        taskNameLabel.for = "task-name";
        taskNameLabel.textContent = "Task Name: ";
        const taskNameInput = document.createElement("input");
        taskNameInput.id = "task-name";
        taskNameInput.name = "task-name";
        taskNameInput.placeholder = "Wash the dishes";
        taskNameInput.required = true;
        taskNameDiv.appendChild(taskNameLabel);
        taskNameDiv.appendChild(taskNameInput);
        taskForm.appendChild(taskNameDiv);


        const taskDueDateDiv = document.createElement("div");
        taskDueDateDiv.classList.add("task-due-date-div");
        const taskDueDateLabel = document.createElement("label");
        taskDueDateLabel.for = "task-due-date";
        taskDueDateLabel.textContent = "Due Date: ";   
        const taskDueDateInput = document.createElement("input");
        taskDueDateInput.type = "date";
        taskDueDateInput.min = AuxHandler.getTodaysDate();
        taskDueDateInput.id = "task-due-date";
        taskDueDateInput.name = "task-due-date";
        taskDueDateInput.required = true;
        taskDueDateDiv.appendChild(taskDueDateLabel);
        taskDueDateDiv.appendChild(taskDueDateInput);
        taskForm.appendChild(taskDueDateDiv);

        const taskPriorityDiv = document.createElement("div");
        taskPriorityDiv.classList.add("task-priority-div");
        const taskPriorityLabel = document.createElement("label");
        taskPriorityLabel.for = "task-priority";
        taskPriorityLabel.textContent = "Task Priority: ";
        const taskPriorityInput = document.createElement("input");
        taskPriorityInput.type = "number";
        taskPriorityInput.min = 1;
        taskPriorityInput.max = 5;
        taskPriorityInput.required = true;
        taskPriorityInput.id = "task-priority";
        taskPriorityInput.name = "task-priority"
        taskPriorityDiv.appendChild(taskPriorityLabel);
        taskPriorityDiv.appendChild(taskPriorityInput);
        taskForm.appendChild(taskPriorityDiv);

        const taskNotesDiv = document.createElement("div");
        taskNotesDiv.classList.add("task-notes-div");
        const taskNotesLabel = document.createElement("label");
        taskNotesLabel.for = "task-notes";
        taskNotesLabel.textContent = "Task Notes: ";
        const taskNotesInput = document.createElement("input");
        taskNotesInput.type = "textarea";
        taskNotesInput.id = "task-notes";
        taskNotesInput.name = "task-notes";
        taskNotesInput.placeholder = "Sweep under the couch";
        taskNotesDiv.appendChild(taskNotesLabel);
        taskNotesDiv.appendChild(taskNotesInput);
        taskForm.appendChild(taskNotesDiv);

        const submitButton = document.createElement("button");
        submitButton.classList.add("new-task-submit-button");
        submitButton.type = "submit";
        submitButton.textContent = "Add Task";
        taskForm.appendChild(submitButton);

        // Finally we'll append the form to the top of the task list
        projectToDoList.appendChild(taskForm);

        // We'll add the event listener here since this is when the element is created
        taskForm.addEventListener("submit", (e) => {
            e.stopPropagation();
            DataHandler.addNewTaskToProject();
            e.preventDefault();
            taskForm.reset();
        });

    }
    


    // Function that shows a project when it is clicked
    function showProjectInTab(projectID) {       
        // We need to get the project element we're gonna show
        const project = DataHandler.returnProjectByID(projectID);
        projectName.textContent = `Project: ${project.name}`;
        projectDueDate.textContent = `Due: ${project.dueDate}`;
        projectRemainingTime.textContent = `Time Left: ${AuxHandler.getDistanceToNow(project.dueDate)}`;
        projectType.textContent = `Category: ${project.type}`;

        contentSection.textContent = '';
        contentSection.appendChild(projectTab);

        projectToDoList.textContent = '';
        createNewTaskForm();
        showExistingProjects(project.todos);
    }

    function showExistingProjects(taskList) {
        for(let index = 0; index < taskList.length; index++) {
            appendNewTaskToList(taskList[index]);
        }
    }



    // Tt also brings the dialog box for creating new projects and handles their addition into the page 
    const addProjectButton = document.querySelector(".add-project-button");
    const projectFormWindow = document.querySelector(".create-project-dialog");
    const projectList = document.querySelector(".project-list");
    
    addProjectButton.addEventListener("click", () => {
        projectFormWindow.showModal();
    });

    function appendNewProjectToList(projectName, id){
        projectFormWindow.close();
        const newProject = document.createElement("li");
        newProject.id = id;
        newProject.classList.add("project-item");
        newProject.textContent = projectName;
        projectList.insertBefore(newProject, addProjectButton);
        newProject.addEventListener("click", () => {
            showProjectInTab(id);
        });
    }


    // This adds a task to the project task list
    function appendNewTaskToList(task) {


        const newTask = document.createElement("li");
        newTask.classList.add("project-task");
        projectToDoList.appendChild(newTask);
        newTask.id = task.taskID;
        
        const taskTitle = document.createElement("h4");
        taskTitle.textContent = task.name;
        taskTitle.classList.add("task-title");

        const taskDueDate = document.createElement("p");
        taskDueDate.textContent = `Due Date: ${task.dueDate}`;
        taskDueDate.classList.add("task-due-date");

        const taskPriority = document.createElement("p");
        taskPriority.classList.add("task-priority");
        taskPriority.classList.add(`priority-${task.priority}`);
        taskPriority.textContent = `Priority: ${task.priority}`;

        const taskNotes = document.createElement("p");
        taskNotes.textContent = `Notes: ${task.notes}`;
        taskNotes.classList.add("task-notes");
         
        const statusDiv = document.createElement("div");
        statusDiv.classList.add("status-div");
        const statusText = document.createElement("p");
        statusText.textContent = "Finished "
        const editStatus = document.createElement("input");
        editStatus.type = "checkbox";
        editStatus.checked = task.completed;

        statusDiv.appendChild(statusText);
        statusDiv.appendChild(editStatus);

        editStatus.classList.add("edit-task-status");
        editStatus.classList.add("task-done");
        editStatus.classList.add("unfinished");

        newTask.appendChild(taskTitle);
        newTask.appendChild(taskDueDate);
        newTask.appendChild(taskPriority);
        newTask.appendChild(taskPriority);
        newTask.appendChild(statusDiv);

        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("task-actions");
        const editIcon = document.createElement("img");
        editIcon.src = edit;
        editIcon.classList.add("edit-task");
        editIcon.classList.add("task-icons");
        const trashIcon = document.createElement("img");
        trashIcon.src = trash;
        trashIcon.classList.add("delete-task");
        trashIcon.classList.add("task-icons");

        actionsDiv.appendChild(editIcon);
        actionsDiv.appendChild(trashIcon);

        newTask.appendChild(actionsDiv);


        //  we'll add the necessary class for the priority
        const numbers = ["one", "two", "three", "four", "five"];
        newTask.classList.add(`priority-${numbers[task.priority-1]}`);

        // Event that edits a task
        editIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            DialogHandler.showEditTask(task);
        }); 

        // Event that deletes a task
        trashIcon.addEventListener("click", (e) => {
            e.stopPropagation();
        })


        // We'll add an event listener to change the task status when clicked 
        editStatus.addEventListener("click", (e) => {
            e.stopPropagation();
            // We'll toggle the task completion status, as well as change the checkbox class
            task.completed = !task.completed;
            if(task.completed) {
                editStatus.classList.add("task-completed");
                editStatus.classList.add("task-incomplete");
            } else {
                editStatus.classList.add("task-incomplete");
                editStatus.classList.add("task-completed");
            }
        });


        // we'll add an event listener to bring up the expanded task when clicked
        newTask.addEventListener("click", (e) => {
            DialogHandler.showExpandedTask(task);
        });
    }

    // function editDisplayedTask(task){
    //     const taskToUpdate = document.querySelector(`${task.taskID}`);
    //     taskToUpdate.title = task.name;
    //     document.querySelector(`#${task.taskID}>task-title`) = task.name;
    //     document.querySelector(`#${task.taskID}>task-due-date`) = `Due Date: ${task.dueDate}`;
    //     document.querySelector(`#${task.taskID}>task-priority`) = `Priority: ${task.priority}`;
    // }



    return {appendNewProjectToList, appendNewTaskToList};

})();

// Handles sidebar events
const SideBarHandler = (function() {
    const collapseButton = document.querySelector(".collapse-button");
    const projectList = document.querySelector(".project-list");

    collapseButton.addEventListener("click", (e) => {
        // We'll make it so that the button toggles classes and list visibility
        if(collapseButton.classList.contains("collapsable")) {
            collapseButton.classList.remove("collapsable");
            collapseButton.classList.add("collapsed");
            projectList.classList.add("no-show");
        } else {
            collapseButton.classList.remove("collapsed");
            collapseButton.classList.add("collapsable");
            if(projectList.classList.contains("no-show"));
                projectList.classList.remove("no-show");
        }
    });
})();


// Handles dialog events 
const DialogHandler = (function() {

    const dialogs = document.querySelectorAll("dialog");
    const pageMask = document.querySelector(".page-mask");

    function togglePageMask(toggleOn) {
        if(toggleOn) {
            pageMask.style.display = "block";
        } else{
            pageMask.style.display = "none";
        }
    }

    for(let i = 0; i < dialogs.length; i++) {
        dialogs[i].addEventListener("beforetoggle", (e) => {
            if(e.newState == "open")
                togglePageMask(true);
            else 
                togglePageMask(false);
        })
    }

    const closeProjectDialog = document.querySelector(".close-create-project");

    closeProjectDialog.addEventListener("click", (e) => {
        document.querySelector(".create-project-dialog").close();
    });


    function showExpandedTask(task) {
        const modalView = document.querySelector(".dialog-task-view");
        // const expandedTaskView = document.querySelector(".expanded-task-view");
        const expandedTaskName = document.querySelector(".expanded-task-name");
        const expandedTaskPriority = document.querySelector(".expanded-task-priority");
        const expandedTaskDueDate = document.querySelector(".expanded-task-due-date");
        const expandedTaskTimeLeft = document.querySelector(".expanded-task-time-left");
        const expandedTaskNotes = document.querySelector(".expanded-task-notes");
        const expandedTaskStatus = document.querySelector(".expanded-task-status");

        // expandedTaskView.id = task.taskID;
        expandedTaskName.textContent = task.name;
        expandedTaskPriority.textContent = `Priority: ${task.priority}`;
        expandedTaskDueDate.textContent = `Due Date: ${task.dueDate}`;
        expandedTaskTimeLeft.textContent = `Time Left: ${AuxHandler.getDistanceToNow(task.dueDate)}`;
        expandedTaskNotes.textContent = `Notes: \n ${task.notes}`;
        if(task.completed) 
            expandedTaskStatus.textContent = "Task Complete";
        else 
            expandedTaskStatus.textContent = "Task Not Yet Finished";
        modalView.showModal();
    }

    function showEditTask(task) {
        const modalView = document.querySelector(".edit-task-dialog");
        modalView.id = task.taskID;

        const editTaskName = document.getElementById("edited-task-name");
        editTaskName.value = task.name;
        const editDueDate = document.getElementById("edited-due-date");
        editDueDate.value = task.dueDate;
        editDueDate.min = AuxHandler.getTodaysDate();
        const editPriority = document.getElementById("edited-priority");
        editPriority.value = task.priority;
        const editNotes = document.getElementById("edited-notes");
        editNotes.value = task.notes;

        modalView.showModal();
    }

    const editTaskForm = document.getElementById("edit-task-form");
        editTaskForm.addEventListener("submit", (e) => {
            DataHandler.editExistingTask();
            e.preventDefault();
    });


    
    const closeTaskDialog = document.querySelector(".close-task-view");

    closeTaskDialog.addEventListener("click", (e) => {
        document.querySelector(".dialog-task-view").close();
    });


    const closeEditDialog = document.querySelector(".close-edit-dialog");

    closeEditDialog.addEventListener("click", (e) => {
        document.querySelector(".edit-task-dialog").close();
    });

    return { showExpandedTask, showEditTask };
})();

export {ProjectUIHandler};

