class ToDo {
    constructor(name, dueDate, priority, notes, id) {
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.taskID = id
        this.completed = false;
    }

    
}

export default ToDo;