export default function AnimeDetailLoading() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* HERO SKELETON */}
      <section className="relative overflow-hidden">
        {/* BACKGROUND IMAGE AREA */}
        <div className="relative h-[430px] md:h-[540px]">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-violet-950/40 via-muted to-pink-950/30" />

          <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute right-10 top-32 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/30" />
        </div>

        {/* CONTENT */}
        <div className="container relative mx-auto flex flex-col gap-8 px-4 pb-14 md:pb-20 lg:-mt-44 lg:flex-row lg:items-end">
          {/* POSTER */}
          <div className="relative mx-auto h-[420px] w-[280px] shrink-0 overflow-hidden rounded-[32px] border border-white/10 bg-card shadow-2xl md:mx-0 md:h-[500px] md:w-[330px]">
            <div className="absolute inset-0 animate-pulse bg-muted" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-violet-500/10" />

            <div className="absolute bottom-5 left-5 right-5 space-y-3">
              <div className="h-4 w-2/3 rounded-full bg-white/15" />
              <div className="h-4 w-1/2 rounded-full bg-white/10" />
            </div>
          </div>

          {/* INFO */}
          <div className="flex-1 pb-2 lg:pb-8">
            {/* GENRES */}
            <div className="mb-5 flex flex-wrap gap-3">
              <div className="h-8 w-24 animate-pulse rounded-full border border-white/10 bg-violet-500/20" />
              <div className="h-8 w-28 animate-pulse rounded-full border border-white/10 bg-pink-500/20" />
              <div className="h-8 w-20 animate-pulse rounded-full border border-white/10 bg-blue-500/20" />
            </div>

            {/* TITLE */}
            <div className="space-y-4">
              <div className="h-14 w-full max-w-4xl animate-pulse rounded-2xl bg-muted md:h-20" />
              <div className="h-14 w-4/5 max-w-3xl animate-pulse rounded-2xl bg-muted md:h-20" />
              <div className="h-6 w-64 animate-pulse rounded-full bg-muted" />
            </div>

            {/* META CARDS */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
              <div className="h-14 w-full animate-pulse rounded-2xl border border-border bg-card lg:w-36" />
              <div className="h-14 w-full animate-pulse rounded-2xl border border-border bg-card lg:w-40" />
              <div className="h-14 w-full animate-pulse rounded-2xl border border-border bg-card lg:w-36" />
              <div className="h-14 w-full animate-pulse rounded-2xl border border-border bg-card lg:w-44" />
              <div className="h-14 w-full animate-pulse rounded-2xl border border-border bg-card lg:w-36" />
            </div>

            {/* DESCRIPTION */}
            <div className="mt-9 max-w-4xl space-y-3">
              <div className="h-4 w-full animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-11/12 animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-10/12 animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-8/12 animate-pulse rounded-full bg-muted" />
            </div>

            {/* STUDIOS */}
            <div className="mt-9">
              <div className="mb-4 h-4 w-24 animate-pulse rounded-full bg-violet-500/30" />

              <div className="flex flex-wrap gap-3">
                <div className="h-10 w-28 animate-pulse rounded-full border border-border bg-card" />
                <div className="h-10 w-36 animate-pulse rounded-full border border-border bg-card" />
                <div className="h-10 w-24 animate-pulse rounded-full border border-border bg-card" />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-10 flex flex-wrap gap-4">
              <div className="h-12 w-40 animate-pulse rounded-full bg-violet-600/40" />
              <div className="h-12 w-32 animate-pulse rounded-full border border-border bg-card" />
            </div>
          </div>
        </div>
      </section>

      {/* TRAILER SKELETON */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="mb-8">
          <div className="h-4 w-40 animate-pulse rounded-full bg-violet-500/30" />
          <div className="mt-4 h-12 w-72 animate-pulse rounded-2xl bg-muted" />
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-border bg-card shadow-2xl">
          <div className="aspect-video animate-pulse bg-muted" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/30 backdrop-blur-xl">
              <div className="ml-1 h-0 w-0 border-y-[12px] border-l-[18px] border-y-transparent border-l-white/40" />
            </div>
          </div>
        </div>
      </section>

      {/* RECOMMENDATION CARDS SKELETON */}
      <section className="container mx-auto px-4 pb-20">
        <div className="mb-8">
          <div className="h-4 w-36 animate-pulse rounded-full bg-violet-500/30" />
          <div className="mt-4 h-12 w-80 animate-pulse rounded-2xl bg-muted" />
        </div>

        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-[240px] shrink-0"
            >
              <div className="h-[340px] animate-pulse rounded-3xl border border-border bg-card" />

              <div className="mt-4 space-y-3">
                <div className="h-4 w-32 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-52 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-40 animate-pulse rounded-full bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}