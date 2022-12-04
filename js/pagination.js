import data from "../data/MOCK_DATA.json" assert { type: "json" };

let renderItem = (data) => {
  let contentHTML = data.reduce((content, current, index) => {
    return (content += `
    <div class="col-4 ">
<div id="cardStd" class="card">
    <div class="card-body">
<img src=${current.img} "/>
<hr/>
    <h3>${current.first_name} ${index}</h3>
    <p  class="mb-2 badge rounded-pill text-bg-primary ">${current.gender}</p>
    <br/>
    <a  href="mailto:${current.email}">${current.email}</a>

    </div>
</div>
    </div>
    `);
  }, "");
  document.querySelector("#stGrid").innerHTML = contentHTML;
};

renderItem(data);

//get itemPerPage
window.getItemPerPage = (event) => {
  console.log(event.target.value);
  return event.target.value * 1;
};
let itemPerPage = 5;
let totalItem = 1;
let totalPage = data.length / itemPerPage;

function rangePagination(c, m) {
  //c -> page hiện tại, total page
  let current = c,
    last = m,
    delta = 2, // step
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    // eslint-disable-next-line
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

let renderPagi = (arrayPagi) => {
  let contentHTML = arrayPagi.reduce((content, current, index) => {
    return (content += `
    <li class="page-item">
            <a id="page_${current}" 
            ${
              current === "..."
                ? 'class="page-link isDisabled'
                : 'class="page-link"'
            }
             href="?page=${current}">${current}</a>
          </li>
    `);
  }, "");

  document.querySelector("#paginationList").innerHTML = contentHTML;
};
renderPagi(rangePagination(totalItem, totalPage));
