import {SECTIONS} from 'data/process/pageBasics';
import image1 from 'images/content/design-sprint-1.jpg';
import image2 from 'images/content/design-sprint-2.jpg';
import image3 from 'images/content/design-sprint-3.jpg';

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
      title: 'Planning',
      path: '#planning',
      data: [
        {
          type: 'copy',
          copy: `
  ### Planning
  A great deal of research has gone into the design sprints I have run. When working at M&S, we ran several sprints, one with our Basket and Checkout team.  
&nbsp;  
To prepare for the week, we spent a week before doing a thorough competitor and heuristic analysis, with an emphasis on future trends.
          `
        },
        {
          type: 'image',
          img: image1,
          alt: 'People at work in a sprint'
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Challenging the team',
      path: '#challenging-the-team',
      data: [
        {
          type: 'copy',
          copy: `
  ### Challenging the team
  I worked with the content and editorial team on a sprint focused around content discovery. The team was made up of everyone from junior picture editors to the directors.  
&nbsp;  
It's important in a sprint to make sure everyone's voice is heard and heard equally, and we managed to facilitate a very diverse team by challenging their relationships with each other. Tasks were designed to enable people to draw on their experience whilst also being challenged by possibilities they hadn't even considered.
          `
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'M&S',
      path: '#m-and-s',
      data: [
        {
          type: 'copy',
          copy: `
  ### Creative facilitation at M&S
  At Marks and Spencer, I facilitated many workshops involving teams from small, implementation focused groups all the way to heads of department.  
&nbsp;  
I helped several senior management teams during a company wide innovation project, designing workshops to encourage collaboration, creative thinking, empathy and a 'disagree and commit' attitude.
          `
        },
        {
          type: 'image',
          img: image2,
          alt: 'People at work in a sprint'
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Exploring possibilities',
      path: '#exploring-possibilities',
      data: [
        {
          type: 'copy',
          copy: `
  ### Exploring possibilities
  The key value in a design sprint is the vast potential for idea generation and exploration, to the point of exhaustion. With the basket and checkout team, in a 4 hour session we created hundreds of potential solutions when the consensus at the start was choosing between two. By opening up the possibilities to include the fantastical, we ended up expanding the possible.
          `
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Research',
      path: '#research',
      data: [
        {
          type: 'copy',
          copy: `
  ### Research
  The whole point of running design sprints is to get closer to user groups. In every instance of running a sprint, our users are recruited well in advance in order to answer some relevant behavioural questions.  
&nbsp;  
By starting the week having the team focus on the real people they are designing for, we made sure that everything was designed with a real use case and purpose.
          `
        },
        {
          type: 'image',
          img: image3,
          alt: 'People at work in a sprint'
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Prototyping',
      path: '#prototyping',
      data: [
        {
          type: 'copy',
          copy: `
  ### Rapid, high fidelity prototyping
  Sprints work best with teams of varied experience and from many disciplines. I have always encouraged people to prototype in ways they see fit, but also ensuring there is a good mixture of technical people in the room. In previous sprints, people have created everything from dramatic, video-based prototypes to fully working and integrated applications.
          `
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Users',
      path: '#users',
      data: [
        {
          type: 'copy',
          copy: `
  ### Getting in front of users
  The content team at M&S only had a vague, persona led grasp on their true audience, so having real users in front of them testing their own ideas was very important.  
&nbsp;  
By having the same 5 users at the end as were introduced at the start of the week, the team could see how their preconceptions matched to reality. Seeing work go from idea to live, interactive test in under a week was genuinely shocking for some.
          `
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Outcomes',
      path: '#outcomes',
      data: [
        {
          type: 'copy',
          copy: `
  ### Outcomes
  The danger with a sprint is the lack of momentum carried forward. With the basket and checkout team at M&S, we made sure to spend lots of time analysing what we had learned, what was potentially actionable, and what could go straight into a backlog. While only small parts of the prototypes made it into a production environment, the design sprint completely re-ordered their priorities and re-energised the team.
          `
        },
      ]
    },
    {
      ...SECTIONS.sectionEnd
    },
    {
      ...SECTIONS.overview,
      title: 'Why',
      path: '#why',
      copy: `
#### Whilst it has become harder to commit teams to week long explorations, the value in shared alignment and concept generation shouldn't be underestimated. The opportunity for dedicated research and thought in a cross-discipline environment, focused on outcomes, can deliver step-changes in product thinking.
`
    },
  ]
}
