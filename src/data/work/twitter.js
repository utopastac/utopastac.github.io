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
      title: 'Twitter Blue Vision',
      path: '#twitter blue vision',
      data: [
        {
          type: 'copy',
          copy: `
  ### Twitter Blue Vision
  Within the Revenue Diversity org, I work leading design for the subscriptions team. We are focused on creating product market fit for a first of it's kind consumer subscription for Twitter power users. As part of this, I am leading long term vision work to set the strategy for the team for the upcoming year.
  &nbsp;  
  &nbsp;  
  This work is considered crucial in the company for growing sustainability in our revenue sources. I am working to drive excitement and alignment throughout the company, working closely with our design systems team to build a truly desirable product.
          `
        },
      ]
    },
    {
      ...SECTIONS.overview,
      title: 'Team overview',
      copy: `
#### My role at Twitter is remote first, and requires a high degree of collaboration with teams across the company and the world. I work extremely closely with senior cross functional partners to build consensus around near future improvements and far off vision.
&nbsp;  
#### I am driving design and strategy for an ambiguous and ambitious effort that could re-shape how the company makes money.
`
    },
  ]
}
