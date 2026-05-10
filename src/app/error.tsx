"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  console.error(error);

  return (

    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-foreground">

      <h1 className="text-5xl font-black">

        Something went wrong

      </h1>

      <p className="mt-4 max-w-xl text-muted-foreground">

        AniPulse encountered an unexpected error while loading this page.

      </p>

      <button
        onClick={() => reset()}
        className="mt-8 rounded-full bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
      >

        Try Again

      </button>

    </main>

  );

}