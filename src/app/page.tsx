import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DISCORD_URL, DOCS_URL, GITHUB_URL } from "@/lib/constants";
import { latestThreePosts } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import { IconBrandDiscord, IconBrandGithub } from "@tabler/icons-react";
import {
  ArrowRight,
  BookOpen,
  Box,
  Clock,
  Download,
  FastForward,
  Gauge,
  Lightbulb,
  Maximize,
  type createLucideIcon
} from "lucide-react";
import Image from "next-image-export-optimizer";
import Link from "next/link";

const heroButtonStyles = {
  primary:
    "bg-orange-600 hover:bg-orange-700 border-1 border-orange-200/30 text-orange-50 hover:text-white shadow-sm shadow-orange-500",
  secondary:
    "bg-gray-950/20 hover:bg-gray-900/30 border-1 border-gray-200/30 text-gray-100 hover:text-white shadow-sm shadow-gray-500",
} as const;

function HeroButton({
  href,
  children,
  className,
  variant,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant: keyof typeof heroButtonStyles;
}) {
  return (
    <Button
      asChild
      className={cn(
        "flex gap-2 min-w-[160px] transition-colors",
        heroButtonStyles[variant],
        className
      )}
      variant="ghost"
    >
      <Link href={href}>
      {children}
      </Link>
    </Button>
  );
}

function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/img/background_splash.webp')] bg-cover bg-center text-white relative hero-glow rounded-b-2xl overflow-hidden">
      <div className="px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <div className="w-full max-w-[480px] h-32 relative">
            <Image
              src="/img/text_logo.webp"
              alt="doukutsu-rs"
              fill
              objectFit="contain"
            />
          </div>
          <p className="text-xl md:text-2xl font-medium text-gray-200 [text-shadow:3px_3px_1px_black]">
            A reimplementation of Cave Story engine with many quality-of-life
            improvements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <HeroButton href="/downloads" variant="primary">
              <Download className="size-4" /> Download Now
            </HeroButton>
            <HeroButton href={DISCORD_URL} variant="secondary">
              <IconBrandDiscord className="size-4" /> Join Discord
            </HeroButton>
            <HeroButton href={GITHUB_URL} variant="secondary">
              <IconBrandGithub className="size-4" /> GitHub
            </HeroButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  iconComponent,
}: {
  title: string;
  description: string;
  iconComponent: ReturnType<typeof createLucideIcon>;
}) {
  const Icon = iconComponent;

  return (
    <Card
      className={
        "relative overflow-hidden rounded-xl border bg-linear-to-br from-blue-500/10 to-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/10"
      }
    >
      <div className="relative z-10 p-6">
        <div className="mb-4 flex items-center gap-3">
          <Icon className="size-5 lg:size-9 text-blue-500 dark:text-blue-300" />
          <h3 className="text-xl lg:text-3xl font-bold tracking-tight text-blue-900 dark:text-white">
            {title}
          </h3>
        </div>
        <CardContent className="p-0">
          <p className="text-sm lg:text-lg text-stone-950/80 dark:text-white/80">
            {description}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}

function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-linear-to-b from-white to-blue-100  dark:from-black dark:to-blue-950">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
            Features
          </h2>
          <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            doukutsu-rs brings many quality-of-life improvements to help you
            enjoy the 2004 indie classic like a modern game.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          <FeatureCard
            title="Smooth Motion"
            description="Game logic is decoupled from frame rate with motion interpolation, looking better on modern high refresh rate desktop and mobile displays."
            iconComponent={Gauge}
          />
          <FeatureCard
            title="Flexible Resolution"
            description="The game resolution is not fixed, allowing for better compatibility with different screens."
            iconComponent={Maximize}
          />
          <FeatureCard
            title="Multiple Game Speeds"
            description="Switch between 50tps/60tps speeds to match original freeware or Cave Story+ versions."
            iconComponent={Clock}
          />
          <FeatureCard
            title="Universal Compatibility"
            description="A single executable supports multiple game versions - original freeware, Cave Story+, and Nintendo Switch version."
            iconComponent={Box}
          />
          <FeatureCard
            title="Skip Cutscenes"
            description="Supports skipping cutscenes, a feature previously exclusive to the Switch port."
            iconComponent={FastForward}
          />
          <FeatureCard
            title="Enhanced Lighting"
            description="Enjoy lighting effects that are slightly fancier than those in the Switch version."
            iconComponent={Lightbulb}
          />
        </div>
      </div>
    </section>
  );
}

function CommunityCard({
  title,
  description,
  icon,
  link,
  linkText,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  linkText: string;
}) {
  return (
    <Card className="rounded-xl border bg-linear-to-br from-orange-500/10 to-orange-600/10 border-orange-500/50 shadow-lg shadow-orange-500/10 text-gray-900 dark:text-white overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="p-3 text-white bg-orange-700 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500 dark:text-gray-300">{description}</p>
        <Link
          href={link}
          className="inline-flex items-center text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300 gap-1 font-medium transition-colors"
        >
          {linkText} <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

function CommunitySection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-orange-50 to-white dark:from-orange-950 dark:to-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
            Join Our Community
          </h2>
          <p className="text-gray-600 dark:text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Connect with other players, get support, and stay updated on the
            latest developments.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <CommunityCard
            title="Discord Community"
            description="Join our active community to discuss the project, get help, and connect with other fans."
            icon={<IconBrandDiscord className="size-6" />}
            link={DISCORD_URL}
            linkText="Join our Discord"
          />
          <CommunityCard
            title="Documentation"
            description="Comprehensive guides and documentation for users and mod developers."
            icon={<BookOpen className="size-6" />}
            link={DOCS_URL}
            linkText="Read the Docs"
          />
        </div>
      </div>
    </section>
  );
}

const screenshots = [
  {
    src: "/img/screenshots/jpfreeware.png",
    alt: "Original 2004 freeware version in Japanese, widescreen mode",
  },
  {
    src: "/img/screenshots/csplus.png",
    alt: "Cave Story+ 2011 version, hard difficulty, widescreen mode",
  },
  {
    src: "/img/screenshots/sandpit.png",
    alt: "Cave Story+ 2017 version, Sand Pit challenge",
  },
  {
    src: "/img/screenshots/0908beta.png",
    alt: "Pre-release 0.9.0.8 beta version, widescreen mode",
  },
];

function ScreenshotsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-yellow-50 to-white dark:from-yellow-950 dark:to-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
            See It In Action
          </h2>
          <p className="text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Check out doukutsu-rs in action with these gameplay screenshots.
            Click any image to view in fullscreen.
          </p>
        </div>

        <ScreenshotGallery screenshots={screenshots} />
      </div>
    </section>
  );
}

async function BlogPostsSection() {
  const blogPosts = await latestThreePosts();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-red-50 to-white  dark:from-red-950 dark:to-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white">
            Latest Updates
          </h2>
          <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Stay up to date with the latest news and developments from the
            doukutsu-rs team.
          </p>
        </div>

        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {blogPosts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={index}>
              <Card className="bg-white/50 border-gray-200 hover:bg-white/70 dark:bg-black/50 dark:border-gray-800 dark:hover:bg-black/70 hover:border-orange-400 dark:hover:border-orange-700 transition-shadow dark:text-white overflow-hidden cursor-pointer hover:shadow-lg">
                <CardContent className="p-6">
                  <p className="text-sm text-orange-600 dark:text-orange-500 mb-2">
                    {new Date(post.frontmatter.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <h3 className="text-xl font-bold mb-2">
                    {post.frontmatter.title}
                  </h3>
                  {post.frontmatter.excerpt && (
                    <p className="text-gray-600 dark:text-gray-300">
                      {post.frontmatter.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center text-orange-500 dark:text-orange-400 text-sm font-medium">
                    Read more <ArrowRight className="ml-1 size-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button asChild variant="default" size="lg">
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="container flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <ScreenshotsSection />
        <FeaturesSection />
        <CommunitySection />
        <BlogPostsSection />
      </main>
    </div>
  );
}
