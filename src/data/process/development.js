import {SECTIONS} from 'data/process/pageBasics';

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
      title: 'Prototyping',
      path: '#prototyping',
      data: [
        {
          type: 'copy',
          copy: `
  ### Prototyping
  Lots of my design time is spent prototyping. Having a usable, testable version of an idea helps me get to a better solution faster.  
  &nbsp;  
I write prototypes in many ways. At M&S, I used Google Polymer to create a design-driven, component led framework for creating [prototypes](https://medium.com/@utopastac/designing-a-style-guide-prototyping-toolkit-with-google-polymer-f898f73a2e0) for a system of apps (You can see the style guide itself [here](http://digistores-prototypes.mslabs.io/elements-guide/index.html#/home)).  
&nbsp;  
Whilst working at Google, I created many prototypes using React. The speed of iteration and the ability to use live data transformed our user testing approach. When working on the Wear OS team, I created the entire front end as a react app to allow for rapid testing on devices, with flexible controls to show the OS in different states, at different times, and with different user sttributes. This was also used as a style guide for early builds, showing all expected behaviours and edge cases.  
&nbsp;  
I tend to create all my prototypes in HTML and Javascript. I find the data driven flexibility extremely useful in both early and late stage product development.  
          `
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'Production',
      path: '#production',
      data: [
        {
          type: 'copy',
          copy: `
  ### Production
  Alongside prototyping, I also sometimes take my front-end work into production. At M&S, I worked with the mobile website team on a rapid project to replace the mobile site. We worked in an agile fashion, releasing early and often, adding features as soon as they were shippable.  
&nbsp;  
At Circles, I led the front end work for our websites and landing pages (static sites built using Hugo as our templating engine). I also built the first versions of the interface for the app. We created the first end-to-end flow in under 4 weeks using React Native and Redux.
          `
        },
      ]
    },
    {
      ...SECTIONS.overview,
      title: 'Why',
      path: '#why',
      copy: `
#### I know when to use the power of data-led prototypes to help inform and communicate design decisions. I code in HTML (Haml), CSS (Sass), and Javascript (Typescript), including frameworks like React (Redux), React Native, Angular, GSAP, and Polymer. I am extremely comfortable learning new languages and techniques.  
&nbsp;  
#### I enjoy thinking about design systematically, and focusing on development forces you to think that way. I love experimenting in code, learning, developing my skills and actually making things.
`
    },
  ]
}
