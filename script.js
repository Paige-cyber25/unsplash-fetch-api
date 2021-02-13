const container = document.querySelector('.container');
const cards = document.querySelector('.cards1');
const secondCard = document.querySelector('.cards2');
const thirdCard = document.querySelector('.cards3');
const searchBar = document.getElementById('searchBar');
const form = document.getElementById('form');
const loader = document.querySelector('.loader');
const modal = document.getElementById('Modal');
const caption = document.getElementById('caption');
const closeButton = document.querySelector('.close');
const modalImg = document.querySelector('.modal-content');


// This fetches the data from our api
function getDataFromApi(query) {
cards.style.display = 'none';
loader.style.display = 'block';

fetch(`https://api.unsplash.com/search/photos?client_id=B6kV49xFR9VbGZucm37yUL5uSG-KjKyv8u5h1ZrB7f0&query=${query}&per_page=8`)
    .then(res => res.json())
    .then(data => {
        data.results.forEach((items,index)=>{
           const li = document.createElement('div');
           //This creates a classname list
           li.classList.add('list')
            li.innerHTML = 
            `<img src=${items.urls.thumb} class="img"/>
            <h4>${items.user.username}</h4>
            <p>${items.user.location}</p>`
           
            // this puts the images on the card
        cards.append(li);


        // This makes the modal functional once you click on an image
    li.addEventListener('click', () => {
    modal.style.display = "block";
    modalImg.src = items.urls.regular;
    caption.innerHTML = `${items.user.first_name}
    ${items.user.last_name}
    <br>
    ${items.user.location} 
     `;
     caption.style.textAlign = "left";
})

    })
})
.finally(data => {
   cards.style.display = 'block';
    loader.style.display = 'none';
}) 
}

// When the user clicks on <span> (x), close the modal
closeButton.addEventListener('click', () => {
  modal.style.display = "none";
})

//Search Bar functionality
 form.addEventListener('submit', e => {
     // this prevent a form's default method, that is submitting
    e.preventDefault();
    //This ensures there are no pictures except for the default pictures until a search is entered
    cards.innerHTML = '';
    getDataFromApi(searchBar.value);
})
 
// This is the default UI until a search is made
window.onload = getDataFromApi("fun");
