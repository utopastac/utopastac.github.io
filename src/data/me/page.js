import {SECTIONS} from 'data/work/pageBasics';

export const DATA = {
  meta: [
    {title: 'Year', content: '2020 - now'},
    {title: 'Role', content: 'Lead product designer'}
  ],
  pages: [
    {
      ...SECTIONS.sectionHeader,
    },
    {
      ...SECTIONS.section,
    },
    {
      ...SECTIONS.section,
      title: 'Transparency',
      path: '#transparency'
    },
    {
      ...SECTIONS.peerQuotes
    },
    {
      ...SECTIONS.overview,
      img: '',
      copy: `
#### I have designed, run, and evaluated [countless](/process) creative, ideation, and principles based workshops for many teams. Whether to find common ground, break through a tricky problem, or define ways of working, collaborative workshops form the basis of my design process.  
 &nbsp;  
#### As the lead designer in the Community Integrity legitimacy team, I am responsible for setting product vision and moving the mission forward with thoughtful design output.
`
    },
  ]
}
