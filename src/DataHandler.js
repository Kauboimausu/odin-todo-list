import AuxHandler from "./AuxHandler";
import { Project, projectList } from "./project";
import { ProjectUIHandler } from "./UIHandler";

// This will oversee the creation and modification of data acquired through the GUI

const DataHandler = (function() {

    const newProjectForm = document.getElementById("new-project-form");

    
    async function addNewProject(){
        const newProjectData = new FormData(newProjectForm);
        const projectID = AuxHandler.createID();
        ProjectUIHandler.appendNewProjectToList(newProjectData.get("name"), projectID);
        new Project(newProjectData.get("name"), newProjectData.get("type"), newProjectData.get("date"), projectID);
    }

    newProjectForm.addEventListener("submit", (e) => {
        addNewProject();
        e.preventDefault();
    });


    function returnProjectByID(projectID) {
        const project = projectList.filter((project) => project.id == projectID)[0];
        return project;
    }

    return { returnProjectByID };

})();

export default DataHandler;