import { Project, projectList as projects} from "./project";

const contentSection = document.getElementById("content");


// This handles the portion of the HTML that shows the projects 

const ProjectUIHandler = (function() {


    // This handles a project's info being shown when it is clicked on the list

    const projectsTab = document.createElement("div");
    projectsTab.id = "projects-tab";

    const projectName = document.createElement("h2");
    projectName.classList.add("project-name");

    // Function that shows a project when it is clicked
    function showProjectInTab(projectID) {
        // First we'll clear up the whole tab
        projectsTab.textContent = "";
        // Then we can append the name section and 
        projectsTab.appendChild(projectName);

        // We need to get the project element we're gonna show
        const project = projects.filter((project) => project.id == projectID)[0];
        projectName.textContent = project.name;

        contentSection.textContent = '';
        contentSection.appendChild(projectsTab);
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
        // I know this violates the S rule in SOLID but it's just this one line and I don't see much point in creating another module for this.
        const projectID = crypto.randomUUID();
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