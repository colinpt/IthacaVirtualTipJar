// ------ MAIN CODE BLOCK --------
var workers = populateWorkers();


// ------ HELPERS ------
function populateWorkers(){
    var workers = [];

    $.get('https://spreadsheets.google.com/feeds/cells/1xTrVxp70sYG3BmYXPAyXQbwW1rfmc7ZJlFitJfzm3xQ/o4psdd3/public/basic?alt=json', function(data) {
       //console.log(data.feed.entry);
       for (var i = 6; i < data.feed.entry.length; i += 5){
            var name = data.feed.entry[i].content.$t;
            var workPlace = data.feed.entry[i + 1].content.$t;
            var paymentType = data.feed.entry[i + 2].content.$t;
            var paymentAddress = data.feed.entry[i + 3].content.$t;
            workers.push(new Worker(name, workPlace, paymentType, paymentAddress));
       }
    });
    return workers;
}

function getNewWorker(){
    var worker = getRandomObjectFromArray(workers); 
    document.getElementById("name").innerHTML = worker.name;
    document.getElementById("workplace").innerHTML = worker.workPlace;
    document.getElementById("paymentType").innerHTML = worker.paymentType;
    document.getElementById("paymentAddress").innerHTML = worker.paymentAddress;
    return worker;
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