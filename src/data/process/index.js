import * as Workshops from 'data/process/workshops';
import * as Sprints from 'data/process/sprints';
import * as Development from 'data/process/development';
import * as How from 'data/process/how';

export const TITLE_BLOCK = {
  title: 'Process',
  subtitle: `
#### I like solving problems, and I dislike dogma. Being playful and inclusive of viewpoints and methods is close to my heart.
`,
};

export const PAGES = [
  {
    title: 'How I work',
    intro: 'How I like to work, what value I can add, and things you should know about me.',
    subtitle: "#### How I like to work, what value I can add, and things you should know about me. 'Silly' is a lofty compliment!",
    path: `/how-i-work`,
    data: How.DATA
  },
  {
    title: 'Workshops',
    intro: 'Facilitating group sessions is one of the joys of my job. I get energy from inspiring teams to push beyond their existing thinking.',
    subtitle: '#### I have designed, run, and evaluated countless creative, ideation, and principles based workshops for many teams. Whether to find common ground, break through a tricky problem, or define ways of working, collaborative workshops form the basis of my design process.',
    path: `/workshops`,
    data: Workshops.DATA
  },
  {
    title: 'Design Sprints',
    intro: 'As part of the product discovery process, I have planned, run, and facilitated many design sprints with groups of all ability levels.',
    subtitle: '#### I have planned, run, and facilitated many design sprints with groups of all ability levels. When faced with a defined problem and many different solutions, design sprints can be fastest way of getting to a well thought through solution that has been tested with real people.',
    path: `/design-sprints`,
    data: Sprints.DATA
  },
  {
    title: 'Front-end development',
    intro: 'After learning to code in the glory days of Flash, I have mantained and developed my skills in modern technologies so that I can rapidly prototype real services using real data.',
    subtitle: '#### Alongside design, I have have extensive experience in front-end development. I focus mainly on creative prototyping as design, making high fidelity, data-driven prototypes for rapid testing and iteration.',
    path: `/front-end-development`,
    data: Development.DATA
  }
]
