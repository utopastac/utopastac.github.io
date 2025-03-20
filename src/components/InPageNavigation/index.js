import React, { useContext }  from "react";
import ThemeContext from "containers/ThemeContext";
import PropTypes from 'prop-types';
import MainContent from "containers/MainContent";
import * as Content from 'components/Content';
import styles from "./index.module.sass";

export default function InPageNavigation(props) {
  const { sections, active, meta, setActive } = props;
  
  const theme = useContext(ThemeContext);
  
  const blocks = meta.map((meta, i)=>{

    const { title, content } = meta;

    return (
      <div
        key={`block${i}`}
        className={styles.block}
      >
        <h5>{title}</h5>
        <p>{content}</p>
      </div>
    )
  });

  const sectionList = sections.map((section, i)=>{

    const { title, path } = section;
    const activeSection = active===path ? styles.active : '';
    if(!path) return;
    const sub = section.sub ? styles.sub : styles.notSub;
    
    
    // let element = null;
    
    // switch(section.component){
    //   case Content.Section:
    //     break;
    //   default:
    //     break;
    // }
    

    return (
      <li
        key={`sectionList${i}`}
        className={`${activeSection} ${sub}`}
        onClick={()=>setActive(path)}
      >
        {title}
      </li>
    )
  });

  return (
    <div className={styles.Main} style={{color: theme.text, backgroundColor: theme.bg, borderColor: theme.text}}>
      <MainContent>
        <div className={styles.content}>
          {blocks}
          {sections.length > 1  &&
            <div className={styles.block}>
              <h5>Contents</h5>
              <ul>
                {sectionList}
              </ul>
            </div>
          }
        </div>
      </MainContent>
    </div>
  );
}

InPageNavigation.propTypes = {
  section: PropTypes.object.isRequired,
  active: PropTypes.string.isRequired,
  meta: PropTypes.array.isRequired,
  setActive: PropTypes.func.isRequired,
};
