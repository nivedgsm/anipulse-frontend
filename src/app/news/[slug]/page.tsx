import Image from "next/image";
import Link from "next/link";

import { getLatestAnimeNews } from "@/lib/news";

interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsPage({
  params,
}: NewsPageProps) {

  const { slug } = await params;

  const news =
    await getLatestAnimeNews();

  const article = news.find(
    (item) => item.slug === slug
  );

  if (!article) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">

        <h1 className="text-4xl font-black">
          Article Not Found
        </h1>

      </main>
    );

  }

  /* SAFE TITLE */
  const articleTitle =
    article.title ||
    "Anime News";

  /* SAFE CONTENT */
  const articleContent =
  article.content ||
  "No article content available.";

  /* KEYWORD */
  const keyword =
    articleTitle
      .split(" ")[0]
      ?.toLowerCase() || "";

  /* RELATED NEWS */
  const relatedNews = news
    .filter(
      (item) =>
        item.slug !== slug &&
        item.title
          ?.toLowerCase()
          ?.includes(keyword)
    )
    .slice(0, 4);

  return (

    <main className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <section className="relative h-[600px] overflow-hidden">

        <Image
          src={
            article.image ||
            "https://placehold.co/1600x900/png"
          }
          alt={articleTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* CONTENT */}
        <div className="absolute inset-0 flex items-end">

          <div className="container mx-auto px-4 pb-20">

            {/* CATEGORY */}
            <div className="mb-6">

              <span className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-white">

                Anime News

              </span>

            </div>

            {/* TITLE */}
            <h1 className="max-w-5xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">

              {articleTitle}

            </h1>

            {/* META */}
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-zinc-300">

              <span>

                {new Date(
                  article.pubDate ||
                  Date.now()
                ).toLocaleDateString()}

              </span>

              <span>
                •
              </span>

              <span>
                AniPulse Editorial
              </span>

              <span>
                •
              </span>

              <span>
                4 min read
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="container mx-auto grid gap-14 px-4 py-16 lg:grid-cols-[minmax(0,1fr)_340px]">

        {/* ARTICLE */}
        <article className="min-w-0">

          <div className="mx-auto max-w-4xl">

            {/* ARTICLE BODY */}
            <div className="prose prose-xl max-w-none dark:prose-invert prose-p:leading-10 prose-p:text-muted-foreground prose-headings:text-foreground">

              <p className="text-2xl font-medium leading-10 text-foreground">

                {articleContent}

              </p>

              {/* EXPANDED CONTENT */}
              <p>

                Anime fans worldwide continue to follow this developing story closely as more details emerge from official announcements and industry insiders.

              </p>

              <p>

                The anime industry has seen significant growth in global popularity over the past few years, with streaming platforms and international licensing contributing heavily to its expansion.

              </p>

              <p>

                More updates regarding this story are expected soon, including potential trailers, promotional visuals, and staff or cast announcements.

              </p>

              <p>

                Stay tuned to AniPulse for continued coverage of anime news, seasonal releases, and breaking announcements from across the industry.

              </p>

            </div>

            {/* SOURCE */}
            <div className="mt-16 border-t border-border pt-10">

              

            </div>

          </div>

        </article>

        {/* SIDEBAR */}
        <aside className="space-y-8">

          {/* RELATED NEWS */}
          <div className="rounded-3xl border border-border bg-card p-6">

            <h2 className="mb-6 text-2xl font-black">

              Related News

            </h2>

            <div className="space-y-6">

              {relatedNews.length > 0 ? (

                relatedNews.map(
                  (item) => (

                    <Link
                      key={item.slug}
                      href={`/news/${item.slug}`}
                      className="group block"
                    >

                      <div className="flex gap-4">

                        {/* IMAGE */}
                        <div className="relative h-24 w-32 overflow-hidden rounded-2xl">

                          <Image
                            src={
                              item.image ||
                              "https://placehold.co/400x300/png"
                            }
                            alt={
                              item.title ||
                              "Related News"
                            }
                            fill
                            sizes="128px"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />

                        </div>

                        {/* CONTENT */}
                        <div className="flex-1">

                          <h3 className="line-clamp-2 font-bold transition group-hover:text-violet-500">

                            {item.title}

                          </h3>

                          <p className="mt-2 text-sm text-muted-foreground">

                            {new Date(
                              item.pubDate ||
                              Date.now()
                            ).toLocaleDateString()}

                          </p>

                        </div>

                      </div>

                    </Link>

                  )
                )

              ) : (

                <p className="text-muted-foreground">

                  No related news found.

                </p>

              )}

            </div>

          </div>

          {/* TRENDING */}
          <div className="rounded-3xl border border-border bg-card p-6">

            <h2 className="mb-5 text-2xl font-black">

              Trending Topic

            </h2>

            <p className="leading-8 text-muted-foreground">

              Stay updated with the latest anime announcements,
              trailers, manga adaptations, and seasonal releases
              happening across the anime industry.

            </p>

          </div>

        </aside>

      </section>

    </main>

  );

}