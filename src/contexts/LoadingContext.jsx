"use client";

import { createContext, useContext, useState, useCallback } from "react";

const LoadingContext = createContext({});

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [loadingState, setLoadingState] = useState({
    pageLoader: false,
    productDetailLoader: false,
    productCardLoader: false,
    searchLoader: false,
  });

  const showLoader = useCallback((loaderType) => {
    setLoadingState((prev) => ({
      ...prev,
      [loaderType]: true,
    }));
  }, []);

  const hideLoader = useCallback((loaderType) => {
    setLoadingState((prev) => ({
      ...prev,
      [loaderType]: false,
    }));
  }, []);

  const showPageLoader = useCallback(() => {
    showLoader('pageLoader');
  }, [showLoader]);

  const hidePageLoader = useCallback(() => {
    hideLoader('pageLoader');
  }, [hideLoader]);

  const showProductDetailLoader = useCallback(() => {
    showLoader('productDetailLoader');
  }, [showLoader]);

  const hideProductDetailLoader = useCallback(() => {
    hideLoader('productDetailLoader');
  }, [hideLoader]);

  const showProductCardLoader = useCallback(() => {
    showLoader('productCardLoader');
  }, [showLoader]);

  const hideProductCardLoader = useCallback(() => {
    hideLoader('productCardLoader');
  }, [hideLoader]);

  const showSearchLoader = useCallback(() => {
    showLoader('searchLoader');
  }, [showLoader]);

  const hideSearchLoader = useCallback(() => {
    hideLoader('searchLoader');
  }, [hideLoader]);

  const value = {
    loadingState,
    showLoader,
    hideLoader,
    showPageLoader,
    hidePageLoader,
    showProductDetailLoader,
    hideProductDetailLoader,
    showProductCardLoader,
    hideProductCardLoader,
    showSearchLoader,
    hideSearchLoader,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};
