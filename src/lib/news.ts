import Parser from "rss-parser";
import * as cheerio from "cheerio";

const parser = new Parser();

/* CREATE SLUG */
function createSlug(
  title: string
) {

  return title
    .toLowerCase()
    .replace(
      /[^a-z0-9\s-]/g,
      ""
    )
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

}

/* EXTRACT ARTICLE DATA */
async function extractArticleData(
  url: string
) {

  try {

    if (!url) {

      return {
        image:
          "/placeholder-news.jpg",
        description: "",
      };

    }

    const response =
      await fetch(url, {
        next: {
          revalidate: 1800,
        },
      });

    if (!response.ok) {

      throw new Error(
        `Failed to fetch article: ${response.status}`
      );

    }

    const html =
      await response.text();

    const $ =
      cheerio.load(html);

    const image =
      $('meta[property="og:image"]').attr(
        "content"
      ) ||
      "/placeholder-news.jpg";

    const description =
      $('meta[property="og:description"]').attr(
        "content"
      ) || "";

    return {
      image,
      description,
    };

  } catch (error) {

    console.error(
      "extractArticleData error:",
      error
    );

    return {
      image:
        "/placeholder-news.jpg",
      description: "",
    };

  }

}

/* GET LATEST NEWS */
export async function getLatestAnimeNews() {

  try {

    const feed =
      await parser.parseURL(
        "https://www.animenewsnetwork.com/all/rss.xml"
      );

    const articles =
      feed.items.slice(0, 20);

    /* ONLY ENRICH TOP ARTICLES */
    const enrichedArticles =
      await Promise.all(

        articles
          .slice(0, 6)
          .map(async (item) => {

            try {

              const articleData =
                await extractArticleData(
                  item.link || ""
                );

              return {

                id: createSlug(
                  item.title ||
                    "news"
                ),

                slug:
                  createSlug(
                    item.title ||
                      "news"
                  ),

                title:
                  item.title ||
                  "Untitled News",

                originalLink:
                  item.link || "#",

                pubDate:
                  item.pubDate ||
                  new Date().toISOString(),

                content:
                  articleData.description ||
                  item.contentSnippet ||
                  "No content available.",

                image:
                  articleData.image,

              };

            } catch (error) {

              console.error(
                "Article enrichment failed:",
                error
              );

              return {

                id: createSlug(
                  item.title ||
                    "news"
                ),

                slug:
                  createSlug(
                    item.title ||
                      "news"
                  ),

                title:
                  item.title ||
                  "Untitled News",

                originalLink:
                  item.link || "#",

                pubDate:
                  item.pubDate ||
                  new Date().toISOString(),

                content:
                  item.contentSnippet ||
                  "No content available.",

                image:
                  "/placeholder-news.jpg",

              };

            }

          })

      );

    /* REMAINING ARTICLES */
    const remainingArticles =
      articles
        .slice(6)
        .map((item) => ({

          id: createSlug(
            item.title ||
              "news"
          ),

          slug: createSlug(
            item.title ||
              "news"
          ),

          title:
            item.title ||
            "Untitled News",

          originalLink:
            item.link || "#",

          pubDate:
            item.pubDate ||
            new Date().toISOString(),

          content:
            item.contentSnippet ||
            "No content available.",

          image:
            "/placeholder-news.jpg",

        }));

    return [
      ...enrichedArticles,
      ...remainingArticles,
    ];

  } catch (error) {

    console.error(
      "getLatestAnimeNews error:",
      error
    );

    return [];

  }

}