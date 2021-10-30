import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';

const ScrollController = (props) => {

  useEffect(() => {
    console.log(props);

    if (props.history.action === 'POP') {
      return;
    }
    // In all other cases, check fragment/scroll to top
    let hash = props.location.hash;
    if (hash) {
      let element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({block: 'start', behavior: 'smooth'});
      }
    } else {
      window.scrollTo(0, 0);
    }
  });

  return null;
};

export default withRouter(ScrollController);
