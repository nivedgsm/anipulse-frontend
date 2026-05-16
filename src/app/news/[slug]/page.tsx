import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  formatNewsDate,
  formatNewsDateTime,
  getLatestAnimeNews,
  getNewsBySlug,
  getRelatedNews,
  type NewsArticle,
} from "@/lib/news";

interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

type ShareLink = {
  label: string;
  href: string;
};

export const revalidate = 1800;

const SITE_NAME = "Anivoid";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anivoid.com";

export async function generateStaticParams() {
  const news = await getLatestAnimeNews();

  return news.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    return {
      title: `Article Not Found | ${SITE_NAME}`,
      description: "The requested anime news article could not be found.",
    };
  }

  const description =
    article.excerpt ||
    article.content ||
    "Read the latest anime news update on Anivoid.";

  return {
    title: `${article.title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: `/news/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description,
      url: `/news/${article.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: article.pubDate,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [article.image],
    },
  };
}

function getShareLinks(title: string, url: string): ShareLink[] {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];
}

function ShareButtons({ links }: { links: ShareLink[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/5 px-4 text-xs font-black uppercase tracking-[0.16em] text-blue-200 transition hover:border-blue-400/60 hover:bg-blue-500/15 hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function RelatedArticleCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group grid grid-cols-[112px_1fr] gap-4 rounded-2xl border border-transparent p-2 transition hover:border-blue-500/20 hover:bg-blue-500/10"
    >
      <div className="relative h-24 overflow-hidden rounded-xl bg-muted">
        <Image
          src={article.image}
          alt={article.title || "Related anime news"}
          fill
          sizes="112px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-400">
          {article.category}
        </p>

        <h3 className="mt-1.5 line-clamp-2 text-base font-black leading-snug text-white transition group-hover:text-blue-300">
          {article.title}
        </h3>

        <p className="mt-1.5 text-xs font-medium text-muted-foreground">
          {formatNewsDate(article.pubDate)}
        </p>
      </div>
    </Link>
  );
}

function SidebarCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[28px] border border-blue-500/15 bg-[#05030a]/75 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function getArticleTags(article: NewsArticle) {
  const titleWords = (article.title || "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(" ")
    .map((word) => word.trim())
    .filter((word) => word.length > 3)
    .slice(0, 4);

  return Array.from(
    new Set([article.category, "Anime News", ...titleWords])
  ).slice(0, 6);
}

function buildArticleSections(article: NewsArticle) {
  const title = article.title || "Anime News";
  const category = article.category || "Anime";
  const mainContent =
    article.content ||
    article.excerpt ||
    "A new update has surfaced in the anime world, drawing attention from fans and industry watchers.";

  const lowerTitle = title.toLowerCase();
  const lowerCategory = category.toLowerCase();

  const isManga =
    lowerCategory.includes("manga") ||
    lowerTitle.includes("manga") ||
    lowerTitle.includes("comic") ||
    lowerTitle.includes("jump") ||
    lowerTitle.includes("shueisha");

  const isGame =
    lowerCategory.includes("game") ||
    ["game", "switch", "playstation", "xbox", "steam", "mobile"].some(
      (keyword) => lowerTitle.includes(keyword)
    );

  const isMovie =
    lowerCategory.includes("movie") ||
    ["movie", "film", "theater", "theatre", "screening"].some((keyword) =>
      lowerTitle.includes(keyword)
    );

  const isIndustry =
    lowerCategory.includes("industry") ||
    [
      "studio",
      "staff",
      "director",
      "producer",
      "production",
      "licens",
      "rights",
    ].some((keyword) => lowerTitle.includes(keyword));

  if (isManga) {
    return [
      {
        heading: "What happened",
        paragraphs: [
          mainContent,
          "The update is notable because manga news often connects directly to magazine schedules, volume releases, licensing decisions, digital distribution, and the long-term visibility of a title.",
        ],
      },
      {
        heading: "Why it matters",
        paragraphs: [
          "For readers, even a short announcement can affect how they follow a series week to week. Hiatus updates, publisher notes, new chapters, award recognition, and adaptation movement can all shape fan discussion.",
          "International audiences are also watching these updates more closely than before, especially as manga titles gain faster global attention through digital platforms, social media, and anime adaptation speculation.",
        ],
      },
      {
        heading: "What to watch next",
        paragraphs: [
          "The next important details to watch will likely include official artwork, release timing, publisher comments, creator updates, and whether the announcement connects to a larger promotional push.",
        ],
      },
    ];
  }

  if (isGame) {
    return [
      {
        heading: "What happened",
        paragraphs: [
          mainContent,
          "The update matters for both anime and gaming fans because anime franchises are increasingly expanding through console titles, PC releases, mobile games, and multimedia collaborations.",
        ],
      },
      {
        heading: "Why it matters",
        paragraphs: [
          "Game-related announcements can extend a franchise beyond the main anime or manga, giving fans new ways to experience characters, story arcs, combat systems, and original scenarios.",
        ],
      },
      {
        heading: "What to watch next",
        paragraphs: [
          "The next wave of information may include gameplay previews, platform details, release windows, developer notes, pre-registration campaigns, or global launch plans.",
        ],
      },
    ];
  }

  if (isMovie) {
    return [
      {
        heading: "What happened",
        paragraphs: [
          mainContent,
          "The news arrives during a strong period for anime films, with theatrical releases becoming a major part of how franchises build global momentum.",
        ],
      },
      {
        heading: "Why it matters",
        paragraphs: [
          "Movie announcements often carry extra weight because they can bring higher production values, new story material, returning characters, or major arcs adapted with a larger cinematic scale.",
        ],
      },
      {
        heading: "What to watch next",
        paragraphs: [
          "Fans will likely be watching for a teaser trailer, key visual, release window, cast confirmation, staff list, theme song details, and international screening plans.",
        ],
      },
    ];
  }

  if (isIndustry) {
    return [
      {
        heading: "What happened",
        paragraphs: [
          mainContent,
          "This development matters because industry updates can influence production timelines, staffing decisions, studio planning, licensing strategy, and the future of upcoming anime projects.",
        ],
      },
      {
        heading: "Why it matters",
        paragraphs: [
          "Behind every anime announcement is a wider network of publishers, studios, production committees, distributors, streaming platforms, music labels, and creative staff.",
          "Fans are paying closer attention to these behind-the-scenes movements as anime demand grows globally and production schedules become more ambitious.",
        ],
      },
      {
        heading: "What to watch next",
        paragraphs: [
          "Further context may arrive through official statements, staff interviews, event panels, production updates, or future project announcements.",
        ],
      },
    ];
  }

  return [
    {
      heading: "What happened",
      paragraphs: [
        mainContent,
        "The update has become part of the wider anime conversation as fans continue tracking new announcements, seasonal releases, trailers, cast reveals, and production updates.",
      ],
    },
    {
      heading: "Why it matters",
      paragraphs: [
        "Stories like this often gain attention because they can signal what viewers should expect next from a franchise, studio, creator, or upcoming release.",
        "Anime news now spreads quickly through official websites, magazine previews, event panels, livestreams, and social platforms, making even small updates part of a larger fan discussion.",
      ],
    },
    {
      heading: "What to watch next",
      paragraphs: [
        "The wider impact will depend on what gets confirmed next, including release timing, staff information, cast updates, streaming availability, promotional visuals, and future project details.",
      ],
    },
  ];
}

function buildKeyFacts(article: NewsArticle) {
  return [
    {
      label: "Category",
      value: article.category || "Anime",
    },
    {
      label: "Published",
      value: formatNewsDate(article.pubDate),
    },
    {
      label: "Read time",
      value: article.readingTime,
    },
  ];
}

function JsonLd({ article }: { article: NewsArticle }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: [article.image],
    datePublished: article.pubDate,
    dateModified: article.pubDate,
    author: {
      "@type": "Organization",
      name: article.author || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    description: article.excerpt || article.content,
    mainEntityOfPage: `${SITE_URL}/news/${article.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default async function NewsArticlePage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedNews = await getRelatedNews(article.slug, article.category, 5);
  const articleUrl = `${SITE_URL}/news/${article.slug}`;
  const shareLinks = getShareLinks(article.title, articleUrl);
  const articleSections = buildArticleSections(article);
  const keyFacts = buildKeyFacts(article);
  const tags = getArticleTags(article);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd article={article} />

      <section className="relative overflow-hidden border-b border-blue-500/15 bg-[#000105]/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(79,125,254,0.18),transparent_32rem)]" />

        <div className="relative mx-auto w-full max-w-[1500px] px-6 py-8 md:px-10 md:py-10">
          <Link
            href="/news"
            className="inline-flex items-center text-sm font-black text-blue-200/80 transition hover:text-blue-300"
          >
            ← Back to News
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px]">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white shadow-[0_0_30px_rgba(79,125,254,0.35)]">
                  {article.category}
                </span>

                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-200/70">
                  {article.source}
                </span>
              </div>

              <h1 className="max-w-6xl text-4xl font-black leading-[1.04] tracking-tight text-white md:text-6xl lg:text-7xl">
                {article.title}
              </h1>

              <p className="mt-6 max-w-4xl text-lg leading-8 text-blue-100/70 md:text-xl md:leading-9">
                {article.excerpt || article.content}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-semibold text-blue-100/55">
                <span>{formatNewsDateTime(article.pubDate)}</span>
                <span className="h-1 w-1 rounded-full bg-blue-300/60" />
                <span>{article.author}</span>
                <span className="h-1 w-1 rounded-full bg-blue-300/60" />
                <span>{article.readingTime}</span>
              </div>
            </div>

            <div className="hidden lg:block">
              <SidebarCard>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-400">
                  Share
                </p>

                <div className="mt-5">
                  <ShareButtons links={shareLinks} />
                </div>
              </SidebarCard>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-blue-500/15 bg-[#05030a]/60">
        <div className="mx-auto w-full max-w-[1500px] px-6 py-6 md:px-10 md:py-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[32px] border border-blue-500/20 bg-muted shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
            <Image
              src={article.image}
              alt={article.title || "Anime news article image"}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1500px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <p className="max-w-3xl text-sm font-medium leading-6 text-white/75">
                Featured visual for this Anivoid news story.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] gap-10 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px]">
        <article className="min-w-0">
          <div className="mb-8 lg:hidden">
            <ShareButtons links={shareLinks} />
          </div>

          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {keyFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-blue-500/15 bg-[#05030a]/70 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-300/70">
                  {fact.label}
                </p>
                <p className="mt-2 text-sm font-black text-white">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-12">
            {articleSections.map((section, sectionIndex) => (
              <section
                key={`${article.slug}-${section.heading}`}
                className="border-b border-blue-500/15 pb-10 last:border-b-0 last:pb-0"
              >
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-blue-400">
                  0{sectionIndex + 1}
                </p>

                <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                  {section.heading}
                </h2>

                <div className="mt-6 space-y-6">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${article.slug}-${section.heading}-${paragraphIndex}`}
                      className={
                        sectionIndex === 0 && paragraphIndex === 0
                          ? "max-w-5xl text-xl font-semibold leading-9 text-white md:text-2xl md:leading-10"
                          : "max-w-5xl text-base leading-8 text-blue-100/68 md:text-[17px] md:leading-9"
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-[28px] border border-blue-500/15 bg-[#05030a]/70 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 text-[10px] font-black uppercase tracking-[0.22em] text-blue-300/70">
                Tags
              </span>

              {tags.map((tag) => (
                <span
                  key={`${article.slug}-${tag}`}
                  className="rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-xs font-black text-blue-100/75"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-blue-500/20 bg-blue-500/10 p-6 shadow-[0_18px_60px_rgba(47,67,206,0.12)] md:p-8">
            <h2 className="text-2xl font-black text-white">
              Share this story
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-blue-100/65">
              Send this update to other anime fans and keep the discussion
              going.
            </p>

            <div className="mt-6">
              <ShareButtons links={shareLinks} />
            </div>
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <SidebarCard>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-100/80">
                Related News
              </h2>

              <Link
                href="/news"
                className="text-xs font-black text-blue-400 transition hover:text-blue-300"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {relatedNews.length > 0 ? (
                relatedNews.map((item) => (
                  <RelatedArticleCard key={item.slug} article={item} />
                ))
              ) : (
                <p className="text-sm leading-7 text-blue-100/60">
                  No related news right now.
                </p>
              )}
            </div>
          </SidebarCard>

          <SidebarCard>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-400">
              Trending
            </p>

            <h2 className="mt-3 text-xl font-black leading-snug text-white">
              Anime Industry Updates
            </h2>

            <p className="mt-4 text-sm leading-7 text-blue-100/65">
              Stay updated with anime announcements, trailers, manga
              adaptations, movie reveals, seasonal releases, and major industry
              news.
            </p>

            <Link
              href="/news"
              className="mt-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2.5 text-sm font-black text-blue-100 transition hover:border-blue-400/60 hover:bg-blue-500/15 hover:text-white"
            >
              Browse all news →
            </Link>
          </SidebarCard>

          <SidebarCard className="relative overflow-hidden border-blue-500/20 bg-gradient-to-br from-blue-600/15 via-blue-600/5 to-blue-950/40">
            <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full border border-blue-400/20" />
            <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-blue-500/15 blur-2xl" />

            <p className="relative text-[10px] font-black uppercase tracking-[0.22em] text-blue-400">
              Anivoid
            </p>

            <h2 className="relative mt-3 text-xl font-black leading-snug text-white">
              Follow the void of anime news.
            </h2>

            <p className="relative mt-4 text-sm leading-7 text-blue-100/65">
              Fresh stories, updates, and anime culture coverage in one place.
            </p>
          </SidebarCard>
        </aside>
      </section>
    </main>
  );
}