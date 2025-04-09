import {SECTIONS} from 'data/work/pageBasics';
import image1 from 'images/content/spotify-1.png';

export const DATA = {
  pageTitle: `
    Driving subscribers with innovation.
  `,
  meta: [
    {title: 'Year', content: '2019 - 2020'},
    {title: 'Role', content: 'Associate Principal product designer'}
  ],
  pages: [
    {
      ...SECTIONS.sectionHeader,
    },
    {
      ...SECTIONS.section,
      title: 'Premium',
      path: '#premium',
      data: [
        {
          type: 'copy',
          copy: `
  ### Premium
  I joined Spotify as one of the design leads for the premium mission, defining opportunities and propositions for improving users experience with Spotify Premium. I am leading an initiative to map our user needs, and am a constant advocate for product quality. I am involved in shaping the strategic direction of the team and defining our processes and needs for 2020.
          `
        },
        {
          type: 'image',
          img: image1,
          alt: 'Spotify work example',
          caption: `I designed many experiments focused on improving the premium experience.`
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Process',
      path: '#process',
      data: [
        {
          type: 'copy',
          copy: `
  ### Process
  With other Principal leads, I am currently driving the strategy and cross-functional adoption of a new product design process. I am working to actively improve design team values, processes, and tooling across the Premium mission, and drive a new understanding of cross-functional collaboration.
          `
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Mentorship',
      path: '#mentorship',
      data: [
        {
          type: 'copy',
          copy: `
  ### Mentorship
  A large part of my role is to mentor less senior members of the design team across the whole Premium mission. I run regular group working sessions and try to lead by example, and am constantly trying to make my colleagues ideas and behaviours better.
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
          content: "I have a thousand things to thank you for, but here are the three most important ones: Thank you for helping me grow by providing constant feedback, advice, and encouragement. Thank you for being so extremely open and transparent, and for involving the whole squad in design work; it makes a huge difference to feel our opinions matter in more than just technical discussions. Thank you for your silliness. It makes the dark, Swedish winter days a little brighter.",
          attribution: 'Engineering lead'
        },
        {
          content: "From day one, nay, scratch that, from DAY ZERO, Peter has brought an absurdly positive spirit and ridiculously healthy gratitudinal vibes to our lil' group of Premium Design humans.",
          attribution: 'Senior design manager'
        },
        {
          content: "You are a highly experienced, strategic designer in the Family space. You have more than met my expectations. You are able to zoom in and out of the small scale tweaks, and more importantly, you're able to lead our thinking about the broader user problems that we are trying to solve. This strategic thinking is something we have lacked previously in design partnership, but now that we have it, I honestly don't know what we would do without you.",
          attribution: 'Product director'
        },
        {
          content: "Kudos for hitting the ground running and being such a team player from day 1! The passion, ideas, and thoughtfulness you've brought to the design team in your short time at Spotify has been SO APPRECIATED.",
          attribution: 'Content lead'
        }, 
        {
          content: "Love your playful, productive, and open style, sending out ideas and proposals and asking for feedback at a high pace. You are very inclusive and encouraging, it's great. And this might be the most smooth experience I have had of working with someone remotely.",
          attribution: 'Engineering manager'
        }
      ]
    },
    {
      ...SECTIONS.overview,
      title: 'Team overview',
      copy: `
#### I worked across many different teams, providing strategic direction and storytelling alongside tactical delivery work. I co-authored the internal Spotify design process which all teams use as a benchmark, focused on discovery, alignment, and delivery.
&nbsp;  
#### I am extremely proud of the reputation and relationships I developed in my time at Spotify, driving success by helping others to succeed.
`
    },
  ]
}
