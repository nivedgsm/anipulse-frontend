import Image from "next/image";
import Link from "next/link";

import {
  formatNewsDate,
  getLatestAnimeNews,
  type NewsArticle,
} from "@/lib/news";

export const revalidate = 1800;

export const metadata = {
  title: "Anime News | Anivoid",
  description:
    "Read the latest anime, manga, gaming, movie, and industry news updates from Anivoid.",
};

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group overflow-hidden rounded-3xl border border-blue-500/15 bg-[#05030a]/70 shadow-[0_24px_80px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/10"
    >
      <div className="relative h-[260px] overflow-hidden bg-muted">
        <Image
          src={article.image}
          alt={article.title || "Anime news image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full border border-blue-400/30 bg-black/65 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-100 backdrop-blur">
          {article.category}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-blue-100/55">
          <span>{formatNewsDate(article.pubDate)}</span>
          <span className="h-1 w-1 rounded-full bg-blue-300/50" />
          <span>{article.readingTime}</span>
        </div>

        <h3 className="line-clamp-3 text-2xl font-black leading-tight tracking-tight text-white transition group-hover:text-blue-300">
          {article.title}
        </h3>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-blue-100/60">
          {article.excerpt || article.content}
        </p>

        <div className="mt-6 inline-flex items-center text-sm font-bold text-blue-400">
          Read story
          <span className="ml-2 transition group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}

export default async function NewsPage() {
  const news = await getLatestAnimeNews();

  const featured = news[0];
  const secondaryFeatured = news.slice(1, 3);
  const latest = news.slice(3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-blue-500/15 bg-[#000105]/70">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-20 h-[320px] w-[320px] rounded-full bg-blue-500/15 blur-[100px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(79,125,254,0.16),transparent_34rem)]" />

        <div className="relative mx-auto w-full max-w-[1500px] px-6 py-12 md:px-10 md:py-16">
          <div className="mb-10 max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-blue-300">
              Anime News
            </div>

            <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">
              Latest Updates
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100/65 md:text-lg">
              Fresh anime, manga, games, movies, and industry stories updated
              from the latest news feed.
            </p>
          </div>

          {featured ? (
            <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
              <Link
                href={`/news/${featured.slug}`}
                className="group relative block min-h-[520px] overflow-hidden rounded-[32px] border border-blue-500/15 bg-[#05030a]/70 shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
              >
                <Image
                  src={featured.image}
                  alt={featured.title || "Featured anime news"}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 65vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-600 px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow-[0_0_30px_rgba(79,125,254,0.35)]">
                      Featured Story
                    </span>

                    <span className="rounded-full border border-blue-400/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
                      {featured.category}
                    </span>
                  </div>

                  <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
                    {featured.title}
                  </h2>

                  <p className="mt-5 line-clamp-2 max-w-3xl text-base leading-7 text-white/75 md:text-lg">
                    {featured.excerpt || featured.content}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-white/70">
                    <span>{formatNewsDate(featured.pubDate)}</span>
                    <span className="h-1 w-1 rounded-full bg-blue-300/70" />
                    <span>{featured.readingTime}</span>
                    <span className="h-1 w-1 rounded-full bg-blue-300/70" />
                    <span>{featured.source}</span>
                  </div>
                </div>
              </Link>

              <div className="grid gap-6">
                {secondaryFeatured.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/news/${article.slug}`}
                    className="group relative min-h-[247px] overflow-hidden rounded-[28px] border border-blue-500/15 bg-[#05030a]/70 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
                  >
                    <Image
                      src={article.image}
                      alt={article.title || "Anime news"}
                      fill
                      sizes="(max-width: 1280px) 100vw, 35vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="mb-3 inline-flex rounded-full border border-blue-400/25 bg-black/55 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-100 backdrop-blur">
                        {article.category}
                      </div>

                      <h3 className="line-clamp-3 text-2xl font-black leading-tight text-white transition group-hover:text-blue-300">
                        {article.title}
                      </h3>

                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-white/60">
                        {formatNewsDate(article.pubDate)} ·{" "}
                        {article.readingTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-blue-500/15 bg-[#05030a]/70 p-10 text-center">
              <h2 className="text-2xl font-black text-white">No news found</h2>
              <p className="mt-3 text-blue-100/60">
                The news feed is currently unavailable. Please try again later.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-6 py-12 md:px-10 md:py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-400">
              All Stories
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">
              Latest News
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-blue-100/60">
            Browse the newest updates pulled from the latest anime news feed.
          </p>
        </div>

        {latest.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {latest.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-blue-500/15 bg-[#05030a]/70 p-10 text-center">
            <h3 className="text-xl font-black text-white">
              No additional stories yet
            </h3>
            <p className="mt-3 text-blue-100/60">
              More stories will appear here once the feed updates.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}