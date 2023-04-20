const popularMoviesGallery = document.querySelector('#popular-movies');
const global = {
  currentPage: window.location.pathname,
};

async function getPopularMovies() {
  const res = await fetchDataFromAPI('movie/popular');

  const movies = res.results;
  console.log(movies);

  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.className = 'card';
    movieCard.setAttribute('dataid', movie.id);

    movieCard.innerHTML = `

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

    popularMoviesGallery.appendChild(movieCard);
  });

  // const card = document.createElement('div');

  // card.className = 'card';

  //   <div class="card">
  //   <a href="movie-details.html?id=1">
  //     <img
  //       src="images/no-image.jpg"
  //       class="card-img-top"
  //       alt="Movie Title"
  //     />
  //   </a>
  //   <div class="card-body">
  //     <h5 class="card-title">Movie Title</h5>
  //     <p class="card-text">
  //       <small class="text-muted">Release: XX/XX/XXXX</small>
  //     </p>
  //   </div>
  // </div>
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

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      getPopularMovies();
      break;
    case '/shows.html':
      console.log('TV Shows');
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
