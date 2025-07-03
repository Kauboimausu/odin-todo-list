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
    let month = date.getMonth() + 1 + '';
    // These ifs will add a 0 if the month or day is less than 10 to format it properly
    if(month.length == 1) {
        month = `0${month}`;
    }
    let day = date.getDate() + '';
    if(day.length == 1) {
        day = `0${day}`;
    }

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