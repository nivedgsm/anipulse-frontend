import Image from "next/image";

import Link from "next/link";

interface ReleaseCardProps {

  id: number;

  title: string;

  image: string;

  episode: string;

  release: string;
}

export function ReleaseCard({
  id,
  title,
  image,
  episode,
  release,
}: ReleaseCardProps) {

  return (

    <Link
      href={`/anime/${id}`}
      className="group relative block overflow-hidden rounded-3xl border border-border bg-card"
    >

      {/* IMAGE */}
      <div className="relative h-[420px] overflow-hidden">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* HOVER GLOW */}
        <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">

          <div className="absolute inset-0 bg-violet-500/10" />

        </div>

      </div>

      {/* CONTENT */}
      <div className="absolute bottom-0 p-6">

        {/* RELEASE */}
        <div className="mb-3 inline-block rounded-full bg-violet-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">

          {release}

        </div>

        {/* TITLE */}
        <h3 className="line-clamp-2 text-2xl font-black text-white transition group-hover:text-violet-300">

          {title}

        </h3>

        {/* EPISODES */}
        <p className="mt-2 text-sm text-zinc-300">

          {episode}

        </p>

      </div>

    </Link>

  );
}