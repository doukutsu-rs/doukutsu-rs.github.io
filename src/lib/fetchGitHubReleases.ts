const ownerRepo = "doukutsu-rs/doukutsu-rs";

export async function fetchGitHubReleases() {
  const response = await fetch(
    `https://api.github.com/repos/${ownerRepo}/releases`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch GitHub releases");
  }
  return response.json();
}

export async function fetchGitHubCommitId(commitId: string) {
  const response = await fetch(
    `https://api.github.com/repos/${ownerRepo}/git/commits/${commitId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch GitHub commits");
  }
  return response.json();
}
