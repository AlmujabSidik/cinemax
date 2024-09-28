class Select {
    constructor(props) {
        this.props = props;
    }
    render() {
        const select = document.createElement("select");
        select.className = this.props.classes || "";
        this.props.options.forEach((option) => {
            const optionEl = document.createElement("option");
            optionEl.value = option.value;
            optionEl.textContent = option.text;
            if (option.value === this.props.selectedValue) {
                optionEl.selected = true;
            }
            select.appendChild(optionEl);
        });
        select.addEventListener("change", (e) => {
            const target = e.target;
            this.props.onChange(target.value);
        });
        return select;
    }
}
export default Select;
