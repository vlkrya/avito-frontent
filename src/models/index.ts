type Game = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
};

type GameSystemRequirements = {
  os?: string;
  processor?: string;
  memory?: string;
  graphics?: string;
  storage?: string;
};

type GameScreenshot = {
  id: number;
  image: string;
};

type GameExpandedInfo = Game & {
  status: string;
  description: string;
  game_url: string;
  minimum_system_requirements: GameSystemRequirements;
  screenshots: GameScreenshot[];
};

export type { GameScreenshot, GameSystemRequirements, GameExpandedInfo, Game };
