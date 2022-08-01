let prodTitle = document.getElementById("title");
let prodPrice = document.getElementById("price");
let prodtaxs = document.getElementById("taxs");
let prodAds = document.getElementById("ads");
let prodDiscount = document.getElementById("discount");
let prodTotal = document.getElementById("total");
let prodCategory = document.getElementById("category");
let prodCount = document.getElementById("count");
let createBtn = document.getElementById("create");
let tableBody = document.getElementById("table-body");
let mood = "create";
let temp;
//calculate total of product
function calaTotal() {
  let result = 0;
  if (prodPrice.value !== "") {
    result =
      Number(prodPrice.value) +
      Number(prodtaxs.value) +
      Number(prodAds.value) -
      Number(prodDiscount.value);
    prodTotal.style.backgroundColor = "green";
  } else {
    prodTotal.style.backgroundColor = "red";
  }
  prodTotal.innerHTML = result;
}
prodPrice.onkeyup = calaTotal;
prodtaxs.onkeyup = calaTotal;
prodAds.onkeyup = calaTotal;
prodDiscount.onkeyup = calaTotal;

// create elements when click on create buton
let prodArr;
if (localStorage.product != null) {
  prodArr = JSON.parse(localStorage.product);
} else {
  prodArr = [];
}

function createElements() {
  if (prodTitle.value !== "" && prodCategory.value !== "") {
    let prodObj = {
      title: prodTitle.value.toLowerCase().trim(),
      price: prodPrice.value,
      taxs: prodtaxs.value,
      adds: prodAds.value,
      discount: prodDiscount.value,
      total: prodTotal.innerHTML,
      count: prodCount.value,
      category: prodCategory.value.toLowerCase().trim(),
    };
    if (mood == "create") {
      if (prodObj.count > 1) {
        for (let i = 0; i < prodObj.count; i++) {
          prodArr.push(prodObj);
        }
      } else {
        prodArr.push(prodObj);
      }
    } else {
      prodArr[temp] = prodObj;
      mood = "create";
      prodCount.style.display = "block";
      createBtn.innerHTML = "create";
    }
    deleteData();
  }

  window.localStorage.setItem("product", JSON.stringify(prodArr));

  showData();
}

// delete data after creating product
function deleteData() {
  prodTitle.value = "";
  prodPrice.value = "";
  prodtaxs.value = "";
  prodAds.value = "";
  prodDiscount.value = "";
  prodTotal.innerHTML = "";
  prodCount.value = "";
  prodCategory.value = "";
}

// show data in dom
function showData() {
  calaTotal();
  let table = "";
  for (let i = 0; i < prodArr.length; i++) {
    table += `<tr>
    <td>${i+1}</td>
    <td>${prodArr[i].title}</td>
    <td>${prodArr[i].price}</td>
    <td>${prodArr[i].taxs}</td>
    <td>${prodArr[i].adds}</td>
    <td>${prodArr[i].discount}</td>
    <td>${prodArr[i].total}</td>
    <td>${prodArr[i].category}</td>
    <td><button onclick="deleteEle(${i})">delete</button></td>
    <td><button onclick="updateEle(${i})">update</button></td>
    </tr>`;
  }
  tableBody.innerHTML = table;

  if (prodArr.length > 0) {
    document.getElementById(
      "delete-all"
    ).innerHTML = `<button onclick="deleteAll()">Delete All(${prodArr.length})</button>`;
  } else {
    document.getElementById("delete-all").innerHTML = "";
  }
}
showData();

createBtn.onclick = createElements;

// delete Element button
function deleteEle(i) {
  prodArr.splice(i, 1);
  localStorage.product = JSON.stringify(prodArr);
  showData();
}

// delete all elements

function deleteAll() {
  prodArr.splice(0);
  localStorage.clear();
  showData();
}

// update element

function updateEle(i) {
  prodTitle.value = prodArr[i].title;
  prodPrice.value = prodArr[i].price;
  prodtaxs.value = prodArr[i].taxs;
  prodAds.value = prodArr[i].adds;
  prodDiscount.value = prodArr[i].discount;
  calaTotal();
  prodCount.style.display = "none";
  prodCategory.value = prodArr[i].category;
  createBtn.innerHTML = "update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search effect
let searchInput = document.getElementById("search");
let searchTitle = document.getElementById("search-title");
let searchCategory = document.getElementById("search-category");
let searchMood = "title";
function searchEffect(id) {
  searchInput.focus();
  if (id == "search-title") {
    searchInput.placeholder = "search by title";
    searchMood = "title";
  } else if (id == "search-category") {
    searchInput.placeholder = "search by category";
    searchMood = "category";
  }
  searchInput.value = "";
  showData();
}

// search
function search() {
  let table = "";
  for (let i = 0; i < prodArr.length; i++) {
    if (searchMood == "title") {
      if (prodArr[i].title.includes(searchInput.value.toLowerCase())) {
        table += `<tr>
              <td>${i}</td>
              <td>${prodArr[i].title}</td>
              <td>${prodArr[i].price}</td>
              <td>${prodArr[i].taxs}</td>
              <td>${prodArr[i].adds}</td>
              <td>${prodArr[i].discount}</td>
              <td>${prodArr[i].total}</td>
              <td>${prodArr[i].category}</td>
              <td><button onclick="deleteEle(${i})">delete</button></td>
              <td><button onclick="updateEle(${i})">update</button></td>
              </tr>`;
      } else {
        tableBody.innerHTML = "No search result";
      }
    } else if (searchMood == "category") {
      if (prodArr[i].category.includes(searchInput.value.toLowerCase())) {
        table += `<tr>
              <td>${i}</td>
              <td>${prodArr[i].title}</td>
              <td>${prodArr[i].price}</td>
              <td>${prodArr[i].taxs}</td>
              <td>${prodArr[i].adds}</td>
              <td>${prodArr[i].discount}</td>
              <td>${prodArr[i].total}</td>
              <td>${prodArr[i].category}</td>
              <td><button onclick="deleteEle(${i})">delete</button></td>
              <td><button onclick="updateEle(${i})">update</button></td>
              </tr>`;
      } else {
        console.log("No search result");
      }
    }
  }
  tableBody.innerHTML = table;
}
searchInput.onkeyup = search;
