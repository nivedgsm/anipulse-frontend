import Link from "next/link";

export default function AnimeNotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 text-foreground">
      {/* BACKGROUND GLOWS */}
      <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute bottom-20 left-10 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="absolute right-10 top-40 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />

      {/* CARD */}
      <section className="relative z-10 w-full max-w-2xl rounded-[36px] border border-border bg-card/80 p-8 text-center shadow-2xl backdrop-blur-xl md:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/10 text-4xl">
          ?
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-500">
          Anime Not Found
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
          This anime disappeared.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
          The anime you are looking for may not exist, may have been removed,
          or the link may be incorrect.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-violet-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
          >
            Back Home
          </Link>

          <Link
            href="/anime"
            className="rounded-full border border-border bg-background px-7 py-3 text-sm font-bold transition hover:bg-accent"
          >
            Browse Anime
          </Link>
        </div>
      </section>
    </main>
  );
}