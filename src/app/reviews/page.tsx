import Image from "next/image";
import Link from "next/link";

import { fetchReviewAnime } from "@/lib/anilist";

export default async function ReviewsPage() {

  const animeList =
    await fetchReviewAnime();

  const reviews =
    animeList?.slice(0, 6) || [];

  return (

    <main className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <section className="border-b border-border">

        <div className="container mx-auto px-4 py-16">

          <p className="text-sm font-medium uppercase tracking-widest text-violet-500">

            Editorial Reviews

          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">

            Anime Reviews

          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">

            Deep dives, ratings, and editorial opinions
            on the latest anime series and movies.

          </p>

        </div>

      </section>

      {/* REVIEWS */}
      <section className="container mx-auto px-4 py-14">

        <div className="space-y-10">

          {reviews.map((anime: any) => {

            const imageUrl =
              anime.coverImage
                ?.extraLarge ||
              anime.coverImage
                ?.large ||
              anime.bannerImage ||
              "/placeholder-anime.jpg";

            return (

              <article
                key={anime.id}
                className="group overflow-hidden rounded-[32px] border border-border bg-card transition hover:border-violet-500"
              >

                <div className="grid gap-8 md:grid-cols-[320px_1fr]">

                  {/* IMAGE */}
                  <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">

                    <Image
                      src={imageUrl}
                      alt={
                        anime.title?.english ||
                        anime.title?.romaji ||
                        "Anime"
                      }
                      fill
                      priority
                      sizes="
                        (max-width: 768px) 100vw,
                        320px
                      "
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col justify-center p-8">

                    <div className="mb-4 flex items-center gap-4">

                      <span className="rounded-full bg-violet-500 px-4 py-1 text-sm font-semibold text-white">

                        {anime.averageScore || "N/A"}/10

                      </span>

                      <span className="text-sm uppercase tracking-widest text-muted-foreground">

                        Featured Review

                      </span>

                    </div>

                    <h2 className="text-3xl font-black tracking-tight transition group-hover:text-violet-500">

                      {anime.title?.english ||
                        anime.title?.romaji}

                    </h2>

                    <div className="mt-5 text-lg leading-8 text-muted-foreground">

                      {anime.description
                        ?.replace(/<[^>]*>/g, "")
                        ?.slice(0, 260) ||
                        "No description available."}

                      ...

                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">

                      <span>

                        {anime.episodes ||
                          "?"} Episodes

                      </span>

                      <span>

                        {anime.status}

                      </span>

                    </div>

                    <div className="mt-8">

                      <Link
                        href={`/anime/${anime.id}`}
                        className="inline-flex rounded-full bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
                      >

                        Read Review

                      </Link>

                    </div>

                  </div>

                </div>

              </article>

            );

          })}

        </div>

      </section>

    </main>

  );

}