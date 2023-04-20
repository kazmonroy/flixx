const galleryContainer = document.querySelector('#gallery');
const global = {
  currentPage: window.location.pathname,
};

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

async function displaySlider() {
  const { results } = await fetchDataFromAPI('movie/now_playing');

  results.forEach((movie) => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    const div = document.createElement('div');
    div.className = 'swiper-slide';
    div.innerHTML = `

    <a href="movie-details.html?id=${movie.id}">
      <img src=${
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : `../images/no-image.jpg`
      }  alt=${movie.original_title} />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${
        Math.round(movie.vote_average * 10) / 10
      } / 10
    </h4>
    `;

    swiperWrapper.appendChild(div);
    initSwiper();
  });

  console.log(results);
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      300: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

function displayCoverImage(type, backgroundPath) {
  const overlayCover = document.createElement('div');
  overlayCover.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayCover.className = 'overlayCover';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayCover);
  } else if (type === 'tv') {
    document.querySelector('#show-details').appendChild(overlayCover);
  }
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
  const type = 'movie';
  const movieID = window.location.search.split('=')[1];

  const movie = await fetchDataFromAPI(`${type}/${movieID}`);

  displayCoverImage(type, movie.backdrop_path);

  const movieDetailsContainer = document.querySelector('#movie-details');

  const divTop = document.createElement('div');
  divTop.className = 'details-top';

  const divBottom = document.createElement('div');
  divBottom.className = 'details-bottom';

  divTop.innerHTML = `
  <div class='img-container'>
    <img
      src=${
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : `../images/no-image.jpg`
      } 
      class="card-img-top"
      alt=${movie.original_title}
    />
  </div>
  <div>
    <h2>${movie.original_title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${Math.round(movie.vote_average * 10) / 10} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
      ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
     
    </ul>
    <a href=${
      movie.homepage
    } target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
    `;

  divBottom.innerHTML = `
    <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => `<div>${company.name}</div>`)
            .join('')}</div>
      
    `;

  movieDetailsContainer.appendChild(divTop);
  movieDetailsContainer.appendChild(divBottom);
}

async function displayShowDetails() {
  const type = 'tv';
  const showID = window.location.search.split('=')[1];

  const show = await fetchDataFromAPI(`${type}/${showID}`);

  console.log(show);

  displayCoverImage(type, show.backdrop_path);

  const showDetailsContainer = document.querySelector('#show-details');

  const divTop = document.createElement('div');
  divTop.className = 'details-top';

  const divBottom = document.createElement('div');
  divBottom.className = 'details-bottom';

  divTop.innerHTML = `
  <div class='img-container'>
    <img
      src=${
        show.poster_path
          ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
          : `../images/no-image.jpg`
      }
      class="card-img-top"
      alt=${show.name}
    />
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${Math.round(show.vote_average * 10) / 10} / 10
    </p>
    <p class="text-muted">Aired: ${show.first_air_date}</p>
    <p>
      ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}

    </ul>
    <a href=${show.homepage} target="_blank" class="btn">Visit Show Homepage</a>
  </div>
    `;

  divBottom.innerHTML = `
    <h2>Show Info</h2>
          <ul>


            <li class=${
              show.created_by.length === 0 ? 'li-hidden' : ''
            }><span class="text-secondary">Created by:</span> ${
    show.created_by.length && show.created_by[0].name
  }</li>
          
            <li><span class="text-secondary">Aired:</span> ${
              show.first_air_date
            }</li>
            <li><span class="text-secondary">Seasons:</span> ${
              show.number_of_seasons
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((company) => `<div>${company.name}</div>`)
            .join('')}</div>

    `;

  showDetailsContainer.appendChild(divTop);
  showDetailsContainer.appendChild(divBottom);
}

async function fetchDataFromAPI(endpoint) {
  const API_KEY = 'b33dca89af6efaab9ad190d254c151dc';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`);
  const data = await response.json();

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
      displaySlider();
      break;
    case '/shows.html':
      getPopularTVShows();

      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/show-details.html':
      displayShowDetails();
      break;
  }

  highlightActivePage();
}

document.addEventListener('DOMContentLoaded', init);
