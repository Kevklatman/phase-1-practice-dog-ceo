document.addEventListener('DOMContentLoaded', () => {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  const imageContainer = document.getElementById('dog-image-container');
  const breedList = document.getElementById('dog-breeds');
  const breedDropdown = document.getElementById('breed-dropdown');
  let allBreeds = [];

  // Challenge 1: Fetch and display random dog images
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      data.message.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Random Dog';
        img.style.width = '200px';
        img.style.margin = '10px';
        imageContainer.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching images:', error));

  // Challenge 2: Fetch and display all dog breeds
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      allBreeds = Object.keys(data.message);
      displayBreeds(allBreeds);
    })
    .catch(error => console.error('Error fetching breeds:', error));

  // Function to display breeds
  function displayBreeds(breeds) {
    breedList.innerHTML = '';
    breeds.forEach(breed => {
      const li = document.createElement('li');
      li.textContent = breed;
      breedList.appendChild(li);
    });
  }

  // Challenge 3: Change font color on click
  breedList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      event.target.style.color = 'blue';
    }
  });

  // Challenge 4: Filter breeds by starting letter
  breedDropdown.addEventListener('change', (event) => {
    const selectedLetter = event.target.value;
    const filteredBreeds = allBreeds.filter(breed => 
      breed.toLowerCase().startsWith(selectedLetter)
    );
    displayBreeds(filteredBreeds);
  });
});