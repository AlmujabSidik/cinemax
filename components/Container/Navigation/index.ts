import Typography from "../../UI/Typography/typography.js";
import Image from "../../UI/Image/index.js";

interface NavigationProps {
  className?: string;
}

class Navigation {
  private menuContainer: HTMLDivElement;
  private logoContainer: HTMLDivElement;
  private navMenu: HTMLDivElement;
  private className: string;

  constructor({ className = "" }: NavigationProps) {
    this.className = className;
    this.menuContainer = document.createElement("div");
    this.logoContainer = document.createElement("div");
    this.navMenu = document.createElement("div");
    this.navMenu.className = "flex items-center gap-4";
  }

  private createNavItem(text: string, hash: string): HTMLElement {
    return new Typography({
      variant: "h1",
      children: text,
      className:
        "text-xs tracking-tight text-white cursor-pointer hover:text-gray-500",
      onclick: () => {
        window.location.hash = hash;
      },
    }).render();
  }

  render(): HTMLElement {
    const home = this.createNavItem("Home", "");
    const about = this.createNavItem("About", "about");

    const logo = new Image({
      src: "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg",
      alt: "logo",
      className: "w-14 h-14",
    }).render();

    this.logoContainer.appendChild(logo);
    this.navMenu.appendChild(home);
    this.navMenu.appendChild(about);

    this.menuContainer.appendChild(this.logoContainer);
    this.menuContainer.className = this.className;
    this.menuContainer.appendChild(this.navMenu);

    return this.menuContainer;
  }
}

export default Navigation;
