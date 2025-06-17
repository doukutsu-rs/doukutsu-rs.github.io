import { DOCS_URL, FAQ_URL } from "@/lib/constants";

export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

export const mainNavItems: NavItem[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/downloads",
    label: "Downloads",
  },
  {
    href: DOCS_URL,
    label: "Documentation",
    external: true,
  },
  {
    href: FAQ_URL,
    label: "FAQ",
    external: true,
  },
];
