const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:3000";

async function fetchApiData<T>(
  url: string,
  revalidate: number
): Promise<T | null> {
  try {
    const response = await fetch(
      url,
      {
        next: {
          revalidate,
        },
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      if (
        response.status !== 404 &&
        response.status !== 400
      ) {
        console.warn(
          "API request failed:",
          {
            url,
            status: response.status,
            data,
          }
        );
      }

      return null;
    }

    return data?.data || null;
  } catch (error) {
    console.warn(
      "API request error:",
      {
        url,
        error,
      }
    );

    return null;
  }
}

export async function fetchTrendingAnime() {
  return fetchApiData(
    `${baseUrl}/api/anime/trending`,
    3600
  );
}

export async function fetchLatestNews() {
  return fetchApiData(
    `${baseUrl}/api/news/latest`,
    1800
  );
}

export async function fetchUpcomingAnime() {
  return fetchApiData(
    `${baseUrl}/api/anime/upcoming`,
    3600
  );
}

export async function fetchAnimeById(
  id: string
) {
  return fetchApiData(
    `${baseUrl}/api/anime/${id}`,
    3600
  );
}