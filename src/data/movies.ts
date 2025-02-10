
import { Movie } from "../types/movie";

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    year: 2008
  },
  {
    id: 2,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    year: 2010
  },
  {
    id: 3,
    title: "Pulp Fiction",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    genre: ["Crime", "Drama"],
    rating: 8.9,
    year: 1994
  },
  {
    id: 4,
    title: "The Shawshank Redemption",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    genre: ["Drama"],
    rating: 9.3,
    year: 1994
  },
];
