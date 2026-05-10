import Link from "next/link";

import Image from "next/image";

interface RecommendationCardProps {

  anime: {
    id: number;

    title: {
      english?: string;
      romaji?: string;
    };

    coverImage: {
      large: string;
    };

    averageScore?: number;

    genres?: string[];
  };
}

export function RecommendationCard({
  anime,
}: RecommendationCardProps) {

  return (

    <Link
      href={`/anime/${anime.id}`}
      className="group block min-w-[240px]"
    >

      {/* IMAGE */}
      <div className="relative h-[340px] overflow-hidden rounded-3xl">

        <Image
          src={
            anime.coverImage?.large
          }
          alt={
            anime.title?.english ||
            anime.title?.romaji ||
            "Anime"
          }
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      </div>

      {/* CONTENT */}
      <div className="mt-4">

        <div className="flex items-center gap-3 text-sm text-muted-foreground">

          <span>

            ⭐{" "}
            {anime.averageScore ||
              "N/A"}

          </span>

          <span>

            {anime.genres?.[0] ||
              "Anime"}

          </span>

        </div>

        <h3 className="mt-2 line-clamp-2 text-xl font-black transition group-hover:text-violet-400">

          {anime.title?.english ||
            anime.title?.romaji}

        </h3>

      </div>

    </Link>

  );
}