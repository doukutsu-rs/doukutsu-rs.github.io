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

interface ExperimentalPortsContentProps {
  thirdPartyPorts: Platform[];
  data: Release[];
}

function ExperimentalPortsContentView({
  thirdPartyPorts,
  data,
}: ExperimentalPortsContentProps) {
  // Find versions that have experimental platforms
  const versionsWithExperimentalPorts = useMemo(() => {
    if (!data?.length) return [];

    return data
      .filter((release) =>
        release.platforms.some((platform) => platform.experimental)
      )
      .map((release) => ({
        version: release.version,
      }));
  }, [data]);

  // Set initial version to the first one with experimental ports
  const [selectedVersion, setSelectedVersion] = useState<string>(
    versionsWithExperimentalPorts.length > 0
      ? versionsWithExperimentalPorts[0].version
      : ""
  );

  const selectedRelease = useMemo(
    () => data.find((release) => release.version === selectedVersion),
    [selectedVersion, data]
  );

  // Find experimental platforms for the selected version
  const selectedExperimentalPlatforms = useMemo(() => {
    if (!selectedVersion || !data?.length) return [];

    if (!selectedRelease) return [];

    return selectedRelease.platforms.filter(
      (platform) => platform.experimental
    );
  }, [selectedVersion, data]);

  return (
    <div className="space-y-8">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <VersionSelector
          versions={versionsWithExperimentalPorts}
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

      <Alert>
        <AlertTriangle className="size-4" />
        <AlertTitle>Experimental Ports</AlertTitle>
        <AlertDescription>
          These ports are experimental and may not have the same level of
          stability or feature completeness as the main releases.
        </AlertDescription>
      </Alert>

      {versionsWithExperimentalPorts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">
            Official Experimental Ports
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {selectedExperimentalPlatforms.map((platform, idx) => (
              <PlatformCard
                key={idx}
                platform={platform}
                setupGuideLinks={SETUP_GUIDE_LINKS}
              />
            ))}
          </div>
        </div>
      )}

      {thirdPartyPorts?.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Third-Party Ports</h3>

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

export function ExperimentalPortsContent() {
  const { data, isLoading, error } = useDownloadsData("stable");

  // display a loading skeleton
  if (isLoading) {
    return <DownloadsSkeleton />;
  }

  // display an error alert
  if (error || !data) {
    return <LoadingError />;
  }

  return <ExperimentalPortsContentView data={data} thirdPartyPorts={[]} />;
}
