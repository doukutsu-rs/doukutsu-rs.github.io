"use client";

import { StableContent } from "@/app/downloads/components/stable-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExperimentalPortsContent } from "./experimental-ports-content";
import { NightlyContent } from "./nightly-content";

export function DownloadsContent() {
  return (
    <Tabs defaultValue="stable" className="max-w-5xl mx-auto">
      <TabsList className="grid w-full grid-cols-1 h-fit sm:h-9 sm:grid-cols-3">
        <TabsTrigger className="h-9 sm:h-auto" value="stable">Stable Releases</TabsTrigger>
        <TabsTrigger className="h-9 sm:h-auto" value="nightly">Nightly Builds</TabsTrigger>
        <TabsTrigger className="h-9 sm:h-auto" value="experimental">Experimental Ports</TabsTrigger>
      </TabsList>

      <TabsContent value="stable" className="mt-6">
        <StableContent />
      </TabsContent>

      <TabsContent value="nightly" className="mt-6">
        <NightlyContent />
      </TabsContent>

      <TabsContent value="experimental" className="mt-6">
        <ExperimentalPortsContent />
      </TabsContent>
    </Tabs>
  );
}
