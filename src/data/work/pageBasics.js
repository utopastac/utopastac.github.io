import * as Content from 'components/Content';
import cat from 'images/pixel/p50.PNG';

export const SECTIONS = {
  peerQuotes: {
    title: 'Peer Quotes',
    path: '#peerQuotes',
    component: Content.PeerQuotes,
    quotes: [
      {
        content: 'Peter likes working in a very collaborative way. He is constantly sharing updates about his work and seeking feedback. I really appreciate that Peter is giving a voice to everyone in the team who would like to influence the future of our products.',
        attribution: 'Engineering manager'
      },
      {
        content: 'Peter likes working in a very collaborative way. He is constantly sharing updates about his work and seeking feedback. I really appreciate that Peter is giving a voice to everyone in the team who would like to influence the future of our products.',
        attribution: 'Engineering manager'
      }
    ]
  },
  sectionHeader: {
    component: Content.SectionHeader,
    title: '',
  },
  sectionEnd: {
    component: Content.SectionEnd
  },
  section: {
    component: Content.Section,
    title: 'Oversight',
    path: '#oversight',
    sub: true,
    data: [
      {
        type: 'copy',
        copy: `
### Oversight
I have designed, run, and evaluated [countless](/process) creative, ideation, and principles based workshops for many teams. Whether to find common ground, break through a tricky problem, or define ways of working, collaborative workshops form the basis of my design process.  
&nbsp;  
As the lead designer in the Community Integrity legitimacy team, I am responsible for setting product vision and moving the mission forward with thoughtful design output.
        `
      },
      {
        type: 'image',
        img: cat,
        alt: 'Animated Cat'
      },
    ]
  },
  overview: {
    title: 'Overview',
    path: '#overview',
    component: Content.Overview
  },
}

// data: [
//   {
//     type: 'copy',
//     copy: `
// ### Oversight
// I have designed, run, and evaluated [countless](/process) creative, ideation, and principles based workshops for many teams. Whether to find common ground, break through a tricky problem, or define ways of working, collaborative workshops form the basis of my design process.  
// &nbsp;  
// As the lead designer in the Community Integrity legitimacy team, I am responsible for setting product vision and moving the mission forward with thoughtful design output.
//     `
//   },
//   {
//     type: 'image',
//     img: cat,
//     alt: 'Animated Cat'
//   },
// ]
