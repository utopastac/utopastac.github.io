import * as About from 'data/me/about';
import * as Playpress from 'data/me/playpress';
import * as Pixel from 'data/me/pixel';

export const TITLE_BLOCK = {
  title: 'Me',
  subtitle: `
#### How I like to work, what value I can add, and things you should know about me. 'Silly' is a lofty compliment!
`,
  links: [
    {
      title: 'How to make good things while being good to each other',
      subtitle: 'A list of commandments for making products in a happy and healthy team.',
      cta: 'Read on Medium',
      path: 'https://medium.com/@utopastac/how-to-make-good-things-while-being-good-to-each-other-3a98236529da'
    },
    {
      title: 'What tech companies can learn from advertising',
      subtitle: 'Product teams think ‘agile’ and ‘lean’ are really fast. They’re nice words, but they should try working in advertising.',
      cta: 'Read on Medium',
      path: 'https://medium.com/@utopastac/how-to-make-good-things-while-being-good-to-each-other-3a98236529da'
    }
    // {
    //   title: 'Anxiety in the workplace',
    //   subtitle: 'I suffer, or have variously suffered in the past, from various anxiety related problems and conditions.',
    //   cta: 'Read on Medium',
    //   path: 'https://medium.com/@utopastac/how-to-make-good-things-while-being-good-to-each-other-3a98236529da'
    // },
  ]
};

export const PAGES = [
  // {
  //   title: 'About me',
  //   intro: 'My life, my dogs, my family, my interests, and everything that makes me who I am.',
  //   subtitle: '#### Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione',
  //   path: `/about-me`,
  //   data: About.DATA
  // },
  {
    title: 'Playpress',
    intro: 'Playpress is a toy company I founded with my brother, creating award-winning, eco-friendly playsets.',
    subtitle: '#### Playpress is a set of construction toys, designed and manufactured in the UK. Made out of recycled cardboard, it is designed as an environmentally friendly, pocket-money price toy, but retaining all the fun of well-known brands like Lego.',
    path: `/playpress`,
    data: Playpress.DATA
  },
  {
    title: 'Pixel Portraits',
    intro: 'Portraits of people I have seen out and about in a pixelated style, drawn on my phone with Memopad.',
    subtitle: '#### Sometimes when I have downtime, on the train or while waiting, I like to draw the people I see.',
    path: `/pixel-portraits`,
    data: Pixel.DATA
  },
  {
    title: 'Email',
    type: 'link',
    path: `mailto:utopastac@gmail.com`,
  },
  {
    title: 'LinkedIn',
    type: 'link',
    path: `https://www.linkedin.com/in/utopastac/`,
  },
  {
    title: 'Twitter',
    type: 'link',
    path: `https://twitter.com/utopastac`,
  },
  {
    title: 'Medium',
    type: 'link',
    path: `https://medium.com/@utopastac`,
  },
]
