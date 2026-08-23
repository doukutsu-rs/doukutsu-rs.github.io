"use client";

import { PlatformCard } from "@/components/platform-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { VersionSelector } from "@/components/version-selector";
import { useDownloadsData } from "@/hooks/use-downloads";
import { SETUP_GUIDE_LINKS } from "@/lib/constants";
import type { Platform, Release } from "@/types/downloads";
import { AlertTriangle, Calendar } from "lucide-react";
import { useMemo, useState } from "react";
import { DownloadsSkeleton } from "./downloads-skeleton";
import { LoadingError } from "./loading-error";

interface ThirdPartyPortContentProps {
  thirdPartyPorts: Platform[];
  data: Release[];
}

function ThirdPartyPortsContentView({
  thirdPartyPorts,
  data,
}: ThirdPartyPortContentProps) {
  // Find versions that have platforms maintained by third-party contributors
  const versionsWithThirdPartylPorts = useMemo(() => {
    if (!data?.length || !thirdPartyPorts?.length) return [];

    return data
      .filter((release) =>
        release.platforms.some((platform) => thirdPartyPorts.includes(platform))
      )
      .map((release) => ({
        version: release.version,
      }));
  }, [data]);

  // Set initial version to the first one with third-party ports
  const [selectedVersion, setSelectedVersion] = useState<string>(
    versionsWithThirdPartylPorts.length > 0
      ? versionsWithThirdPartylPorts[0].version
      : ""
  );

  const selectedRelease = useMemo(
    () => data.find((release) => release.version === selectedVersion),
    [selectedVersion, data]
  );

  if (!selectedRelease) {
    return <div>No builds for 3rd-party ports available</div>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <VersionSelector
          versions={versionsWithThirdPartylPorts}
          selectedVersion={selectedVersion}
          onVersionChange={setSelectedVersion}
        />

        {selectedRelease && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            <span>
              Released:{" "}
              {new Date(selectedRelease.releaseDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {thirdPartyPorts?.length > 0 && (
        <div>
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="size-4" />
            <AlertTitle>Third-Party Port</AlertTitle>
            <AlertDescription>
              The following ports are maintained by third-party contributors and
              not by the doukutsu-rs maintainers. They may not always be
              up-to-date with the latest features and fixes.
            </AlertDescription>
          </Alert>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {thirdPartyPorts.map((platform, idx) => (
              <PlatformCard
                key={idx}
                platform={platform}
                setupGuideLinks={SETUP_GUIDE_LINKS}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ThirdPartyPortsContent() {
  // TODO: add support for the `third-party` channel
  const { data, isLoading, error } = useDownloadsData("stable");

  // display a loading skeleton
  if (isLoading) {
    return <DownloadsSkeleton />;
  }

  // display an error alert
  if (error || !data) {
    return <LoadingError />;
  }

  return <ThirdPartyPortsContentView data={data} thirdPartyPorts={[]} />;
}