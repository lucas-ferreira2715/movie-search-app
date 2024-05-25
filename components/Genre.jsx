import { useEffect } from "react";
import { GENRES, FILTER_GENRE, TRENDING_MOVIES } from "./Api";

export default function Genre({ genre, setGenre, selectedGenre, setSelectedGenre }) {

  async function fetchGenre() {
    const data = await fetch(GENRES);
    const formatData = await data.json();
    const getGenres = formatData.genres;
    const isHeld = getGenres.map(data => {
      return {
        ...data,
        isHeld: false
      } // returning an object with its previous data (id and name) plus a isHeld property that we've just created and will use later to change the bg color of the selected genre
    });
    setGenre(isHeld);
  }

  useEffect(() => {
    fetchGenre();
  }, []);

  // if the genre that the user are clicking is the correct one that he are clicking, change the bg color, otherwise keep it the same
  function changeBackgroundColor(hook, id) {
    hook(data => data.map(genre => {
      return genre.id === id ? { ...genre, isHeld: !genre.isHeld } : genre;
    }));
  }

  // adding the selected genre into selectedGenre hook and removing it from the setGenre hook (to avoid duplication) and changing its bg color to red
  function addGenre(genres) {
    setSelectedGenre([...selectedGenre, genres]);
    setGenre(genre.filter(g => g.id !== genres.id));
    changeBackgroundColor(setSelectedGenre, genres.id);
  }

  // removing the selected genre from selectedGenre hook and adding it into setGenre hook and changing its bg color
  function removeGenre(genres) {
    setSelectedGenre(selectedGenre.filter(g => g.id !== genres.id));
    setGenre([...genre, genres]);
    changeBackgroundColor(setGenre, genres.id);
  }

  return (
    <div className="genre-container">
      {selectedGenre && selectedGenre.map(data => <div
        key={data.id}
        className="genre-container__genres"
        style={{ backgroundColor: data.isHeld ? '#db271a' : 'var(--dark-color)' }}
        onClick={() => removeGenre(data)}
      >
        {data.name}
      </div>)
      }
      {
        genre && genre.map(data =>
          <div
            key={data.id}
            className="genre-container__genres"
            style={{ backgroundColor: data.isHeld ? '#db271a' : 'var(--dark-color)' }}
            onClick={() => addGenre(data)}
          >
            {data.name}
          </div >
        )
      }
    </div >
  )
}