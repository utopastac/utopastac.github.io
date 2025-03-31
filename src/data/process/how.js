import {SECTIONS} from 'data/process/pageBasics';
import image1 from 'images/content/how-1.png';

export const DATA = {
  doNotShowNavigation: true,
  meta: [
  ],
  pages: [
    {
      ...SECTIONS.sectionHeader,
      title: '',
    },
    {
      ...SECTIONS.section,
      title: 'Mission statement',
      path: '#mission-statement',
      data: [
        {
          type: 'copy',
          copy: `
  ### Mission statement
  I enable people to make their ideas, strategy, output, and design environment better by producing impactful work, cross-functional mentoring, and facilitating innovation to improve products at a high velocity.
          `
        },
        {
          type: 'image',
          img: image1,
          alt: 'How I work example'
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Strengths & motivations',
      path: '#strengths',
      data: [
        {
          type: 'copy',
          copy: `
  ### Strengths & Motivations
  I bring out the best in other people and can make other people’s ideas better, especially when facilitating small groups. I work very fast and, love to share very early, and am not precious or dogmatic. I am good at pushing teams to think beyond their existing thinking. I excell when working strategically on open ended and ambiguous things.
  &nbsp;  
  &nbsp;  
  **I am motivated by:** People. Velocity. Change. New Information.`
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Help me work well',
      path: '#help-me-work-well',
      data: [
        {
          type: 'copy',
          copy: `
  ### Where I work best
  At home in the evenings or in the few precious hours before lunch. With other people, in collaborative, open sessions. Never before 10 am. In situations that encourage (and celebrate) curiosity and playfulness.
&nbsp;  
### Interaction norms
I have high expectations of how people interact with each other, and hugely value respect and kindness. Small groups of focused people is my prefered form (why I love facilitating workshops). I am soft, open, informal, and thoughful in my language. I actively enjoy impossible deadlines with very clear expectations.
          `
        },
      ]
    },
    {
      ...SECTIONS.sectionEnd
    },
    {
      ...SECTIONS.overview,
      img: '',
      copy: `
#### I aim to make every team I am a part of a happy, fun, collaborative, and inclusive environment where everyone can be successful. Hold me to account for this!
`
    },
  ]
}
