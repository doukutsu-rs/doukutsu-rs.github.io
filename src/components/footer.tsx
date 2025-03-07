import { COPYRIGHT_DISCLAIMER } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="w-full border-t py-6">
      <div className="container m-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} doukutsu-rs contributors. Released
            under the MIT License.
          </p>
          <p className="text-center text-xs text-muted-foreground mt-1 md:text-left max-w-md">
            {COPYRIGHT_DISCLAIMER}
          </p>
        </div>
      </div>
    </footer>
  );
}
