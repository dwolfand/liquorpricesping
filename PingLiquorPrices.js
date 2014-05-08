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
	pingURL('http://localhost:5000/', function(response){
		callback(response);
	});
};

triggerDBLoad = function(callback){
	pingURL('http://localhost:5000/loaddb?num=10', function(response){
		callback(response);
	});
};

runProgram = function(){
	//ping the server home page to make sure heroku is awake
	wakeUpServer(function(response){
		console.log(response);
		//then wait 2 seconds before requesting the db load
		setTimeout(function(){
			triggerDBLoad(function(response){
				console.log(response);
				//once the db load goes through, call the same method to run in the next day
				setTimeout(function(){
					runProgram();
				}, 20000);
			});
		}, 2000);
	});
};

runProgram();
