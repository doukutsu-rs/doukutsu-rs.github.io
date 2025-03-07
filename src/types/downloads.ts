export interface Architecture {
  type: ArchitectureType;
  downloadUrl: string;
}

export const SUPPORTED_PLATFORMS = [
  "windows",
  "linux",
  "macos",
  "android",
  "ios",
  "switch",
  "libretro",
] as const;

export type PlatformType = (typeof SUPPORTED_PLATFORMS)[number];

export const SUPPORTED_ARCHITECTURES = [
  "i686",
  "x86_64",
  "arm64",
  "armv7",
  "universal",
  "unknown",
] as const;

export type ArchitectureType = (typeof SUPPORTED_ARCHITECTURES)[number];

export interface Platform {
  type: PlatformType;
  architectures: Architecture[];
  setupGuideLink?: string;
  note?: string;
  maintainer?: string;
  experimental?: boolean;
}

export interface CommitInfo {
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  date: string;
}

export interface Release {
  /**
   * Semver version string
   */
  version: string;
  /**
   * YYYY-MM-DD formatted date
   */
  releaseDate: string;
  /**
   * Commit hash
   */
  commit: string;
  // commitInfo: CommitInfo;
  /**
   * Per-platform metadata
   */
  platforms: Platform[];
}

export interface DownloadsData {
  stableReleases: Release[];
  nightlyBuilds: Release[];
  thirdPartyPorts: Platform[];
  setupGuideLinks: Partial<Record<PlatformType, string>>;
}
