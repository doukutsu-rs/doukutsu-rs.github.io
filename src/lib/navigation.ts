import { DOCS_URL } from "@/lib/constants";

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
];
