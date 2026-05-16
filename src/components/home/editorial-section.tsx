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
      <section className="relative overflow-hidden px-6 py-20 md:px-10">
        <div className="pointer-events-none absolute left-0 top-10 h-[320px] w-[320px] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto w-full max-w-[1500px]">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-blue-300">
                Editorial Feed
              </div>

              <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                Latest Anime Coverage
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-blue-100/60 md:text-base md:leading-7">
              Fresh anime news, trending titles, release updates, and fan-first
              coverage from across the anime world.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="min-w-0">
              <LatestNewsSection news={news} />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
              <PopularSidebar anime={trendingAnime} />
            </aside>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}