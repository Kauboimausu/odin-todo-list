


// Function that saves and loads data
const StorageHandler = (function() {
    function saveProjects(projectList){
        console.log(JSON.stringify(projectList));
        localStorage.setItem("projects", JSON.stringify(projectList));
    }

    function loadProjects(){
        // const test = JSON.parse(localStorage.getItem("projects"));

        if(localStorage.getItem("projects"))
            return JSON.parse(localStorage.getItem("projects"));
        else
            return [];
    }

    return { saveProjects, loadProjects };
})();

export default StorageHandler;