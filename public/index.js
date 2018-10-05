function sortChanged() {
	document.getElementById('articles').innerHTML = "";
	let url = "http://localhost:3000/api/articles/readall";
	var optionsList = document.getElementById("sortOrders");
	let sortOrder = optionsList.options[optionsList.selectedIndex].value;
	let data = JSON.stringify({ "sortOrder": sortOrder	});
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			json.items.forEach((element) =>
			{
				let article = `<h2 class=\"title\">${element.title}</h2>\n` +
					"        <div class=\"date-author\">\n" +
					`            <div class=\"date\">${element.date}</div>\n` +
					`            <div class=\"author\">${element.author}</div>\n` +
					"        </div>\n" +
					`        <div class=\"text\">${element.text}</div>`;
				$("#articles").append(article);
			});
		}
	};
	xhr.send(data);
}

function goToForm()
{
	document.location.href = "http://localhost:3000/form.html";
}

$(document).ready(() =>
{
	document.getElementById('articles').innerHTML = "";
	var url = "http://localhost:3000/api/articles/readall";
	var data = JSON.stringify({	});
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			json.items.forEach((element) =>
			{
				let article = `<h2 class=\"title\">${element.title}</h2>\n` +
					"        <div class=\"date-author\">\n" +
					`            <div class=\"date\">${element.date}</div>\n` +
					`            <div class=\"author\">${element.author}</div>\n` +
					"        </div>\n" +
					`        <div class=\"text\">${element.text}</div>`;
				$("#articles").append(article);
			});
		}
	};
	xhr.send(data);
});