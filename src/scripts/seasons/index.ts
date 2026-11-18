type SeasonEffect = { start: () => void };

const effects: Record<string, () => Promise<SeasonEffect>> = {
  christmas: () => import('./christmas'),
};

export function initSeason() {
  const season = document.documentElement.dataset.season;
  const load = season ? effects[season] : undefined;
  load?.().then(effect => effect.start());
}
