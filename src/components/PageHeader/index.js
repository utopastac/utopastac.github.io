import React, { useContext } from "react";
import ThemeContext from "containers/ThemeContext";
import PropTypes from 'prop-types';
import MainContent from "containers/MainContent";
import Markdown from 'components/Markdown';
import SectionLink from 'components/SectionLink';
import SectionTitle from 'components/SectionTitle';
import AnimatedBackground from "components/AnimatedBackground";
import AnimatedBackgroundCanvas from "components/AnimatedBackgroundCanvas";
import styles from "./index.module.sass";

export default function PageHeader(props) {
  const { data } = props;

  const theme = useContext(ThemeContext);

  let links;
  if(data.links){
    links = data.links.map((link, i) => {
      return (
        <SectionLink {...link} key={`link${i}`} />
      )
    });
  }

  return (
    <div>
      <section className={styles.Main} style={{color: theme.text, backgroundColor: theme.bg}}>
        <AnimatedBackgroundCanvas />
        <MainContent>
          <header>
            <div>
              <SectionTitle title={data.title} color={theme.text} home={data.home} />
            </div>
            <div className={styles.content}>
              <Markdown copy={data.subtitle} />
            </div>
          </header>
          
        </MainContent>
      </section>
      {data.links &&
          <MainContent>
            <div className={styles.links}>
              {/* <h5>Writing</h5> */}
              <div>{ links }</div>
            </div>
          </MainContent>
        }
    </div>
  );
}

PageHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
