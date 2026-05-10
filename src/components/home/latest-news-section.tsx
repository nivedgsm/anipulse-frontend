import Link from "next/link";

import Image from "next/image";

interface LatestNewsSectionProps {
  news: AnimeMedia[];
}

export function LatestNewsSection({
  news,
}: LatestNewsSectionProps) {

  return (

    <section>

      {/* NEWS GRID */}
      <div className="grid gap-6">

        {news
          .filter(
            (item) =>
              item.slug &&
              item.title
          )
          .slice(0, 10)
          .map((item) => (

            <Link
              href={`/news/${item.slug}`}
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:border-pink-500 hover:bg-accent"
            >

              <div className="grid md:grid-cols-[280px_1fr]">

                {/* IMAGE */}
                <div className="relative h-[220px] overflow-hidden">

                  <Image
                    src={
                      item.image ||
                      "https://placehold.co/600x400/png"
                    }
                    alt={
                      item.title ||
                      "Anime News"
                    }
                    fill
                    sizes="280px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                </div>

                {/* CONTENT */}
                <div className="flex flex-col justify-center p-6">

                  <p className="mb-3 text-sm text-muted-foreground">

                    {new Date(
                      item.pubDate ||
                      Date.now()
                    ).toLocaleDateString()}

                  </p>

                  <h3 className="text-2xl font-black leading-tight transition group-hover:text-pink-500">

                    {item.title}

                  </h3>

                  <p className="mt-4 line-clamp-4 text-muted-foreground">

                    {item.content}

                  </p>

                  <div className="mt-6">

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-pink-500">

                      Read Article →

                    </span>

                  </div>

                </div>

              </div>

            </Link>

          ))}

      </div>

    </section>

  );
}