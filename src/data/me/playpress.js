import {SECTIONS} from 'data/work/pageBasics';
import image1 from 'images/content/playpress-1.jpg';
import image2 from 'images/content/playpress-2.jpg';
import image3 from 'images/content/playpress-3.jpg';
import image4 from 'images/content/playpress-4.jpg';
import image5 from 'images/content/playpress-5.jpg';
import image6 from 'images/content/playpress-6.jpg';
import image7 from 'images/content/playpress-7.jpg';
import image8 from 'images/content/playpress-8.jpg';


export const DATA = {
  meta: [
  ],
  pages: [
    {
      ...SECTIONS.sectionHeader,
      title: 'Building a toy company',
      path: '#building-a-toy-company',
    },
    {
      ...SECTIONS.section,
      title: 'Founding Playpress',
      path: '#founding-playpress',
      data: [
        {
          type: 'copy',
          copy: `
  ### Founding Playpress
  Playpress was born of a long development process by Matthew, one of my younger brothers. He was very keen to develop a toy range that could offer the same enjoyment he had when he was younger, but be more affordable - giving children the chance to build whole cities for a small price.
          `
        },
        {
          type: 'image',
          img: image1,
          alt: 'Playpress toys example'
        },
        {
          type: 'copy',
          copy: `
I started helping Matthew refine his designs and attempt to build a market strategy. I helped find manufacturing partners, develop a cohesive illustration style, and advise on the brand direction.  
&nbsp;  
We have since turned Playpress into a viable, profitable business that is stocked around the world. We produce all of our products in the UK to minimise air miles and have stayed true to our love of creativity. Playpress is a family-owned business, and care and quality really matter to us. Playpress is sold in the Science Museum, the Grenwich museum, the RA and lots of retailers around the UK and Europe. Our bespoke toy for the RNLI won a licensed Toy of the Year award.
          `
        },
        {
          type: 'image',
          img: image2,
          alt: 'Playpress toys example'
        },
      ]
    },
    {
      ...SECTIONS.section,
      title: 'The products',
      path: '#the-products',
      data: [
        {
          type: 'copy',
          copy: `
  ### The products
  Playpress is about exploring new possibilities. We take care to make our toys inclusive. They’re designed to let children play creatively while helping them develop key motor and cognitive reasoning skills.
          `
        },
        {
          type: 'image',
          img: image3,
          alt: 'Playpress toys example'
        },
        {
          type: 'image',
          img: image4,
          alt: 'Playpress toys example'
        },
        {
          type: 'image',
          img: image5,
          alt: 'Playpress toys example'
        },
        {
          type: 'image',
          img: image8,
          alt: 'Playpress toys example'
        },
        {
          type: 'copy',
          copy: `
  We currently sell an increasing range in several large retailers, as well as hundreds of small shops. We have worked with incredible brands like The Gruffalo, Jojo Maman Bebe, The Science Museum and others to create beautiful products that fit into our brand.
  &nbsp;  
  ### Sustainability & quality  
  We created Playpress with the belief that quality toys need to cost the earth. That’s why we put care into every part of our product, from the sourcing of our materials through to responsible manufacturing and design.
          `
        },
        {
          type: 'image',
          img: image6,
          alt: 'Playpress toys example'
        },
        {
          type: 'image',
          img: image7,
          alt: 'Playpress toys example'
        },
      ]
    },
  ]
}
