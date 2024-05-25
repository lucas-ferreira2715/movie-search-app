import { useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import Genre from "../components/Genre";

export default function App() {
  const [genre, setGenre] = useState([]); // storage our fetched data from genre
  const [selectedGenre, setSelectedGenre] = useState([]); // add the selected genres inside it
  const [moviesApi, setMoviesApi] = useState([]); // storage fetched movie
  const [userValue, setUserValue] = useState(''); // store the search of the user in the input field

  return (
    <div className="container">
      <Header
        moviesApi={moviesApi}
        setMoviesApi={setMoviesApi}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        userValue={userValue}
        setUserValue={setUserValue}
        setGenre={setGenre}
      />
      <Genre
        genre={genre}
        setGenre={setGenre}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <Card
        selectedGenre={selectedGenre}
        moviesApi={moviesApi}
        setMoviesApi={setMoviesApi}
        userValue={userValue}
      />
    </div>
  )
}