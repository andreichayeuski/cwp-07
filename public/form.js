function goToIndex()
{
	document.location.href = "http://localhost:3000/index.html";
}

function createArticle() {
	let url = "http://localhost:3000/api/articles/create";
	let title = document.getElementById('title-input').value;
	let author = document.getElementById('author-input').value;
	let text = document.getElementById('text-input').value;
	let today = new Date().toLocaleDateString();
	let data =  {
		"title" : title,
		"author" : author,
		"text" : text,
		"date" : today,
		"comments" : "{}"
	};
	data = JSON.stringify(data);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(data);
	document.location.href = "http://localhost:3000/index.html";
}