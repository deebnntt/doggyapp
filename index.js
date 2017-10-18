const doggyForm = document.getElementById('dog-search')
let breedSelection
let dogDiv

window.onload = function() {
  createEventListener()
}

function createEventListener() {

  doggyForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('clicked')
    breedSelection = document.getElementById('breed').value
    getBreed()
  })
}

function getBreed() {
  fetch(`https://dog.ceo/api/breed/${breedSelection}/images/random`)
    .then( res => res.json() )
    .then( json => displayImg(json))
}

function displayImg(json) {
  console.log(json.message);
  dogDiv = document.getElementById('dog')
  dogDiv.innerHTML = `<img src="${json.message}">`

  let commentForm = document.createElement('form')
  let commentInput = document.createElement('textarea')
  let commentSubmit = document.createElement('input')
  commentSubmit.setAttribute("type", "submit")
  commentInput.setAttribute("id", "user-comment")
  let displayComments = document.createElement("ul")

  commentForm.appendChild(commentInput)
  commentForm.appendChild(commentSubmit)


  dogDiv.appendChild(commentForm)
  dogDiv.appendChild(displayComments)

  commentForm.addEventListener('submit', e => {
    e.preventDefault()
    const commentHolder = document.createElement("li")
    commentHolder.innerText = commentInput.value
    displayComments.appendChild(commentHolder)
    commentInput.value = ""

  })
  let count = 0
  let likeCount = document.createElement('h1')
  let likeButton = document.createElement('button')
  likeCount.innerText = count
  likeButton.innerText = "Like"
  dogDiv.appendChild(likeCount)
  dogDiv.appendChild(likeButton)

  likeButton.addEventListener('click', () => {
    likeCount.innerText = ++count
  })



}
