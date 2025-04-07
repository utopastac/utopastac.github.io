import React from "react";
import PropTypes from 'prop-types';
import MainContent from "containers/MainContent";
import SectionTitle from 'components/SectionTitle';
import styles from "./index.module.sass";

export default function SectionHeader(props) {
  const { title } = props;
  return (
    <div className={styles.Main}>
      <MainContent>
        {title.length > 0 &&
          <SectionTitle title={title} />
        }
      </MainContent>
    </div>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
