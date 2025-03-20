import {SECTIONS} from 'data/work/pageBasics';
import image1 from 'images/content/twitter-1.jpg';
import image2 from 'images/content/twitter-news.jpg';
import image3 from 'images/content/twitter-news-b.jpg';
import image4 from 'images/content/twitter-cta.jpg';
import image5 from 'images/content/twitter-nav.jpg';

export const DATA = {
  meta: [
    {title: 'Year', content: '2024 - now'},
    {title: 'Role', content: 'Principle product designer'}
  ],
  pages: [
    {
      ...SECTIONS.sectionHeader,
    },
    {
      ...SECTIONS.section,
      title: 'Transfers',
      path: '#transfers',
      data: [
        {
          type: 'copy',
          copy: `
  ### Transfers
  I have been helping the transfers org set a future vision and a new way of working. Transfers is one of the most revenue sensitive areas of the business, and I have worked with the leadership to implement a new experimental appraoch, whilst working extremely closely with the designer to foster a long term future vision.
  &nbsp;  
  &nbsp;  
  Transfers is now seen as the torch carrier for a new way of working within trust, and has developed a greater degree of autonomy. The future direction is being socialised and adopted around the company.
          `
        }
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Access',
      path: '#access',
      data: [
        {
          type: 'copy',
          copy: `
  ### Access
  Access and security control the front door into our products. I am helping to define a lasting strategic direction for both that covers both consumer and business use cases by visualising and prototyping different directions.
          `
        }
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Disputes',
      path: '#disputes',
      data: [
        {
          type: 'copy',
          copy: `
  ### Disputes
  Working on disputes means working closely with regulation to help make sure we get the best outcomes for the customer. I have been helping the disputes team imagine different futures and visualise new experiences.
          `
        }
      ]
    },
    {
      ...SECTIONS.sectionEnd
    },
    {
      ...SECTIONS.peerQuotes,
      quotes: [
        {
          content: `Peter demonstrates leadership by listening, validating, and steering conversations in honest and productive ways. Peter’s contributions go beyond tactical guidance; he fosters camaraderie and builds trust across the team. I deeply respect his leadership style, which prioritizes the growth and success of everyone around him. His humility is particularly admirable, especially for someone with his level of experience.`,
          attribution: 'Design partner'
        },
        {
          content: "Peter is perhaps the best non-manager mentor I have observed during my career. The speed at which he gained the ICs trust, improved their craft, and became a part of the team must be applauded and celebrated.",
          attribution: 'Research lead'
        },
        {
          content: "Peter is THE one designer everyone (in PD/CD/CI) is comfortable with, goes to for help, and is looked to in terms of craft and behavior. There are ICs who are natural leaders. He is ours.",
          attribution: 'Principle Content Designer'
        },
        {
          content: "One bit of Peter’s Magic is that he’s able to bring the team along to point out problems and make space to think about them together. He recognizes the root of the problem so quickly. Sometimes it feels like Peter’s able to predict the future—because he says says one thing and a few weeks or months later, the team realizes and own those perspectives togehter. Peter is almost always right, but he never forces the team to adopt his way of thinking—he brings everyone along and has a pulse on when the time is right/when teams are ready.",
          attribution: 'Design partner'
        }
      ]
    },
    {
      ...SECTIONS.overview,
      title: 'Team overview',
      copy: `
#### I moved around the world to the US on an O-1 Visa to work at Cash App. I am immensely proud of the relationships I have developed and the product areas I have managed to dive into.
&nbsp;  
#### I am currently leading design for security, whilst maintaining an eye over quality and process for the whole trust org.
`
    },
  ]
}
