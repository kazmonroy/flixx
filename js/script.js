const galleryContainer = document.querySelector('#gallery');
const global = {
  currentPage: window.location.pathname,
};

function showSpinner() {
  const spinner = document.querySelector('.spinner');

  spinner.classList.add('show');
}
function hideSpinner() {
  const spinner = document.querySelector('.spinner');

  spinner.classList.remove('show');
}

async function getPopularMovies() {
  const res = await fetchDataFromAPI('movie/popular');

  const movies = res.results;

  movies.forEach((movie) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('dataid', movie.id);

    card.innerHTML = `

    <a href="movie-details.html?id=${movie.id}">
      <img
        src=${
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : `../images/no-image.jpg`
        } 
        class="card-img-top"
        alt=${movie.original_title}
      />
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.original_title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>

    `;

    galleryContainer.appendChild(card);
  });
}

async function getPopularTVShows() {
  const res = await fetchDataFromAPI('tv/popular');

  const tvShows = res.results;
  console.log(tvShows);

  tvShows.forEach((show) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('dataid', show.id);

    card.innerHTML = `

    <a href="show-details.html?id=${show.id}">
      <img
        src=${
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
            : `../images/no-image.jpg`
        } 
        class="card-img-top"
        alt=${show.name}
      />
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Aired: ${show.first_air_date}</small>
      </p>
    </div>

    `;

    galleryContainer.appendChild(card);
  });
}

async function fetchDataFromAPI(endpoint) {
  const API_KEY = 'b33dca89af6efaab9ad190d254c151dc';
  const API_URL = 'https://api.themoviedb.org/3/';

  // showSpinner();

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`);
  const data = await response.json();

  // hideSpinner();
  return data;
}

function highlightActivePage() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach(
    (link) =>
      link.getAttribute('href') === global.currentPage &&
      link.classList.add('active')
  );
}

// Custom Router

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      getPopularMovies();
      break;
    case '/shows.html':
      getPopularTVShows();

      break;
    case '/movie-details.html':
      console.log('Movie details');
      break;
    case '/tv-details.html':
      console.log('TV details');
      break;
  }

  highlightActivePage();
}

document.addEventListener('DOMContentLoaded', init);
