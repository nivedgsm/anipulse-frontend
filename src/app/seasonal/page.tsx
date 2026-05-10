import Link from "next/link";

import {
  getSeasonalAnime,
} from "@/lib/anilist";

import { AnimeCard } from "@/components/anime/anime-card";

interface SeasonalPageProps {
  searchParams: Promise<{
    season?: string;
    year?: string;
  }>;
}

const seasons = [
  "WINTER",
  "SPRING",
  "SUMMER",
  "FALL",
];

export default async function SeasonalPage({
  searchParams,
}: SeasonalPageProps) {

  const params =
    await searchParams;

  const currentYear =
    new Date().getFullYear();

  const season =
    params.season || "SPRING";

  const year =
    Number(
      params.year ||
      currentYear
    );

  const anime =
    await getSeasonalAnime({
      season,
      year,
    });

  return (

    <main className="min-h-screen bg-background text-foreground">

      <section className="container mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="mb-10">

          <p className="text-sm font-medium uppercase tracking-wider text-violet-500">

            Seasonal Anime

          </p>

          <h1 className="mt-2 text-5xl font-black tracking-tight">

            {season} {year}

          </h1>

        </div>

        {/* SEASONS */}
        <div className="mb-8 flex flex-wrap gap-3">

          {seasons.map((item) => (

            <Link
              key={item}
              href={`/seasonal?season=${item}&year=${year}`}
              className={`rounded-full px-6 py-3 text-sm font-medium transition
                ${
                  season === item
                    ? "bg-violet-500 text-white"
                    : "bg-secondary hover:bg-violet-500 hover:text-white"
                }
              `}
            >

              {item}

            </Link>

          ))}

        </div>

        {/* YEARS */}
        <div className="mb-12 flex flex-wrap gap-3">

          {[2023, 2024, 2025, 2026].map((item) => (

            <Link
              key={item}
              href={`/seasonal?season=${season}&year=${item}`}
              className={`rounded-full px-6 py-3 text-sm font-medium transition
                ${
                  year === item
                    ? "bg-pink-500 text-white"
                    : "bg-secondary hover:bg-pink-500 hover:text-white"
                }
              `}
            >

              {item}

            </Link>

          ))}

        </div>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

          {anime.map((item: AnimeMedia) => (

            <AnimeCard
              key={item.id}
              id={item.id}
              title={
                item.title.english ||
                item.title.romaji
              }
              genre={
                item.genres?.[0] ||
                "Anime"
              }
              image={
                item.coverImage.large
              }
            />

          ))}

        </div>

      </section>

    </main>

  );
}