class Skeleton {
    constructor(props) {
        var _a, _b;
        this.props = Object.assign(Object.assign({}, props), { count: (_a = props.count) !== null && _a !== void 0 ? _a : 1, className: (_b = props.className) !== null && _b !== void 0 ? _b : "" });
    }
    createSkeletonItem() {
        const item = document.createElement("div");
        item.className = `bg-slate-200 animate-pulse rounded ${this.props.className}`;
        item.style.width = this.props.width;
        item.style.height = this.props.height;
        return item;
    }
    render() {
        const container = document.createElement("div");
        container.className = "skeleton-container";
        const itemCount = this.props.count; // We can safely assert this as number now
        for (let i = 0; i < itemCount; i++) {
            container.appendChild(this.createSkeletonItem());
        }
        return container;
    }
}
export default Skeleton;
