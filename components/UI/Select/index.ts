interface SelectProps {
  options: { text: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  text?: string;
  children?: string;
  classes?: string;
}

class Select {
  private props: SelectProps;
  constructor(props: SelectProps) {
    this.props = props;
  }

  render(): HTMLElement {
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
      const target = e.target as HTMLSelectElement;
      this.props.onChange(target.value);
    });
    return select;
  }
}

export default Select;
