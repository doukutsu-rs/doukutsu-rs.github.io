import { Skeleton } from "@/components/ui/skeleton";

export function DownloadsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-9 w-48" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
