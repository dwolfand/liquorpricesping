var request = require('request');

pingURL = function(requestURL, callback){
	request({url: requestURL, method: 'GET'}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log("got response from server for url: "+requestURL);
			//console.log(body);	
			callback(body);
		}
		else{
			console.log('ERROR!');
			console.log(error);
		}
	});
};

wakeUpServer = function(callback){
	pingURL('http://liquorprices.herokuapp.com/', function(response){
		callback(response);
	});
};

triggerDBLoad = function(callback){
	pingURL('http://liquorprices.herokuapp.com/loaddb?num=0', function(response){
		callback(response);
	});
};

runProgram = function(){
	//once the db load goes through, call the same method to run in the next day
	setTimeout(function(){runProgram();}, 21600000); //6 hours
	//ping the server home page to make sure heroku is awake
	wakeUpServer(function(response){
		console.log(response);
		//then wait 2 seconds before requesting the db load
		setTimeout(function(){
			triggerDBLoad(function(response){
				console.log(response);
			});
		}, 2000);
	});
};

runProgram();
