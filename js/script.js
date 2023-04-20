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

async function displayMovieDetails() {
  const movieID = window.location.search.split('=')[1];

  const movieInfo = await fetchDataFromAPI(`movie/${movieID}`);

  console.log(movieInfo);

  const movieDetailsContainer = document.querySelector('#movie-details');

  const divTop = document.createElement('div');
  divTop.className = 'details-top';

  const divBottom = document.createElement('div');
  divBottom.className = 'details-bottom';

  divTop.innerHTML = `
  <div class='img-container'>
    <img
      src=${
        movieInfo.poster_path
          ? `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`
          : `../images/no-image.jpg`
      } 
      class="card-img-top"
      alt=${movieInfo.original_title}
    />
  </div>
  <div>
    <h2>${movieInfo.original_title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      8 / 10
    </p>
    <p class="text-muted">Release Date: ${movieInfo.release_date}</p>
    <p>
      ${movieInfo.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${movieInfo.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
     
    </ul>
    <a href=${
      movieInfo.homepage
    } target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
    `;

  divBottom.innerHTML = `
    <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${
              movieInfo.budget
            }</li>
            <li><span class="text-secondary">Revenue:</span> $${
              movieInfo.revenue
            }</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movieInfo.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${
              movieInfo.status
            }}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movieInfo.production_companies
            .map((company) => `<div>${company.name}</div>`)
            .join('')}</div>
      
    `;

  movieDetailsContainer.appendChild(divTop);
  movieDetailsContainer.appendChild(divBottom);
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
      displayMovieDetails();
      break;
    case '/tv-details.html':
      console.log('TV details');
      break;
  }

  highlightActivePage();
}

document.addEventListener('DOMContentLoaded', init);
