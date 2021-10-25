import { Box } from '@material-ui/core';
import WatchNews from 'components/WatchNews/WatchNews';
import { UserContext } from 'contexts/UserContext';
import React, { useContext, useEffect } from 'react';
import HomeMenu from '../HomeMenu';
import HomeBanner from './Banner/HomeBanner';
import TopTenLaptop from './TopTen/Laptop';
import TopTenPhone from './TopTen/Phone';
import TopTenWatch from './TopTen/Watch';

const HomePage = (props) => {
  const state = useContext(UserContext);
  console.log(state);

  useEffect(() => {
    // actionGetTopFashion();
    // actionGetPremiumProducts();
  }, []);

  return (
    <div>
      <HomeMenu i={-1} />
      <HomeBanner />
      <Box m="0.5rem 0">
        <TopTenPhone />
      </Box>
      <Box m="0.5rem 0">
        <TopTenLaptop />
      </Box>
      <Box m="0.5rem 0">
        <TopTenWatch />
      </Box>
      <Box m="0.5rem 0">
        <WatchNews />
      </Box>
    </div>
  );
};

export default HomePage;