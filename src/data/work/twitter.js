import {SECTIONS} from 'data/work/pageBasics';

export const DATA = {
  meta: [
    {title: 'Year', content: '2021 - now'},
    {title: 'Role', content: 'Staff product designer'}
  ],
  pages: [
    {
      ...SECTIONS.sectionHeader,
    },
    {
      ...SECTIONS.section,
      title: 'Revenue team',
      path: '#revenue',
      data: [
        {
          type: 'copy',
          copy: `
  ### Revenue
  I have recently joined as part of the revenue diversity team.
          `
        },
      ]
    },
  ]
}
