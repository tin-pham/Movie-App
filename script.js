const BASE_URL = 'https://api.jikan.moe/v3/';

const API_URL = BASE_URL + 'search/anime?q=&status=airing&order_by=score';

const main = document.querySelector('main');

function getAnime() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
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
    console.log(card);
    main.appendChild(card);
  });
}

function getRatingClass(score) {
  if (score >= 8) return 'green';
  else if (score >= 6.5 && score < 8) return 'yellow';
  else return 'red';
}

getAnime();
