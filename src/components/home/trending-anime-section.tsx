import Link from "next/link";

import { AnimeCard } from "@/components/anime/anime-card";

import { FadeIn } from "@/components/shared/fade-in";

interface TrendingAnimeSectionProps {
  anime: any[];
}

export function TrendingAnimeSection({
  anime,
}: TrendingAnimeSectionProps) {

  return (

    <FadeIn>

      <section className="container mx-auto px-4 py-20">

        {/* HEADER */}
        <div className="mb-10 flex items-end justify-between">

          <div>

            <p className="text-sm font-medium uppercase tracking-wider text-violet-500">

              Trending Now

            </p>

            <h2 className="mt-2 text-4xl font-black tracking-tight">

              Popular Anime

            </h2>

          </div>

          <Link
            href="/trending"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:block"
          >

            View All

          </Link>

        </div>

        {/* HORIZONTAL SCROLL */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

          {anime.map((item) => (

            <div
              key={item.id}
              className="w-[260px] flex-shrink-0"
            >

              <AnimeCard

                id={item.id}

                title={
                  item.title?.english ||
                  item.title?.romaji ||
                  "Unknown Anime"
                }

                genre={
                  item.genres?.[0] ||
                  "Anime"
                }

                image={
                  item.coverImage?.large ||
                  "https://placehold.co/600x900/png"
                }

              />

              {/* META */}
              <div className="mt-4">

                <div className="flex items-center gap-3 text-sm text-muted-foreground">

                  <span>

                    ⭐{" "}
                    {item.averageScore ||
                      "N/A"}

                  </span>

                  <span>

                    {item.season}{" "}
                    {item.seasonYear}

                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </FadeIn>

  );
}