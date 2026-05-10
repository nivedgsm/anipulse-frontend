export async function safeFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T | null> {

  try {

    const response =
      await fetch(url, options);

    if (!response.ok) {

      console.error(
        `Fetch failed: ${response.status}`
      );

      return null;

    }

    return await response.json();

  } catch (error) {

    console.error(
      "safeFetch error:",
      error
    );

    return null;

  }

}