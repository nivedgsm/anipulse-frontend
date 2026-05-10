import Link from "next/link";

import Image from "next/image";

import {
  getLatestAnimeNews,
} from "@/lib/news";

export default async function NewsPage() {

  const news =
    await getLatestAnimeNews();

  const featured =
    news[0];

  const latest =
    news.slice(1);

  return (

    <main className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <section className="container mx-auto px-4 py-12">

        <div className="mb-12">

          <p className="text-sm font-medium uppercase tracking-wider text-violet-500">

            Anime News

          </p>

          <h1 className="mt-2 text-5xl font-black tracking-tight">

            Latest Updates

          </h1>

        </div>

        {/* FEATURED */}
        {featured && (

          <Link
            href={`/news/${featured.slug}`}
            className="group relative mb-16 block overflow-hidden rounded-[32px]"
          >

            <div className="relative h-[600px]">

              <Image
                src={featured.image}
                alt={featured.title || "Anime News"}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            </div>

            <div className="absolute bottom-0 p-10">

              <div className="mb-4 inline-flex rounded-full bg-violet-500 px-4 py-2 text-sm font-medium text-white">

                Featured Story

              </div>

              <h2 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">

                {featured.title}

              </h2>

            </div>

          </Link>

        )}

        {/* NEWS GRID */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {latest.map((article: any) => (

            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:border-violet-500/50"
            >

              {/* IMAGE */}
              <div className="relative h-[260px] overflow-hidden">

                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

              {/* CONTENT */}
              <div className="p-6">

                <p className="mb-3 text-sm text-violet-500">

                  {new Date(
                    article.pubDate
                  ).toLocaleDateString()}

                </p>

                <h3 className="line-clamp-3 text-2xl font-black leading-tight">

                  {article.title}

                </h3>

                <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">

                  {article.content}

                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>

    </main>

  );
}