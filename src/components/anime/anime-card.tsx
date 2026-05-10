import Link from "next/link";

interface AnimeCardProps {

  id: number;

  title: string;

  genre: string;

  image: string;
}

export function AnimeCard({
  id,
  title,
  genre,
  image,
}: AnimeCardProps) {

  return (

    <Link
      href={`/anime/${id}`}
      className="group relative block min-w-[240px] overflow-hidden rounded-[28px]"
    >

      {/* IMAGE */}
      <div
        className="h-[360px] bg-cover bg-center transition-all duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* HOVER GLOW */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

        <div className="absolute inset-0 bg-violet-500/10" />

      </div>

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 w-full p-5">

        {/* GENRE */}
        <span className="inline-flex rounded-full border border-white/10 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">

          {genre}

        </span>

        {/* TITLE */}
        <h3 className="mt-4 line-clamp-2 text-2xl font-black leading-tight text-white transition group-hover:text-violet-300">

          {title}

        </h3>

      </div>

    </Link>

  );
}