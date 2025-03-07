import { DownloadsContent } from "@/app/downloads/components/downloads-content";
import { Hero, HeroSubtitle, HeroTitle } from "@/components/hero";
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Downloads - doukutsu-rs",
  description:
    'Fearlessly shilling d-rs to people who didn\'t ask. Click here to experience "Cave Story: Definitive Edition" now!',
  twitter: {
    card: "summary",
  },
};

export default function DownloadsPage() {
  return (
    <div className="container">
      <Hero>
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <HeroTitle>Downloads</HeroTitle>
            <HeroSubtitle>
              Get the latest builds of doukutsu-rs for your platform.
            </HeroSubtitle>
          </div>
        </div>
      </Hero>

      <div className="container px-4 py-12 md:px-6">
        <Suspense fallback={<DownloadsSkeleton />}>
          <DownloadsContent />
        </Suspense>
      </div>
    </div>
  );
}

function DownloadsSkeleton() {
  return (
    <div className="container space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}
