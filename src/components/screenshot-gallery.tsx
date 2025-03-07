"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import Image from "next-image-export-optimizer";
import { useEffect, useRef, useState } from "react";

interface Screenshot {
  src: string;
  alt: string;
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
}

const buttonStyles = {
  prevNext:
    "text-white hover:bg-black/50 z-50 opacity-70 hover:opacity-100 transition-opacity",
};

export function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Toggle body scroll when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus the current thumbnail when index changes
  useEffect(() => {
    if (isOpen && thumbnailRefs.current[currentIndex]) {
      thumbnailRefs.current[currentIndex]?.focus();
    }
  }, [currentIndex, isOpen]);

  function handlePrevious() {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  }

  function handleNext() {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  }

  function openGallery(index: number) {
    setCurrentIndex(index);
    setIsOpen(true);
  }

  // Handle keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setIsOpen(false);
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {screenshots.map((screenshot, index) => (
          <button
            key={index}
            className="relative aspect-video overflow-hidden rounded-lg border border-gray-800 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
            onClick={() => openGallery(index)}
            aria-label={`View ${screenshot.alt}`}
          >
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              fill
              className="object-cover transition-transform group-hover:scale-105 group-focus:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal data-slot="dialog-portal">
          <DialogOverlay />
          <DialogPrimitive.Content
            data-slot="dialog-content"
            className={cn(
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 duration-200"
            )}
            onKeyDown={handleKeyDown}
          >
            <div className="relative flex flex-col h-screen">
              <DialogTitle className="absolute py-4 me-8 text-sm font-normal z-50 bg-gradient-to-b from-gray-950/80 to-transparent w-full">
                {screenshots[currentIndex]?.alt}

                <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6">
                  <XIcon />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </DialogTitle>

              <div className="relative flex-1 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2",
                    buttonStyles.prevNext
                  )}
                  onClick={handlePrevious}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-8" />
                </Button>

                <div className="relative h-full w-full flex items-center justify-center">
                  {screenshots[currentIndex] && (
                    <Image
                      src={screenshots[currentIndex].src}
                      alt={screenshots[currentIndex].alt}
                      fill
                      className="object-contain"
                      priority
                    />
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2",
                    buttonStyles.prevNext
                  )}
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="size-8" />
                </Button>
              </div>

              {/* Thumbnail gallery with improved accessibility */}
              <div
                className="py-3 px-4 bg-black/80 flex justify-center space-x-2 mt-auto"
                role="tablist"
                aria-label="Image thumbnails"
              >
                {screenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    ref={(el) => void (thumbnailRefs.current[index] = el)}
                    className={cn(
                      "relative aspect-square size-12 overflow-hidden rounded-md border-2 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-white",
                      index === currentIndex
                        ? "border-yellow-500 opacity-100 scale-105"
                        : "border-gray-700 opacity-60 hover:opacity-80"
                    )}
                    onClick={() => setCurrentIndex(index)}
                    role="tab"
                    tabIndex={0}
                    aria-selected={index === currentIndex}
                    aria-controls="main-image"
                    aria-label={`Image ${index + 1}: ${screenshot.alt}`}
                  >
                    <Image
                      src={screenshot.src}
                      alt=""
                      aria-hidden="true"
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </>
  );
}
