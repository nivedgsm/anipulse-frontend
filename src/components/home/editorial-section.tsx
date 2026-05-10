import { LatestNewsSection } from "./latest-news-section";

import { PopularSidebar } from "./popular-sidebar";

import { FadeIn } from "@/components/shared/fade-in";

interface EditorialSectionProps {
  news: any[];

  trendingAnime: any[];
}

export function EditorialSection({
  news,
  trendingAnime,
}: EditorialSectionProps) {

  return (

    <FadeIn>

      <section className="container mx-auto px-4 py-20">

        <div className="mb-10">

          <p className="text-sm font-medium uppercase tracking-wider text-pink-500">

            Editorial Feed

          </p>

          <h2 className="mt-2 text-4xl font-black tracking-tight">

            Latest Anime Coverage

          </h2>

        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">

          {/* MAIN CONTENT */}
          <div>

            <LatestNewsSection
              news={news}
            />

          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">

            <PopularSidebar
              anime={trendingAnime}
            />

          </div>

        </div>

      </section>

    </FadeIn>

  );
}