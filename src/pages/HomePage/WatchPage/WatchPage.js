import MainMenu from 'components/Navigation/MainMenu/MainMenu';
import ProductCollections from 'components/Products/ProductCollections/ProductCollections';
import ProductListTopTen from 'components/Products/ProductListTopTen/ProductListTopTen';
import ProductListMan from 'components/Products/ProductPremium/ProductListMan';
import ProductListWoman from 'components/Products/ProductPremium/ProductListWoman';
import ProductPremium from 'components/Products/ProductPremium/ProductPremium';
import WatchNews from 'components/WatchNews/WatchNews';
import React from 'react';
import Banner from '../../../components/Products/ProductBanner/ProductBanner';
import ProductRoutes from '../../../components/Products/ProductKind/ProductRoutes';

const WatchPage = (props) => {
  return (
    <div>
      <MainMenu />
      <Banner />
      <ProductCollections />
      <ProductListTopTen />
      <ProductRoutes />
      <ProductPremium />
      <ProductListMan />
      <ProductListWoman />
      <WatchNews />
    </div>
  );
};

export default WatchPage;
