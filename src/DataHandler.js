import AuxHandler from "./AuxHandler";
import { Project, projectList } from "./project";

// This will oversee the creation and modification of data acquired through the GUI

const DataHandler = (function() {

    async function addNewProject(){
        const newProjectData = new FormData(newProjectForm);
        const projectID = AuxHandler.createID();
        appendNewProjectToList(newProjectData.get("name"), projectID);
        new Project(newProjectData.get("name"), newProjectData.get("type"), newProjectData.get("date"), projectID);
    }

    function returnProjectByID(projectID) {
        const project = projects.filter((project) => project.id == projectID)[0];
    }

})();