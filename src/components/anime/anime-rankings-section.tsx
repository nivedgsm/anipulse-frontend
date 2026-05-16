import type { AnimeRanking } from "@/types/anime";

interface AnimeRankingsSectionProps {
  rankings?: AnimeRanking[] | null;
}

function formatRankingType(type?: string | null) {
  if (!type) {
    return "Ranking";
  }

  return type
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatRankingContext(context?: string | null) {
  if (!context) {
    return "Based on AniList community ranking data.";
  }

  return context;
}

function getRankingLabel(type?: string | null) {
  const formattedType = formatRankingType(type);

  if (formattedType === "Rated") {
    return "Highest Rated";
  }

  if (formattedType === "Popular") {
    return "Most Popular";
  }

  return formattedType;
}

export function AnimeRankingsSection({
  rankings,
}: AnimeRankingsSectionProps) {
  const validRankings =
    rankings
      ?.filter((ranking) => ranking.rank)
      .slice(0, 6) || [];

  if (!validRankings.length) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-14 md:py-18">
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-500">
            Rankings
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
            Anime Rankings
          </h2>
        </div>

       
      </div>

      {/* GRID */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {validRankings.map((ranking, index) => (
          <div
            key={`${ranking.rank}-${ranking.type}-${index}`}
            className="group relative overflow-hidden rounded-[30px] border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-violet-500/10 transition group-hover:bg-violet-500/20" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                    {getRankingLabel(ranking.type)}
                  </p>

                  <div className="mt-3 text-5xl font-black tracking-tight text-violet-500">
                    #{ranking.rank}
                  </div>
                </div>

                <div className="rounded-full border border-border bg-background px-3 py-1 text-xs font-bold text-muted-foreground">
                  {index + 1}
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                {formatRankingContext(
                  ranking.context
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}