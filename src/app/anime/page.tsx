import Link from "next/link";

import {
  getBrowseAnime,
} from "@/lib/anilist";

import { AnimeCard } from "@/components/anime/anime-card";

interface AnimePageProps {
  searchParams: Promise<{
    page?: string;
    genre?: string;
    sort?: string;
  }>;
}

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Romance",
  "Sci-Fi",
  "Sports",
];

const sortOptions = [
  {
    label: "Trending",
    value: "TRENDING_DESC",
  },
  {
    label: "Popular",
    value: "POPULARITY_DESC",
  },
  {
    label: "Top Rated",
    value: "SCORE_DESC",
  },
];

export default async function AnimePage({
  searchParams,
}: AnimePageProps) {

  const params =
    await searchParams;

  const page =
    Number(params.page || 1);

  const genre =
    params.genre || "";

  const sort =
    params.sort ||
    "TRENDING_DESC";

  const anime =
    await getBrowseAnime({
      page,
      genre,
      sort,
    });

  return (

    <main className="min-h-screen bg-background text-foreground">

      <section className="container mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="mb-10">

          <p className="text-sm font-medium uppercase tracking-wider text-violet-500">

            Browse Anime

          </p>

          <h1 className="mt-2 text-5xl font-black tracking-tight">

            Anime Catalog

          </h1>

        </div>

        {/* FILTERS */}
        <div className="mb-10 flex flex-wrap gap-3">

          {sortOptions.map((item) => (

            <Link
              key={item.value}
              href={`/anime?sort=${item.value}`}
              className={`rounded-full px-5 py-2 text-sm font-medium transition
                ${
                  sort === item.value
                    ? "bg-violet-500 text-white"
                    : "bg-secondary hover:bg-violet-500 hover:text-white"
                }
              `}
            >

              {item.label}

            </Link>

          ))}

        </div>

        {/* GENRES */}
        <div className="mb-12 flex flex-wrap gap-3">

          <Link
            href="/anime"
            className={`rounded-full px-5 py-2 text-sm font-medium transition
              ${
                genre === ""
                  ? "bg-pink-500 text-white"
                  : "bg-secondary hover:bg-pink-500 hover:text-white"
              }
            `}
          >

            All

          </Link>

          {genres.map((item) => (

            <Link
              key={item}
              href={`/anime?genre=${item}&sort=${sort}`}
              className={`rounded-full px-5 py-2 text-sm font-medium transition
                ${
                  genre === item
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

          {anime.map((item: any) => (

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

        {/* PAGINATION */}
        <div className="mt-16 flex items-center justify-center gap-4">

          {page > 1 && (

            <Link
              href={`/anime?page=${page - 1}&genre=${genre}&sort=${sort}`}
              className="rounded-full bg-secondary px-6 py-3 font-medium transition hover:bg-violet-500 hover:text-white"
            >

              Previous

            </Link>

          )}

          <div className="rounded-full bg-violet-500 px-6 py-3 font-bold text-white">

            {page}

          </div>

          <Link
            href={`/anime?page=${page + 1}&genre=${genre}&sort=${sort}`}
            className="rounded-full bg-secondary px-6 py-3 font-medium transition hover:bg-violet-500 hover:text-white"
          >

            Next

          </Link>

        </div>

      </section>

    </main>

  );
}