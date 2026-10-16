import type { Word } from "../types/Word";

interface WordCardProps {
  word: Word;
  featured?: boolean;
}

export function WordCard({
  word,
  featured = false,
}: WordCardProps) {
  return (
    <article
      className={
        featured
          ? "word-card featured"
          : "word-card"
      }
    >
      <div className="card-corner">3</div>

      <h2>{word.value}</h2>

      <div className="word-filters">
        {word.filters.map((filter, index) => (
          <span
            className="word-filter"
            key={`${word.id}-${filter}-${index}`}
          >
            {filter}
          </span>
        ))}
      </div>
    </article>
  );
}