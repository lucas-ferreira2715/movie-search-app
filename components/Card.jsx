import { useState, useEffect } from "react";
import { TRENDING_MOVIES, FILTER_GENRE, SEARCH_MOVIE } from "./Api";

export default function MainContent({ selectedGenre, moviesApi, setMoviesApi, userValue }) {
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const UNAVAILABLE = 'https://www.movienewz.com/img/films/poster-holder.jpg'
  const GENRES_ID = selectedGenres(selectedGenre);

  async function fetchTrending() {
    const data = await fetch(displayMovie()); // fetch data
    const formatData = await data.json(); // transform that data into json
    const movies = formatData.results.map(data => {
      return data.vote_average ? { ...data, vote_average: data.vote_average.toFixed(1) } : { ...data, vote_average: 0 }
    }); // if vote average is true, round its number to two digits, otherwise set it to zero

    const get = {
      movieDescription: null,
      movies
    }; // return a object with the properties activeObject and movies that we will use later to set a specific class to the movie container using the former, and display our movies using the latter.

    setMoviesApi(get); // putting the final result (our activeObject + movies array) inside the moviesApi hook to display the movies on the page
  };

  useEffect(() => {
    fetchTrending();
    console.log('hi');
  }, [selectedGenre]);


  // If we have searched for a movie and selected a genre, the movie genre will override the search and be displayed, if the user have just searched, the search request will be displayed, if we have just selected genres, the movie genres will be displayed, otherwise (if we did nothing) display the trending movies by default
  function displayMovie() {
    if (userValue && selectedGenre.length > 0) {
      return FILTER_GENRE + GENRES_ID;
    } else if (userValue) {
      return SEARCH_MOVIE + userValue;
    } else if (selectedGenre.length > 0) {
      return FILTER_GENRE + GENRES_ID;
    } else {
      return TRENDING_MOVIES;
    }
  }

  // if we have no genres selected, return an empty array, if we have genres, return a new array with their specific ids and after that we are using the reduce method to transform those selected ids into a string with a comma after them and returning this result (e.g: 13, 17, 20,...)
  function selectedGenres(selectedGenres) {
    if (selectedGenres.length < 1) return '';

    const genresId = selectedGenres.map(genre => genre.id);
    return genresId.reduce((acc, curr) => acc + ', ' + curr);
  };

  // when we click on show description of any given movie, the index of that specific movie that we clicked will be stored in the movieDescription property that we've just created
  function selectedDescriptionMovie(index) {
    setMoviesApi({ ...moviesApi, movieDescription: moviesApi.movies[index] });
  }

  // if the index of the movie matches the index that are storaged in the movieDescription, add a class of 'show-desc' to that movie. Therefore, showing the description of that movie on the page
  function showDescription(index) {
    if (moviesApi.movies[index] === moviesApi.movieDescription) {
      return 'show-desc';
    } else {
      return '';
    }
  }

  return (
    <div className="movie-container">
      {moviesApi.movies ? moviesApi.movies.map((data, index) => (
        <div className="movie"
          key={data.id}
        >
          <p className="movie__top-title">{data.title || data.name}</p>
          <img src={data.poster_path ? IMG_URL + data.poster_path : UNAVAILABLE} />
          <div className={`movie__bg-color ${showDescription(index)}`}>
            <div className="movie__info">
              {moviesApi.movies[index] === moviesApi.movieDescription ? '' : <h4>Movie</h4>}
              {moviesApi.movies[index] === moviesApi.movieDescription ? '' : <h6 onClick={() => selectedDescriptionMovie(index)}>Show desc</h6>}
              {moviesApi.movies[index] === moviesApi.movieDescription ? '' : <p style={{ backgroundColor: data.vote_average >= 7 ? '#259e18' : 'var(--red-color)' }}>{data.vote_average}</p>}
            </div>
            <p className="movie__title">{data.title || data.name}</p>
            <div className={`movie__description ${showDescription(index)}`}>{data.overview}</div>
          </div>
        </div>
      )) : <div className="unavailable">Movies Not Found</div>}
    </div>
  )
}

