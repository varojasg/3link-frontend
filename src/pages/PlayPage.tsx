import { useEffect, useState } from "react";
import { FilterChip } from "../components/FilterChip";
import { WordCard } from "../components/WordCard";
import {
  getAllWords,
  getRandomWords,
} from "../services/wordService";
import type { Word } from "../types/Word";

export function PlayPage() {
  const [filters, setFilters] =
    useState<string[]>([]);

  const [
    selectedFilters,
    setSelectedFilters,
  ] = useState<string[]>([]);

  const [randomWords, setRandomWords] =
    useState<Word[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    getAllWords()
      .then((words) => {
        const allFilters = words.flatMap(
          (word) => word.filters
        );

        setFilters(
          [...new Set(allFilters)].sort()
        );
      })
      .catch(() => {
        setMessage(
          "Could not load filters."
        );
      });
  }, []);

  function toggleFilter(filter: string) {
    setMessage("");

    if (selectedFilters.includes(filter)) {
      setSelectedFilters(
        selectedFilters.filter(
          (selected) => selected !== filter
        )
      );

      return;
    }

    setSelectedFilters([
      ...selectedFilters,
      filter,
    ]);
  }

  async function play() {
    if (selectedFilters.length === 0) {
      setMessage(
        "Select at least one filter."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const words = await getRandomWords(
        selectedFilters,
        3
      );

      setRandomWords(words);

      if (words.length === 0) {
        setMessage(
          "No cards match those filters."
        );
      }
    } catch {
      setRandomWords([]);

      setMessage(
        "Could not draw cards."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page play-page">
      <section className="play-toolbar">
        <button
          className="play-button"
          type="button"
          disabled={loading}
          onClick={play}
        >
          {loading ? "..." : "Play"}
        </button>

        <div className="play-filter-scroll">
          {filters.map((filter) => (
            <FilterChip
              key={filter}
              value={filter}
              selected={selectedFilters.includes(
                filter
              )}
              onClick={() =>
                toggleFilter(filter)
              }
            />
          ))}
        </div>
      </section>

      {message && (
        <p className="play-message">
          {message}
        </p>
      )}

      <section className="play-stage">
        <div className="mystery-card">
          ?
        </div>

        {randomWords.length === 0 ? (
          <>
            <div className="mystery-card center-card">
              ?
            </div>

            <div className="mystery-card center-card">
              ?
            </div>

            <div className="mystery-card center-card">
              ?
            </div>
          </>
        ) : (
          randomWords.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              featured
            />
          ))
        )}

        <div className="mystery-card">
          ?
        </div>
      </section>
    </main>
  );
}