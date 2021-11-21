import React from 'react';
import { StoresContext } from '../contexts';

export const useStores = () => {
  const stores = React.useContext(StoresContext);
  if (!stores) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStores must be used within a StoreProvider.');
  }
  return stores;
};
