let projectList = [];

class Project {
    constructor(name, type, dueDate, id) {
        this.name = name;
        this.type = type;
        this.dueDate = dueDate;
        this.todos = [];
        this.id = id;
        projectList.push(this);
    }

    

}

export {Project, projectList};