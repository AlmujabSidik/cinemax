interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "eager" | "lazy";
  onLoad?: () => void;
  onError?: () => void;
}

class ImageComponent {
  private props: ImageProps;
  private imageElement: HTMLImageElement;

  constructor(props: ImageProps) {
    this.props = props;
    this.imageElement = document.createElement("img");
    this.setAttributes();
    this.addEventListeners();
  }

  private setAttributes(): void {
    const { src, alt, width, height, className, loading } = this.props;

    this.imageElement.src = src;
    this.imageElement.alt = alt || "Detail image";
    if (width) this.imageElement.width = width;
    if (height) this.imageElement.height = height;
    if (className) this.imageElement.className = className;
    if (loading) this.imageElement.loading = loading;
  }

  private addEventListeners(): void {
    if (this.props.onLoad) {
      this.imageElement.addEventListener("load", this.props.onLoad);
    }
    if (this.props.onError) {
      this.imageElement.addEventListener("error", this.props.onError);
    }
  }

  public render(): HTMLImageElement {
    return this.imageElement;
  }

  public updateProps(newProps: Partial<ImageProps>): void {
    this.props = { ...this.props, ...newProps };
    this.setAttributes();
  }
}

export default ImageComponent;
