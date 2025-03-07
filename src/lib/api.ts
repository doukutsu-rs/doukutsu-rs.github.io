import type { Release } from "@/types/downloads";

export async function fetchDownloadsData(channel: "stable" | "nightly"): Promise<Release[]> {
  const response = await fetch(`https://get.doukutsu.rs/metadata/${channel}.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch downloads data");
  }
  return response.json();
}
