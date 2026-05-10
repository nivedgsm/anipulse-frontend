const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:3000";

export async function fetchTrendingAnime() {

  const response = await fetch(
    `${baseUrl}/api/anime/trending`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const data =
    await response.json();

  return data.data;

}

export async function fetchLatestNews() {

  const response = await fetch(
    `${baseUrl}/api/news/latest`,
    {
      next: {
        revalidate: 1800,
      },
    }
  );

  const data =
    await response.json();

  return data.data;

}

export async function fetchUpcomingAnime() {

  const response = await fetch(
    `${baseUrl}/api/anime/upcoming`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const data =
    await response.json();

  return data.data;

}

export async function fetchAnimeById(
  id: string
) {

  const response = await fetch(
    `${baseUrl}/api/anime/${id}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const data =
    await response.json();

  return data.data;

}