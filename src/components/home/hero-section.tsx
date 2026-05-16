import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/shared/fade-in";

interface HeroSectionProps {
  anime: any[];
}

function getAnimeTitle(anime: any) {
  return anime?.title?.english || anime?.title?.romaji || "Anime";
}

function getAnimeImage(anime: any) {
  return anime?.bannerImage || anime?.coverImage?.large || "/placeholder.jpg";
}

function cleanDescription(description?: string) {
  if (!description) {
    return "Explore the latest trending anime from around the world.";
  }

  return description.replace(/<[^>]*>/g, "");
}

function GenreBadge({ genre }: { genre: string }) {
  return (
    <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-blue-100 shadow-[0_0_24px_rgba(79,125,254,0.12)] backdrop-blur-xl">
      {genre}
    </span>
  );
}

function ScoreBadge({ score }: { score?: number | string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-black/45 px-4 py-2 text-sm font-bold text-blue-100 backdrop-blur-xl">
      <span className="text-blue-300">★</span>
      <span className="text-white">{score || "N/A"}</span>
    </div>
  );
}

export function HeroSection({ anime }: HeroSectionProps) {
  const featuredAnime = anime?.[0];
  const sideAnime = anime?.slice(1, 3);

  if (!featuredAnime) {
    return null;
  }

  return (
    <FadeIn>
      <section className="relative overflow-hidden px-6 pt-10 md:px-10 md:pt-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-20 h-[320px] w-[320px] rounded-full bg-blue-500/15 blur-[100px]" />

        <div className="relative mx-auto w-full max-w-[1500px]">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-blue-300">
                Trending Anime
              </div>

              <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
                Discover the Void
              </h1>
            </div>

            <p className="max-w-xl text-sm leading-6 text-blue-100/60 md:text-base md:leading-7">
              Explore top anime picks, current fan favorites, and standout
              titles from across the anime world.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Link
              href={`/anime/${featuredAnime.id}`}
              className="group relative overflow-hidden rounded-[32px] border border-blue-500/15 bg-[#05030a]/70 shadow-[0_30px_100px_rgba(0,0,0,0.45)] lg:col-span-2"
            >
              <div className="relative h-[500px] md:h-[650px]">
                <Image
                  src={getAnimeImage(featuredAnime)}
                  alt={getAnimeTitle(featuredAnime)}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,125,254,0.25),transparent_28rem)] opacity-80" />
              </div>

              <div className="absolute bottom-0 z-10 p-6 md:p-12">
                <div className="mb-5 flex flex-wrap gap-3">
                  {featuredAnime.genres
                    ?.slice(0, 3)
                    .map((genre: string) => (
                      <GenreBadge key={genre} genre={genre} />
                    ))}
                </div>

                <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-7xl">
                  {getAnimeTitle(featuredAnime)}
                </h2>

                <p className="mt-6 max-w-2xl line-clamp-3 text-base leading-relaxed text-blue-100/70 md:text-lg">
                  {cleanDescription(featuredAnime.description)}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-blue-100/65">
                  <ScoreBadge score={featuredAnime.averageScore} />

                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-semibold backdrop-blur-xl">
                    {featuredAnime.season} {featuredAnime.seasonYear}
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-semibold backdrop-blur-xl">
                    {featuredAnime.episodes || "?"} Episodes
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <div className="rounded-full bg-blue-600 px-7 py-3 text-sm font-black text-white shadow-[0_0_30px_rgba(79,125,254,0.35)] transition group-hover:bg-blue-500">
                    View Anime
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex flex-col gap-6">
              {sideAnime?.map((item) => (
                <Link
                  href={`/anime/${item.id}`}
                  key={item.id}
                  className="group relative overflow-hidden rounded-[28px] border border-blue-500/15 bg-[#05030a]/70 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
                >
                  <div className="relative h-[260px] md:h-[312px]">
                    <Image
                      src={getAnimeImage(item)}
                      alt={getAnimeTitle(item)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,125,254,0.18),transparent_18rem)] opacity-80" />
                  </div>

                  <div className="absolute bottom-0 p-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {item.genres?.slice(0, 2).map((genre: string) => (
                        <span
                          key={genre}
                          className="rounded-full border border-blue-400/25 bg-blue-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-100 backdrop-blur-xl"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>

                    <h3 className="line-clamp-2 text-2xl font-black leading-tight text-white transition group-hover:text-blue-300">
                      {getAnimeTitle(item)}
                    </h3>

                    <div className="mt-3">
                      <ScoreBadge score={item.averageScore} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}