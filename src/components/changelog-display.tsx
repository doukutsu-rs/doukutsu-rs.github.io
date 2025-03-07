import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGitHubReleases } from "@/hooks/use-downloads";
import ReactMarkdown from "react-markdown";

interface ChangelogDisplayProps {
  version: string;
}

export function ChangelogDisplay({ version }: ChangelogDisplayProps) {
  const { data: githubReleases, isLoading } = useGitHubReleases();

  // Find matching GitHub release for this version
  const githubRelease = githubReleases?.find(
    (release: { tag_name: string }) =>
      release.tag_name === `v${version}` || release.tag_name === version
  );

  // If we have GitHub release data, use that instead of the local changelog
  if (githubRelease) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Changelog</h3>
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <ReactMarkdown>{githubRelease.body}</ReactMarkdown>
        </div>
      </div>
    );
  }

  // If we're still loading GitHub data, show a skeleton
  if (isLoading) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Changelog</h3>
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  // display error message if we couldn't find the GitHub release
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Changelog</h3>
      <p className="text-muted-foreground">
        Changelog for version <Badge>{version}</Badge> is not available.
      </p>
    </div>
  );
}
