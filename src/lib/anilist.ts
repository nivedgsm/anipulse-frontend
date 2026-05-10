import { ANILIST_API } from "./constants";

async function anilistFetch(
  query: string,
  variables?: Record<string, any>
) {

  try {

    const response = await fetch(
      ANILIST_API,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
          Accept:
            "application/json",
        },

        next: {
          revalidate: 3600,
        },

        body: JSON.stringify({
          query,
          variables,
        }),
      }
    );

    if (!response.ok) {

      throw new Error(
        `AniList API Error: ${response.status}`
      );

    }

    const data =
      await response.json();

    return data;

  } catch (error) {

    console.error(
      "AniList Fetch Error:",
      error
    );

    return null;

  }

}

/* TRENDING ANIME */
export async function getTrendingAnime() {

  const query = `
    query {

      Page(
        page: 1
        perPage: 12
      ) {

        media(
          sort: TRENDING_DESC
          type: ANIME
        ) {

          id

          title {
            romaji
            english
          }

          bannerImage

          coverImage {
            large
          }

          episodes

          averageScore

          description(asHtml: false)

          genres

          season

          seasonYear

        }

      }

    }
  `;

  const data =
    await anilistFetch(query);

  return (
    data?.data?.Page?.media ||
    []
  );

}

/* UPCOMING ANIME */
export async function getUpcomingAnime() {

  const query = `
    query {

      Page(
        page: 1
        perPage: 8
      ) {

        media(
          sort: POPULARITY_DESC
          type: ANIME
          status: NOT_YET_RELEASED
        ) {

          id

          title {
            romaji
            english
          }

          coverImage {
            large
          }

          bannerImage

          episodes

          nextAiringEpisode {
            airingAt
            episode
          }

          season

          seasonYear

        }

      }

    }
  `;

  const data =
    await anilistFetch(query);

  return (
    data?.data?.Page?.media ||
    []
  );

}

/* SINGLE ANIME */
export async function getAnimeById(
  id: string
) {

  const query = `
    query ($id: Int) {

      Media(
        id: $id
        type: ANIME
      ) {

        id

        title {
          romaji
          english
          native
        }

        description(asHtml: false)

        bannerImage

        coverImage {
          extraLarge
          large
        }

        averageScore

        episodes

        duration

        status

        genres

        season

        seasonYear

        trailer {
          id
          site
          thumbnail
        }

        studios {

          nodes {

            name

          }

        }

        rankings {

          rank

          type

          context

        }

        recommendations(
          sort: RATING_DESC
        ) {

          nodes {

            mediaRecommendation {

              id

              title {
                romaji
                english
              }

              coverImage {
                large
              }

              bannerImage

              averageScore

              genres

            }

          }

        }

      }

    }
  `;

  const data =
    await anilistFetch(
      query,
      {
        id: Number(id),
      }
    );

  return (
    data?.data?.Media ||
    null
  );

}

/* SEARCH */
export async function searchAnime(
  search: string
) {

  const query = `
    query ($search: String) {

      Page(
        page: 1
        perPage: 8
      ) {

        media(
          search: $search
          type: ANIME
          sort: POPULARITY_DESC
        ) {

          id

          title {
            romaji
            english
          }

          coverImage {
            large
          }

          averageScore

          genres

        }

      }

    }
  `;

  const data =
    await anilistFetch(
      query,
      {
        search,
      }
    );

  return (
    data?.data?.Page?.media ||
    []
  );

}

/* BROWSE */
export async function getBrowseAnime({
  page = 1,
  genre = "",
  sort = "TRENDING_DESC",
}: {
  page?: number;
  genre?: string;
  sort?: string;
}) {

  const query = `
    query (
      $page: Int,
      $genre: String,
      $sort: [MediaSort]
    ) {

      Page(
        page: $page,
        perPage: 20
      ) {

        media(
          type: ANIME
          genre: $genre
          sort: $sort
        ) {

          id

          title {
            romaji
            english
          }

          genres

          averageScore

          coverImage {
            large
          }

        }

      }

    }
  `;

  const data =
    await anilistFetch(
      query,
      {
        page,
        genre:
          genre || undefined,
        sort,
      }
    );

  return (
    data?.data?.Page?.media ||
    []
  );

}

/* SEASONAL */
export async function getSeasonalAnime({
  season,
  year,
}: {
  season: string;
  year: number;
}) {

  const query = `
    query (
      $season: MediaSeason,
      $seasonYear: Int
    ) {

      Page(
        page: 1,
        perPage: 24
      ) {

        media(
          type: ANIME
          season: $season
          seasonYear: $seasonYear
          sort: POPULARITY_DESC
        ) {

          id

          title {
            romaji
            english
          }

          coverImage {
            large
          }

          bannerImage

          averageScore

          genres

          episodes

          status

        }

      }

    }
  `;

  const data =
    await anilistFetch(
      query,
      {
        season,
        seasonYear: year,
      }
    );

  return (
    data?.data?.Page?.media ||
    []
  );

}

/* REVIEW ANIME */
export async function fetchReviewAnime() {

  const query = `
    query {

      Page(
        page: 1,
        perPage: 12
      ) {

        media(
          sort: TRENDING_DESC
          type: ANIME
          isAdult: false
        ) {

          id

          title {
            romaji
            english
          }

          description(asHtml: false)

          averageScore

          episodes

          status

          bannerImage

          coverImage {
            extraLarge
            large
            medium
          }

        }

      }

    }
  `;

  const data =
    await anilistFetch(query);

  return (
    data?.data?.Page?.media ||
    []
  );

}