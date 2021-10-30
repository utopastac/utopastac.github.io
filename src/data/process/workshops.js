import {SECTIONS} from 'data/process/pageBasics';
import image1 from 'images/content/workshop-1.jpg';
import image2 from 'images/content/workshop-2.jpg';
import image3 from 'images/content/workshop-3.jpg';

export const DATA = {
  meta: [
  ],
  pages: [
    {
      ...SECTIONS.sectionHeader,
      title: 'Process',
      path: '#process',
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
  No two workshops should be the same. Most of the time involved is in design an preparation. I undertake all the necessary research, looking at team dynamics, the nature of the problem we're trying to solve, potential outcomes, and follow up steps.
          `
        },
        {
          type: 'image',
          img: image1,
          alt: 'People at work in a workshop'
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Analysis',
      path: '#analysis',
      data: [
        {
          type: 'copy',
          copy: `
  ### Analysis
  Without sensible analysis, workshops can feel pointless - a wide generation of thoughts and ideas, but with no direct outcome. An important part of my role is, alongside key stakeholders, analysing the output and forming actionable outcomes to make sure everyone involved feels their input was valuable.  
  &nbsp;  
This can take the form of follow up sessions, short, easily digestible presentations, defined principles to follow, or directly working with the teams to produce something that can be taken to users.
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
          alt: 'People at work in a workshop'
        },
        {
          type: 'image',
          img: image3,
          alt: 'People at work in a workshop'
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Circles',
      path: '#circles',
      data: [
        {
          type: 'copy',
          copy: `
  ### Circles founding meetings
  I was first involved with Circles in a consultancy role. Having met the main founder, I helped him synthesise his ideas using co-creative workshops with potential service users and experts in their fields.  
&nbsp;  
As an outcome of these workshops and analysis of previous research, I helped take what was a collection of vague thoughts into a well funded startup with a strong sense of product direction.
          `
        },
      ]
    },
    {
      ...SECTIONS.overview,
      title: 'Why',
      path: '#why',
      copy: `
#### Group facilitation is one of the best ways to drive alignment with disparate disciplines. In our remote first world, bringing people together syncronously and smoothly to have a shared problem solving experience can help develop a strong team culture.
`
    },
  ]
}
