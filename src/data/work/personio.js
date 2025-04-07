import {SECTIONS} from 'data/work/pageBasics';
import image1 from 'images/content/twitter-1.jpg';
import image2 from 'images/content/twitter-news.jpg';
import image3 from 'images/content/twitter-news-b.jpg';
import image4 from 'images/content/twitter-cta.jpg';
import image5 from 'images/content/twitter-nav.jpg';

export const DATA = {
  meta: [
    {title: 'Year', content: '2023 - now'},
    {title: 'Role', content: 'Staff product designer'}
  ],
  pages: [
    {
      ...SECTIONS.sectionHeader,
    },
    {
      ...SECTIONS.section,
      title: 'Personio apps',
      path: '#personio-apps',
      data: [
        {
          type: 'copy',
          copy: `
  ### Personio apps
  I am currently deeply involved in reimaging our performance and development space. I am working with ledership across the company to align on a compelling, customer focused direction that will be industry leading.
  &nbsp;  
  &nbsp;  
  I also worked on driving our first compensation product towards release, taking the project through a brand new co-creation process and into the market.
          `
        }
      ]
    },
    {
      ...SECTIONS.sectionEnd
    },
    {
      ...SECTIONS.peerQuotes,
      quotes: [
        {
          content: `I really appreciate all your contributions to the overhaul work, specifically:

The design explorations you're putting together: love how we're pushing the thinking to show what's possible but also trigger conversations to make decisions and narrow scope. Seeing your work made me so excited about the future of Performance.`,
          attribution: 'Product VP'
        },
        {
          content: "Peter has literally been a game changer when it comes to the quality of the design that we now have in Comp. He managed to unlock some project that were previously blocked for weeks, in only a few days. I have had a great time collaborating on design and making decisions to make things move forwards over the past weeks. He is very open to feedback on his design and will to explore many different solutions.",
          attribution: 'Product lead'
        },
        {
          content: "I hope he can continue being a source of inspiration for designers and really push some methodologies. I think the vision work would be the perfect playground to start fresh and get the time needed to create some great artefacts and resources.",
          attribution: 'Product design lead'
        },
        {
          content: "What I enjoyed the most working with him, is how he tries to understand the design problems and look from a different perspective. Also, I was really impressed by his Ul and Figma skills, with the whole file interconnected and extremely complete.",
          attribution: 'Engineering lead'
        }
      ]
    },
    {
      ...SECTIONS.overview,
      title: 'Team overview',
      copy: `
#### My role at Personio is incredibly collaborative and spans many teams and domains. I am regularly presenting work and different futures at the highest levels of the company. It is a large part of my job to inspire the design team to do better work and uplevel with practice.
&nbsp;  
#### The work is incredibly deep, complex, and needs high attention to detail. I pride myself on applying strong narratives to make it easy to comprehend.
`
    },
  ]
}
