import Typography from "../../UI/Typography/typography.js";
import Navigation from "../../Container/Navigation/index.js";

class About {
  private aboutContainer: HTMLDivElement;
  constructor() {
    this.aboutContainer = document.createElement("div");
    this.aboutContainer.className = "w-full h-full flex flex-col px-10";
  }

  render() {
    const title = new Typography({
      variant: "h1",
      children: "About",
      className: "font-medium text-gold text-lg sm:text-3xl tracking-tight",
    }).render();
    const header = new Navigation({
      className: "flex items-center gap-4",
    }).render();
    this.aboutContainer.appendChild(header);
    this.aboutContainer.appendChild(title);
    return this.aboutContainer;
  }
}

export default About;
