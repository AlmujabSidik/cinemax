import Typography from "../../UI/Typography/typography.js";
import { fetchApi } from "../../Utils/fetchApi.js";
import FilterMovie from "../../Container/FilterMovie/index.js";
import MovieList from "../../Container/MovieList/index.js";
import Button from "../../UI/Button/button.js";
import Loader from "../../UI/Loader/index.js";
import Navigation from "../../Container/Navigation/index.js";
import { HomeState } from "./type.types.js";

class Homepage {
  private homeContainer: HTMLDivElement;
  private state: HomeState;
  constructor() {
    this.state = {
      isLoading: true,
      filterType: "",
      filterYear: "",
      movieList: [],
      page: 1,
    };
    this.homeContainer = document.createElement("div");

    this.init();
  }

  private setState(newState: Partial<HomeState>): void {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  private init(): void {
    if (window.location.hash === "") {
      this.getDataMovie();
      this.render();
    }
  }

  getDataMovie(pageParam = 1, type = "get") {
    this.setState({ isLoading: true });
    const page = type === "get" ? 1 : pageParam;
    let urlPath = `titles/x/upcoming?limit=6&page=${page}`;
    if (this.state.filterType !== "") {
      urlPath += `&titleType=${this.state.filterType}`;
      if (this.state.filterYear !== "") {
        urlPath += `&year=${this.state.filterYear}`;
      }
    } else if (this.state.filterYear !== "") {
      urlPath += `?year=${this.state.filterYear}`;
    }
    fetchApi("GET", urlPath)
      .then((res) => {
        if (type === "get") {
          this.setState({ movieList: res.results });
        } else {
          this.setState({
            movieList: [...this.state.movieList, ...res.results],
          });
        }
        this.setState({ isLoading: false });
      })
      .catch((err) => console.log(err));
  }

  createFilterMovie() {
    return new FilterMovie({
      submitFilter: () => this.getDataMovie(),
      setType: (value) => this.setState({ filterType: value }),
      setYear: (value) => this.setState({ filterYear: value }),
      type: this.state.filterType,
      year: this.state.filterYear,
      isLoading: this.state.isLoading,
    }).render();
  }

  sidebar() {
    const title = this.titleHome();
    const filterMovie = document.createElement("div");
    filterMovie.className =
      "relative sm:fixed left-0 top-0 bottom-0 sm:w-1/4 w-full bg-slate-800 flex flex-col p-4 overflow-y-auto";
    filterMovie.appendChild(title);
    filterMovie.appendChild(this.createFilterMovie());
    this.homeContainer.className =
      "flex flex-col px-4 justify-center min-h-screen ";
    this.homeContainer.appendChild(filterMovie);

    return this.homeContainer;
  }

  listMovie(): HTMLElement {
    const movieList = document.createElement("div");
    movieList.className = "ml-0 sm:ml-[25%] w-full sm:w-3/4 p-4 min-h-screen";
    this.homeContainer.appendChild(movieList);

    movieList.appendChild(
      new MovieList({
        movieItems: this.state.movieList,
        loadMoreMovie: () => this.loadMoreMovie(),
        length: this.state.movieList.length,
      }).render()
    );
    if (this.state.movieList.length !== 0) {
      movieList.appendChild(this.buttonLoadMore());
    } else {
      movieList.appendChild(this.loaderAnimation());
    }

    return movieList;
  }

  loaderAnimation() {
    const loader = new Loader().render();
    loader.className = "inline-block mr-2";
    return loader;
  }

  titleHome() {
    return new Typography({
      variant: "h1",
      children: "Filter Movie",
      className: "font-medium text-gold text-lg sm:text-3xl tracking-tight",
    }).render();
  }

  buttonLoadMore() {
    const buttonContent = document.createElement("span");
    buttonContent.className = "flex items-center justify-center";

    if (this.state.isLoading) {
      buttonContent.appendChild(this.loaderAnimation());
      const loadingText = document.createElement("span");
      loadingText.textContent = "Loading";
      buttonContent.appendChild(loadingText);
    } else {
      buttonContent.textContent = "Load more";
    }

    return new Button({
      text: buttonContent,
      variant: "secondary",
      size: "small",
      onClick: () => this.loadMoreMovie(),
      classes: "w-full sm:w-[210px] mt-4 disabled:cursor-not-allowed",
      disabled: this.state.isLoading,
    }).render();
  }

  loadMoreMovie() {
    this.setState({ isLoading: true });
    this.setState({ page: this.state.page + 1 });
    this.getDataMovie(this.state.page + 1, "load");
  }

  render(): HTMLElement {
    const header = new Navigation({
      className: "flex ml-0 sm:ml-[27%] items-center gap-4",
    }).render();
    this.homeContainer.innerHTML = "";

    this.homeContainer.appendChild(header);
    this.sidebar();
    this.listMovie();
    return this.homeContainer;
  }
}

export default Homepage;
