import Link from "next/link";

import { ReleaseCard } from "@/components/anime/release-card";

import { FadeIn } from "@/components/shared/fade-in";

interface UpcomingReleasesSectionProps {
  anime: AnimeMedia[];
}

export function UpcomingReleasesSection({
  anime,
}: UpcomingReleasesSectionProps) {

  return (

    <FadeIn>

      <section className="container mx-auto px-4 py-20">

        {/* HEADER */}
        <div className="mb-10 flex items-end justify-between">

          <div>

            <p className="text-sm font-medium uppercase tracking-wider text-violet-500">

              Coming Soon

            </p>

            <h2 className="mt-2 text-4xl font-black tracking-tight">

              Upcoming Releases

            </h2>

          </div>

          <Link
            href="/anime"
            className="hidden text-sm font-medium text-muted-foreground transition hover:text-foreground md:block"
          >

            View All

          </Link>

        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {anime
            .slice(0, 8)
            .map((item) => (

              <ReleaseCard
                key={item.id}

                id={item.id}

                title={
                  item.title?.english ||
                  item.title?.romaji ||
                  "Unknown Anime"
                }

                image={
                  item.bannerImage ||
                  item.coverImage?.large ||
                  "https://placehold.co/600x900/png"
                }

                episode={
                  item.episodes
                    ? `${item.episodes} Episodes`
                    : "TBA"
                }

                release={`${item.season} ${item.seasonYear}`}
              />

            ))}

        </div>

      </section>

    </FadeIn>

  );
}