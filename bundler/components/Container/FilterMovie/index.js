import Button from "../../UI/Button/button.js";
import Select from "../../UI/Select/index.js";
class FilterMovie {
    constructor(props) {
        this.props = props;
        this.filterContainer = document.createElement("div");
    }
    buttonFilterMovie(text, variant, size, classes) {
        return new Button({
            text,
            variant: variant,
            size: size,
            onClick: () => this.props.submitFilter(),
            disabled: this.props.isLoading,
            classes: classes,
        }).render();
    }
    selectFilterByMovie() {
        return new Select({
            options: [
                {
                    text: "Select Movie",
                    value: "",
                },
                {
                    text: "Movie",
                    value: "movie",
                },
                {
                    text: "Short",
                    value: "short",
                },
            ],
            selectedValue: this.props.type,
            onChange: (value) => this.props.setType(value),
            classes: "w-full bg-slate-800  placeholder:text-white text-white text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md  cursor-pointer mt-2",
        }).render();
    }
    selectFilterByYear() {
        return new Select({
            options: [
                {
                    text: "Select Year",
                    value: "",
                },
                {
                    text: "2024",
                    value: "2024",
                },
                {
                    text: "2023",
                    value: "2023",
                },
                {
                    text: "2022",
                    value: "2022",
                },
                {
                    text: "2021",
                    value: "2021",
                },
                {
                    text: "2020",
                    value: "2020",
                },
            ],
            selectedValue: this.props.year,
            onChange: (value) => this.props.setYear(value),
            classes: "w-full bg-slate-800  placeholder:text-white text-white text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md  cursor-pointer mt-2",
        }).render();
    }
    render() {
        this.filterContainer.appendChild(this.selectFilterByMovie());
        this.filterContainer.appendChild(this.selectFilterByYear());
        this.filterContainer.appendChild(this.buttonFilterMovie(this.props.isLoading ? "Loading..." : "Filter", "secondary", "small", "mt-4 disabled:cursor-not-allowed w-full"));
        return this.filterContainer;
    }
}
export default FilterMovie;
