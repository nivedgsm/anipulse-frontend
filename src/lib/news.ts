import Parser from "rss-parser";
import * as cheerio from "cheerio";

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  originalLink: string;
  pubDate: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  source: string;
  readingTime: string;
};

type RssItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
  isoDate?: string;
};

const parser = new Parser();

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1600&auto=format&fit=crop";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}

function cleanText(value?: string) {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function getCategoryFromTitle(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (
    normalizedTitle.includes("manga") ||
    normalizedTitle.includes("comic")
  ) {
    return "Manga";
  }

  if (
    normalizedTitle.includes("game") ||
    normalizedTitle.includes("switch") ||
    normalizedTitle.includes("playstation") ||
    normalizedTitle.includes("xbox") ||
    normalizedTitle.includes("steam")
  ) {
    return "Games";
  }

  if (
    normalizedTitle.includes("movie") ||
    normalizedTitle.includes("film") ||
    normalizedTitle.includes("theater")
  ) {
    return "Movies";
  }

  if (
    normalizedTitle.includes("music") ||
    normalizedTitle.includes("song") ||
    normalizedTitle.includes("opening") ||
    normalizedTitle.includes("ending")
  ) {
    return "Music";
  }

  if (
    normalizedTitle.includes("industry") ||
    normalizedTitle.includes("studio") ||
    normalizedTitle.includes("staff") ||
    normalizedTitle.includes("director") ||
    normalizedTitle.includes("producer")
  ) {
    return "Industry";
  }

  return "Anime";
}

function getReadingTime(text: string) {
  const words = cleanText(text).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));

  return `${minutes} min read`;
}

function normalizeDate(date?: string) {
  if (!date) return new Date().toISOString();

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return new Date().toISOString();
  }

  return parsedDate.toISOString();
}

async function extractArticleData(url: string) {
  try {
    if (!url) {
      return {
        image: "",
        description: "",
      };
    }

    const response = await fetch(url, {
      next: {
        revalidate: 60 * 30,
      },
    });

    if (!response.ok) {
      return {
        image: "",
        description: "",
      };
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const image =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      "";

    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      "";

    return {
      image,
      description: cleanText(description),
    };
  } catch (error) {
    return {
      image: "",
      description: "",
    };
  }
}

function normalizeNewsItem(
  item: RssItem,
  articleData: {
    image: string;
    description: string;
  }
): NewsArticle {
  const title = cleanText(item.title || "Untitled Anime News");
  const slug = createSlug(title || "anime-news");
  const originalLink = item.link || "";
  const rawContent =
    articleData.description ||
    item.contentSnippet ||
    item.content ||
    "Read the full story from the original source.";

  const content = cleanText(rawContent);
  const excerpt =
    content.length > 180 ? `${content.slice(0, 180).trim()}...` : content;

  return {
    id: slug,
    slug,
    title,
    originalLink,
    pubDate: normalizeDate(item.pubDate || item.isoDate),
    content,
    excerpt,
    image: articleData.image || FALLBACK_IMAGE,
    category: getCategoryFromTitle(title),
    author: "Anime News Network",
    source: "Anime News Network",
    readingTime: getReadingTime(content),
  };
}

export async function getLatestAnimeNews(): Promise<NewsArticle[]> {
  try {
    const feed = await parser.parseURL(
      "https://www.animenewsnetwork.com/all/rss.xml"
    );

    const news = await Promise.all(
      feed.items.slice(0, 24).map(async (item) => {
        const articleData = await extractArticleData(item.link || "");

        return normalizeNewsItem(item as RssItem, articleData);
      })
    );

    return news;
  } catch (error) {
    return [];
  }
}

export async function getNewsBySlug(
  slug: string
): Promise<NewsArticle | null> {
  const news = await getLatestAnimeNews();

  return news.find((article) => article.slug === slug) || null;
}

export async function getRelatedNews(
  currentSlug: string,
  category?: string,
  limit = 3
): Promise<NewsArticle[]> {
  const news = await getLatestAnimeNews();

  const relatedByCategory = news.filter(
    (article) =>
      article.slug !== currentSlug &&
      (!category || article.category === category)
  );

  if (relatedByCategory.length >= limit) {
    return relatedByCategory.slice(0, limit);
  }

  const fallbackNews = news.filter(
    (article) =>
      article.slug !== currentSlug &&
      !relatedByCategory.some((related) => related.slug === article.slug)
  );

  return [...relatedByCategory, ...fallbackNews].slice(0, limit);
}

export function formatNewsDate(date: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  } catch (error) {
    return "Recently";
  }
}

export function formatNewsDateTime(date: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  } catch (error) {
    return "Recently";
  }
}