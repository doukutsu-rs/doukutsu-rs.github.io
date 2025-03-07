"use client";

import { fetchDownloadsData } from "@/lib/api";
import {
  fetchGitHubCommitId,
  fetchGitHubReleases,
} from "@/lib/fetchGitHubReleases";
import { useQuery } from "@tanstack/react-query";

export function useDownloadsData(channel: "stable" | "nightly") {
  return useQuery({
    queryKey: ["downloads", channel],
    queryFn: () => fetchDownloadsData(channel),
  });
}

export function useAllDownloadsData() {
  return useQuery({
    queryKey: ["downloads"],
    queryFn: async () => {
      const [stableReleases, nightlyBuilds] = await Promise.all([
        fetchDownloadsData("stable"),
        fetchDownloadsData("nightly"),
      ]);

      return { stableReleases, nightlyBuilds };
    },
  });
}

export function useGitHubReleases() {
  return useQuery({
    queryKey: ["github-releases"],
    queryFn: () => fetchGitHubReleases(),
  });
}

export function useGitHubCommitId(commitId: string) {
  return useQuery({
    queryKey: ["github-commit", commitId],
    queryFn: () => fetchGitHubCommitId(commitId),
    enabled: !!commitId,
  });
}
