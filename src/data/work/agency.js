import {SECTIONS} from 'data/work/pageBasics';
import image1 from 'images/content/agency-network.jpg';
import image2 from 'images/content/agency-honda.jpg';
import image3 from 'images/content/agency-a4.jpg';
import image4 from 'images/content/agency-authonomy.jpg';
import image5 from 'images/content/agency-iaaf.jpg';

export const DATA = {
  meta: [
    {title: 'Year', content: '2005 - 2013'},
    {title: 'Role', content: 'Various'}
  ],
  pages: [
    {
      ...SECTIONS.sectionHeader,
    },
    {
      ...SECTIONS.section,
      title: 'Syzygy',
      path: '#syzygy',
      data: [
        {
          type: 'copy',
          copy: `
  ### Syzygy
  I started as a junior designer in [Syzygy](https://www.syzygy.de), working mainly with Mazda and Mercedes as clients. I worked on the digital campaigns for major car launches, and worked closely with excellent creative developers.  
&nbsp  
I caught the programming bug, and started experimenting with creating games in Actionscript 3. I quickly progressed to a role as a creative technologist, where I was working on both design and development, in-between the creative teams and the technical teams.
          `
        },
        {
          type: 'image',
          img: image5,
          alt: 'SYZYGY work example',
          caption: `We worked with the IAAF to produce a new site. They have huge amounts of data and are the world authority on accuracy and their athletes.`
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'VML London',
      path: '#vml-london',
      data: [
        {
          type: 'copy',
          copy: `
  ### VML London
  When I joined [VML](https://www.vmlyr.com/en-gb/united-kingdom) (Good Technology), I was part of a small team as a 'Hypermedia designer'. The team's role was, essentially, to provide inspiration and advice to the technical and creative teams to make their ideas better.  
&nbsp  
We sat directly between the two, creating prototypes, interaction designs, animations, and sometimes full products for clients like Audi and Microsoft.
          `
        },
        {
          type: 'image',
          img: image3,
          alt: 'VML work example',
          caption: `I worked on the design, development and animation for the launch of Audi's A4. The Flash based site included a dynamic 360° rendering.`
        },
        {
          type: 'image',
          img: image4,
          alt: 'I worked on a number of pitches, including for Harper Collins. Authonomy is a user-published platform to kickstart new books - I worked on re-thinking the user experience and ui design to produce a site that encourages useful and meaningful interactions with the books to create a stronger and more caring community.'
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Southpaw',
      path: '#southpaw',
      data: [
        {
          type: 'copy',
          copy: `
  ### Southpaw
  At [Southpaw](https://southpawagency.com) (Nexus|H) I was brought on as the beginning point of an in house digital team. In my role as Interactive art director, I was responsible for the digital output of the company.  
&nbsp  
I lead a team of 4 which spanned both design and technical roles. We worked on everything from full ad campaigns, to expansive pitches for Honda, to full site design projects for Suzuki.
          `
        },
        {
          type: 'image',
          img: image2,
          alt: 'Southpaw work example',
          caption: `We worked with a developing technology team for Honda to produce concepts for in showroom, interactive displays for browsing their product line up in new ways.`
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Haymarket Network',
      path: '#haymarket-network',
      data: [
        {
          type: 'copy',
          copy: `
  ### Haymarket Network
  [Haymarket Network](https://www.wonderly.agency) is the internal digital and content studio for Haymarket publishing and works on internal and external clients. I was brought on to lead design for high profile projects for the IAAF, the London Olympic Ceremonies and The Rugby World Cup. Managing a small team, we produced high quality visual design work with a focus on innovation.
          `
        },
        {
          type: 'image',
          img: image1,
          alt: 'Haymarket Network work example',
          caption: `While working with Haymarket, I designed new sites for them to better show off the depth of their work.`
        },
      ]
    },
    {
      ...SECTIONS.overview,
      title: 'Team overview',
      copy: `
#### I will always be greatful for my time working in client facing agencies. I learned how to code, learned how to storytell, and learned how to pitch an idea so it would land. We worked at an incredible pace in a very interesting time in UX maturity, and developed experiences that I am extremely proud of. I had the opportunity to manage and develop wonderful people who have all gone on to amazing things.
`
    },
  ]
}
