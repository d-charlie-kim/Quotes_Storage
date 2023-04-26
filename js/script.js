let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];

render();

function saveNote() {
	const title = document.getElementById("diary-title").value;
	const content = document.getElementById("diary-content").value;
	if (title == "" || content == "") {
		alert("제목과 내용을 작성해주세요.");
		return;
	}
	const date = document.querySelector('.heart').value;

	allMemo.push({ title, content, date, len: allMemo.length });
	localStorage.setItem("allMemo", JSON.stringify(allMemo));
	render();
}

function render() {
	const date = new Date();
	const today = date.getFullYear()+'년 '+(date.getMonth()+1)+'월 '+date.getDate()+'일';
	const title = document.querySelector('.heart');
	title.textContent = today + "의 좋은 말";

	const display = document.getElementById("display");
	display.innerHTML = "";

	for (const item of allMemo) {
			const memoList = document.createElement("article");
			const saveTitle = document.createElement("h3");
			const saveTime = document.createElement("p");
			const saveContent = document.createElement("p");
			const btnGroup = document.createElement("div");
			const deleteMemoBtn = document.createElement("button");
			const img = new Image();

			img.src = "./img/icon-delete.svg";
			memoList.className = "diary-article";
			saveTitle.textContent = item.title;
			saveTitle.className = "article-title";
			saveTime.textContent = today;
			saveTime.className = "article-time";
			saveContent.textContent = item.content;
			saveContent.className = "article-content";
			btnGroup.className = "button-group";
			deleteMemoBtn.setAttribute("id", item.len);
			deleteMemoBtn.setAttribute("onclick", "remove()");

			display.appendChild(memoList);
			memoList.appendChild(saveTitle);
			memoList.appendChild(saveTime);
			memoList.appendChild(saveContent);
			memoList.appendChild(btnGroup);
			btnGroup.appendChild(deleteMemoBtn);
			deleteMemoBtn.appendChild(img);
	}
}

function remove() {
	const index = this.id;
	allMemo.splice(index, 1);
	localStorage.setItem("allMemo", JSON.stringify(allMemo));
	render();
}