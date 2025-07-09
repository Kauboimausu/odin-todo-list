import StorageHandler from "./StorageHandler";


let projectData = StorageHandler.loadProjects();


class Project {
    constructor(name, type, dueDate, id, todos=[]) {
        this.name = name;
        this.type = type;
        this.dueDate = dueDate;
        this.todos = todos;
        this.id = id;
        projectList.push(this);
    }

    addNewTaskToList(newTask){
        this.todos.push(newTask);
    }
}

let projectList = [];
for(let index = 0; index < projectData.length; index++) {
    let reconstructedProject = new Project(projectData[index].name, projectData[index].type, projectData[index].dueDate, projectData[index].id, projectData[index].todos);
    projectList.push(reconstructedProject);
}

export {Project, projectList};