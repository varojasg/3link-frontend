import { useEffect, useState } from "react";
import { FilterChip } from "../components/FilterChip";
import {
  createWord,
  getAllWords,
} from "../services/wordService";

export function AddPage() {
  const [value, setValue] = useState("");
  const [filterValue, setFilterValue] =
    useState("");

  const [
    availableFilters,
    setAvailableFilters,
  ] = useState<string[]>([]);

  const [
    selectedFilters,
    setSelectedFilters,
  ] = useState<string[]>([]);

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAllWords()
      .then((words) => {
        const filters = words.flatMap(
          (word) => word.filters
        );

        setAvailableFilters(
          [...new Set(filters)].sort()
        );
      })
      .catch(() => {
        setAvailableFilters([]);
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

    if (selectedFilters.length >= 10) {
      setMessage(
        "There can't be more than 10 filters per word."
      );
      return;
    }

    setSelectedFilters([
      ...selectedFilters,
      filter,
    ]);
  }

  function addFilter() {
    const newFilter = filterValue.trim();

    if (!newFilter) {
      return;
    }

    if (newFilter.length > 100) {
      setMessage(
        "The filter value must not exceed 100 characters."
      );
      return;
    }

    if (!availableFilters.includes(newFilter)) {
      setAvailableFilters(
        [...availableFilters, newFilter].sort()
      );
    }

    if (!selectedFilters.includes(newFilter)) {
      if (selectedFilters.length >= 10) {
        setMessage(
          "There can't be more than 10 filters per word."
        );
        return;
      }

      setSelectedFilters([
        ...selectedFilters,
        newFilter,
      ]);
    }

    setFilterValue("");
    setMessage("");
  }

  async function handleSubmit() {
    const cleanValue = value.trim();

    if (!cleanValue) {
      setMessage("Enter a word.");
      return;
    }

    if (selectedFilters.length === 0) {
      setMessage(
        "Select at least one filter."
      );
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await createWord(
        cleanValue,
        selectedFilters
      );

      setValue("");
      setSelectedFilters([]);
      setMessage("Card added.");
    } catch {
      setMessage(
        "Could not add the card."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="page add-page">
      <section className="add-panel">
        <label htmlFor="word">
          Word
        </label>

        <input
          id="word"
          className="text-input"
          type="text"
          maxLength={100}
          value={value}
          onChange={(event) =>
            setValue(event.target.value)
          }
        />

        <label htmlFor="filter">
          Filters
        </label>

        <div className="filter-input-row">
          <input
            id="filter"
            className="text-input"
            type="text"
            maxLength={100}
            value={filterValue}
            onChange={(event) =>
              setFilterValue(
                event.target.value
              )
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addFilter();
              }
            }}
          />

          <button
            className="add-filter-button"
            type="button"
            onClick={addFilter}
          >
            +
          </button>
        </div>

        <div className="filter-box">
          {availableFilters.length === 0 ? (
            <p className="filter-empty">
              Add your first filter.
            </p>
          ) : (
            availableFilters.map((filter) => (
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
            ))
          )}
        </div>

        {message && (
          <p className="form-message">
            {message}
          </p>
        )}

        <button
          className="primary-button"
          type="button"
          disabled={saving}
          onClick={handleSubmit}
        >
          {saving ? "Adding..." : "Add"}
        </button>
      </section>
    </main>
  );
}