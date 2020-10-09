let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
  document.querySelector('.add-toy-form').addEventListener('submit', createToy);
});

function getToys(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toyData => toyData.forEach(toy => renderToy(toy)))
}

function renderToy(toy){
  
  let toyEl = document.createElement('div')
  let collectionDiv = document.querySelector('#toy-collection')

  toyEl.classList.add('card')
  let name = document.createElement('h2')
  name.innerText = toy.name

  let image = document.createElement('img')
  image.src = toy.image
  image.classList.add("toy-avatar")

  let likes = document.createElement('p')
  likes.innerText = toy.likes 

  let likesButton = document.createElement('button')
  likesButton.classList.add('like-btn')
  likesButton.innerText = "Like <3"
  likesButton.addEventListener('click', (event) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, { 
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({
      likes: ++toy.likes
    })
  })
    .then(response => response.json())
    .then(updatedToy => {
      toy = updatedToy
      likes.innerText = updatedToy.likes 
    })
  })

  collectionDiv.appendChild(toyEl)
  toyEl.append(name, image, likes, likesButton)  
}

function createToy(event){
  event.preventDefault();
  
  let toyData = {}
  toyData.name = event.target[0].value
  toyData.image = event.target[1].value
  toyData.likes = 0
  

  let requestPackage = {}
  requestPackage.method = 'POST';
  requestPackage.headers = { 'Content-Type': 'application/json' };
  requestPackage.body = JSON.stringify(toyData);

  fetch("http://localhost:3000/toys", requestPackage)
  .then(response => response.json())
  .then(newToyData => renderToy(newToyData))
}

