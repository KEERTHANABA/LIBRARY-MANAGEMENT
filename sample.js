// to diplay books
class Display {

    // validating the inputs in the form
    validate(bookobj) {
        if (bookobj.name.length < 2 || bookobj.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    // adds the bookobj row in UI
    showAllBooks() {
        let bookList = JSON.parse(localStorage.getItem("booklist"));

        // clearing the table before showing list of all the books
        let tablebody = document.getElementById("tablebody");
        if (tablebody != null) {
            tablebody.innerHTML = "";
        }
        let bookrow = ``;
        if (bookList != null) {
            Array.from(bookList).forEach(function (element, index) {
                bookrow += `<tr class = "bookrow">
                                <td>${index + 1}</td>
                                <td>${element.name}</td>
                                <td>${element.author}</td>
                                <td>${element.genre}</td>
                                <td>${element.date}</td>
                                <td><button type="button" id="${index}" onclick="deleteBook(${index})" class="btn btn-secondary">Remove</button</td>
                            </tr>`;
            })
        }

        let tableBody = document.getElementById("tablebody");

        if (bookList != null && tableBody != null) {
            tableBody.innerHTML = bookrow;
        }
        else {
            tableBody = "";
        }
    }

    clear() {
        let addBookBtn = document.getElementById("libraryform");
        addBookBtn.reset();
    }

    showMessage(type, displayMessage) {
        let message = document.getElementById("message");
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <p id="messagetext">${displayMessage}</p>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                             </div>`

        setTimeout(function () {
            message.innerHTML = "";
        }, 1500);
    }
}

let displayobj = new Display();
displayobj.showAllBooks();

function deleteBook(index) {
    let bookList = localStorage.getItem("booklist");

    booksObj = JSON.parse(bookList);

    booksObj.splice(index, 1);
    localStorage.setItem("booklist", JSON.stringify(booksObj));

    let display = new Display;
    display.showAllBooks();
    
}

let deleteAllBtn = document.getElementById("deleteall");
if (deleteAllBtn != null) {
    deleteAllBtn.addEventListener("click", deleteAll);
    function deleteAll() {
        localStorage.clear();
        let display = new Display();
        display.showAllBooks();
    }
}

// grabing searchBox box text
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", showSearchResults)
function showSearchResults(e) {
    let searchBox = document.getElementById("searchTxt");
    
    let searchTxt = searchBox.value;
    
    let bookList = document.getElementsByClassName("bookrow");
    
    Array.from(bookList).forEach(function (element) {
        let bookname = element.getElementsByTagName("td")[1].innerText;
        
        if (!bookname.toLowerCase().includes(searchTxt.toLowerCase())) {
            element.style.display = "none";
        }
    })
    e.preventDefault();
}

let searchBox = document.getElementById("searchTxt");
searchBox.addEventListener("input", function(){
    if (searchBox.value == "") {
        display = new Display;
        display.showAllBooks();
    }
})


/******************************************************* */
// const itemsPerPage = 10;

// // get the table body element
// const tableBody = document.getElementById("tablebody");

// // get the pagination element
// const pagination = document.getElementById("pagination");

// // calculate the total number of pages
// const totalPages = Math.ceil(books.length / itemsPerPage);

// // display the first page
// displayTable(1);

// // function to display a specific page of the table
// function displayTable(page) {
//   // calculate the start and end indexes of the items to display
//   const startIndex = (page - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   // clear the table body
//   tableBody.innerHTML = "";

//   // loop through the items to display
//   for (let i = startIndex; i < endIndex && i < books.length; i++) {
//     // create a new row for the item
//     const row = document.createElement("tr");

//     // create a cell for each property of the item
//     const titleCell = document.createElement("td");
//     titleCell.innerText = books[i].title;
//     row.appendChild(titleCell);

//     const authorCell = document.createElement("td");
//     authorCell.innerText = books[i].author;
//     row.appendChild(authorCell);

//     const dateCell = document.createElement("td");
//     dateCell.innerText = books[i].publicationDate;
//     row.appendChild(dateCell);

//     // add the row to the table body
//     tableBody.appendChild(row);
//   }

//   // display the pagination links
//   displayPagination(page);
// }

// // function to display the pagination links
// function displayPagination(currentPage) {
//   // clear the pagination element
//   pagination.innerHTML = "";

//   // create a link for each page
//   for (let i = 1; i <= totalPages; i++) {
//     const link = document.createElement("a");
//     link.href = "#";
//     link.innerText = i;

//     // add the "active" class to the current page link
//     if (i === currentPage) {
//       link.classList.add("active");
//     }

//     // add an event listener to the link to display the corresponding page
//     link.addEventListener("click", function() {
//       displayTable(i);
//     });

//     // add the link to the pagination element
//     pagination.appendChild(link);
//   }
// }

/*********************************************************************** */
var tbody = document.querySelector("tbody");
		var pageUl = document.querySelector(".pagination");
		var itemShow = document.querySelector("#itemperpage");
		var tr = tbody.querySelectorAll("tr");
		var emptyBox = [];
		var index = 1;
		var itemPerPage = 8;

		for(let i=0; i<tr.length; i++){ emptyBox.push(tr[i]);}

		itemShow.onchange = giveTrPerPage;
		function giveTrPerPage(){
			itemPerPage = Number(this.value);
			// console.log(itemPerPage);
			displayPage(itemPerPage);
			pageGenerator(itemPerPage);
			getpagElement(itemPerPage);
		}

		function displayPage(limit){
			tbody.innerHTML = '';
			for(let i=0; i<limit; i++){
				tbody.appendChild(emptyBox[i]);
			}
			const  pageNum = pageUl.querySelectorAll('.list');
			pageNum.forEach(n => n.remove());
		}
		displayPage(itemPerPage);

		function pageGenerator(getem){
			const num_of_tr = emptyBox.length;
			if(num_of_tr <= getem){
				pageUl.style.display = 'none';
			}else{
				pageUl.style.display = 'flex';
				const num_Of_Page = Math.ceil(num_of_tr/getem);
				for(i=1; i<=num_Of_Page; i++){
					const li = document.createElement('li'); li.className = 'list';
					const a =document.createElement('a'); a.href = '#'; a.innerText = i;
					a.setAttribute('data-page', i);
					li.appendChild(a);
					pageUl.insertBefore(li,pageUl.querySelector('.next'));
				}
			}
		}
		pageGenerator(itemPerPage);
		let pageLink = pageUl.querySelectorAll("a");
		let lastPage =  pageLink.length - 2;
		
		function pageRunner(page, items, lastPage, active){
			for(button of page){
				button.onclick = e=>{
					const page_num = e.target.getAttribute('data-page');
					const page_mover = e.target.getAttribute('id');
					if(page_num != null){
						index = page_num;

					}else{
						if(page_mover === "next"){
							index++;
							if(index >= lastPage){
								index = lastPage;
							}
						}else{
							index--;
							if(index <= 1){
								index = 1;
							}
						}
					}
					pageMaker(index, items, active);
				}
			}

		}
		var pageLi = pageUl.querySelectorAll('.list'); pageLi[0].classList.add("active");
		pageRunner(pageLink, itemPerPage, lastPage, pageLi);

		function getpagElement(val){
			let pagelink = pageUl.querySelectorAll("a");
			let lastpage =  pagelink.length - 2;
			let pageli = pageUl.querySelectorAll('.list');
			pageli[0].classList.add("active");
			pageRunner(pagelink, val, lastpage, pageli);
			
		}
	
		
		
		function pageMaker(index, item_per_page, activePage){
			const start = item_per_page * index;
			const end  = start + item_per_page;
			const current_page =  emptyBox.slice((start - item_per_page), (end-item_per_page));
			tbody.innerHTML = "";
			for(let j=0; j<current_page.length; j++){
				let item = current_page[j];					
				tbody.appendChild(item);
			}
			Array.from(activePage).forEach((e)=>{e.classList.remove("active");});
     		activePage[index-1].classList.add("active");
		}



