import type { AnimeTrailer } from "@/types/anime";

interface AnimeTrailerSectionProps {
  trailer?: AnimeTrailer | null;
}

function getTrailerEmbedUrl(trailer: AnimeTrailer) {
  if (!trailer.id) {
    return null;
  }

  const site = trailer.site?.toLowerCase();

  if (!site || site === "youtube") {
    return `https://www.youtube.com/embed/${trailer.id}`;
  }

  return null;
}

export function AnimeTrailerSection({
  trailer,
}: AnimeTrailerSectionProps) {
  if (!trailer?.id) {
    return null;
  }

  const embedUrl = getTrailerEmbedUrl(trailer);

  if (!embedUrl) {
    return null;
  }

  return (
    <section
      id="trailer"
      className="container mx-auto px-4 py-14 md:py-20"
    >
      {/* WRAP */}
      <div className="relative overflow-hidden rounded-[36px] border border-border bg-card p-4 shadow-2xl md:p-6">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />

        {/* HEADER */}
        <div className="relative mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-500">
              Official Trailer
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Watch Trailer
            </h2>
          </div>

          
        </div>

        {/* VIDEO */}
        <div className="relative overflow-hidden rounded-[28px] border border-border bg-background shadow-xl">
          <div className="aspect-video">
            <iframe
              src={embedUrl}
              title="Anime Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}