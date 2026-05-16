import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { fetchAnimeById } from "@/lib/api";

import type { Anime } from "@/types/anime";

import { AnimeDetailHero } from "@/components/anime/anime-detail-hero";

import { AnimeTrailerSection } from "@/components/anime/anime-trailer-section";

import { AnimeRankingsSection } from "@/components/anime/anime-rankings-section";

import { AnimeRecommendationsSection } from "@/components/anime/anime-recommendations-section";

interface AnimePageProps {
  params: Promise<{
    id: string;
  }>;
}

function getAnimeTitle(anime: Anime) {
  return (
    anime.title?.english ||
    anime.title?.romaji ||
    anime.title?.native ||
    "Anime"
  );
}

function cleanDescription(description?: string | null) {
  if (!description) {
    return "Explore anime details, trailer, rankings, studios, episodes, and recommendations on AniPulse.";
  }

  return description
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getAnimeImage(anime: Anime) {
  return (
    anime.bannerImage ||
    anime.coverImage?.extraLarge ||
    anime.coverImage?.large ||
    "/placeholder-anime.jpg"
  );
}

export async function generateMetadata({
  params,
}: AnimePageProps): Promise<Metadata> {
  const { id } = await params;

  const anime = (await fetchAnimeById(id)) as Anime | null;

  if (!anime) {
    return {
      title: "Anime Not Found | AniPulse",
      description:
        "The anime you are looking for could not be found on AniPulse.",
    };
  }

  const title = getAnimeTitle(anime);

  const description = cleanDescription(
    anime.description
  ).slice(0, 155);

  const image = getAnimeImage(anime);

  return {
    title: `${title} - Anime Details, Trailer & Recommendations | AniPulse`,
    description,
    openGraph: {
      title: `${title} | AniPulse`,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | AniPulse`,
      description,
      images: [image],
    },
  };
}

export default async function AnimePage({
  params,
}: AnimePageProps) {
  const { id } = await params;

  const anime = (await fetchAnimeById(id)) as Anime | null;

  if (!anime) {
    notFound();
  }

 return (
  <main className="min-h-screen bg-background text-foreground">
    <AnimeDetailHero anime={anime} />

    <AnimeTrailerSection
      trailer={anime.trailer}
    />

    <AnimeRankingsSection
      rankings={anime.rankings}
    />

    <AnimeRecommendationsSection
      recommendations={anime.recommendations}
    />
  </main>
);
}