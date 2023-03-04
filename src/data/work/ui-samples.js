import {SECTIONS} from 'data/work/pageBasics';
import image5 from 'images/content/spotify-1.png';
import image2 from 'images/content/circles-design-system.jpg';
import image4 from 'images/content/how-1.png';
import image3 from 'images/content/twitter-news.jpg';
import image1 from 'images/content/twitter-2.jpg';
import image6 from 'images/content/twitter-1.jpg';
import image7 from 'images/content/twitter-nav.jpg';
import image8 from 'images/content/circles-initial.jpg';

export const DATA = {
  meta: [
  ],
  pages: [
    {
      ...SECTIONS.section,
      title: 'UI Samples',
      path: '#uisamples',
      data: [
        {
          type: 'imageList',
          images: [
            {
              img: image1,
              alt: 'Work example',
            },
            {
              img: image2,
              alt: 'Work example',
            },
            {
              img: image3,
              alt: 'Work example',
            },
            {
              img: image4,
              alt: 'Work example',
            },
            {
              img: image5,
              alt: 'Work example',
            },
            {
              img: image6,
              alt: 'Work example',
            },
            {
              img: image7,
              alt: 'Work example',
            },
            {
              img: image8,
              alt: 'Work example',
            },
          ]
        },
      ]
    },
  ]
}
