import { useEffect, useState } from "react";
import { WordCard } from "../components/WordCard";
import { getAllWords } from "../services/wordService";
import type { Word } from "../types/Word";

export function CardsPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllWords()
      .then(setWords)
      .catch(() => {
        setError("Could not load the cards.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="page">
        <p className="status-message">
          Loading cards...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <p className="status-message error-message">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="page cards-page">
      {words.length === 0 ? (
        <p className="status-message">
          No cards yet.
        </p>
      ) : (
        <section className="cards-grid">
          {words.map((word) => (
            <WordCard
              key={word.id}
              word={word}
            />
          ))}
        </section>
      )}
    </main>
  );
}