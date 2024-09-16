'use client';

import merge from 'lodash/merge';
// date fns
import { fr as frFRAdapter, enUS as enUSAdapter, zhTW as zhTWAdapter } from 'date-fns/locale';

// core (MUI)
import { enUS as enUSCore, frFR as frFRCore, zhHK as zhTWCore } from '@mui/material/locale';
// date pickers (MUI)
import { enUS as enUSDate, frFR as frFRDate, zhHK as zhTWDate } from '@mui/x-date-pickers/locales';
// data grid (MUI)
import { enUS as enUSDataGrid, frFR as frFRDataGrid, zhHK as zhTWDataGrid } from '@mui/x-data-grid';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
    numberFormat: {
      code: 'en-US',
      currency: 'USD',
    },
  },
  {
    label: 'Taiwan',
    value: 'zh_TW',
    systemValue: merge(zhTWDate, zhTWDataGrid, zhTWCore),
    adapterLocale: zhTWAdapter,
    icon: 'flagpack:tw',
    numberFormat: {
      code: 'zh-TW',
      currency: 'TWD',
    },
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: merge(frFRDate, frFRDataGrid, frFRCore),
    adapterLocale: frFRAdapter,
    icon: 'flagpack:fr',
    numberFormat: {
      code: 'fr-Fr',
      currency: 'EUR',
    },
  },
];

export const defaultLang = allLangs[0]; // English

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
