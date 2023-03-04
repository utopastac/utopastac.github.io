import {SECTIONS} from 'data/work/pageBasics';
import image1 from 'images/content/twitter-1.jpg';
import image2 from 'images/content/twitter-news.jpg';
import image3 from 'images/content/twitter-news-b.jpg';
import image4 from 'images/content/twitter-cta.jpg';
import image5 from 'images/content/twitter-nav.jpg';

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
        {
          type: 'image',
          img: image1,
          alt: 'Twitter work example',
          caption: ``
        },
        {
          type: 'image',
          img: image2,
          alt: 'Twitter work example',
          caption: `Our vision focused around news and access.`
        },
        {
          type: 'image',
          img: image3,
          alt: 'Twitter work example',
          caption: ``
        },
        {
          type: 'image',
          img: image4,
          alt: 'Twitter work example',
          caption: ``
        },
        {
          type: 'image',
          img: image5,
          alt: 'Twitter work example',
          caption: `We experimented with how to best integrate Twitter Blue into the app main navigation.`
        },
      ]
    },
    {
      ...SECTIONS.peerQuotes,
      quotes: [
        {
          content: `Peter joined the Twitter Blue team as the project was reaching maturity. He bought so much enthusiasm and energy into the project and team. I absolutely loved the way he iterated on ideas and research with so much speed and shared that work throughout the team.
          
Peter's candour is one of my favourite things about him. You can always have an honest conversation with him. He is also one of the nicest guys I have met. Every-time I see him I come away happy! He is an incredible asset to any organisation.`,
          attribution: 'Engineering lead'
        },
        {
          content: "Ideating and experimenting with Peter - for the first time - during Hack Week 22 at Twitter has been so much fun, and his can-do-attitude truly inspiring. As a design lead, his focus on the customer, learning and developing, openness to (wild) non-obvious ideas, and his intuitive problem-solving skills meant we were able to develop several demos successfully in just a couple days for our multi-layered blue sky product idea. Still can't grasp how that happened, though I know if it wasn't for Peter it wouldn't have.",
          attribution: 'Conceptual design lead'
        }
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
