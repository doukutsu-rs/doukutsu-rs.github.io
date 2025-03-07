"use client";

import { NightlyCommitInfo } from "@/components/nightly-commit-info";
import { PlatformCard } from "@/components/platform-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { VersionSelector } from "@/components/version-selector";
import { useAllDownloadsData, useGitHubCommitId } from "@/hooks/use-downloads";
import { SETUP_GUIDE_LINKS } from "@/lib/constants";
import type { CommitInfo, Release } from "@/types/downloads";
import { AlertTriangle, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { DownloadsSkeleton } from "./downloads-skeleton";
import { LoadingError } from "./loading-error";

interface NightlyContentProps {
  data: Release[];
  latestStableRelease?: Release;
}

function NightlyContentView({
  data,
  latestStableRelease,
}: NightlyContentProps) {
  // Create version options from nightly builds
  const versionOptions = useMemo(() => {
    return data.map((build) => ({
      version: build.version,
    }));
  }, [data]);

  // State for selected version
  const [selectedVersion, setSelectedVersion] = useState<string>(
    data.length > 0 ? data[0].version : ""
  );

  // Find the selected nightly build
  const selectedBuild =
    data.find((build) => build.version === selectedVersion) || data[0];

  // Calculate days since last stable release
  const daysSinceLastStable = latestStableRelease
    ? Math.floor(
        (new Date().getTime() -
          new Date(latestStableRelease.releaseDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const { data: commitData } = useGitHubCommitId(selectedBuild.commit);

  const commitInfo: CommitInfo | undefined = useMemo(
    () =>
      commitData
        ? {
            author: commitData.author?.name ?? commitData.committer?.name,
            date: commitData.author?.date ?? commitData.committer?.date,
            message: commitData.message,
            hash: selectedBuild.commit,
            shortHash: selectedBuild.commit.substring(0, 7),
          }
        : undefined,
    [commitData, selectedBuild.commit]
  );

  console.log("commit", commitData, commitInfo);

  if (!selectedBuild) {
    return <div>No nightly builds available</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <VersionSelector
          versions={versionOptions}
          selectedVersion={selectedVersion}
          onVersionChange={setSelectedVersion}
        />

        <div className="flex items-center gap-4">
          {latestStableRelease && (
            <div className="flex items-center gap-2 text-sm bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full">
              <Clock className="size-4" />
              <span>
                {daysSinceLastStable} days since v{latestStableRelease.version}
              </span>
            </div>
          )}
        </div>
      </div>

      <Alert className="mb-6">
        <AlertTriangle className="size-4" />
        <AlertTitle>Recommended for testing only</AlertTitle>
        <AlertDescription>
          Nightly builds have the latest fixes and improvements but may be
          unstable.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {selectedBuild.platforms.map((platform) => (
          <PlatformCard
            key={platform.type}
            platform={platform}
            setupGuideLinks={SETUP_GUIDE_LINKS}
          />
        ))}
      </div>

      <NightlyCommitInfo
        buildId={selectedBuild.version}
        commitInfo={commitInfo}
      />
    </div>
  );
}

export function NightlyContent() {
  const { data, isLoading, error } = useAllDownloadsData();

  // display a loading skeleton
  if (isLoading) {
    return <DownloadsSkeleton />;
  }

  // display an error alert
  if (error || !data) {
    return <LoadingError />;
  }

  return (
    <NightlyContentView
      data={data.nightlyBuilds}
      latestStableRelease={data.stableReleases[0]}
    />
  );
}
