import type {
  AnimeRecommendations,
  RecommendedAnime,
} from "@/types/anime";

import { RecommendationCard } from "@/components/anime/recommendation-card";

interface AnimeRecommendationsSectionProps {
  recommendations?: AnimeRecommendations | null;
}

function isRecommendedAnime(
  anime: RecommendedAnime | null | undefined
): anime is RecommendedAnime {
  return Boolean(anime);
}

export function AnimeRecommendationsSection({
  recommendations,
}: AnimeRecommendationsSectionProps) {
  const recommendationNodes =
    recommendations?.nodes || [];

  const validRecommendations =
    recommendationNodes
      .map((recommendation) =>
        recommendation.mediaRecommendation
      )
      .filter(isRecommendedAnime)
      .slice(0, 12);

  if (!validRecommendations.length) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-14 md:py-20">
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-500">
            You May Also Like
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
            Recommended Anime
          </h2>
        </div>

       
      </div>

      {/* CAROUSEL */}
      <div className="-mx-4 overflow-hidden px-4">
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {validRecommendations.map((anime, index) => (
            <RecommendationCard
              key={`${anime.id}-${index}`}
              anime={anime}
            />
          ))}
        </div>
      </div>
    </section>
  );
}