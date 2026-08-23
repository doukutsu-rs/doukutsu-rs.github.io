"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChangelogDisplay } from "@/components/changelog-display";
import { PlatformCard } from "@/components/platform-card";
import { Skeleton } from "@/components/ui/skeleton";
import { VersionSelector } from "@/components/version-selector";
import { useDownloadsData } from "@/hooks/use-downloads";
import { SETUP_GUIDE_LINKS } from "@/lib/constants";
import type { Release } from "@/types/downloads";
import { AlertTriangle, Calendar } from "lucide-react";
import { useMemo, useState } from "react";
import { LoadingError } from "./loading-error";
import { DownloadsSkeleton } from "./downloads-skeleton";

function StableContentView({ data }: { data: Release[] }) {
  // Create version options from stable builds
  const versionOptions = useMemo(() => {
    return data.map((build) => ({
      version: build.version,
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

  const experimentalPlatforms = selectedRelease.platforms.filter(
    (platform) => platform.experimental
  );

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <VersionSelector
          versions={versionOptions}
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

      {mainPlatforms?.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {mainPlatforms.map((platform, idx) => (
            <PlatformCard
              key={idx}
              platform={platform}
              setupGuideLinks={SETUP_GUIDE_LINKS}
            />
          ))}
        </div>
      )}

      {experimentalPlatforms.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">
            Official Experimental Ports
          </h3>

          <Alert>
            <AlertTriangle className="size-4" />
            <AlertTitle>Experimental Ports</AlertTitle>
            <AlertDescription>
              These ports are experimental and may not have the same level of
              stability or feature completeness as the main releases.
            </AlertDescription>
          </Alert>

          <div className="grid gap-6 my-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {experimentalPlatforms.map((platform, idx) => (
              <PlatformCard
                key={idx}
                platform={platform}
                setupGuideLinks={SETUP_GUIDE_LINKS}
              />
            ))}
          </div>
        </div>
      )}

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
