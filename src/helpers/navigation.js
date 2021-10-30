import React from "react";
import { Route } from "react-router-dom";
//
import * as Pages from 'containers';
//

export function createData(sections, dataSource){
  const data = sections.map((section, i) => {
    let index = 0;
    const sectionData = section.contents.map((content, j) => {
      index += 1;
      const element = {
        title: content,
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        path: `/${content.toLowerCase().split(' ').join('-')}`,
        index: index,
        data: dataSource
      }
      return element; 
    });

    return {
      title: section.title,
      path: `/${section.title.toLowerCase().split(' ').join('-')}`,
      contents: sectionData
    }
  });
  return data;
}

export function createContentRoutes(props){
  const {data, basePath, related, theme, appProps, light} = props;

  const routes = data.map((route, i) => {
    if(route.type==='link') return;
    return (
      <Route
        path={`${basePath}${route.path}`}
        render={() => React.createElement(Pages.Content, {
          ...route,
          related: related,
          theme: theme,
          light: light,
          appProps: appProps})
        }
        key={`route${i}`}
      />
    )
  });
  return routes;
}
