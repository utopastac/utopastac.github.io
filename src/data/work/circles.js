import {SECTIONS} from 'data/work/pageBasics';
import image1 from 'images/content/circles-main.jpg';
import image2 from 'images/content/circles-events.jpg';
import image3 from 'images/content/circles-chat.jpg';
import image4 from 'images/content/circles-onboarding.jpg';
import image5 from 'images/content/circles-structure.jpg';
import image6 from 'images/content/circles-old-screens-2.jpg';
import image7 from 'images/content/circles-design-system.jpg';
import banner from 'images/content/circles-banner.jpg';

export const DATA = {
  pageTitle: `
    Deign as a co-founder of a VC backed startup.
  `,
  meta: [
    {title: 'Year', content: '2016 - 2018'},
    {title: 'Role', content: 'Head of product design'}
  ],
  pages: [
    {
      ...SECTIONS.sectionWideImage,
      img: banner
    },
    {
      ...SECTIONS.sectionHeader,
    },
    {
      ...SECTIONS.section,
      title: 'The role',
      path: '#the-role',
      data: [
        {
          type: 'copy',
          copy: `
  ### The role
  I joined Circles at the beginning, as a founding member, in October 2016. Having spent the evenings for a few months prior bootstrapping a discovery process, we dived in to build an MVP. After a year of research insight, we are currently committed to building the right product to launch in September.  
&nbsp;  
At Circles, I have run a full, iterative UX process, including over 150 1-1 user interviews, creative workshops and many design and product iterations.  
&nbsp;  
I also managed the front-end development in our early days, releasing the app cross platform with feature parity using React Native.  
          `
        },
        {
          type: 'image',
          img: image7,
          alt: 'Circles work example',
          caption: ``
        },
        {
          type: 'image',
          img: image5,
          alt: 'Circles work example',
          caption: `The app is designed to be familiar and doesn't break from expectation in terms of a communication app.`
        },
        {
          type: 'image',
          img: image1,
          alt: 'Circles work example',
          caption: `I worked closely with an illustrator and animator to set the tone for the brand.`
        }
      ]
    },
    {
      ...SECTIONS.section,
      title: 'The App',
      path: '#the-app',
      data: [
        {
          type: 'copy',
          copy: `
  ### The App
  The app has been tested with several cohorts of users and has gone through several iterations. Working closely with our users, we followed a highly iterative approach to the product design, releasing early and often.  
&nbsp;  
By taking a research first approach to product development, we iterated through several propositions. Circles now offers short, online only, group-based practical learning programmes based around mental health. These courses are designed by experts and delivered by experienced peer mentors to small groups of 4-8 people. The courses are designed to be collaborative, giving a sense of purpose to the group in order to try and develop a connection that they can rely on in the future.
          `
        },
        {
          type: 'image',
          img: image3,
          alt: 'Circles work example',
          caption: `The app is structured like a super-powered chat application. Each Circle has an expert peer mentor who sets activities for the groups.`
        },
        {
          type: 'image',
          img: image2,
          alt: 'Circles work example',
          caption: `We adde din events for users to take part in.`
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
  Over the course of building our product over the first 10 months, I conducted 100 targeted 1-1 interviews, 10 group workshops, and managed remote research.  
  &nbsp;  
Due to the nature of the product, it was especially important to try and understand where the gaps in peoples care really lies.  
&nbsp;  
Feeding this insight back into product design process has been a vital part of feeling confident in the company direction.  
          `
        },
        {
          type: 'image',
          img: image4,
          alt: 'Circles work example',
          caption: `All onboarding in the app is done within the same interface you encounter is day-to-day use. This was designed to familiarise people with the concepts without it feeling too much like an outright tutorial.`
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Engineering',
      path: '#engineering',
      data: [
        {
          type: 'copy',
          copy: `
  ### Front end development
  The core of the app was built using React Native and Redux to ensure we could launch with feature parity across iOS and Android. In the early days of the company, I built all of the front-end of the app. As we hired more engineers, I have taken to just being involved in complex interaction design and UI development.  
  &nbsp;  
I have also created many html and rails based prototypes for testing purposes. It has been important at many stages of development to have high fidelity (in interaction terms) prototypes for both our investors and for research.
          `
        },        
        {
          type: 'image',
          img: image6,
          alt: 'Circles work example',
          caption: `In this earlier version of the app, the circle was simplified to be based around regular, appointed checkins.`
        },
      ]
    },
    {
      ...SECTIONS.sectionEnd
    },
    {
      ...SECTIONS.overview,
      title: 'Team overview',
      copy: `
#### Founding Circles was a wonderful experience. We started from nothing, secured a large seed round investment from [Kindred Capital](https://kindredcapital.vc), and rapidly developed a product from scratch with a small, tight knit team.
`
    },
  ]
}
