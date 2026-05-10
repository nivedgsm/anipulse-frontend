import Image from "next/image";

import Link from "next/link";

interface PopularSidebarProps {
  anime: any[];
}

export function PopularSidebar({
  anime,
}: PopularSidebarProps) {

  return (

    <aside className="rounded-3xl border border-border bg-card p-6">

      {/* HEADER */}
      <div className="mb-6">

        <p className="text-sm font-medium uppercase tracking-wider text-violet-500">

          Weekly Hotlist

        </p>

        <h2 className="mt-2 text-2xl font-black">

          Popular This Week

        </h2>

      </div>

      {/* LIST */}
      <div className="space-y-5">

        {anime
          .slice(0, 5)
          .map((item, index) => (

            <Link
              href={`/anime/${item.id}`}
              key={item.id}
              className="group flex items-center gap-4 rounded-2xl p-2 transition hover:bg-accent"
            >

              {/* RANK */}
              <div className="text-3xl font-black text-violet-500/60 transition group-hover:text-violet-400">

                {index + 1}

              </div>

              {/* IMAGE */}
              <div className="relative h-20 w-16 overflow-hidden rounded-xl">

                <Image
                  src={
                    item.coverImage?.large ||
                    "https://placehold.co/300x450/png"
                  }
                  alt={
                    item.title?.english ||
                    item.title?.romaji ||
                    "Anime"
                  }
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

              </div>

              {/* CONTENT */}
              <div className="flex-1">

                <p className="text-xs text-violet-400">

                  {item.genres?.[0] ||
                    "Anime"}

                </p>

                <h3 className="line-clamp-2 font-semibold transition group-hover:text-violet-300">

                  {item.title?.english ||
                    item.title?.romaji}

                </h3>

                <p className="mt-1 text-xs text-muted-foreground">

                  ⭐{" "}
                  {item.averageScore ||
                    "N/A"}

                </p>

              </div>

            </Link>

          ))}

      </div>

    </aside>

  );
}