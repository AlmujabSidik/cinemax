import Button from "../../UI/Button/button.js";
import { fetchApi } from "../../Utils/fetchApi.js";
import Typography from "../../UI/Typography/typography.js";
import Image from "../../UI/Image/index.js";
import Skeleton from "../../UI/Skeleton/index.js";
import Navigation from "../../Container/Navigation/index.js";

interface DetailState {
  selectedItem: SelectedItem;
  movieRate: MovieRate;
  isLoading: boolean;
}

interface PrimaryImage {
  caption: {
    plainText: string;
  };
  height: number;
  id: string;
  url: string;
  width: number;
  __typename: string;
}

interface OriginalTitleText {
  text: string;
}

interface ReleaseYear {
  year: number;
}

interface TitleType {
  text: string;
}

interface SelectedItem {
  primaryImage?: {
    url: string;
    caption: {
      plainText: string;
    };
    height?: number;
    id?: string;
    width?: number;
    __typename?: string;
  };
  originalTitleText?: {
    text: string;
  };
  releaseYear?: {
    year: number;
  };
  titleType?: {
    text: string;
  };
}

interface MovieRate {
  averageRating?: number;
  numVotes?: number;
}

class Detail {
  private state: DetailState;
  private detailContainer: HTMLDivElement;
  constructor() {
    this.state = {
      selectedItem: {} as SelectedItem,
      movieRate: {} as MovieRate,
      isLoading: true,
    };
    this.detailContainer = document.createElement("div");
    this.detailContainer.className = "px-10";
    this.init();
  }

  private init(): void {
    this.render();
    this.getDetailMovie();
  }

  private setState(newState: Partial<DetailState>): void {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  private async getDetailMovie(): Promise<void> {
    const queryString = window.location.hash.split("=")[1];
    const urlPath = `titles/${queryString}`;
    const urlPathRating = `titles/${queryString}/ratings`;

    try {
      const [movieDetails, movieRatings] = await Promise.all([
        fetchApi("GET", urlPath),
        fetchApi("GET", urlPathRating),
      ]);

      console.log("Movie details:", movieDetails);
      console.log("Movie ratings:", movieRatings);

      this.setState({
        selectedItem: movieDetails.results,
        movieRate: movieRatings.results,
        isLoading: false,
      });
    } catch (err) {
      console.error("Error fetching movie details:", err);
      this.setState({ isLoading: false });
    }
  }

  private buttonNavigateToHomepage(): HTMLElement {
    return new Button({
      text: "Go to homepage",
      variant: "secondary",
      size: "small",
      classes: "w-full sm:w-[210px] mt-4",
      onClick: () => {
        window.location.hash = "";
      },
    }).render();
  }

  private titlePage(): HTMLElement {
    return new Typography({
      variant: "h1",
      children: "Detail Movie",
      className: "font-medium text-gold text-4xl tracking-tight",
    }).render();
  }

  private detailImage(): HTMLElement {
    const imageContainer = document.createElement("div");
    imageContainer.className = "relative w-full h-[60vh] my-4 rounded-sm";

    if (this.state.selectedItem?.primaryImage?.url) {
      const imgCover = new Image({
        src: this.state.selectedItem.primaryImage.url,
        alt:
          this.state.selectedItem.primaryImage.caption?.plainText ||
          "Movie cover",
        className:
          "w-full h-full object-cover object-center rounded-[40px] grayscale-0 sm:grayscale z-0",
      }).render();

      imageContainer.appendChild(imgCover);
    } else {
      // Add a placeholder or error message when image is not available
      const placeholderText = document.createElement("div");
      placeholderText.textContent = "Image not available";
      placeholderText.className =
        "w-full h-full flex items-center justify-center text-gold";
      imageContainer.appendChild(placeholderText);
    }

    return imageContainer;
  }

  private detailTitleMovie(): HTMLElement {
    const title = this.state.selectedItem?.originalTitleText?.text || "N/A";
    return new Typography({
      variant: "h1",
      children: `Title : ${title}`,
      className: "font-medium text-gold text-lg sm:text-3xl tracking-tight",
    }).render();
  }

  private detailYearMovie(): HTMLElement {
    const year = this.state.selectedItem?.releaseYear?.year || "N/A";
    return new Typography({
      variant: "h1",
      children: `Release Year : ${year}`,
      className: "font-medium text-gold text-md sm:text-2xl tracking-tight",
    }).render();
  }

  private detailRating(): HTMLElement {
    const rating = this.state.movieRate
      ? this.state.movieRate.averageRating
      : "N/A";
    return new Typography({
      variant: "h5",
      children: `Rating: ${rating}`,
      className: "font-medium text-gold text-md sm:text-2xl tracking-tight",
    }).render();
  }

  private detailVoteMovie(): HTMLElement {
    const vote = this.state.movieRate ? this.state.movieRate.numVotes : "N/A";
    return new Typography({
      variant: "h5",
      children: `Voters Count: ${vote}`,
      className: "font-medium text-gold text-md sm:text-2xl tracking-tight",
    }).render();
  }

  private detailTitleType(): HTMLElement {
    const type = this.state.selectedItem?.titleType?.text || "N/A";
    return new Typography({
      variant: "h1",
      children: `Type : ${type}`,
      className: "font-medium text-gold text-md sm:text-2xl tracking-tight",
    }).render();
  }

  contentContainer(): HTMLElement {
    const contentContainer = document.createElement("div");
    contentContainer.className = "grid grid-cols-3 gap-4";

    const thumbnailContainer = document.createElement("div");
    thumbnailContainer.className = "-mt-40 px-4 z-10";

    if (this.state.selectedItem && this.state.selectedItem.primaryImage) {
      const imgThumbnail = new Image({
        src: this.state.selectedItem.primaryImage?.url,
        alt: this.state.selectedItem.primaryImage?.caption.plainText,
        className: "hidden sm:block w-full object-cover object-center",
      }).render();

      thumbnailContainer.appendChild(imgThumbnail);
    }

    const contentDetailContainer = document.createElement("div");
    contentDetailContainer.className =
      "col-span-3 sm:col-span-2 flex flex-col gap-2 sm:gap-8";
    contentDetailContainer.appendChild(this.detailTitleMovie());
    contentDetailContainer.appendChild(this.detailYearMovie());
    contentDetailContainer.appendChild(this.detailRating());
    contentDetailContainer.appendChild(this.detailVoteMovie());
    contentDetailContainer.appendChild(this.detailTitleType());

    contentContainer.appendChild(thumbnailContainer);
    contentContainer.appendChild(contentDetailContainer);
    return contentContainer;
  }

  private renderSkeleton(): HTMLElement {
    const skeletonContainer = document.createElement("div");

    // Skeleton untuk judul halaman
    skeletonContainer.appendChild(
      new Skeleton({
        width: "50%",
        height: "40px",
        className: "mb-4",
      }).render()
    );

    // Skeleton untuk gambar cover
    skeletonContainer.appendChild(
      new Skeleton({
        width: "100%",
        height: "60vh",
        className: "my-4 rounded-sm",
      }).render()
    );

    // Container untuk konten
    const contentSkeleton = document.createElement("div");
    contentSkeleton.className = "grid grid-cols-3 gap-4";

    // Skeleton untuk thumbnail
    const thumbnailSkeleton = new Skeleton({
      width: "100%",
      height: "300px",
      className: "-mt-40 px-4",
    }).render();
    thumbnailSkeleton.className += " hidden sm:block"; // Sesuaikan dengan kelas asli
    contentSkeleton.appendChild(thumbnailSkeleton);

    // Container untuk detail film
    const detailSkeleton = document.createElement("div");
    detailSkeleton.className =
      "col-span-3 sm:col-span-2 flex flex-col gap-2 sm:gap-8";

    // Skeleton untuk judul film
    detailSkeleton.appendChild(
      new Skeleton({
        width: "80%",
        height: "28px",
        className: "mb-2",
      }).render()
    );

    // Skeleton untuk tahun rilis
    detailSkeleton.appendChild(
      new Skeleton({
        width: "40%",
        height: "24px",
        className: "mb-2",
      }).render()
    );

    // Skeleton untuk rating
    detailSkeleton.appendChild(
      new Skeleton({
        width: "30%",
        height: "24px",
        className: "mb-2",
      }).render()
    );

    // Skeleton untuk jumlah vote
    detailSkeleton.appendChild(
      new Skeleton({
        width: "35%",
        height: "24px",
        className: "mb-2",
      }).render()
    );

    // Skeleton untuk tipe judul
    detailSkeleton.appendChild(
      new Skeleton({
        width: "25%",
        height: "24px",
        className: "mb-2",
      }).render()
    );

    contentSkeleton.appendChild(detailSkeleton);

    skeletonContainer.appendChild(contentSkeleton);

    // Skeleton untuk tombol
    const buttonSkeleton = document.createElement("div");
    buttonSkeleton.className = "flex justify-center mt-4";
    buttonSkeleton.appendChild(
      new Skeleton({
        width: "210px",
        height: "40px",
        className: "mt-4",
      }).render()
    );
    skeletonContainer.appendChild(buttonSkeleton);

    return skeletonContainer;
  }

  render(): HTMLElement {
    this.detailContainer.innerHTML = "";
    const header = new Navigation({
      className: "flex items-center gap-4",
    }).render();
    this.detailContainer.appendChild(header);
    if (this.state.isLoading) {
      this.detailContainer.appendChild(this.renderSkeleton());
    } else {
      this.detailContainer.appendChild(this.titlePage());
      this.detailContainer.appendChild(this.detailImage());
      this.detailContainer.appendChild(this.contentContainer());

      const wrapperButton = document.createElement("div");
      wrapperButton.className = "flex justify-center";
      wrapperButton.appendChild(this.buttonNavigateToHomepage());
      this.detailContainer.appendChild(wrapperButton);
    }

    return this.detailContainer;
  }
}

export default Detail;
