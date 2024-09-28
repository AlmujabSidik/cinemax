type DetailTypographyProps = {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  children: string;
  className?: string;
  onclick?: () => void;
};

class Typography {
  private props: DetailTypographyProps;
  constructor(props: DetailTypographyProps) {
    this.props = props;
    this.handleClick;
  }

  VARIANTS = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    p: "p",
  };

  private handleClick(): void {
    if (!this.props.onclick) return;
    this.props.onclick();
  }

  render(): HTMLElement {
    const typographyContainer = document.createElement(
      this.VARIANTS[this.props.variant]
    );
    typographyContainer.onclick = this.handleClick.bind(this);
    typographyContainer.innerHTML = this.props.children;
    typographyContainer.className = this.props.className || "";
    return typographyContainer;
  }
}

export default Typography;
