import React, { useContext } from "react";
import PropTypes from 'prop-types';
import Markdown from 'components/Markdown';
import AnimatedBackgroundCanvas from "components/AnimatedBackgroundCanvas";
import GradientTimeBackground from "components/GradientTimeBackground";
import styles from "./index.module.sass";
import ThemeContext from "containers/ThemeContext";

export default function Overview(props) {

  const { copy, img } = props;

  const theme = useContext(ThemeContext);
  // style={{background: theme.text, color: theme.bg}}

  return (
    <div className={styles.Main}>
      {/* <AnimatedBackgroundCanvas /> */}
      <section className={styles.content}>
        <GradientTimeBackground width={800} height={600} />
        <div className={styles.inner}><Markdown copy={copy} /></div>
      </section>
      {img &&
        <section className={styles.image} />
      }
    </div>
  );
}

Overview.propTypes = {
  copy: PropTypes.string.isRequired,
  img: PropTypes.string,
};
