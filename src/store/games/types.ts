type GetGameByIdOptions = {
  id: number | string;
};

type GetGamesOptions = {
  genres: string[];
  platform: string | null;
};

type GetGamesParams = {
  platform: string;
  category?: string;
};

export type { GetGamesParams, GetGameByIdOptions, GetGamesOptions };
