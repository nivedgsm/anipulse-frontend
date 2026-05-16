import Image from "next/image";
import Link from "next/link";

import type { RecommendedAnime } from "@/types/anime";

interface RecommendationCardProps {
  anime: RecommendedAnime;
}

function getAnimeTitle(anime: RecommendedAnime) {
  return (
    anime.title?.english ||
    anime.title?.romaji ||
    "Untitled Anime"
  );
}

function getAnimeImage(anime: RecommendedAnime) {
  return (
    anime.coverImage?.large ||
    anime.bannerImage ||
    "/placeholder-anime.jpg"
  );
}

export function RecommendationCard({
  anime,
}: RecommendationCardProps) {
  const title = getAnimeTitle(anime);

  const image = getAnimeImage(anime);

  return (
    <Link
      href={`/anime/${anime.id}`}
      className="group block min-w-[220px] max-w-[220px] md:min-w-[240px] md:max-w-[240px]"
    >
      {/* CARD */}
      <article className="overflow-hidden rounded-[28px] border border-border bg-card shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        {/* IMAGE */}
        <div className="relative h-[310px] overflow-hidden md:h-[340px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 220px, 240px"
            className="object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            ⭐ {anime.averageScore || "N/A"}
          </div>

          {anime.genres?.[0] ? (
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-flex rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-violet-600/20">
                {anime.genres[0]}
              </span>
            </div>
          ) : null}
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <h3 className="line-clamp-2 min-h-[56px] text-base font-black leading-7 transition group-hover:text-violet-500 md:text-lg">
            {title}
          </h3>
        </div>
      </article>
    </Link>
  );
}