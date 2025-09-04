"use client";

import { ThemeToggleIcon } from "@/components/theme-toggle-icon";
import { Button } from "@/components/ui/button";
import { DISCORD_URL, GITHUB_URL } from "@/lib/constants";
import { IconBrandDiscord, IconBrandGithub } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface UtilityLinkProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

function IconLink({ icon, label, href, onClick }: UtilityLinkProps) {
  if (href) {
    return (
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="text-white hover:text-orange-300 hover:bg-orange-900"
      >
        <Link href={href} target="_blank" rel="noopener noreferrer">
          {icon}
          <span className="sr-only">{label}</span>
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="text-white hover:text-orange-300 hover:bg-orange-900 cursor-pointer"
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  );
}

function TextLink({ icon, label, href, onClick }: UtilityLinkProps) {
  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-lg font-medium text-white hover:text-orange-300"
      >
        {icon}
        {label}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-lg font-medium text-white hover:text-orange-300"
    >
      {icon}
      {label}
    </button>
  );
}

export function DesktopUtilityLinks() {
  const { setTheme } = useTheme();

  const changeTheme = () =>
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));

  return (
    <div className="hidden md:flex items-center gap-2">
      <IconLink
        icon={<ThemeToggleIcon className="size-5" />}
        label="Toggle theme"
        onClick={changeTheme}
      />
      <IconLink
        icon={<IconBrandGithub className="size-5" />}
        label="GitHub"
        href={GITHUB_URL}
      />
      <IconLink
        icon={<IconBrandDiscord className="size-5" />}
        label="Discord"
        href={DISCORD_URL}
      />
    </div>
  );
}

export function MobileUtilityLinks() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4 mt-4">
      <TextLink
        icon={<IconBrandGithub className="size-5" />}
        label="GitHub"
        href={GITHUB_URL}
      />
      <TextLink
        icon={<IconBrandDiscord className="size-5" />}
        label="Discord"
        href={DISCORD_URL}
      />
      <TextLink
        icon={<ThemeToggleIcon className="size-5" />}
        label="Toggle theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    </div>
  );
}
