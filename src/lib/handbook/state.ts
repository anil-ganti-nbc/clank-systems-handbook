const KEY = "clank-handbook-v1";

export interface HandbookState {
  version: 1;
  visited: string[];
  frozen: Record<string, string>;
  selfRatings: Record<string, number>;
  completedLabs: string[];
  completedExplain: string[];
}

function empty(): HandbookState {
  return { version: 1, visited: [], frozen: {}, selfRatings: {}, completedLabs: [], completedExplain: [] };
}

export function loadHandbookState(): HandbookState {
  if (typeof localStorage === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as HandbookState;
    if (parsed.version !== 1) return empty();
    return { ...empty(), ...parsed };
  } catch {
    return empty();
  }
}

export function saveHandbookState(state: HandbookState) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function markVisited(path: string) {
  const s = loadHandbookState();
  if (!s.visited.includes(path)) s.visited = [...s.visited, path].slice(-200);
  saveHandbookState(s);
}

export function freezeAnswer(id: string, text: string) {
  const s = loadHandbookState();
  s.frozen[id] = text;
  saveHandbookState(s);
}

export function completeLab(id: string) {
  const s = loadHandbookState();
  if (!s.completedLabs.includes(id)) s.completedLabs.push(id);
  saveHandbookState(s);
}

export function completeExplain(id: string, rating: number) {
  const s = loadHandbookState();
  if (!s.completedExplain.includes(id)) s.completedExplain.push(id);
  s.selfRatings[id] = rating;
  saveHandbookState(s);
}
