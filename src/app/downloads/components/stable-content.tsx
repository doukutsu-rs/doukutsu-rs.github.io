"use client";

import { ChangelogDisplay } from "@/components/changelog-display";
import { PlatformCard } from "@/components/platform-card";
import { Skeleton } from "@/components/ui/skeleton";
import { VersionSelector } from "@/components/version-selector";
import { useDownloadsData } from "@/hooks/use-downloads";
import { SETUP_GUIDE_LINKS } from "@/lib/constants";
import type { Release } from "@/types/downloads";
import { Calendar } from "lucide-react";
import { useMemo, useState } from "react";
import { LoadingError } from "./loading-error";
import { DownloadsSkeleton } from "./downloads-skeleton";

function StableContentView({ data }: { data: Release[] }) {
  // Find versions that don't have experimental platforms
  const versionsWithExperimentalPorts = useMemo(() => {
    if (!data?.length) return [];

    return data
      .filter((release) =>
        release.platforms.some((platform) => !platform.experimental)
      )
      .map((release) => ({
        version: release.version,
      }));
  }, [data]);

  const [selectedVersion, setSelectedVersion] = useState<string>(
    data.length > 0 ? data[0].version : ""
  );

  const selectedRelease =
    data.find((release) => release.version === selectedVersion) || data[0];

  if (!selectedRelease) {
    return <div>No stable releases available</div>;
  }

  const mainPlatforms = selectedRelease.platforms.filter(
    (platform) => !platform.experimental
  );

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <VersionSelector
          versions={versionsWithExperimentalPorts}
          selectedVersion={selectedVersion}
          onVersionChange={setSelectedVersion}
        />

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="size-4" />
          <span>
            Released:{" "}
            {new Date(selectedRelease.releaseDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {mainPlatforms.map((platform, idx) => (
          <PlatformCard
            key={idx}
            platform={platform}
            setupGuideLinks={SETUP_GUIDE_LINKS}
          />
        ))}
      </div>

      <ChangelogDisplay version={selectedRelease.version} />
    </div>
  );
}

export function StableContent() {
  const { data, isLoading, error } = useDownloadsData("stable");

  // display a loading skeleton
  if (isLoading) {
    return <DownloadsSkeleton />;
  }

  // display an error alert
  if (error || !data) {
    return <LoadingError />;
  }

  return <StableContentView data={data} />;
}
