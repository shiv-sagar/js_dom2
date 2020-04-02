const input = document.querySelector(".addbook_input");
const searchinput = document.querySelector(".search_input");
const addbtn = document.querySelector(".add_button");
const hideCheckbox = document.querySelector("#hide");
const ul = document.querySelector("ul");

let bookArr = JSON.parse(localStorage.getItem("bookArr")) || [];
var uid;
console.log(bookArr);
if(bookArr.length)
   uid = bookArr[bookArr.length - 1].id;
else 
	uid = 0;

// var uid = 0;
function addBook(event) {
	
	if (input.value.trim() != "") {
		uid += 1;
		let book = {
			name: input.value,
			id: uid
		};

		bookArr.push(book);
		localStorage.setItem("bookArr", JSON.stringify(bookArr));
		event.target.value = "";
		bookArr = JSON.parse(localStorage.getItem("bookArr"));
		viewBook(bookArr);
	}
}

function viewBook(bookArr) {
	ul.innerHTML = "";
	bookArr.forEach(book => {
		let li = document.createElement("li");
		
		let p = document.createElement("p");
		let div = document.createElement("div");
		let deleteButton = document.createElement("button");
		
		p.classList.add("book_name");
		div.classList.add("delete_div");
		deleteButton.classList.add("delete_button");
		
		p.textContent = book.name;
		deleteButton.innerHTML = "Delete";
		deleteButton.addEventListener("click", deleteBook);
		li.setAttribute("data-id", book.id);
		deleteButton.setAttribute("data-id", book.id);
		div.append(deleteButton);
		li.append(p, div);
		ul.append(li);
	});
}

function deleteBook(event) {
	let target = event.target;
	bookArr = bookArr.filter(book => !(target.dataset.id == book.id));
	localStorage.setItem("bookArr", JSON.stringify(bookArr));
	viewBook(bookArr);
}

function searchBook(event) {
	
		let searchWord = event.target.value.toLowerCase();
		
		let searchedArr = bookArr.filter(book =>
			book.name.toLowerCase().includes(searchWord.toLowerCase())
		);
		viewBook(searchedArr);
	
}
function handleCheck(event) {
	if (event.target.checked == true) {
		ul.style.display = "none";
	} else {
		ul.style.display = "block";
	}
}
viewBook(bookArr);

addbtn.addEventListener("click", addBook);
searchinput.addEventListener("keyup", searchBook);
hideCheckbox.addEventListener("click", handleCheck);


