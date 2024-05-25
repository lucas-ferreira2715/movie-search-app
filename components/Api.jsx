export const GENRES = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${import.meta.env.VITE_API_KEY}`;

export const FILTER_GENRE = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${import.meta.env.VITE_API_KEY}&with_genres=`;

export const TRENDING_MOVIES = `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_API_KEY}`;

export const SEARCH_MOVIE = `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&query=
`;

