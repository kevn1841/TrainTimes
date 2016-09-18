// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCV6DokTt7LT4bnGi_9GTXfUAxr7tkg0Ns",
    authDomain: "train-8bda7.firebaseapp.com",
    databaseURL: "https://train-8bda7.firebaseio.com",
    storageBucket: "train-8bda7.appspot.com",
    messagingSenderId: "70122376626"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();

  $("#submit").on("click", function(){

	var NameOfTrain = $("#newTrainName").val().trim();
	var Destination = $("#newDestination").val().trim();
	var firstTrainTime = moment($("#newTrainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var TrainFrequency = $("#newFrequency").val().trim();

	var newTrain = {
		name: NameOfTrain,
		destination: Destination,
		firstTrain: firstTrainTime,
		frequency: TrainFrequency
	}

	trainData.ref().push(newTrain);

	$("#newTrainName").val("");
	$("#newDestination").val("");
	$("#newTrainTime").val("");
	$("#newFrequency").val("");
	return false
});

trainData.ref().on("child_added", function(childSnapshot, prevChildKey){

var tName = childSnapshot.val().name;
var tDestination = childSnapshot.val().destination;
var tFrequency = childSnapshot.val().frequency;
var tFirstTrain = childSnapshot.val().firstTrain;


var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
var tMinutes = tFrequency - tRemainder;

var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 

$("#tData").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});

console.log("start")