"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Search,
  Star,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

export function SearchModal() {

  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    const fetchAnime =
      async () => {

        if (!query.trim()) {

          setResults([]);

          return;
        }

        try {

          setLoading(true);

          const response =
            await fetch(
              `/api/search?query=${query}`
            );

          const data =
            await response.json();

          setResults(
            data.data || []
          );

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }

      };

    const debounce =
      setTimeout(() => {

        fetchAnime();

      }, 400);

    return () =>
      clearTimeout(debounce);

  }, [query]);

  return (

    <div className="relative z-[999] hidden md:block">

      {/* SEARCH BOX */}
      <div className="flex h-11 items-center gap-3 rounded-full border border-border bg-white px-4 transition-all focus-within:border-violet-500 focus-within:shadow-lg focus-within:shadow-violet-500/20 dark:bg-zinc-900">

        <Search className="h-4 w-4 text-muted-foreground" />

        <input
          type="text"
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          placeholder="Search anime..."
          className="w-[260px] bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />

      </div>

      {/* RESULTS */}
      {query.length > 0 && (

        <div className="absolute right-0 top-14 z-[9999] max-h-[500px] w-[420px] overflow-y-auto rounded-3xl border border-border bg-white p-3 shadow-2xl dark:bg-zinc-950">

          {/* LOADING */}
          {loading && (

            <div className="flex items-center justify-center py-10">

              <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />

            </div>

          )}

          {/* NO RESULTS */}
          {!loading &&
            results.length === 0 && (

              <div className="py-10 text-center text-sm text-muted-foreground">

                No anime found

              </div>

            )}

          {/* RESULTS */}
          <div className="space-y-2">

            {results.map((anime) => (

              <Link
                key={anime.id}
                href={`/anime/${anime.id}`}
                onClick={() => {

                  setQuery("");

                  setResults([]);

                }}
                className="group flex gap-4 rounded-2xl p-3 transition hover:bg-secondary dark:hover:bg-zinc-900"
              >

                {/* IMAGE */}
                <div className="relative h-24 w-16 overflow-hidden rounded-xl flex-shrink-0">

                  <Image
                    src={
                      anime.coverImage
                        ?.large
                    }
                    alt={
                      anime.title
                        ?.english ||
                      anime.title
                        ?.romaji ||
                      "Anime"
                    }
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col justify-center overflow-hidden">

                  <h3 className="line-clamp-2 font-bold">

                    {anime.title
                      ?.english ||
                      anime.title
                        ?.romaji}

                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">

                    {anime.genres?.[0] ||
                      "Anime"}

                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm">

                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                    <span>

                      {anime.averageScore ||
                        "N/A"}

                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      )}

    </div>

  );
}