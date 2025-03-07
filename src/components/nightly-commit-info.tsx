import type { CommitInfo } from "@/types/downloads";
import { Calendar, GitCommit, User } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface NightlyCommitInfoProps {
  buildId: string;
  commitInfo?: CommitInfo;
}

export function NightlyCommitInfo({
  buildId,
  commitInfo,
}: NightlyCommitInfoProps) {
  // if no commit info is provided, return a placeholder
  if (!commitInfo) {
    return (
      <Skeleton className="p-4 rounded-lg"/>
    );
  }

  const commitDate = new Date(commitInfo.date);
  const formattedDate = commitDate.toLocaleDateString();
  const formattedTime = commitDate.toLocaleTimeString();

  return (
    <div className="bg-muted p-4 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold mb-2">Nightly Build {buildId}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {commitInfo.message}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <GitCommit className="size-4" />
            <span>
              Commit:{" "}
              <code className="bg-muted-foreground/20 px-1 py-0.5 rounded">
                {commitInfo.shortHash}
              </code>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <span>
              Date: {formattedDate} {formattedTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <User className="size-4" />
            <span>Author: {commitInfo.author}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
