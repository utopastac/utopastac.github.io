import {SECTIONS} from 'data/work/pageBasics';
import image1 from 'images/content/google-retention.jpg';

export const DATA = {
  meta: [
    {title: 'Year', content: '2020 - now'},
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
  Working on the Oversight Board, an international body of experts that has independent decision making power, I am responsible for defining strategy and improving the experience for Facebook users and Board Staff.
          `
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
#### I work as part of a large multi-disciplinary team, covering policy, legal, and operations. I collaborate constantly with our engineers, and regularly present future directions to people at the highest levels in the company. Making sure we have broad alignment and shared goals is key in what is a very ambiguous space.
`
    },
  ]
}
