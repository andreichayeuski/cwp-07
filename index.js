const http = require("http");
const path = require("path");
const readAll = require("./handlers/readAll.js");
const read = require("./handlers/read.js");
const updateArticle = require("./handlers/articles/updateArticle.js");
const createArticle = require("./handlers/articles/createArticle.js");
const deleteArticle = require("./handlers/articles/deleteArticle.js");
const createComment = require("./handlers/comments/createComment");
const deleteComment = require("./handlers/comments/deleteComment");
const logs = require("./handlers/getLogs.js");
const publicHandler = require('./public/handler');
const hostname = "localhost";
const port = 3000;

const handlers = {
	'/sum': sum,
	'/api/articles/readall': readAll.readAll,
	'/api/articles/read': read.read,
	'/api/articles/update': updateArticle.updateArticle,
	'/api/articles/create': createArticle.createArticle,
	'/api/articles/delete': deleteArticle.deleteArticle,
	'/api/comments/create': createComment.createComment,
	'/api/comments/delete': deleteComment.deleteComment,
	'/api/logs': logs.getLogs
};

const server = http.createServer((req, res) => {
	let handler = getHandler(req.url);
	console.log(req.method);
	if (req.method === "GET")
	{
		let extension = path.extname(req.url);
		console.log(req.url);
		console.log("Ext: " + extension);
		if (extension === ".html" || extension === ".js" || extension === ".css" || req.url === "/")
		{
			let data = publicHandler.getFile(req.url);
			payload = null;
			res.statusCode = 200;
			res.setHeader(data[0], data[1]);
			res.end(data[2]);
		}
		else if (extension === ".ico")
		{
			res.writeHead(200, {'Content-Type': 'image/x-icon'} );
			res.end();
			console.log('favicon requested');
		}
		else
		{
			res.end("<html><head></head><body>err</body></html>");
		}
	}
	else {
		parseBodyJson(req, (err, payload) => {
			handler(req, res, payload, (err, result) => {
				if (err) {
					res.statusCode = err.code;
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify(err));
					return;
				}

				if (!(req.url.indexOf('api') + 1)) {
					console.log("not api");
					res.statusCode = 200;
					res.setHeader("Content-Type", "text/html");
					res.end(result);
				}
				else {
					console.log("api");
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify(result));
				}
			});
		});
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
	return handlers[url] || notFound;
}

function sum(req, res, payload, cb) {
	const result = { c: payload.a + payload.b };

	cb(null, result);
}

function notFound(req, res, payload, cb) {
	cb({ code: 404, message: 'Not found'});
}

function parseBodyJson(req, cb) {
	let body = [];

	req.on('data', function(chunk) {
		body.push(chunk);
	}).on('end', function() {
		body = Buffer.concat(body).toString();
		console.log(body);
		if (body !== "")
		{
			let params = JSON.parse(body);
			cb(null, params);
		}
		else
		{
			cb(null, null);
		}

	});
}