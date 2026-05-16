import Link from "next/link";
import Image from "next/image";

interface LatestNewsSectionProps {
  news: any[];
}

function formatNewsDate(date?: string) {
  if (!date) {
    return "Latest";
  }

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getNewsImage(item: any) {
  return item?.image || "https://placehold.co/800x520/png";
}

function getNewsExcerpt(item: any) {
  return (
    item?.excerpt ||
    item?.content ||
    item?.description ||
    "Read the latest anime update, including new announcements, release details, cast news, trailers, and industry coverage."
  );
}

export function LatestNewsSection({ news }: LatestNewsSectionProps) {
  const validNews = news
    .filter((item) => item.slug && item.title)
    .slice(0, 10);

  if (validNews.length === 0) {
    return (
      <section>
        <div className="rounded-[28px] border border-blue-500/15 bg-[#05030a]/70 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <h3 className="text-xl font-black text-white">No news available</h3>

          <p className="mt-3 text-sm leading-6 text-blue-100/60">
            Latest anime coverage will appear here once the feed updates.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="grid gap-6">
        {validNews.map((item) => (
          <Link
            href={`/news/${item.slug}`}
            key={item.id || item.slug}
            className="group overflow-hidden rounded-[28px] border border-blue-500/15 bg-[#05030a]/70 shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/10"
          >
            <div className="grid md:grid-cols-[320px_1fr]">
              <div className="relative h-[240px] overflow-hidden bg-muted md:h-full md:min-h-[250px]">
                <Image
                  src={getNewsImage(item)}
                  alt={item.title || "Anime News"}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/10 md:to-black/40" />

                <div className="absolute left-4 top-4 rounded-full border border-blue-400/25 bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-blue-100 backdrop-blur">
                  {item.category || "Anime"}
                </div>
              </div>

              <div className="flex min-w-0 flex-col justify-center p-6 md:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-100/55">
                  <span>{formatNewsDate(item.pubDate)}</span>
                  <span className="h-1 w-1 rounded-full bg-blue-300/50" />
                  <span>{item.readingTime || "1 min read"}</span>
                </div>

                <h3 className="max-w-3xl text-2xl font-black leading-tight tracking-tight text-white transition group-hover:text-blue-300 md:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-5 line-clamp-3 max-w-3xl text-sm leading-7 text-blue-100/65 md:text-base">
                  {getNewsExcerpt(item)}
                </p>

                <div className="mt-7">
                  <span className="inline-flex items-center gap-2 text-sm font-black text-blue-400 transition group-hover:text-blue-300">
                    Read Article
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
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