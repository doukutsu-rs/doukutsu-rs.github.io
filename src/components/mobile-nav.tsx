"use client";

import { NavLink } from "@/components/nav-link";
import { MobileUtilityLinks } from "@/components/utility-links";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNavItems } from "@/lib/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden flex-1 flex items-center justify-end">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 text-white hover:text-orange-300 hover:bg-orange-900"
          >
            <Menu className="size-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-orange-950 border-orange-900 text-white pl-4">
          <SheetTitle className="text-white my-3 flex items-center">
            doukutsu-rs
          </SheetTitle>
          <nav className="flex flex-col gap-4">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                external={item.external}
                onClick={close}
                className="text-lg font-medium transition-colors hover:text-orange-300"
              >
                {item.label}
              </NavLink>
            ))}
            <MobileUtilityLinks />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
