import Link from "next/link";
import Image from "next/image";

import { fetchTrendingAnime } from "@/lib/api";

export default async function TrendingPage() {

  const animeList =
    await fetchTrendingAnime();

  return (

    <main className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <section className="border-b border-border">

        <div className="container mx-auto px-4 py-16">

          <p className="text-sm font-medium uppercase tracking-widest text-violet-500">

            Trending Now

          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">

            Most Popular Anime

          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">

            Discover the hottest anime currently dominating
            the community, rankings, and fan discussions.

          </p>

        </div>

      </section>

      {/* GRID */}
      <section className="container mx-auto px-4 py-14">

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {animeList?.slice(0, 24).map(
            (anime: any) => {

              const imageUrl =
                anime.coverImage
                  ?.extraLarge ||
                anime.coverImage
                  ?.large ||
                anime.bannerImage ||
                "/placeholder-anime.jpg";

              return (

                <Link
                  key={anime.id}
                  href={`/anime/${anime.id}`}
                  className="group"
                >

                  <div className="overflow-hidden rounded-3xl border border-border bg-card transition hover:border-violet-500">

                    {/* IMAGE */}
                    <div className="relative aspect-[3/4] overflow-hidden">

                      <Image
                        src={imageUrl}
                        alt={
                          anime.title
                            ?.english ||
                          anime.title
                            ?.romaji ||
                          "Anime Cover"
                        }
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                    </div>

                    {/* CONTENT */}
                    <div className="p-5">

                      <div className="mb-3 flex items-center justify-between">

                        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-500">

                          Trending

                        </span>

                        <span className="text-sm text-muted-foreground">

                          ⭐{" "}
                          {anime.averageScore ||
                            "N/A"}

                        </span>

                      </div>

                      <h2 className="line-clamp-2 text-lg font-bold leading-snug transition group-hover:text-violet-500">

                        {anime.title?.english ||
                          anime.title?.romaji}

                      </h2>

                      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">

                        <span>

                          {anime.episodes ||
                            "?"} Episodes

                        </span>

                        <span>

                          {anime.status}

                        </span>

                      </div>

                    </div>

                  </div>

                </Link>

              );

            }
          )}

        </div>

      </section>

    </main>

  );

}