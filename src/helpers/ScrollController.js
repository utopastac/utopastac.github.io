import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const ScrollController = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (history.action === 'POP') {
      return;
    }
    // In all other cases, check fragment/scroll to top
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [history, location]);

  return null;
};

export default ScrollController;
