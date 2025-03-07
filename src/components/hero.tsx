import { cn } from "@/lib/utils";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Hero({ className, children, ...props }: HeroProps) {
  return (
    <section
      className={cn(
        "w-full py-12 md:py-16 bg-linear-to-b dark:from-black dark:to-orange-950 from-orange-50 to-orange-200 dark:text-white rounded-b-2xl",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function HeroTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function HeroSubtitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "max-w-[900px] text-gray-700/80 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed",
        className
      )}
    >
      {children}
    </p>
  );
}
