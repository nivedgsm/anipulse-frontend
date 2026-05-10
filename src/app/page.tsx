
import { HeroSection } from "@/components/home/hero-section";

import { TrendingAnimeSection } from "@/components/home/trending-anime-section";

import { CategoryPills } from "@/components/home/category-pills";

import { UpcomingReleasesSection } from "@/components/home/upcoming-releases-section";

import { EditorialSection } from "@/components/home/editorial-section";

import { BackgroundGlow } from "@/components/layout/background-glow";


import {
  fetchTrendingAnime,
  fetchLatestNews,
  fetchUpcomingAnime,
} from "@/lib/api";

export default async function HomePage() {

  const trendingAnime =
    await fetchTrendingAnime();

  const latestNews =
    await fetchLatestNews();

  const upcomingAnime =
    await fetchUpcomingAnime();

  return (
    <main className="min-h-screen bg-background text-foreground">

      <BackgroundGlow />


      <CategoryPills />

      <HeroSection anime={trendingAnime} />

      <TrendingAnimeSection anime={trendingAnime} />

      <UpcomingReleasesSection
        anime={upcomingAnime}
      />

      <EditorialSection
  news={latestNews}
  trendingAnime={trendingAnime}
/>


    </main>
  );
}