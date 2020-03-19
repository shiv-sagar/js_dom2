
const input = document.querySelector("input[type=text]");
const ul = document.querySelector("ul");
let counter = document.querySelector(".counter");
const footerList = document.querySelector(".footer");
let state = JSON.parse(localStorage.getItem("todoArr")) || [];
let id = 0;
const para = document.querySelector(".para");
let allButton = document.querySelector("#all_button");
let activeButton = document.querySelector("#active_button");
let toggleAll = document.querySelector(".toggle_all");
let completedButton = document.querySelector("#completed_button");
let clearCompleted = document.querySelector(".item_completed");

function addTodo(event) {
	if (event.keyCode === 13 && event.target.value.trim() != "") {
		const todo = {
			name: event.target.value,
			isDone: false,
			id: ++id
		};
		state.push(todo);

		localStorage.setItem("todoArr", JSON.stringify(state));
		event.target.value = "";
		todoArray = JSON.parse(localStorage.getItem("todoArr"));
		viewTodo(todoArray);
	}
}

function viewTodo(todoArray) {
	ul.innerHTML = "";

	todoArray.forEach((todo, index) => {
		let li = document.createElement("li");
		let p = document.createElement("p");
		li.setAttribute("data-id", todo.id);
		p.classList.add("para");
		let spanX = document.createElement("span");
		let checkInput = document.createElement("input");
		checkInput.type = "checkbox";
		checkInput.setAttribute("data-id", todoArray.indexOf(todo));
		checkInput.id = "tick-" + index;
		
		const label = document.createElement("label");
		label.setAttribute("for", "tick-" + index);
		tickImgBox = document.createElement("div");
		tickImgBox.className = "tick_img_box";
		img = document.createElement("img");
		img.className = "tick";
		img.src = "tick.png";
	
		tickImgBox.appendChild(img);
		label.appendChild(tickImgBox);
		li.appendChild(label);
		checkInput.checked = todo.isDone;
		li.classList.add("li_styles");
		li.setAttribute("data-index", todo.id);
		spanX.className = "remove_items";
		spanX.setAttribute("data-key", todo.id);
		p.innerHTML = todo.name;
		spanX.innerHTML = "×";
		li.append(checkInput, p, spanX);
		ul.append(li);
		let checkId = checkInput.parentElement.dataset.id;
		checkInput.addEventListener("click", () => handleCheck(checkId));
		//p.addEventListener("dblclick", EditTodo);
		activeButton.addEventListener("click", active);
		if (todo.isDone == true) {
			img.src = "tick.png";
			clearCompleted.classList.remove("item_completed");
			clearCompleted.classList.add("item_completed_1");
		} else {
			img.src = "";
		}
	});

	if (todoArray.length > 0) {
		footerList.style.display = "block";
	} else {
		footerList.style.display = "none";
	}
	counter.textContent = itemCount();
}

function deleteTodo(event) {
	if (event.target.tagName == "SPAN") {
		let target = event.target;
		state = state.filter(todo => !(target.dataset.key == todo.id));

		state.forEach(i => {
			if (i.isDone == true) {
				clearCompleted.classList.remove("item_completed");
				clearCompleted.classList.add("item_completed_1");
			} else {
				clearCompleted.classList.remove("item_completed_1");
				clearCompleted.classList.add("item_completed");
			}
		});

		localStorage.setItem("todoArr", JSON.stringify(state));

		viewTodo(state);
	}
}

function handleCheck(id) {
	let len = 0;
	let checked = state.map(item => {
		if (item.id == id) {
			len++;
			item.isDone = !item.isDone;

			if (item.isDone == true) {
				clearCompleted.classList.remove("item_completed");
				clearCompleted.classList.add("item_completed_1");
			} else {
				clearCompleted.classList.remove("item_completed_1");
				clearCompleted.classList.add("item_completed");
			}
			return item;
		} else return item;
	});
	localStorage.setItem("todoArr", JSON.stringify(checked));
	viewTodo(checked);
	itemCount(len);
}
function itemCount() {
	let arr = state.filter(todo => todo.isDone == false);
	return arr.length;
}
function toggleAllInput() {
	let arr = state;
	let flag;
	arr.filter(todo => {
		if (todo.isDone == false) {
			todo.isDone = true;
			flag = 1;
		}
	});
	localStorage.setItem("todoArr", JSON.stringify(arr));
	viewTodo(arr);
	if (flag != 1) {
		arr.filter(todo => {
			if (todo.isDone == true) {
				todo.isDone = false;
				flag = 0;
			}
		});
	}
	localStorage.setItem("todoArr", JSON.stringify(arr));
	viewTodo(arr);
}
function all() {
	allButton.classList.add("button_border");
	completedButton.classList.remove("button_border");
	activeButton.classList.remove("button_border");
	viewTodo(state);
}
function active() {
	allButton.classList.remove("button_border");
	completedButton.classList.remove("button_border");
	activeButton.classList.add("button_border");
	let arr = state.filter(i => i.isDone == false);
	viewTodo(arr);
	footerList.style.display = "block";
}
function completed() {
	allButton.classList.remove("button_border");
	activeButton.classList.remove("button_border");
	completedButton.classList.add("button_border");
	let arr = state.filter(todo => todo.isDone == true);
	viewTodo(arr);
	footerList.style.display = "block";
}
function clear() {
	let arr = state.filter(todo => todo.isDone == false);
	arr.forEach(todo => {
		if (todo.isDone == true) {
			clearCompleted.classList.remove("item_completed");
			clearCompleted.classList.add("item_completed_1");
		} else {
			clearCompleted.classList.remove("item_completed_1");
			clearCompleted.classList.add("item_completed");
		}
	});
	localStorage.setItem("todoArr", JSON.stringify(arr));
	state = arr;
	viewTodo(state);
}

viewTodo(state);

input.addEventListener("keydown", addTodo);
ul.addEventListener("click", deleteTodo);
activeButton.addEventListener("click", active);
allButton.addEventListener("click", all);
allButton.classList.add("button_border");
completedButton.addEventListener("click", completed);
clearCompleted.addEventListener("click", clear);
toggleAll.addEventListener("click", toggleAllInput);
