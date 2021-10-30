import {SECTIONS} from 'data/work/pageBasics';
import image1 from 'images/content/marks-cook-app.jpg';
import image2 from 'images/content/marks-tuesday.jpg';
import image3 from 'images/content/marks-socks.jpg';
import image4 from 'images/content/marks-handbags.jpg';
import image5 from 'images/content/marks-sparks.jpg';

export const DATA = {
  meta: [
    {title: 'Year', content: '2013 - 2016'},
    {title: 'Role', content: 'Lead product designer'}
  ],
  pages: [
    {
      ...SECTIONS.sectionHeader,
    },
    {
      ...SECTIONS.section,
      title: 'M&S Labs',
      path: '#m-and-s-labs',
      data: [
        {
          type: 'copy',
          copy: `
  ### M&S Labs
  I joined M&S in the digital labs team, which became the Venture labs team. We started with a remit of demonstrating the value of an agile process within the company via rapid iteration on various products.
&nbsp;  
&nbsp;  
  Whilst in labs, I was the sole designer in a team of all engineers and a Product owner. We decided what to work on as a team based on solid hypothesis. Our most successful venture, Cook with M&S, was installed over 350,000 times.
          `
        },
        {
          type: 'image',
          img: image1,
          alt: 'Marks and Spencer work example',
          caption: `Cook with M&S, an iOS, Android, and web app, has been installed over 350,000 times. We designed the app to help strengthen our position with the homemade food market.`
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Try Tuesday',
      path: '#try-tuesday',
      data: [
        {
          type: 'copy',
          copy: `
  ### Try Tuesday
  Tuesday was the last project I worked on with the venture lab. We wanted to test whether a stylist guided experience would lead to higher sales and lower returns within our target market.
  &nbsp;  
  &nbsp;  
I carried out lots of market and behavioural research before designing the chat based interface. We took Tuesday from our MVP of an over-the-phone service into a smart and elegant data-driven product.
          `
        },
        {
          type: 'image',
          img: image2,
          alt: 'Marks and Spencer work example',
          caption: `Tuesday was built around a conversational interface between the user and a real stylist. This helped build trust in the recommendations.`
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Plan A and charity',
      path: '#plan-a-and-charity',
      data: [
        {
          type: 'copy',
          copy: `
  ### Plan A and charity
  I was lucky enough to work closely on a few projects with the excellent [Plan A](https://corporate.marksandspencer.com/sustainability) (Corporate responsibility) team at M&S. We worked together designing and prototyping research heavy projects with Cambridge University around fashion sustainability and reducing cotton to landfill.
  &nbsp;  
  &nbsp;  
I also had the opportunity to work closely with the charity teams and food health teams. I ran workshops and design sprints to help them identify areas of customer need that overlapped with their aims, and helped with prototyping and testing their ideas.
          `
        },
        {
          type: 'image',
          img: image3,
          alt: 'Marks and Spencer work example',
          caption: `We experimented with many business models, not all of which took off. These were early designs for a sock subscription service.`
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Sparks',
      path: '#sparks',
      data: [
        {
          type: 'copy',
          copy: `
  ### Sparks
  Working with IDEO, I was part of the design and implementation team for Sparks, M&S's loyalty scheme. We worked very closely with user groups, testing and iterating through concepts to help customers understand what was an unfamiliar concept.
  &nbsp;  
  &nbsp;  
Working closely with the development team, I built a rails-based prototype of the end to end flow, and helped set up a strong research base for the project.
          `
        },
        {
          type: 'image',
          img: image5,
          alt: 'Marks and Spencer work example',
          caption: `The Sparks offering presented us with many interaction design challenges.`
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Digital Stores',
      path: '#digital-stores',
      data: [
        {
          type: 'copy',
          copy: `
  ### Digital Stores
  I was given the opportunity to run the design and research for the 'digital stores' team on a vast project to replace all of the in-store, staff facing applications.
  &nbsp;  
  &nbsp;  
I designed and conducted a strong research programme, involving many days in store observing colleagues at work.
&nbsp;  
  &nbsp;  
I created a Google Polymer based style guide and prototyping system to keep a track of the externally run development process across all of the 40 apps.
          `
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Retail Labs',
      path: '#retail-labs',
      data: [
        {
          type: 'copy',
          copy: `
  ### Retail Labs
  My last role within M&S was within the 'Retail labs' team, tasked with improving the customer and staff experience in stores using agile rapid iteration techniques. The small team married physical design with interesting tech to prove value as quickly and cheaply as possible.
  &nbsp;  
  &nbsp;  
  We ran design sprints, tested early and often, and presented findings back to appropriate teams of many varied ideas.
  &nbsp;  
  &nbsp;  
  We worked on a lingerie fitting room application, where customers could order new sizes and colours off the shop floor to be delivered into the changing room. This involved staff and customer facing applications, as well as smart hardware such as magic mirrors to make things seamless and convenient.
  &nbsp;   
  &nbsp;  
  We also worked with the digital shelf edge label team to help them get some customer benefit from their new hardware.
          `
        },
        {
          type: 'image',
          img: image4,
          alt: 'Marks and Spencer work example',
          caption: `Some of our projects were led by merchandising teams. This was designed to show our handbag range in a different and more premium light.`
        },
      ]
    },
    {
      ...SECTIONS.overview,
      title: 'Team overview',
      copy: `
#### I consider myself hugely fortunate to have worked at M&S when I did. I collaborated closely with so many wonderful people across all disciplines, from engineering to commercial partners. The foundation of how I like to work was built here.
`
    },
  ]
}
