class ToDo {
    constructor(name, dueDate, priority, notes, done = false) {
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.done = false;
    }

    
}

export default ToDo;