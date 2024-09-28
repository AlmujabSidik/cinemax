class ImageComponent {
    constructor(props) {
        this.props = props;
        this.imageElement = document.createElement("img");
        this.setAttributes();
        this.addEventListeners();
    }
    setAttributes() {
        const { src, alt, width, height, className, loading } = this.props;
        this.imageElement.src = src;
        this.imageElement.alt = alt || "Detail image";
        if (width)
            this.imageElement.width = width;
        if (height)
            this.imageElement.height = height;
        if (className)
            this.imageElement.className = className;
        if (loading)
            this.imageElement.loading = loading;
    }
    addEventListeners() {
        if (this.props.onLoad) {
            this.imageElement.addEventListener("load", this.props.onLoad);
        }
        if (this.props.onError) {
            this.imageElement.addEventListener("error", this.props.onError);
        }
    }
    render() {
        return this.imageElement;
    }
    updateProps(newProps) {
        this.props = Object.assign(Object.assign({}, this.props), newProps);
        this.setAttributes();
    }
}
export default ImageComponent;
