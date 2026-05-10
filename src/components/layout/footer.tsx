import Link from "next/link";

const footerLinks = {
  Explore: [
    "News",
    "Trending",
    "Anime",
    "Reviews",
  ],

  Categories: [
    "Action",
    "Romance",
    "Fantasy",
    "Movies",
  ],

  Company: [
    "About",
    "Contact",
    "Privacy Policy",
    "Terms",
  ],
};

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-background">

      <div className="container mx-auto px-4 py-16">

        <div className="grid gap-12 lg:grid-cols-4">

          {/* BRAND */}
          <div>

            <h2 className="text-3xl font-black">
              AniPulse
            </h2>

            <p className="mt-4 max-w-sm text-muted-foreground">
              Modern anime news and discovery platform
              built for the next generation of anime fans.
            </p>

          </div>

          {/* LINKS */}
          {Object.entries(footerLinks).map(
            ([title, links]) => (
              <div key={title}>

                <h3 className="mb-5 font-semibold">
                  {title}
                </h3>

                <div className="space-y-3">

                  {links.map((link) => (
                    <Link
                      key={link}
                      href="/"
                      className="block text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  ))}

                </div>

              </div>
            )
          )}

        </div>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 AniPulse. All rights reserved.
          </p>

          <p>
            Built for Gen Z anime culture.
          </p>

        </div>

      </div>

    </footer>
  );
}