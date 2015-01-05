	
	
	// Load file module.
	var fs = require('fs');
	var load = fs.readFile;
	
	
	// Setup reusable content.
	var HEADER = fs.readFileSync('./inserts/header.html', 'utf8');
	var FOOTER = fs.readFileSync('./inserts/footer.html', 'utf8');
	var NOTFOUND = fs.readFileSync('./errors/notfound.html', 'utf8');
	var base = './www/';
	
	module.exports = function(request, response) {
		
		
		console.log('Request', request.url);
		var url = request.url;
		
		
		// USERS CAN ONLY GET CONTENT IN THE WWW FOLDER.
		// EVERYTHING ELSE IS PRIVATE BY DEFAULT.
		// SO THERE IS NO AUTHREQ/PRIVATE ERROR
		
		
		// 1. IF FOLDER (APPEND INDEX.HTML)
		if(url.match(/\/$/)) {
			url += 'index.html';
		}
		
		
		// 2. IF DOESN'T EXIST (OR IS PRIVATE)
		if(!fs.existsSync(base + url)) {
			response.end(HEADER + NOTFOUND + FOOTER);
		}
		
		
		// 3. IF AN IMAGE
		else if(url.match(/\.(gif|png|jpeg|jpg|ico)$/i)) {
			load(base + url, function (errors, content) {
				response.end(content);
			});
		}
		
		
		// 4. LOAD REQUESTED FILE AS TEXT (W/INSERTS IF HTML)
		else {
			load(base + url, 'utf8', function (errors, content) {
				if(url.match(/\.(htm[l]?)$/i)) {
					response.end(HEADER + content + FOOTER);
				} else {
					response.end(content);
				}
			});
		}
		
	};
		
