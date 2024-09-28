var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Button from "../../UI/Button/button.js";
import { fetchApi } from "../../Utils/fetchApi.js";
import Typography from "../../UI/Typography/typography.js";
import Image from "../../UI/Image/index.js";
import Skeleton from "../../UI/Skeleton/index.js";
import Navigation from "../../Container/Navigation/index.js";
class Detail {
    constructor() {
        this.state = {
            selectedItem: {},
            movieRate: {},
            isLoading: true,
        };
        this.detailContainer = document.createElement("div");
        this.detailContainer.className = "px-10";
        this.init();
    }
    init() {
        this.render();
        this.getDetailMovie();
    }
    setState(newState) {
        this.state = Object.assign(Object.assign({}, this.state), newState);
        this.render();
    }
    getDetailMovie() {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = window.location.hash.split("=")[1];
            const urlPath = `titles/${queryString}`;
            const urlPathRating = `titles/${queryString}/ratings`;
            try {
                const [movieDetails, movieRatings] = yield Promise.all([
                    fetchApi("GET", urlPath),
                    fetchApi("GET", urlPathRating),
                ]);
                this.setState({
                    selectedItem: movieDetails.results,
                    movieRate: movieRatings.results,
                    isLoading: false,
                });
            }
            catch (err) {
                console.error("Error fetching movie details:", err);
                this.setState({ isLoading: false });
            }
        });
    }
    buttonNavigateToHomepage() {
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
    titlePage() {
        return new Typography({
            variant: "h1",
            children: "Detail Movie",
            className: "font-medium text-gold text-4xl tracking-tight",
        }).render();
    }
    detailImage() {
        if (!this.state.selectedItem || !this.state.selectedItem.primaryImage) {
            return document.createElement("div");
        }
        const imageContainer = document.createElement("div");
        imageContainer.className = "relative w-full h-[60vh] my-4 rounded-sm  ";
        const imgCover = new Image({
            src: this.state.selectedItem.primaryImage.url,
            alt: this.state.selectedItem.primaryImage.caption.plainText,
            className: "w-full h-full object-cover object-center rounded-[40px] grayscale-0 sm:grayscale z-0",
        }).render();
        imageContainer.appendChild(imgCover);
        return imageContainer;
    }
    detailTitleMovie() {
        var _a, _b;
        const title = ((_b = (_a = this.state.selectedItem) === null || _a === void 0 ? void 0 : _a.originalTitleText) === null || _b === void 0 ? void 0 : _b.text) || "N/A";
        return new Typography({
            variant: "h1",
            children: `Title : ${title}`,
            className: "font-medium text-gold text-lg sm:text-3xl tracking-tight",
        }).render();
    }
    detailYearMovie() {
        var _a, _b;
        const year = ((_b = (_a = this.state.selectedItem) === null || _a === void 0 ? void 0 : _a.releaseYear) === null || _b === void 0 ? void 0 : _b.year) || "N/A";
        return new Typography({
            variant: "h1",
            children: `Release Year : ${year}`,
            className: "font-medium text-gold text-md sm:text-2xl tracking-tight",
        }).render();
    }
    detailRating() {
        const rating = this.state.movieRate
            ? this.state.movieRate.averageRating
            : "N/A";
        return new Typography({
            variant: "h5",
            children: `Rating: ${rating}`,
            className: "font-medium text-gold text-md sm:text-2xl tracking-tight",
        }).render();
    }
    detailVoteMovie() {
        const vote = this.state.movieRate ? this.state.movieRate.numVotes : "N/A";
        return new Typography({
            variant: "h5",
            children: `Voters Count: ${vote}`,
            className: "font-medium text-gold text-md sm:text-2xl tracking-tight",
        }).render();
    }
    detailTitleType() {
        var _a, _b;
        const type = ((_b = (_a = this.state.selectedItem) === null || _a === void 0 ? void 0 : _a.titleType) === null || _b === void 0 ? void 0 : _b.text) || "N/A";
        return new Typography({
            variant: "h1",
            children: `Type : ${type}`,
            className: "font-medium text-gold text-md sm:text-2xl tracking-tight",
        }).render();
    }
    contentContainer() {
        var _a, _b;
        const contentContainer = document.createElement("div");
        contentContainer.className = "grid grid-cols-3 gap-4";
        const thumbnailContainer = document.createElement("div");
        thumbnailContainer.className = "-mt-40 px-4 z-10";
        if (this.state.selectedItem && this.state.selectedItem.primaryImage) {
            const imgThumbnail = new Image({
                src: (_a = this.state.selectedItem.primaryImage) === null || _a === void 0 ? void 0 : _a.url,
                alt: (_b = this.state.selectedItem.primaryImage) === null || _b === void 0 ? void 0 : _b.caption.plainText,
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
    renderSkeleton() {
        const skeletonContainer = document.createElement("div");
        // Skeleton untuk judul halaman
        skeletonContainer.appendChild(new Skeleton({
            width: "50%",
            height: "40px",
            className: "mb-4",
        }).render());
        // Skeleton untuk gambar cover
        skeletonContainer.appendChild(new Skeleton({
            width: "100%",
            height: "60vh",
            className: "my-4 rounded-sm",
        }).render());
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
        detailSkeleton.appendChild(new Skeleton({
            width: "80%",
            height: "28px",
            className: "mb-2",
        }).render());
        // Skeleton untuk tahun rilis
        detailSkeleton.appendChild(new Skeleton({
            width: "40%",
            height: "24px",
            className: "mb-2",
        }).render());
        // Skeleton untuk rating
        detailSkeleton.appendChild(new Skeleton({
            width: "30%",
            height: "24px",
            className: "mb-2",
        }).render());
        // Skeleton untuk jumlah vote
        detailSkeleton.appendChild(new Skeleton({
            width: "35%",
            height: "24px",
            className: "mb-2",
        }).render());
        // Skeleton untuk tipe judul
        detailSkeleton.appendChild(new Skeleton({
            width: "25%",
            height: "24px",
            className: "mb-2",
        }).render());
        contentSkeleton.appendChild(detailSkeleton);
        skeletonContainer.appendChild(contentSkeleton);
        // Skeleton untuk tombol
        const buttonSkeleton = document.createElement("div");
        buttonSkeleton.className = "flex justify-center mt-4";
        buttonSkeleton.appendChild(new Skeleton({
            width: "210px",
            height: "40px",
            className: "mt-4",
        }).render());
        skeletonContainer.appendChild(buttonSkeleton);
        return skeletonContainer;
    }
    render() {
        this.detailContainer.innerHTML = "";
        const header = new Navigation({
            className: "flex items-center gap-4",
        }).render();
        this.detailContainer.appendChild(header);
        if (this.state.isLoading) {
            this.detailContainer.appendChild(this.renderSkeleton());
        }
        else {
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
