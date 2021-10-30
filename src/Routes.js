import React from "react";
import { Route, Switch } from "react-router-dom";
//
import * as Data from 'data/navigation';
//
import * as ProcessData from 'data/process';
import * as MeData from 'data/me';
import * as WorkData from 'data/work';
//
import * as NavigationHelpers from 'helpers/navigation';
//

export default function Routes(props) {

  const { appProps } = props;

  const sections = Data.NAV_ITEMS.map((navItem, i) => {
    const { path, component } = navItem;
    return (
      <Route
        path={path}
        exact
        render={() => React.createElement(component, {...navItem, appProps: appProps}) }
        key={`navItem${i}`}
      />
    )
  });
  
  const workPages = NavigationHelpers.createContentRoutes({
    data: WorkData.PAGES,
    //related: relatedTopics,
    basePath: Data.WORK_PATH,
    theme: Data.WORK_THEME,
    appProps: appProps
  });
  
  const processPages = NavigationHelpers.createContentRoutes({
    data: ProcessData.PAGES,
    //related: relatedTopics,
    basePath: Data.PROCESS_PATH,
    theme: Data.PROCESS_THEME,
    appProps: appProps
  });

  const mePages = NavigationHelpers.createContentRoutes({
    data: MeData.PAGES,
    //related: relatedTopics,
    basePath: Data.ME_PATH,
    theme: Data.ME_THEME,
    appProps: appProps
  });

  return (
    <Switch>
      {sections}
      {mePages}
      {workPages}
      {processPages}

      {/* Home */}
      <Route
        path={`/(${Data.HOME.path}|index.html|)/`}
        render={() => React.createElement(Data.HOME.component, {appProps: appProps}) }
        exact
      />

      {/* Finally, catch all unmatched routes */}
      <Route
        render={() => React.createElement(Data.NOT_FOUND.component, {appProps: appProps}) }
      />
    </Switch>
  );
}
