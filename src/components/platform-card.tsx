import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DownloadsData, Platform, PlatformType } from "@/types/downloads";
import {
  IconBrandAndroid,
  IconBrandApple,
  IconBrandUbuntu,
  IconBrandWindows,
  IconDeviceGamepad,
  IconDeviceNintendo,
} from "@tabler/icons-react";
import { Download, ExternalLink } from "lucide-react";
import Link from "next/link";

interface PlatformCardProps {
  platform: Platform;
  setupGuideLinks: DownloadsData["setupGuideLinks"];
}

const platformIcons: Record<
  PlatformType | "default",
  React.ComponentType<{ className: string }>
> = {
  windows: IconBrandWindows,
  linux: IconBrandUbuntu,
  macos: IconBrandApple,
  ios: IconBrandApple,
  android: IconBrandAndroid,
  switch: IconDeviceNintendo,
  libretro: IconDeviceGamepad,
  default: Download,
} as const;

const titleStyles: Record<PlatformType | "default", string> = {
  windows: "bg-blue-500 text-white",
  linux: "bg-amber-600 text-white",
  macos: "bg-gray-500 text-white",
  ios: "bg-gray-500 text-white",
  android: "bg-green-600 text-white",
  switch: "bg-red-600 text-white",
  libretro: "bg-purple-950  text-white",
  default: "bg-gray-600 text-white",
} as const;

const platformNames: Record<PlatformType, string> = {
  windows: "Windows",
  linux: "Linux",
  macos: "macOS",
  ios: "iOS",
  android: "Android",
  switch: "Nintendo Switch",
  libretro: "LibRetro",
};

const architectureNames: Record<PlatformType, Record<string, string>> = {
  windows: {},
  linux: {},
  macos: {
    x86_64: "Intel (x86_64)",
    arm64: "Apple Silicon (ARM64)",
    universal: "Universal",
  },
  ios: {
    arm64: "ARM64",
  },
  android: {
    universal: "Multiple architectures",
  },
  switch: {
    arm64: "NRO Homebrew",
  },
  libretro: {
    unknown: "RetroArch Download",
  },
};

const genericArchNames: Record<string, string> = {
  i686: "32-bit (x86)",
  x86_64: "64-bit (x86_64)",
  arm64: "ARM64",
  armv7: "ARMv7",
};

function getArchName(platform: PlatformType, arch: string) {
  if (architectureNames[platform]?.[arch]) {
    return architectureNames[platform][arch];
  }

  return genericArchNames[arch] ?? arch;
}

export function PlatformCard({ platform, setupGuideLinks }: PlatformCardProps) {
  const titleClass = titleStyles[platform.type] ?? titleStyles.default;
  const Icon = platformIcons[platform.type] ?? platformIcons.default;
  const setupGuide = setupGuideLinks[platform.type] ?? platform.setupGuideLink;
  const platformName = platformNames[platform.type];

  return (
    <Card className="h-full flex flex-col pt-0 overflow-hidden">
      <CardHeader className={titleClass}>
        <CardTitle className={`flex items-center gap-2 py-3`}>
          <Icon className="size-4" />
          {platformName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          {platform.architectures.map((arch, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm">
                {getArchName(platform.type, arch.type)}
              </span>
              {arch.downloadUrl && (
                <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                    asChild
                  >
                  <Link
                    href={arch.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="size-4" />
                    Download
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>

        {platform.note && (
          <div className="p-4 mt-4 bg-muted rounded-lg">
            <p className="text-sm text-accent-foreground">{platform.note}</p>
          </div>
        )}
      </CardContent>
      {setupGuide && (
        <CardFooter className="pt-2">
          <Link href={setupGuide} className="w-full">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 bg-gray-200/50 dark:bg-gray-900/50 text-gray-600 hover:text-gray-700 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-900 cursor-pointer"
            >
              <ExternalLink className="size-4" />
              Setup Guide
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
