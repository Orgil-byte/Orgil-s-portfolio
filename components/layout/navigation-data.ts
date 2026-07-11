export const navigationItems = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const desktopNavigationItems = navigationItems.slice(1);

export const socialItems = [
  {
    label: "GitHub",
    href: "https://github.com/Orgil-byte",
  },
] as const;
