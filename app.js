	
	// System modules.
	var http = require('http');
	var static_content = require('./modules/static.js');
	
	// Running web server.
	var server = http.createServer(function (request, response) {
		static_content(request, response);
	});
	var port = 8000;
	server.listen(port);
	console.log("Running in localhost at port " + port);
	
