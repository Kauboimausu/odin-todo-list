import { formatDistanceToNow } from "date-fns";

// This file will handle some operations required to display things in the UI
// It is a little redundant but we're doing it for the sake of respecting the single use principle

const AuxHandler = (function() {
function getDistanceToNow(dueDate) {
    dueDate = dueDate.split('-');
    let formattedDate = new Date(dueDate[0], dueDate[1], dueDate[2]);
    return formatDistanceToNow(formattedDate);
}

// Returns today's date in YYYY - MM - DD format

function getTodaysDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
}

function createID(){
    return crypto.randomUUID();
}

return {
    getDistanceToNow, getTodaysDate, createID
};

})();



export default AuxHandler;