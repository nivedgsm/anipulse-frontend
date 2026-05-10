const ANILIST_API =
  "https://graphql.anilist.co";

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

          description

          genres

          season

          seasonYear

        }

      }

    }
  `;

  const response = await fetch(
    ANILIST_API,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      next: {
        revalidate: 3600,
      },

      body: JSON.stringify({
        query,
      }),
    }
  );

  const data =
    await response.json();

  return data.data.Page.media;
}

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

  const response = await fetch(
    ANILIST_API,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      next: {
        revalidate: 3600,
      },

      body: JSON.stringify({
        query,
      }),
    }
  );

  const data =
    await response.json();

  return data.data.Page.media;
}

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

        description

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

  const response = await fetch(
    ANILIST_API,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      next: {
        revalidate: 3600,
      },

      body: JSON.stringify({
        query,

        variables: {
          id: Number(id),
        },
      }),
    }
  );

  const data =
    await response.json();

  return data.data.Media;
}
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

  const response = await fetch(
    ANILIST_API,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        query,

        variables: {
          search,
        },
      }),

      next: {
        revalidate: 60,
      },
    }
  );

  const data =
    await response.json();

  return data.data.Page.media;
}
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

  const response = await fetch(
    ANILIST_API,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      next: {
        revalidate: 3600,
      },

      body: JSON.stringify({
        query,

        variables: {
          page,
          genre:
            genre || undefined,
          sort,
        },
      }),
    }
  );

  const data =
    await response.json();

  return data.data.Page.media;
}

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

  const response = await fetch(
    ANILIST_API,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      next: {
        revalidate: 3600,
      },

      body: JSON.stringify({
        query,

        variables: {
          season,
          seasonYear: year,
        },
      }),
    }
  );

  const data =
    await response.json();

  return data.data.Page.media;
}

export async function fetchReviewAnime() {

  const query = `
    query {

      Page(page: 1, perPage: 12) {

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

  try {

    const response = await fetch(
      "https://graphql.anilist.co",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
          Accept:
            "application/json",
        },

        body: JSON.stringify({
          query,
        }),

        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {

      throw new Error(
        "Failed to fetch review anime"
      );

    }

    const json =
      await response.json();

    return (
      json?.data?.Page?.media ||
      []
    );

  } catch (error) {

    console.error(
      "fetchReviewAnime error:",
      error
    );

    return [];

  }

}