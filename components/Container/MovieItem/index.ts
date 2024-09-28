import ImageComponent from "../../UI/Image/index.js";
import Typography from "../../UI/Typography/typography.js";
import { Movie } from "../MovieList/type.types.js";

interface MovieItemProps {
  movie: Movie;
}

class MovieItem {
  private movie: Movie;
  private movieContainer: HTMLElement;
  private wrapperContent: HTMLElement;

  constructor({ movie }: MovieItemProps) {
    this.movie = movie;
    this.movieContainer = document.createElement("div");
    this.wrapperContent = document.createElement("div");
    this.wrapperContent.className = "p-4";
    this.movieContainer.className =
      "border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 ease cursor-pointer";
    this.movieContainer.onclick = () => {
      window.location.hash = `detail?id=${this.movie.id}`;
    };
  }

  private imageMovie(): HTMLElement {
    return new ImageComponent({
      src: this.movie.primaryImage?.url ?? "",
      alt: this.movie.primaryImage?.caption?.plainText ?? "Movie image",
      width: 400,
      className: "object-cover min-h-[450px]",
    }).render();
  }

  private titleMovie(): HTMLElement {
    return new Typography({
      variant: "h3",
      children: this.movie.title ?? "Unknown Title",
      className: "font-medium text-gold tracking-tight",
    }).render();
  }

  private yearMovie(): HTMLElement {
    return new Typography({
      variant: "h4",
      children: this.movie.year?.toString() ?? "Unknown Year",
      className: "font-medium text-gold tracking-tight",
    }).render();
  }

  private ratingMovie(): HTMLElement {
    return new Typography({
      variant: "p",
      children: `Rating: ${this.movie.rating?.toString() ?? "N/A"}`,
      className: "text-sm text-gray-600",
    }).render();
  }

  render(): HTMLElement {
    this.movieContainer.appendChild(this.imageMovie());
    this.wrapperContent.appendChild(this.titleMovie());
    this.wrapperContent.appendChild(this.yearMovie());
    this.wrapperContent.appendChild(this.ratingMovie());
    this.movieContainer.appendChild(this.wrapperContent);
    return this.movieContainer;
  }
}

export default MovieItem;
