import {SECTIONS} from 'data/work/pageBasics';
import image1 from 'images/content/meta-data-transparency.jpg';
import image2 from 'images/content/meta-ob-ds.jpg';
import image3 from 'images/content/meta-ob-ds-case.jpg';
import image4 from 'images/content/meta-ob-ds-user.jpg';

export const DATA = {
  meta: [
    {title: 'Year', content: '2020 - late 2021'},
    {title: 'Role', content: 'Lead product designer'}
  ],
  pages: [
    {
      ...SECTIONS.sectionHeader,
    },
    {
      ...SECTIONS.section,
      title: 'Oversight',
      path: '#oversight',
      data: [
        {
          type: 'copy',
          copy: `
  ### Oversight
  Working on the Oversight Board, an international body of experts that has independent decision making power, I was responsible for defining strategy and improving the experience for Meta users and Board Staff. I focused on understanding and improving the value exchange between the different people involved in the process, as well as tactical and end-to-end experience design.
          `
        },
        {
          type: 'image',
          img: image2,
          alt: 'Meta work example',
          caption: `We worked to implment a new design system designed to help the board members do their work.`
        },
        {
          type: 'image',
          img: image4,
          alt: 'Meta work example',
          caption: `We worked to improve user perception of independence of the board.`
        },
        {
          type: 'image',
          img: image3,
          alt: 'Meta work example',
          caption: `The case management system was designed for imprving case operations.`
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Transparency',
      path: '#transparency',
      data: [
        {
          type: 'copy',
          copy: `
  ### Legitimacy
  Inside the Community Integrity team, I work to make sure products are defensible and legitimate by promoting transparency, co-design, and accountability. I set the vision of the team and drive practical outcomes, such as the Transparency hub, and oter experiences to involve external stakeolders in the rule making and safe guarding processes.
          `
        },
        {
          type: 'image',
          img: image1,
          alt: 'Meta work example',
          caption: `We released a data transparency platform that allowed access to our policies and enforcement information.`
        },
      ]
    },
    {
      ...SECTIONS.peerQuotes,
      quotes: [
        {
          content: 'Peter likes working in a very collaborative way. He is constantly sharing updates about his work and seeking feedback. I really appreciate that Peter is giving a voice to everyone in the team who would like to influence the future of our products.',
          attribution: 'Engineering manager'
        },
        {
          content: "Thanks Peter for being such a great partner to work with on the internal legitimacy sprint, one of the most challenging projects I've been part of since joining FB. I learned a ton from you during those intense couple of weeks and only wish we had more opportunities to partner! Your openness, design excellence and collaboration are impressive and I really can't wait to see what you do here.",
          attribution: 'Content design lead'
        },
        {
          content: "Just wanted to say a BIG thank you Peter! These two months have been great and working with you is been so easy and fun!",
          attribution: 'Product designer'
        }
      ]
    },
    {
      ...SECTIONS.overview,
      title: 'Team overview',
      copy: `
#### I worked as part of a large multi-disciplinary team, covering policy, legal, and operations. I collaborate constantly with our engineers, and regularly present future directions to people at the highest levels in the company. Making sure we have broad alignment and shared goals is key in what is a very ambiguous space.
`
    },
  ]
}
