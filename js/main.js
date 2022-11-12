import data from "../data/MOCK_DATA.json" assert { type: "json" };

if (!window.location.search) {
  window.location.replace("?page=1");
}

let urlParam = new URLSearchParams(window.location.search);
let currentPage = urlParam.get("page") * 1;

//PAGINATION CALC
if (window.localStorage) {
  var item = window.localStorage.getItem("#viewSelect");
  if (item) {
    if (item) {
      document.querySelector("#viewSelect").value = item;
    }
  }
}
window.getSelect = function () {
  let val = document.querySelector("#viewSelect").value * 1;
  if (window.localStorage) {
    window.localStorage.setItem("#viewSelect", val);
  }
  window.location.replace("?page=1");
};

let perPage =
  document.querySelector("#viewSelect").value * 1 !== 0
    ? document.querySelector("#viewSelect").value * 1
    : data.length;

let start = (currentPage - 1) * perPage;
let end = currentPage * perPage;
let last = Math.floor(data.length / perPage);
//RENDER PAGINATION
let renderPagi = (() => {
  let numOfPagi = Math.floor(data.length / perPage);
  let contentHTML = `<li class="page-item">
  <a id="prevBtn" class="page-link" href="#">Previous</a>
</li>`;
  for (let i = 1; i <= numOfPagi; i++) {
    contentHTML += `
    <li class="page-item">
            <a id="page_${i}" class="page-link" href="?page=${i}">${i}</a>
          </li>
    `;
  }
  contentHTML += ` <li id="nextBtn" class="page-item">
  <a class="page-link" href="#">Next</a>
</li>`;
  document.querySelector("#paginationList").innerHTML = contentHTML;
})();
//ADD Active class
let pageID = document.querySelector("#page_" + currentPage);
if (pageID !== null) {
  pageID.classList.add("active");
}
//RENDER CARD
let renderSt = (array) => {
  let contentHTML = array.reduce((content, item, index) => {
    if (index >= start && index < end) {
      return (content += `
    <div class="col-4 ">
        <div id="cardStd" class="card">
            <div class="card-body">    
        <img src=${item.img} "/>
        <hr/>
            <h3>${item.first_name} ${index}</h3>
            <p  class="mb-2 badge rounded-pill text-bg-primary ">${item.gender}</p>
            <br/>
            <a  href="mailto:${item.email}">${item.email}</a>
            
            </div>
        </div>
    </div>
    `);
    } else {
      return (content += ``);
    }
  }, "");
  document.querySelector("#stGrid").innerHTML = contentHTML;
};

renderSt(data);

//function next-prev btn pagination
window.prevNextBtn = (function () {
  document.querySelector("#prevBtn").onclick = () => {
    if (currentPage !== 1) {
      window.location.search = "?page=" + (currentPage - 1);
    }
  };
  document.querySelector("#nextBtn").onclick = () => {
    if (currentPage !== last) {
      window.location.search = "?page=" + (currentPage + 1);
    }
  };
})();
