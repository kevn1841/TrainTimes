// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCV6DokTt7LT4bnGi_9GTXfUAxr7tkg0Ns",
    authDomain: "train-8bda7.firebaseapp.com",
    databaseURL: "https://train-8bda7.firebaseio.com",
    storageBucket: "train-8bda7.appspot.com"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();

  $("#submit").on("click", function(){

	// Grabs user input
	var NameOfTrain = $("#newTrainName").val().trim();
	var Destination = $("#newDestination").val().trim();
	var firstTrainTime = moment($("#newTrainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var TrainFrequency = $("#newFrequency").val().trim();

	// Creates local "temporary" object for holding train data
	var newTrain = {
		name: NameOfTrain,
		destination: Destination,
		firstTrain: firstTrainTime,
		frequency: TrainFrequency
	}

	// Uploads train data to the database
	trainData.ref().push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination); 
	console.log(newTrain.firstTrain);
	console.log(newTrain.frequency)

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	// Determine when the next train arrives.
});

traidData.ref().on("child_added", function(childSnapshot, prevChildKey){

console.log(childSnapshot.val());

// Store everything into a variable.
var tName = childSnapshot.val().name;
var tDestination = childSnapshot.val().destination;
var tFrequency = childSnapshot.val().frequency;
var tFirstTrain = childSnapshot.val().firstTrain;

// Calculate the minutes until arrival using hardcore math
// To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency  
var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
var tMinutes = tFrequency - tRemainder;

// To calculate the arrival time, add the tMinutes to the currrent time
var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
console.log(tMinutes);
console.log(tArrival);

console.log(moment().format("hh:mm A"));
console.log(tArrival);
console.log(moment().format("X"));

// Add each train's data into the table 
$("#tData").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});

console.log("start")