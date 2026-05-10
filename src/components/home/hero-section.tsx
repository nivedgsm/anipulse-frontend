import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/shared/fade-in";

interface HeroSectionProps {
  anime: AnimeMedia[];
}

export function HeroSection({
  anime,
}: HeroSectionProps) {

  const featuredAnime =
    anime?.[0];

  const sideAnime =
    anime?.slice(1, 3);

  if (!featuredAnime) {
    return null;
  }

  return (

    <FadeIn>

      <section className="container mx-auto px-4 pt-10 md:pt-16">

        <div className="grid gap-6 lg:grid-cols-3">

          {/* FEATURED */}
          <Link
            href={`/anime/${featuredAnime.id}`}
            className="group relative overflow-hidden rounded-[32px] border border-border lg:col-span-2"
          >

            {/* IMAGE */}
            <div className="relative h-[500px] md:h-[650px]">

              <Image
                src={
                  featuredAnime.bannerImage ||
                  featuredAnime.coverImage?.large
                }
                alt={
                  featuredAnime.title?.english ||
                  featuredAnime.title?.romaji ||
                  "Anime"
                }
                fill
                priority
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

            </div>

            {/* CONTENT */}
            <div className="absolute bottom-0 z-10 p-6 md:p-12">

              {/* GENRES */}
              <div className="mb-5 flex flex-wrap gap-3">

                {featuredAnime.genres
                  ?.slice(0, 3)
                  .map((genre: string) => (

                    <span
                      key={genre}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur-xl"
                    >

                      {genre}

                    </span>

                  ))}

              </div>

              {/* TITLE */}
              <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-7xl">

                {featuredAnime.title?.english ||
                  featuredAnime.title?.romaji}

              </h1>

              {/* DESCRIPTION */}
              <p className="mt-6 max-w-2xl line-clamp-3 text-base leading-relaxed text-zinc-300 md:text-lg">

                {featuredAnime.description
                  ?.replace(
                    /<[^>]*>/g,
                    ""
                  ) ||
                  "Explore the latest trending anime from around the world."}

              </p>

              {/* META */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-zinc-300">

                <div className="flex items-center gap-2">

                  <span className="text-yellow-400">
                    ⭐
                  </span>

                  <span className="font-semibold text-white">

                    {featuredAnime.averageScore ||
                      "N/A"}

                  </span>

                </div>

                <div>

                  {featuredAnime.season}{" "}
                  {featuredAnime.seasonYear}

                </div>

                <div>

                  {featuredAnime.episodes ||
                    "?"} Episodes

                </div>

              </div>

              {/* BUTTONS */}
              <div className="mt-10 flex flex-wrap gap-4">

                <div className="rounded-full bg-violet-600 px-7 py-3 text-sm font-semibold text-white transition group-hover:bg-violet-500">

                  View Anime

                </div>

              </div>

            </div>

          </Link>

          {/* SIDE CARDS */}
          <div className="flex flex-col gap-6">

            {sideAnime?.map((item) => (

              <Link
                href={`/anime/${item.id}`}
                key={item.id}
                className="group relative overflow-hidden rounded-[28px] border border-border"
              >

                {/* IMAGE */}
                <div className="relative h-[260px] md:h-[312px]">

                  <Image
                    src={
                      item.bannerImage ||
                      item.coverImage?.large
                    }
                    alt={
                      item.title?.english ||
                      item.title?.romaji ||
                      "Anime"
                    }
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                </div>

                {/* CONTENT */}
                <div className="absolute bottom-0 p-6">

                  {/* GENRES */}
                  <div className="mb-3 flex flex-wrap gap-2">

                    {item.genres
                      ?.slice(0, 2)
                      .map((genre: string) => (

                        <span
                          key={genre}
                          className="rounded-full bg-pink-500/90 px-3 py-1 text-xs font-medium text-white"
                        >

                          {genre}

                        </span>

                      ))}

                  </div>

                  {/* TITLE */}
                  <h2 className="line-clamp-2 text-2xl font-black leading-tight text-white">

                    {item.title?.english ||
                      item.title?.romaji}

                  </h2>

                  {/* SCORE */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-zinc-300">

                    <span className="text-yellow-400">
                      ⭐
                    </span>

                    <span>

                      {item.averageScore ||
                        "N/A"}

                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>

    </FadeIn>

  );
}