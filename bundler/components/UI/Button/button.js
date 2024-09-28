class Button {
    constructor(props) {
        this.props = props;
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick();
        }
    }
    getClassName() {
        const baseClasses = "font-bold py-1.5 px-2 rounded";
        const variantClasses = {
            primary: "bg-slate-950 hover:bg-slate-700 text-white font-medium",
            secondary: "bg-gold hover:bg-gray-700 text-slate-800 font-medium",
        };
        const sizeClasses = {
            small: "text-sm",
            medium: "text-base",
            large: "text-lg",
        };
        return `${baseClasses} ${variantClasses[this.props.variant]} ${sizeClasses[this.props.size]} `;
    }
    render() {
        const button = document.createElement("button");
        if (typeof this.props.text === "string") {
            button.innerText = this.props.text;
        }
        else {
            button.appendChild(this.props.text);
        }
        button.className = this.getClassName() + this.props.classes;
        button.disabled = this.props.disabled || false;
        button.addEventListener("click", this.handleClick.bind(this));
        return button;
    }
}
export default Button;
