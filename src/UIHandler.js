import AuxHandler from "./AuxHandler.js";
import DataHandler from "./DataHandler.js";

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

    const projectTaskSection = document.createElement("div");
    projectTaskSection.classList.add("project-task-info");

    const projectToDoList = document.createElement("ul");
    projectToDoList.classList.add("project-todo-list");


    projectTab.appendChild(projectHeader);
    projectHeader.appendChild(projectName);
    projectHeader.appendChild(projectDueDate);
    projectHeader.appendChild(projectRemainingTime);
    projectHeader.appendChild(projectType);

    projectTab.appendChild(projectTaskSection);
    projectTaskSection.appendChild(projectToDoList);


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
        taskPriorityLabel.textContent = "Task Priority:";
        const taskPriorityInput = document.createElement("input");
        taskPriorityInput.type = "number";
        taskPriorityInput.min = 1;
        taskPriorityInput.max = 5;
        taskPriorityInput.id = "task-priority";
        taskPriorityInput.name = "task-priority"
        taskPriorityDiv.appendChild(taskPriorityLabel);
        taskPriorityDiv.appendChild(taskPriorityInput);
        taskForm.appendChild(taskPriorityDiv);

        const taskNotesDiv = document.createElement("div");
        taskNotesDiv.classList.add("task-notes-div");
        const taskNotesLabel = document.createElement("label");
        taskNotesLabel.for = "task-notes";
        taskNotesLabel.textContent = "Task Notes";
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
            DataHandler.addNewTaskToProject();
            e.preventDefault();
        });

    }
    


    // Function that shows a project when it is clicked
    function showProjectInTab(projectID) {       
        // We need to get the project element we're gonna show
        const project = DataHandler.returnProjectByID(projectID);
        projectName.textContent = project.name;
        projectDueDate.textContent = project.dueDate;
        projectRemainingTime.textContent = `Time Left: ${AuxHandler.getDistanceToNow(project.dueDate)}`;
        projectType.textContent = project.type;

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
        newProject.textContent = projectName;
        projectList.appendChild(newProject);
        newProject.addEventListener("click", () => {
            showProjectInTab(id);
        });
    }




    // This adds a task to the project task list
    function appendNewTaskToList(task){
        const newTask = document.createElement("li");
        newTask.classList.add("project-task");
        projectToDoList.appendChild(newTask);
        
        const taskTitle = document.createElement("h4");
        taskTitle.textContent = task.name;
        taskTitle.classList.add("task-title");

        const taskDueDate = document.createElement("p");
        taskDueDate.textContent = task.dueDate;
        taskDueDate.classList.add("task-due-date");

        const taskPriority = document.createElement("p");
        taskPriority.classList.add("task-priority");
        taskPriority.classList.add(`priority-${task.priority}`);
        taskPriority.textContent = `Priority: ${task.priority}`;

        const taskNotes = document.createElement("p");
        taskNotes.textContent = task.notes;
        taskNotes.classList.add("task-notes");

        const taskFinished = document.createElement("p");
        taskFinished.classList.add("task-done")
        if(task.done) {
            taskFinished.textContent = "Finished: Yes";
            taskFinished.classList.add("completed");
        } else {
            taskFinished.textContent = "Finished: No";
            taskFinished.classList.add("not-completed");
        }

        newTask.appendChild(taskTitle);
        newTask.appendChild(taskDueDate);
        newTask.appendChild(taskPriority);
        newTask.appendChild(taskPriority);
        newTask.appendChild(taskFinished);
    }

    // This will expand a task when clicked, it will also allow them to be edited



    return {appendNewProjectToList, appendNewTaskToList};

})();


export {ProjectUIHandler};

