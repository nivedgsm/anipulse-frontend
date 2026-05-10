export async function fetchTrendingAnime() {

  const response = await fetch(
    "http://localhost:3000/api/anime/trending",
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const data = await response.json();

  return data.data;
}

export async function fetchLatestNews() {

  const response = await fetch(
    "http://localhost:3000/api/news/latest",
    {
      next: {
        revalidate: 1800,
      },
    }
  );

  const data = await response.json();

  return data.data;
}

export async function fetchUpcomingAnime() {

  const response = await fetch(
    "http://localhost:3000/api/anime/upcoming",
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const data = await response.json();

  return data.data;
}

export async function fetchAnimeById(
  id: string
) {

  const response = await fetch(
    `http://localhost:3000/api/anime/${id}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const data = await response.json();

  return data.data;
}