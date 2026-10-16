import type { Word } from "../types/Word";

const API_URL = "/api/words";

export async function getAllWords(): Promise<Word[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch words");
  }

  return response.json();
}

export async function createWord(
  value: string,
  filters: string[]
): Promise<Word> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value,
      filters,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create word");
  }

  return response.json();
}

export async function getRandomWords(
  filters: string[],
  limit: number = 3
): Promise<Word[]> {
  const params = new URLSearchParams({
    filters: filters.join(","),
    limit: limit.toString(),
  });

  const response = await fetch(
    `${API_URL}/random?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch random words");
  }

  return response.json();
}