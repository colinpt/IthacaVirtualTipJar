// Colin Thrapp
// 03/25/2020
// ------ MAIN CODE BLOCK --------
var workers = populateWorkers(workers);


// ------ HELPERS ------
function populateWorkers(array){
    var workersArray = [];

    $.get('https://spreadsheets.google.com/feeds/cells/1vOnpxxoHyvnnA4BYlD-CN8PnK5FXjxH_3hOnPiAxIj8/o4psdd3/public/basic?alt=json', function(data) {
       var previousName = "";
       var previousAddress = "";
       for (var i = 6; i < data.feed.entry.length; i += 5){
            var name = data.feed.entry[i].content.$t;
            var workPlace = data.feed.entry[i + 1].content.$t;
            var paymentType = data.feed.entry[i + 2].content.$t;
            var paymentAddress = data.feed.entry[i + 3].content.$t;
            var worker = new Worker(name, workPlace, paymentType, paymentAddress);
            // This is a naive way of preventing duplicates, as something about the data entry makes a lot of the duplicates appear one after another.
            // Obviously there could still be duplicates spaced apart. But that has yet to be an issue.
            if (safeInput(name) && safeInput(workPlace)             && 
                safeInput(paymentType) && safeInput(paymentAddress) &&
               (previousName.trim() !== name.trim())                && 
               (previousAddress.trim() !== paymentAddress.trim())) {
                    workersArray.push(worker);
               }
            previousName = name;
            previousAddress = paymentAddress;
       }
    // FOR DEBUGGING
    //    for (var i = 0; i < workers.length; i++){
    //        console.log(workers[i]);
    //    }
    });
    
    return workersArray;
}

function getNewWorker(){
    var worker = getRandomObjectFromArray(workers); 
    document.getElementById("name").innerHTML = worker.name;
    document.getElementById("workplace").innerHTML = worker.workPlace;
    document.getElementById("paymentType").innerHTML = worker.paymentType;
    document.getElementById("paymentAddress").innerHTML = worker.paymentAddress;
    return worker;
}

function safeInput(string){
    let badChars = ['<','>','(',')','=','+']
    let chars = badChars.length;
    let len = string.length;
    for (var i = 0; i < len; i++){
        for(var j = 0; j < chars; j++){
            if (string[i] === badChars[j]) return false;
        }
    }
    return true;
}

function getRandomObjectFromArray(array){
    return array[Math.round(Math.random() * array.length)];
}

class Worker{
    constructor(name, workPlace, paymentType, paymentAddress){
        this.name = name;
        this.workPlace = workPlace;
        this.paymentType = paymentType;
        this.paymentAddress = paymentAddress;
    }
};