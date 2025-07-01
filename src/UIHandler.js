import { Project, projectList as projects} from "./project";
import AuxHandler from "./AuxHandler.js";

const contentSection = document.getElementById("content");


// This handles the portion of the HTML that shows the projects 

const ProjectUIHandler = (function() {

    // This is the element appended when a project is clicked so its info is shown

    const projectsTab = document.createElement("div");
    projectsTab.id = "projects-tab";

    const projectName = document.createElement("h2");
    projectName.classList.add("project-name");

    const projectDueDate = document.createElement("p");
    projectDueDate.classList.add("project-due-date");

    const projectRemainingTime = document.createElement("p");
    projectRemainingTime.classList.add("project-remaining-time");

    const projectToDoList = document.createElement("ul");
    projectToDoList.classList.add("project-todo-list");

    const projectType = document.createElement("p");
    projectType.classList.add("project-type");

    projectsTab.appendChild(projectName);
    projectsTab.appendChild(projectDueDate);
    projectsTab.appendChild(projectRemainingTime);
    projectsTab.appendChild(projectType);
    projectsTab.appendChild(projectToDoList);


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
    }
    


    // Function that shows a project when it is clicked
    function showProjectInTab(projectID) {       
        // We need to get the project element we're gonna show
        const project = projects.filter((project) => project.id == projectID)[0];
        projectName.textContent = project.name;
        projectDueDate.textContent = project.dueDate;
        projectRemainingTime.textContent = `Time Left: ${AuxHandler.getDistanceToNow(project.dueDate)}`;
        projectType.textContent = project.type;

        contentSection.textContent = '';
        contentSection.appendChild(projectsTab);

        projectToDoList.textContent = '';
        createNewTaskForm();
    }



    // Tt also brings the dialog box for creating new projects and handles their addition into the page 
    const addProjectButton = document.querySelector(".add-project-button");
    const projectFormWindow = document.querySelector(".create-project-dialog");
    const newProjectForm = document.getElementById("new-project-form");
    const projectList = document.querySelector(".project-list");
    
    addProjectButton.addEventListener("click", () => {
        projectFormWindow.showModal();
    });

    async function addNewProject(){
        const newProjectData = new FormData(newProjectForm);
        const projectID = AuxHandler.createID();
        appendNewProjectToList(newProjectData.get("name"), projectID);
        new Project(newProjectData.get("name"), newProjectData.get("type"), newProjectData.get("date"), projectID);
    }

    newProjectForm.addEventListener("submit", (e) => {
        projectFormWindow.close();
        addNewProject();
        e.preventDefault();
    });

    function appendNewProjectToList(projectName, id){
        const newProject = document.createElement("li");
        newProject.id = id;
        newProject.textContent = projectName;
        projectList.appendChild(newProject);
        newProject.addEventListener("click", () => {
            showProjectInTab(id);
        });
    }

})();



export {ProjectUIHandler};