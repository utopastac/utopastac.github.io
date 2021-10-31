import * as Twitter from 'data/work/twitter';
import * as Facebook from 'data/work/facebook';
import * as Spotify from 'data/work/spotify';
import * as Google from 'data/work/google';
import * as Circles from 'data/work/circles';
import * as Marks from 'data/work/marks';
import * as Agency from 'data/work/agency';

export const TITLE_BLOCK = {
  title: 'Work',
  subtitle: `
#### I am lucky enough to have worked on some amazing projects at incredible companies. I'm currently at Facebook, thinking about the future of Oversight for the internet.
`,
};

export const PAGES = [
  {
    title: 'Incoming @ Twitter',
    date: 'Late 2021',
    intro: 'At Twitter, I am soon joining as a Staff product designer in the revenue diversity team.',
    subtitle: "#### I'm excited to join Twitter at a time of accelerating product change to help lead design in the revenue diversity space.",
    path: `/twitter`,
    data: Twitter.DATA
  },
  {
    title: 'Facebook',
    date: '2020 - now',
    intro: 'At Facebook, I currently lead design for part of the wider Community Integrity team, working across the Oversight Board and Legitimacy pillars.',
    subtitle: '#### As the lead designer in the Community Integrity legitimacy team, I am responsible for setting product vision and moving the mission forward with thoughtful design output.',
    path: `/facebook`,
    data: Facebook.DATA
  },
  {
    title: 'Spotify',
    date: '2019 - 2020',
    intro: 'As one of few Principal designers at Spotify, I currently lead design for part of the Premium mission, focusing our team on lean experimentation and creative process.',
    subtitle: '#### As an Associate principal product designer in the premium mission, I am responsible for driving design strategy and craft in our focus area. I am through practice to make the output of those I work with better.',
    path: `/spotify`,
    data: Spotify.DATA
  },
  {
    title: 'Google',
    date: '2018 - 2019',
    intro: 'At Google I worked across a number of teams, including maps and Wear OS in metric-driven design and facilitation roles.',
    subtitle: '#### In my time at Google, I worked across 3 different teams on countless projects. As a lead interaction designer, I was responsible for delivering strategy and product design that had a real effect on our metrics. I ran lots of creative working sessions, and mentored many less senior designers.',
    path: `/google`,
    data: Google.DATA
  },
  {
    title: 'Circles',
    date: '2016 - 2017',
    intro: 'As a founding member of Circles, I looked after our creative process, UX and UI design, research and much of the front-end codebase (React Native).',
    subtitle: '#### Circles was a peer-led mentoring app for people with mental health issues. It matched people to professionally designed, facilitated courses to develop new skills in a supportive, collaborative environment, supported by people with real lived experience.',
    cta: 'Do this',
    path: `/circles`,
    data: Circles.DATA
  },
  {
    title: 'M&S',
    date: '2013 - 2016',
    intro: 'In 3 years at M&S I worked across a variety of teams in product design, creative, research focused roles using whatever techniques were appropriate to rapidly test our hypotheses',
    subtitle: '#### I held many roles over my 3 year period at M&S. From working in a small labs team, to being part of huge business transformation projects, to working on a rapid replacement of the mobile platform, I was able to use and develop all of my skills in research, design, and development in a varied atmosphere.',
    cta: 'Do this',
    path: `/m-and-s`,
    data: Marks.DATA
  },
  {
    title: 'Advertising & agency',
    date: '2005 - 2013',
    intro: 'After graduation, I worked in a variety of different digital agencies. I held numerous roles, from interactive Art Direction to Creative technologist.',
    subtitle: '#### I began working in digital design and advertising soon after finishing my degree. I worked at several big agencies (Including Syzygy and VML London) across massive brands. It was here I learned my development skills and the value of rapid prototyping.',
    cta: 'Do this',
    path: `/advertising-and-agency`,
    data: Agency.DATA
  },
]
