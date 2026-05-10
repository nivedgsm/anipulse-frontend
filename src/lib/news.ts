import Parser from "rss-parser";
import * as cheerio from "cheerio";

const parser = new Parser();

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function extractArticleData(
  url: string
) {
  try {

    const response = await fetch(url);

    const html = await response.text();

    const $ = cheerio.load(html);

    const image =
      $('meta[property="og:image"]').attr(
        "content"
      ) || "";

    const description =
      $('meta[property="og:description"]').attr(
        "content"
      ) || "";

    return {
      image,
      description,
    };

  } catch (error) {

    return {
      image: "",
      description: "",
    };

  }
}

export async function getLatestAnimeNews() {

  const feed = await parser.parseURL(
    "https://www.animenewsnetwork.com/all/rss.xml"
  );

  const news = await Promise.all(

    feed.items
      .slice(0, 20)
      .map(async (item) => {

        const articleData =
          await extractArticleData(
            item.link || ""
          );

        return {

          id: createSlug(
            item.title || "news"
          ),

          slug: createSlug(
            item.title || "news"
          ),

          title: item.title,

          originalLink: item.link,

          pubDate: item.pubDate,

          content:
            articleData.description ||
            item.contentSnippet,

          image: articleData.image,

        };

      })

  );

  return news;
}