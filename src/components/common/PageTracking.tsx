import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../../lib/analytics';

const PageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default PageTracking;
