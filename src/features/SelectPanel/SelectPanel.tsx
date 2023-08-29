import { Select, SelectProps } from 'antd';
import { genreOptions, platformOptions } from './config';

type SelectPanelProps = {
  onGenreClear: VoidFunction;
  onGenreDeselect: (genre: string) => void;
  onGenreSelect: SelectProps['onSelect'];
  onPlatformSelect: SelectProps['onSelect'];
};

function SelectPanel(props: SelectPanelProps) {
  const { onPlatformSelect, onGenreClear, onGenreDeselect, onGenreSelect } =
    props;

  return (
    <>
      <Select
        allowClear
        placeholder="Platform"
        className="min-w-[150px] w-auto"
        defaultValue={platformOptions[0]}
        onSelect={onPlatformSelect}
        options={platformOptions}
      />
      <Select
        mode="multiple"
        allowClear
        placeholder="Genre"
        className="min-w-[150px] w-auto"
        onClear={onGenreClear}
        onDeselect={onGenreDeselect}
        onSelect={onGenreSelect}
        options={genreOptions}
      />
    </>
  );
}

export { SelectPanel };
