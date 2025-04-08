import * as CashApp from 'data/work/cash-app';
import * as Personio from 'data/work/personio';
import * as Twitter from 'data/work/twitter';
import * as Facebook from 'data/work/facebook';
import * as Spotify from 'data/work/spotify';
import * as Google from 'data/work/google';
import * as Circles from 'data/work/circles';
import * as Marks from 'data/work/marks';
import * as Agency from 'data/work/agency';
import * as UISamples from 'data/work/ui-samples';

export const TITLE_BLOCK = {
  title: 'Work',
  subtitle: `
#### I am lucky enough to have worked on some amazing projects at incredible companies. I'm currently at Cash app, thinking about the future of trust for fintechs.
`,
};

export const PAGES = [
  {
    title: 'Cash app',
    date: 'Early 2024 - now',
    intro: 'I am a principle designer in the trust space, responsible for a wide range of product areas.',
    subtitle: "#### Trust at cash app is a vital part of the business, looking after users privacy, safety, and security whilst working alongside regulatory partners. As a principle designer, I have a broad scope of work I am responsible for and take an active role in uplevelling quality across the team. I am proud to work really closely with some of our earlier career team members.",
    path: `/cash-app`,
    data: CashApp.DATA
  },
  {
    title: 'Personio',
    date: 'Early 2023 - 2024',
    intro: 'Design lead for the apps team, where new products were incubated.',
    subtitle: "#### As staff designer for apps, I helped one of Europe's leading unicorn companies with design practice in a time of enormous growth and change. I focused on uplevelling our experience and craft, whilst launching new 0-1 products.",
    path: `/personio`,
    data: Personio.DATA
  },
  {
    title: 'Twitter',
    date: 'Late 2021 - 2023',
    intro: 'I led design for subscriptions as a Staff product designer in the revenue diversity team.',
    subtitle: "#### I joined Twitter at a time of accelerating product change to help lead design in the revenue diversity space. I was primarily focused on imprving on consumer subscription product, Twitter Blue.",
    path: `/twitter`,
    data: Twitter.DATA
  },
  {
    title: 'Meta',
    date: '2020 - late 2021',
    intro: 'Design lead for part of the wider Community Integrity team, working across the Oversight Board and Legitimacy pillars.',
    subtitle: '#### As the lead designer in the Community Integrity legitimacy team, I was responsible for setting product vision and moving the mission forward with thoughtful design output.',
    path: `/meta`,
    data: Facebook.DATA
  },
  {
    title: 'Spotify',
    date: '2019 - 2020',
    intro: 'Principal designer focusing our team on lean experimentation and creative process.',
    subtitle: '#### As an Associate principal product designer in the premium mission, I am responsible for driving design strategy and craft in our focus area. I am through practice to make the output of those I work with better.',
    path: `/spotify`,
    data: Spotify.DATA
  },
  {
    title: 'Google',
    date: '2018 - 2019',
    intro: 'I worked across a number of teams, including maps and Wear OS in metric-driven design and facilitation roles.',
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
  {
    title: 'UI samples',
    
    intro: 'A selection of UI samples from the last few years, spanning a few different companies.',
    subtitle: '#### A selection of UI samples from the last few years, spanning a few different companies.',
    cta: 'Do this',
    path: `/ui-samples`,
    data: UISamples.DATA
  },
]
