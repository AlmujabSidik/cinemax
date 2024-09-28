import MovieItem from "../MovieItem/index.js";
import { MovieListProps, Movie } from "./type.types.js";
class MovieList {
  private movieItems: Movie[];
  private movieContainer: HTMLElement;
  private loadMoreMovie: () => void;
  constructor({ movieItems, loadMoreMovie }: MovieListProps) {
    this.movieItems = movieItems;
    this.loadMoreMovie = loadMoreMovie;
    this.movieContainer = document.createElement("div");
  }

  render(): HTMLElement {
    console.log(this.movieItems);
    this.movieContainer.innerHTML = ""; // Clear existing content

    if (Array.isArray(this.movieItems) && this.movieItems.length > 0) {
      this.movieItems.forEach((movie) => {
        const movieItem = new MovieItem({ movie }).render();
        this.movieContainer.appendChild(movieItem);
      });
    } else {
      const noMoviesMessage = document.createElement("p");
      noMoviesMessage.textContent = "No movies available.";
      this.movieContainer.appendChild(noMoviesMessage);
    }

    this.movieContainer.className =
      "mt-10 max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-4";

    // Add load more button
    const loadMoreButton = document.createElement("button");
    loadMoreButton.textContent = "Load More";
    loadMoreButton.onclick = this.loadMoreMovie;
    this.movieContainer.appendChild(loadMoreButton);

    return this.movieContainer;
  }
}

export default MovieList;
