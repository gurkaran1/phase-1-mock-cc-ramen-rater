// write your code here
const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const newRamenForm = document.querySelector("#new-ramen");

let allRamen = [];

fetch("http://localhost:3000/ramens")
  .then((response) => response.json())
  .then((ramenData) => {
    allRamen = ramenData;
    ramenData.forEach(renderRamen);
  });

function renderRamen(ramen) {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener("click", () => {
    showRamenDetail(ramen);
  });
  ramenMenu.append(img);
}

function showRamenDetail(ramen) {
  ramenDetail.innerHTML = `
    <img src="${ramen.image}" alt="${ramen.name}" />
    <h2>${ramen.name}</h2>
    <h3>${ramen.restaurant}</h3>
    <p><strong>Rating: </strong>${ramen.rating}</p>
    <p><strong>Comment: </strong>${ramen.comment}</p>
  `;
}

newRamenForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newRamen = {
    name: formData.get("name"),
    restaurant: formData.get("restaurant"),
    image: formData.get("image"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  };
  allRamen.push(newRamen);
  renderRamen(newRamen);
  event.target.reset();
});
