import { DefaultOptionType } from 'antd/es/select';

const platformOptions: DefaultOptionType[] = [
  {
    label: 'All',
    value: null,
  },
  {
    label: 'PC (Windows)',
    value: 'pc',
  },
  {
    label: 'Browser (Web)',
    value: 'browser',
  },
];

const genreOptions: DefaultOptionType[] = [
  {
    label: '3d',
    value: '3d',
  },
  {
    label: 'MMORPG',
    value: 'mmorpg',
  },
  {
    label: 'Fantasy',
    value: 'fantasy',
  },
  {
    label: 'PVP',
    value: 'pvp',
  },
  {
    label: 'Shooter',
    value: 'shooter',
  },
  {
    label: 'MOBA',
    value: 'moba',
  },
  {
    label: 'Batlle Royale',
    value: 'battle-royale',
  },
  {
    label: 'Sci-Fi',
    value: 'sci-fi',
  },
  {
    label: 'Racing',
    value: 'racing',
  },
  {
    label: 'Social',
    value: 'social',
  },
  {
    label: 'Sports',
    value: 'sports',
  },
];

export { platformOptions, genreOptions };
