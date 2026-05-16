import Image from "next/image";
import Link from "next/link";

import type { Anime } from "@/types/anime";

interface AnimeDetailHeroProps {
  anime: Anime;
}

function getAnimeTitle(anime: Anime) {
  return (
    anime.title?.english ||
    anime.title?.romaji ||
    anime.title?.native ||
    "Untitled Anime"
  );
}

function getAnimePoster(anime: Anime) {
  return (
    anime.coverImage?.extraLarge ||
    anime.coverImage?.large ||
    anime.bannerImage ||
    "/placeholder-anime.jpg"
  );
}

function getAnimeBanner(anime: Anime) {
  return (
    anime.bannerImage ||
    anime.coverImage?.extraLarge ||
    anime.coverImage?.large ||
    "/placeholder-anime.jpg"
  );
}

function cleanDescription(description?: string | null) {
  if (!description) {
    return "No description available for this anime yet.";
  }

  return description
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function formatStatus(status?: string | null) {
  if (!status) {
    return "Unknown";
  }

  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatSeason(season?: string | null) {
  if (!season) {
    return "";
  }

  return season
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function getEpisodeText(anime: Anime) {
  if (anime.episodes) {
    return `${anime.episodes} Episodes`;
  }

  if (anime.status === "RELEASING") {
    return "Ongoing";
  }

  return "Episodes TBA";
}

function getDurationText(anime: Anime) {
  if (anime.duration) {
    return `${anime.duration} mins`;
  }

  return "Duration TBA";
}

export function AnimeDetailHero({
  anime,
}: AnimeDetailHeroProps) {
  const title = getAnimeTitle(anime);

  const poster = getAnimePoster(anime);

  const banner = getAnimeBanner(anime);

  const description = cleanDescription(
    anime.description
  );

  const status = formatStatus(anime.status);

  const season = formatSeason(anime.season);

  const seasonText = `${season || "Unknown"} ${
    anime.seasonYear || ""
  }`.trim();

  const metaItems = [
    `⭐ ${anime.averageScore || "N/A"} Score`,
    getEpisodeText(anime),
    getDurationText(anime),
    seasonText,
    status,
  ];

  return (
    <section className="relative overflow-hidden bg-background">
      {/* BACKDROP */}
      <div className="absolute inset-x-0 top-0 h-[560px] overflow-hidden">
        <Image
          src={banner}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-background/55 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-background/80" />
      </div>

      {/* CONTENT */}
      <div className="container relative z-10 mx-auto px-4 pb-16 pt-20 md:pt-28 lg:pb-20 lg:pt-36">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
          {/* POSTER */}
          <div className="mx-auto w-full max-w-[260px] lg:mx-0 xl:max-w-[300px]">
            <div className="relative aspect-[2/3] overflow-hidden rounded-[28px] border border-white/15 bg-card shadow-2xl">
              <Image
                src={poster}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 260px, 300px"
                className="object-cover"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="min-w-0 self-end rounded-[32px] border border-white/10 bg-background/70 p-5 shadow-2xl backdrop-blur-2xl md:p-7 lg:p-8">
            {/* GENRES */}
            {anime.genres?.length ? (
              <div className="mb-5 flex flex-wrap gap-2.5">
                {anime.genres
                  .slice(0, 6)
                  .map((genre, index) => (
                    <span
                      key={`${genre}-${index}`}
                      className="rounded-full bg-violet-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-violet-600/20 md:text-sm"
                    >
                      {genre}
                    </span>
                  ))}
              </div>
            ) : null}

            {/* TITLE */}
            <h1 className="max-w-5xl text-4xl font-black leading-[1.05] tracking-tight text-foreground md:text-5xl xl:text-6xl">
              {title}
            </h1>

            {anime.title?.native ? (
              <p className="mt-4 text-sm font-medium text-muted-foreground md:text-base">
                {anime.title.native}
              </p>
            ) : null}

            {/* META */}
            <div className="mt-7 flex flex-wrap gap-3">
              {metaItems.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-border bg-card/80 px-4 py-3 text-sm font-medium text-foreground shadow-sm backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* DESCRIPTION */}
            <p className="mt-7 max-w-4xl whitespace-pre-line text-sm leading-7 text-muted-foreground md:text-base md:leading-8 line-clamp-6">
              {description}
            </p>

            {/* STUDIOS */}
            {anime.studios?.nodes?.length ? (
              <div className="mt-8">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-violet-500">
                  Studios
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {anime.studios.nodes.map(
                    (studio, index) => (
                      <span
                        key={`${studio.name}-${index}`}
                        className="rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur"
                      >
                        {studio.name}
                      </span>
                    )
                  )}
                </div>
              </div>
            ) : null}

            {/* ACTIONS */}
            <div className="mt-9 flex flex-wrap gap-4">
              {anime.trailer?.id ? (
                <a
                  href="#trailer"
                  className="rounded-full bg-violet-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500"
                >
                  Watch Trailer
                </a>
              ) : null}

              <Link
                href="/anime"
                className="rounded-full border border-border bg-card/80 px-7 py-3 text-sm font-bold text-foreground shadow-sm backdrop-blur transition hover:bg-accent"
              >
                Browse Anime
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}