import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Version {
  version: string;
  date?: string;
}

interface VersionSelectorProps {
  versions: Version[];
  selectedVersion: string;
  onVersionChange: (version: string) => void;
}

export function VersionSelector({
  versions,
  selectedVersion,
  onVersionChange,
}: VersionSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Version:</span>
      <Select value={selectedVersion} onValueChange={onVersionChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select version" />
        </SelectTrigger>
        <SelectContent>
          {versions.map((version) => (
            <SelectItem key={version.version} value={version.version}>
              v{version.version}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
