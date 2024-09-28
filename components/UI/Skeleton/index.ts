interface SkeletonProps {
  width: string;
  height: string;
  count?: number;
  className?: string;
}

class Skeleton {
  private props: SkeletonProps;

  constructor(props: SkeletonProps) {
    this.props = {
      ...props,
      count: props.count ?? 1, // Default to 1 if count is not provided
      className: props.className ?? "", // Default to empty string if className is not provided
    };
  }

  private createSkeletonItem(): HTMLElement {
    const item = document.createElement("div");
    item.className = `bg-slate-200 animate-pulse rounded ${this.props.className}`;
    item.style.width = this.props.width;
    item.style.height = this.props.height;
    return item;
  }

  render(): HTMLElement {
    const container = document.createElement("div");
    container.className = "skeleton-container";

    const itemCount = this.props.count as number; // We can safely assert this as number now
    for (let i = 0; i < itemCount; i++) {
      container.appendChild(this.createSkeletonItem());
    }

    return container;
  }
}

export default Skeleton;
