import React from "react";
import PropTypes from 'prop-types';
import MainContent from "containers/MainContent";
import Copy from 'components/Content/Section/Copy';
import SectionImage from 'components/Content/Section/SectionImage';
import ImageGrid from 'components/Content/Section/ImageGrid';
import styles from "./index.module.sass";

export default function Section(props) {
  const { data } = props;
  
  const elements = data.map((item, index)=>{
    let element = null;
    const key = `elem${index}`;
    switch(item.type){
      case 'copy':
        element = (<Copy {...item} key={key} />);
        break;
      case 'image':
        element = (<SectionImage {...item} key={key} />);
        break;
      case 'imageGrid':
        element = (<ImageGrid {...item} key={key} />);
        break;
    }
    return element;
  });
  
  return (
    <div className={styles.Main}>
      <MainContent>
        <div className={styles.content}>
          {elements}
        </div>
      </MainContent>
    </div>
  );
}

Section.propTypes = {
  data: PropTypes.object.isRequired
};
