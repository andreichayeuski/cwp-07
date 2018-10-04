const log = require("../log.js");
let fs = require("fs");
let path = require("path");
const ErrorObject = { code: 500, message: 'Server error' };

module.exports.getFile = function(url) {
	log.log(url, JSON.stringify({"method": "GET"}));

	let extension = path.extname(url);
	let result = [];
	console.log("url: " + url);
	if (extension === ".html")
	{
		result.push("Content-Type");
		result.push("text/html");
		let data = fs.readFileSync("public" + url);
		result.push(data);
		return result;
	}
	else if (url === "/")
	{
		result.push("Content-Type");
		result.push("text/html");
		let data = fs.readFileSync("public/index.html");
		result.push(data);
		return result;
	}
	else if (extension === ".js")
	{
		result.push("Content-Type");
		result.push("text/plain");
		let data = fs.readFileSync("public" + url);
		result.push(data);
		return result;
	}
	else if (extension === ".css")
	{
		result.push("Content-Type");
		result.push("text/css");
		let data = fs.readFileSync("public" + url);
		result.push(data);
		return result;
	}
};