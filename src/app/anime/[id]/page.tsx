import Image from "next/image";
import Link from "next/link";

import { fetchAnimeById } from "@/lib/api";

import { RecommendationCard } from "@/components/anime/recommendation-card";

interface AnimePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AnimePage({
  params,
}: AnimePageProps) {

  const { id } = await params;

  const anime =
    await fetchAnimeById(id);

  if (!anime) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">

        <h1 className="text-4xl font-black">
          Anime Not Found
        </h1>

      </main>
    );

  }

  return (

    <main className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <section className="relative overflow-hidden">

        {/* BACKGROUND */}
        <div
          className="h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              anime.bannerImage ||
              anime.coverImage?.extraLarge
            })`,
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

        {/* CONTENT */}
        <div className="container relative mx-auto flex flex-col gap-10 px-4 pb-16 lg:-mt-40 lg:flex-row">

          {/* POSTER */}
          <div className="relative h-[520px] w-[340px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">

            <Image
              src={
                anime.coverImage?.extraLarge ||
                anime.coverImage?.large ||
                "/placeholder-anime.jpg"
              }
              alt={
                anime.title?.english ||
                anime.title?.romaji ||
                "Anime"
              }
              fill
              sizes="
                (max-width: 768px) 100vw,
                340px
              "
              className="object-cover"
            />

          </div>

          {/* INFO */}
          <div className="flex-1 pt-10 lg:pt-52">

            {/* GENRES */}
            <div className="mb-5 flex flex-wrap gap-3">

              {anime.genres?.map(
                (
                  genre: string,
                  index: number
                ) => (

                  <span
                    key={`${genre}-${index}`}
                    className="rounded-full bg-violet-500/90 px-4 py-1 text-sm font-medium text-white"
                  >

                    {genre}

                  </span>

                )
              )}

            </div>

            {/* TITLE */}
            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">

              {anime.title?.english ||
                anime.title?.romaji}

            </h1>

            {/* META */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-muted-foreground">

              <div>
                ⭐ {anime.averageScore || "N/A"}
              </div>

              <div>
                {anime.episodes || "?"} Episodes
              </div>

              <div>
                {anime.duration || "?"} mins
              </div>

              <div>
                {anime.season} {anime.seasonYear}
              </div>

              <div>
                {anime.status}
              </div>

            </div>

            {/* SAFE DESCRIPTION */}
            <div className="prose mt-8 max-w-none dark:prose-invert prose-p:text-muted-foreground prose-headings:text-foreground">

              {anime.description
                ?.split("\n")
                .map(
                  (
                    paragraph: string,
                    index: number
                  ) => (

                    <p key={index}>

                      {paragraph}

                    </p>

                  )
                )}

            </div>

            {/* STUDIOS */}
            <div className="mt-10">

              <p className="mb-3 text-sm uppercase tracking-wider text-violet-500">

                Studios

              </p>

              <div className="flex flex-wrap gap-3">

                {anime.studios?.nodes?.map(
                  (
                    studio: {
                      name: string;
                    },
                    index: number
                  ) => (

                    <span
                      key={`${studio.name}-${index}`}
                      className="rounded-full border border-border bg-card px-4 py-2 text-sm"
                    >

                      {studio.name}

                    </span>

                  )
                )}

              </div>

            </div>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-4">

              {anime.trailer?.id && (

                <a
                  href="#trailer"
                  className="rounded-full bg-violet-600 px-7 py-3 font-semibold text-white transition hover:bg-violet-500"
                >

                  Watch Trailer

                </a>

              )}

              <Link
                href="/"
                className="rounded-full border border-border bg-card px-7 py-3 font-semibold transition hover:bg-accent"
              >

                Back Home

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* TRAILER */}
      {anime.trailer?.id && (

        <section
          id="trailer"
          className="container mx-auto px-4 py-20"
        >

          <div className="mb-8">

            <p className="text-sm font-medium uppercase tracking-wider text-violet-500">

              Official Trailer

            </p>

            <h2 className="mt-2 text-4xl font-black tracking-tight">

              Watch Trailer

            </h2>

          </div>

          <div className="overflow-hidden rounded-[32px] border border-border bg-card shadow-2xl">

            <div className="aspect-video">

              <iframe
                src={`https://www.youtube.com/embed/${anime.trailer.id}`}
                title="Anime Trailer"
                allowFullScreen
                className="h-full w-full"
              />

            </div>

          </div>

        </section>

      )}

      {/* RECOMMENDATIONS */}
      {anime.recommendations?.nodes?.length > 0 && (

        <section className="container mx-auto px-4 py-20">

          <div className="mb-8">

            <p className="text-sm font-medium uppercase tracking-wider text-violet-500">

              You May Also Like

            </p>

            <h2 className="mt-2 text-4xl font-black tracking-tight">

              Recommended Anime

            </h2>

          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

            {anime.recommendations.nodes
              .slice(0, 12)
              .map(
                (
                  recommendation: AnimeMedia,
                  index: number
                ) => {

                  const recommendedAnime =
                    recommendation.mediaRecommendation;

                  if (
                    !recommendedAnime
                  ) {
                    return null;
                  }

                  return (

                    <RecommendationCard
                      key={`${recommendedAnime.id}-${index}`}
                      anime={
                        recommendedAnime
                      }
                    />

                  );

                }
              )}

          </div>

        </section>

      )}

    </main>

  );

}