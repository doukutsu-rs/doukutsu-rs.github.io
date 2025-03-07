"use client";

import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";
import { DesktopUtilityLinks } from "@/components/utility-links";
import { mainNavItems } from "@/lib/navigation";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-600 dark:border-orange-900 bg-orange-800 dark:bg-orange-950 text-white backdrop-blur-sm supports-backdrop-filter:bg-orange-800/90 dark:supports-backdrop-filter:bg-orange-950/90">
      <div className="container flex h-14 m-auto items-center">
        <Link
          href="/"
          className="ml-4 md:ml-0 mr-6 flex items-center space-x-2"
        >
          <span className="text-xl font-bold tracking-tight">doukutsu-rs</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center justify-between">
          <div className="flex gap-6">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                external={item.external}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <DesktopUtilityLinks />
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
