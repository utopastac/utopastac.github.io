import {SECTIONS} from 'data/work/pageBasics';
import image1 from 'images/content/google-retention.jpg';

export const DATA = {
  meta: [
    {title: 'Year', content: '2018 - 2019'},
    {title: 'Role', content: 'Lead Interaction designer'}
  ],
  pages: [
    {
      ...SECTIONS.sectionHeader,
    },
    {
      ...SECTIONS.section,
      title: 'Geo merchant retention',
      path: '#geo-merchant-retention',
      data: [
        {
          type: 'copy',
          copy: `
  ### Geo merchant retention
  Within the Geo (maps) org, I worked within Google My business - an area to help small businesses manage their presence across Google. Despite what sounds like a small scope, even this has over 250 people. I was brought into the team to focus on merchant retention - how could we create a product for merchants that would make them want to use Google surfaces to advertise? I introduced an extremely experiemental way of working into the team to hugely increase our learning cadence, shipping very regularly to our users. I pushed to produce proxy metrics for retention and to understand what a 'golden path' might be for our merchants.
          `
        },
        {
          type: 'image',
          img: image1,
          alt: 'Google work example',
          caption: `We ran as series of experiments designed to find proxy metrics that defined user retention`
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Maps shopping',
      path: '#maps-shopping',
      data: [
        {
          type: 'copy',
          copy: `
  ### Maps shopping
  I worked within the shopping team to provide surfaces for merchants to explain to customers what they sold in their physical shops. We ran many rounds of foundational research to understnad needs and pain points, and created an ambitious roadmap for future developments. I worked as a strong cross-functional partner in developing strategies and alignment, trusted with highly complex problems.
          `
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Wear OS & Google Fit',
      path: '#wear-os-google-fit',
      data: [
        {
          type: 'copy',
          copy: `
  ### Wear OS & Google Fit
  I moved from the Geo org to work within Wear OS, Google's wearables ecosystem. I was working to define health and fitness experiences across the platform. Working closely with cross-functional partners and across teams, I spent time properly defining the needs of different types of users. I created the entire Wear OS front end as a react app to allow for rapid testing on devices, with flexible controls to show the OS in different states and at different times, and with different user attributes. The enabled us to test our concepts rapidly.
          `
        },
      ]
    },
    {
      ...SECTIONS.sectionEnd
    },
    {
      ...SECTIONS.peerQuotes,
      quotes: [
        {
          content: "Peter scopes problems and trouble-shoots solutions faster than any designer I’ve ever worked with - this allows us to produce, test and throw out 10x more options, and arrive at the right way forward.",
          attribution: 'Content strategy lead'
        },
        {
          content: "Peter is not only an exceptional listener, he also has a unique talent to recognise and find out other people’s talents and encourage them to use it confidently.",
          attribution: 'Design director'
        },
        {
          content: "Peter is an exceptionally gifted designer, he has the ability to cut to the heart of problems quickly and crafts delightful experiences to solve them.",
          attribution: 'Research lead'
        },
        {
          content: "Peter acts as a natural leader for the UX team. He communicates well with all parts of the team - eng, PM, UX. He is aware of people's emotions and helps get the team working more cohesively. He also makes it fun.",
          attribution: 'Engineering manager'
        }
      ]
    },
    {
      ...SECTIONS.overview,
      title: 'Team overview',
      copy: `
#### At Google, cross functional alignment is critical. I worked extremely closely with partners in all disciplines in London and California to make sure we were all pushing in the same direction.
&nbsp;  
#### I loved my time at Google. I spent many hours in interview panels, volunteering as a mentor, retrospectives for other teams, and won an award for contribution to the culture in the London office.
`
    },
  ]
}
