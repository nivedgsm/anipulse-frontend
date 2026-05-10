import { safeFetch } from "./fetcher";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:3000";

export async function fetchTrendingAnime() {

  const data =
    await safeFetch<any>(
      `${baseUrl}/api/anime/trending`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

  return data?.data || [];

}

export async function fetchLatestNews() {

  const data =
    await safeFetch<any>(
      `${baseUrl}/api/news/latest`,
      {
        next: {
          revalidate: 1800,
        },
      }
    );

  return data?.data || [];

}

export async function fetchUpcomingAnime() {

  const data =
    await safeFetch<any>(
      `${baseUrl}/api/anime/upcoming`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

  return data?.data || [];

}

export async function fetchAnimeById(
  id: string
) {

  const data =
    await safeFetch<any>(
      `${baseUrl}/api/anime/${id}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

  return data?.data || null;

}