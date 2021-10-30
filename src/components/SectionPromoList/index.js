import React from "react";
import PropTypes from 'prop-types';
import SectionPromo, {LARGE, MEDIUM, SMALL, TINY} from 'components/SectionPromo';
import styles from "./index.module.sass";

export default function SectionPromoList(props) {
  const { data, basePath, title, size } = props;

  const promos = data.map((promo, i)=> {
    return (
      <SectionPromo {...promo} key={`promo${i}`} basePath={basePath} size={size} />
    )
  });

  let style = null;
  switch(size){
    case LARGE:
      style = styles.large;
      break;
    case MEDIUM:
      style = styles.medium;
      break;
    case SMALL:
      style = styles.small;
      break;
    case TINY:
      style = styles.tiny;
      break;
  }

  return (
    <div className={`${styles.Main} ${style}`}>
      <ul>
        {promos}
      </ul>
    </div>
  );
}

SectionPromoList.propTypes = {
  data: PropTypes.array.isRequired,
  basePath: PropTypes.string.isRequired,
  title: PropTypes.string
};

SectionPromoList.defaultProps = {
  basePath: ''
}
