import ImageComponent from "../../UI/Image/index.js";
import Typography from "../../UI/Typography/typography.js";
class MovieItem {
    constructor({ movie }) {
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
    imageMovie() {
        var _a, _b, _c, _d, _e;
        return new ImageComponent({
            src: (_b = (_a = this.movie.primaryImage) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : "",
            alt: (_e = (_d = (_c = this.movie.primaryImage) === null || _c === void 0 ? void 0 : _c.caption) === null || _d === void 0 ? void 0 : _d.plainText) !== null && _e !== void 0 ? _e : "Movie image",
            width: 400,
            className: "object-cover min-h-[450px]",
        }).render();
    }
    titleMovie() {
        var _a;
        return new Typography({
            variant: "h3",
            children: (_a = this.movie.title) !== null && _a !== void 0 ? _a : "Unknown Title",
            className: "font-medium text-gold tracking-tight",
        }).render();
    }
    yearMovie() {
        var _a, _b;
        return new Typography({
            variant: "h4",
            children: (_b = (_a = this.movie.year) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "Unknown Year",
            className: "font-medium text-gold tracking-tight",
        }).render();
    }
    ratingMovie() {
        var _a, _b;
        return new Typography({
            variant: "p",
            children: `Rating: ${(_b = (_a = this.movie.rating) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "N/A"}`,
            className: "text-sm text-gray-600",
        }).render();
    }
    render() {
        this.movieContainer.appendChild(this.imageMovie());
        this.wrapperContent.appendChild(this.titleMovie());
        this.wrapperContent.appendChild(this.yearMovie());
        this.wrapperContent.appendChild(this.ratingMovie());
        this.movieContainer.appendChild(this.wrapperContent);
        return this.movieContainer;
    }
}
export default MovieItem;
