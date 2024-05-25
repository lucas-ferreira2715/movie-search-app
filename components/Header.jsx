import { useEffect } from "react";
import { TRENDING_MOVIES, SEARCH_MOVIE, GENRES } from "./Api";

export default function Header({ selectedGenre, setSelectedGenre, moviesApi, setMoviesApi, userValue, setUserValue, setGenre }) {

  async function fetchSearch() {
    // if the user had wrote something on the input field and selected a genre
    if (userValue && selectedGenre.length > 0) {
      const data = await fetch(GENRES);
      const formatData = await data.json();
      const getGenres = formatData.genres.map(data => {
        return {
          ...data,
          isHeld: false
        }
      }); // fetching the genre api

      setGenre(getGenres); // put all the genres inside the genres hook
      setSelectedGenre([]); // remove the all the selected genres 
    } else if (userValue) {
      fetchMovie(SEARCH_MOVIE + userValue); // if he just wrote something, display the search
    } else {
      fetchMovie(TRENDING_MOVIES);
      console.log(moviesApi); // if none of those two options are true, display the trending movies
    }
  }

  useEffect(() => {
    fetchSearch();
  }, []);

  // creating a async function to reuse the code and display the correct movies when the user clicks the search button
  async function fetchMovie(api) {
    const data = await fetch(api);
    const formatData = await data.json();
    const movies = formatData.results.map(data => {
      return data.vote_average ? { ...data, vote_average: data.vote_average.toFixed(1) } : { ...data, vote_average: 0 }
    })

    const get = {
      movieDescription: null,
      movies
    }

    setMoviesApi(get);
  }
  // getting the value of what the user have wrote in the input field and saving it in the userValue hook
  function handleChange(e) {
    setUserValue(e.target.value);
  }

  // every time the user clicks on the search button, runs the fetchSearch function
  function search() {
    fetchSearch();
  }

  return (
    <header className="header-container">
      <h1><span>Movie</span> Search App</h1>
      <form onSubmit={(e) => e.preventDefault()} className="search-container">
        <input
          type="text"
          placeholder='Search for Movies'
          onChange={handleChange}
        />
        <button onClick={search}><img src="../public/search-icon.png" alt="Search icon" /></button>
      </form>
    </header>
  )
}


