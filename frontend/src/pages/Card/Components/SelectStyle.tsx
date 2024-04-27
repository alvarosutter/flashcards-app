import type { StylesConfig } from 'react-select';
import { useTheme } from 'styled-components';

import type { SelectOption } from '../../../types';

function SelectStyle() {
  const theme = useTheme();
  const customStyles: StylesConfig<SelectOption> = {
    control: (provided) => ({
      ...provided,
      color: theme.colors.altText,
      background: theme.colors.modalInputBg,
      border: 'none',
      boxShadow: 'none',
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
    }),

    multiValue: (provided) => ({
      ...provided,
      color: theme.colors.primaryText,
      backgroundColor: '#6b6b6b',
      borderRadius: '5px',
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
    }),

    menu: (provided) => ({
      ...provided,
      background: theme.colors.modalInputBg,
      boxShadow: `0 0 0 1px ${theme.colors.primary}`,
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
    }),

    option: (provided) => ({
      ...provided,
      background: theme.colors.modalInputBg,
      '&:hover': {
        background: '#6b6b6b',
      },
      fontSize: 'inherit',
      fontFamily: theme.fonts.btnFont,
    }),
  };

  return customStyles;
}

export default SelectStyle;
