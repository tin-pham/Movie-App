const BASE_URL = 'https://api.jikan.moe/v3/';

const API_URL = BASE_URL + 'search/anime?q=&status=airing&order_by=score';

const main = document.querySelector('main');

function getAnime(URL) {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      showAnime(data.results);
    })
    .catch((error) => console.log('Some thing went wrong: ' + error));
}

function showAnime(animeList) {
  // Clear main first
  main.innerHTML = '';

  animeList.forEach((anime) => {
    // Create the card
    const card = document.createElement('a');
    card.setAttribute('href', anime.url);
    card.setAttribute('target', '_blank');
    card.classList.add('card');

    card.innerHTML = `
    <figure>
    <img src="${anime.image_url}" alt="" />
    </figure>
    <div class="card__body">
      <h3>${anime.title}</h3>
      <span class="card__point card--${getRatingClass(anime.score)}">${
      anime.score
    }</span>
    </div>
    <div class="card__footer">
          <h2>Overview</h2>
          <p>${anime.synopsis}</p>
        </div>
    `;
    main.appendChild(card);
  });
}

function getRatingClass(score) {
  if (score >= 8) return 'green';
  if (score >= 6.5 && score < 8) return 'yellow';
  if (score >= 5 && score < 6.5) return 'orange';
  return 'red';
}

getAnime(API_URL);

// Search Event
const form = document.querySelector('form');
const input = document.querySelector('input');
// search.addEventListener('keypress', (e) => {
//   if (e.key === 'Enter') {
//     const searchValue = search.value;
//     console.log(searchValue);

//     const SEARCH_URL = BASE_URL + `search/anime/?q="${searchValue}"`;
//     getAnime(SEARCH_URL);
//   }
// });

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchValue = input.value;
  input.value = '';
  console.log(searchValue);

  const SEARCH_URL = BASE_URL + `search/anime?q=${searchValue}`;
  console.log(SEARCH_URL);

  if (searchValue) {
    getAnime(SEARCH_URL);
  }
});
