import React from "react";
import * as ProcessData from 'data/process';
import * as MeData from 'data/me';
import * as WorkData from 'data/work';
import * as Pages from 'containers';
import LinkSet from 'components/LinkSet';
//
import * as Colors from 'data/colors';
//
export const WORK_PATH = '/work';
export const PROCESS_PATH = '/process';
export const ME_PATH = '/me';
//
export const HOME = {title: 'Home', component: Pages.Home, path: '/'};
//
//
//
export const NOT_FOUND = {
  component: Pages.NotFound
}
//
//
export const WORK_THEME = Colors.BLACK_THEME;
export const PROCESS_THEME = Colors.CORAL_THEME;
export const ME_THEME = Colors.GREEN_THEME;
//
//
//
export const NAV_ITEMS = [
  {
    title: 'Resumé',
    component: Pages.Landing,
    data: WorkData,
    path: WORK_PATH,
    links: (<LinkSet data={WorkData} basePath={WORK_PATH} />),
    theme: WORK_THEME,
    landingTheme: Colors.BLUE_THEME
  },
  // {
  //   title: 'Process',
  //   component: Pages.Landing,
  //   data: ProcessData,
  //   path: PROCESS_PATH,
  //   links: (<LinkSet data={ProcessData} basePath={PROCESS_PATH} />),
  //   theme: PROCESS_THEME,
  //   landingTheme: Colors.CORAL_THEME
  // },
  {
    title: 'Me',
    component: Pages.Landing,
    data: MeData,
    path: ME_PATH,
    links: (<LinkSet data={MeData} basePath={ME_PATH} />),
    theme: ME_THEME,
    landingTheme: Colors.GREEN_THEME
  }
];
