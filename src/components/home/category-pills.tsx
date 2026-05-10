const animeCategories = [
  "All",
  "Action",
  "Adventure",
  "Fantasy",
  "Romance",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Isekai",
  "Shounen",
  "Slice of Life",
  "Psychological",
  "Sports",
  "Mystery",
];

export function CategoryPills() {

  return (

    <section className="relative z-10 border-b border-border/50 bg-background">

      <div className="container mx-auto px-4 py-4">

        <div className="flex gap-3 overflow-x-auto scrollbar-hide">

          {animeCategories.map(
            (category, index) => (

              <button
                key={category}
                className={`
                  whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-300
                  ${
                    index === 0
                      ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                      : "bg-secondary text-secondary-foreground hover:bg-violet-500 hover:text-white"
                  }
                `}
              >

                {category}

              </button>

            )
          )}

        </div>

      </div>

    </section>

  );
}