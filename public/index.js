function addNewComment() {
	let comment = `
		<label for="comment-author-input">Автор комментария</label>
	<textarea id="comment-author-input"></textarea>
		<br>
		<label for="comment-text-input">Текст</label>
	<textarea id="comment-text-input"></textarea>
	<input type="button" value="Добавить комментарий" onclick="createCommentAPI()">`;

	$('.visible').append(comment);
	$('.btn').toggleClass('hidden');
}

function createCommentAPI() {
	let url = "http://localhost:3000/api/comments/create";
	let author = document.getElementById('comment-author-input').value;
	let text = document.getElementById('comment-text-input').value;
	$('.visible').parent().toggleClass("active");
	let articleId = document.querySelector(".active.article-with-comments > .article > .articleId").value;
	let today = new Date().toLocaleDateString();
	let data =  {
		"author" : author,
		"text" : text,
		"date" : today,
		"articleId" : articleId
	};
	data = JSON.stringify(data);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(data);
	document.location.href = "http://localhost:3000/index.html";
}

function sortChanged() {
	var optionsList = document.getElementById("sortOrders");
	let sortOrder = optionsList.options[optionsList.selectedIndex].value;
	let data = JSON.stringify({ "sortOrder": sortOrder	});
	loadData(data);
}

function goToForm()
{
	document.location.href = "http://localhost:3000/form.html";
}

$(document).ready(() =>
{
	var data = JSON.stringify({	"includeDeps": true});
	loadData(data);
});

function loadData(data)
{
	document.getElementById('articles').innerHTML = "";
	var url = "http://localhost:3000/api/articles/readall";
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			json.items.forEach((article) =>
			{
				let commentHTML = '<div id="comments">\n';
				article.comments.forEach((comment) =>
				{
					commentHTML += `<div class="comment-text">${comment.text}</div>\n
        						<div class="comment-date">${comment.date}</div>\n
        						<div class="comment-author">${comment.author}</div>\n
        						<div class="comment-articleid" style="display: none">${comment.articleId}</div>\n`;
				});
				commentHTML += `<input type="button" class="btn" value="Добавить комментарий" onclick="addNewComment()">\n </div>`;

				let articleHTML = '<div class="article-with-comments">' +
					'<div class="article">' +
					`<h2 class=\"title\">${article.title}</h2>\n` +
					"        <div class=\"date-author\">\n" +
					`            <div class=\"date\">${article.date}</div>\n` +
					`            <div class=\"author\">${article.author}</div>\n` +
					"        </div>\n" +
					`        <textarea class=\"articleId\" style="display: none">${article.id}</textarea>` +
					`        <div class=\"text\">${article.text}</div></div>` + commentHTML + "</div>";
				$("#articles").append(articleHTML);
			});

			$('.article').on('click', function ()
			{
				if ($(this).parent().children('#comments').hasClass("visible"))
				{
					$(".visible").toggleClass("visible");
				}
				else
				{
					$(".visible").toggleClass("visible");
					$(this).parent().children('#comments').toggleClass("visible");
				}
			});
		}
	};
	xhr.send(data);
}