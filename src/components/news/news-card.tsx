type NewsCardProps = {
  title: string;
  image: string;
  category: string;
  time: string;
};

export function NewsCard({
  title,
  image,
  category,
  time,
}: NewsCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50">
      
      {/* IMAGE */}
      <div className="overflow-hidden">
        <div
          className="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-500">
            {category}
          </span>

          <span className="text-sm text-muted-foreground">
            {time}
          </span>
        </div>

        <h2 className="text-xl font-bold leading-snug transition-colors group-hover:text-violet-500">
          {title}
        </h2>
      </div>
    </article>
  );
}