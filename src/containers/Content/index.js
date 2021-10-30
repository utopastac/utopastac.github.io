import React, { useState, useEffect, useRef, createRef } from "react";
import PropTypes from 'prop-types';
import PageHeader from "components/PageHeader";
import InPageNavigation from "components/InPageNavigation";
import Overlay from "components/Overlay";
import Markdown from "components/Markdown";
import { withRouter } from "react-router-dom";
import styles from "./index.module.sass";
//
import UseSetTheme from 'hooks/UseSetTheme';

function Content(props) {
  
  const {match, history, location, data, title, subtitle, theme, related } = props;
  const { pages, meta } = data;

  const [active, setActive] = useState();
  const [overlayOpen, setOverlayOpen] = useState(false);

  UseSetTheme(props.appProps.setTheme, theme);

  const paths = pages.map((page) => page.path);
  const refs = useRef(pages.map(() => React.createRef()));

  const sectionsToRender = pages.map((page, i)=>{
    return (
      <section
        ref={refs.current[i]}
        key={`RuleSections${i}`}
      >
        { React.createElement(page.component, {...page, setOverlayOpen: setOverlayOpen}) }
      </section>
    )
  });

  useEffect(() => {
    const path = location.hash;
    if(path){
      setActive(path);
      scrollToSection(path);
    }
  }, [location]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = (event) => {
    const inViewRefs = refs.current.filter((ref)=>{
      if(ref){
        return ref.current.offsetTop <= window.scrollY
      }
    });
    const path = paths[inViewRefs.length-1];
    setActive(path);
  }

  const switchSection = (path) => {
    history.push(`${match.url}${path}`);
    scrollToSection(path);
  }

  const scrollToSection = (path) => {
    const index = paths.indexOf(path);
    window.scrollTo({
      top: refs.current[index].current.offsetTop + window.innerHeight/2,
      left: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className={styles.Main}>

      <PageHeader
        data={{title: title, subtitle:subtitle}}
      />
      {pages.length > 1 &&
        <InPageNavigation
          sections={pages}
          active={active}
          meta={meta}
          setActive={switchSection}
        />
      }
      <section className={styles.main}>
          { sectionsToRender }
      </section>
      
      {overlayOpen &&
        <Overlay close={()=>setOverlayOpen(false)} title={title} subtitle='Policy details'>
          <Markdown copy={data.policyDetails.copy} />
        </Overlay>
      }
        
    </div>
    
  );
}

export default withRouter(Content);

Content.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

Content.defaultProps = {
  
};
