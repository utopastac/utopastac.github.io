import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { useRouteMatch, useHistory, useLocation } from "react-router-dom"; // use router hooks
import PageHeader from "components/PageHeader";
import InPageNavigation from "components/InPageNavigation";
import Overlay from "components/Overlay";
import Markdown from "components/Markdown";
import styles from "./index.module.sass";
import UseSetTheme from 'hooks/UseSetTheme';

function Content(props) {
  const match = useRouteMatch(); // Use hooks for router objects
  const history = useHistory();
  const location = useLocation();
  
  const { data, title, subtitle, theme, related } = props;
  const { pages, meta, doNotShowNavigation } = data;

  const [active, setActive] = useState();
  const [overlayOpen, setOverlayOpen] = useState(false);

  UseSetTheme(props.appProps.setTheme, theme);

  const paths = pages.map((page) => page.path);
  const refs = useRef(pages.map(() => React.createRef()));

  useEffect(() => {
    const path = location.hash;
    if (path) {
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

  const handleScroll = () => {
    const inViewRefs = refs.current.filter((ref) => ref && ref.current.offsetTop <= window.scrollY);
    const path = paths[inViewRefs.length - 1];
    setActive(path);
  };

  const switchSection = (path) => {
    history.push(`${match.url}${path}`);
    scrollToSection(path);
  };

  const scrollToSection = (path) => {
    const index = paths.indexOf(path);
    window.scrollTo({
      top: refs.current[index].current.offsetTop + window.innerHeight / 2,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.Main}>
      <PageHeader data={{title, subtitle}} />
      {((pages.length > 1 && !doNotShowNavigation) || meta.length > 1) && (
        <InPageNavigation
          sections={pages}
          active={active}
          meta={meta}
          setActive={switchSection}
        />
      )}
      <section className={styles.main}>
        {pages.map((page, i) => (
          <section ref={refs.current[i]} key={`RuleSections${i}`}>
            {React.createElement(page.component, {...page, setOverlayOpen})}
          </section>
        ))}
      </section>
      {overlayOpen && (
        <Overlay close={() => setOverlayOpen(false)} title={title} subtitle=''>
          <Markdown copy='Hi' />
        </Overlay>
      )}
    </div>
  );
}

Content.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Content;
