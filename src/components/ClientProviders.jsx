"use client";

import React, { useEffect, Suspense } from "react";
import "i18n";
import { Provider } from "react-redux";
import { store } from "app/store/store";
import ThemeProvider from "theme/theme-provider";
import CartProvider from "contexts/CartContext";
import SettingsProvider from "contexts/SettingContext";
import ProductProvider from "contexts/productsContext";
import CategoryMegaMenuProvider from "contexts/MegaMenuContext";
import AuthProvider from "contexts/AuthContext";
import WebsiteInfoProvider from "contexts/websiteInfo";
import { NavigationProvider } from "contexts/NavigationContext";
import { LoadingProvider } from "contexts/LoadingContext";
import SnackbarProvider from "components/SnackbarProvider";
import GlobalLoader from "components/progress/GlobalLoader";
import ProgressBar from "components/progress";
import InlineLoader from "components/progress/InlineLoader";

export default function ClientProviders({ children, modal }) {
  useEffect(() => {
    // Session restoration or light client boot logic
    try {
      localStorage.getItem("auth-token");
      localStorage.getItem("auth-user-role");
    } catch { }
  }, []);

  useEffect(() => {
    // Hide Next.js dev overlays/toasts (no-ops in production)
    const devOverlay = document.querySelector('[data-nextjs-dev-overlay]');
    if (devOverlay) devOverlay.style.display = 'none';

    const toast = document.querySelector('[data-nextjs-toast="true"]');
    if (toast) toast.style.display = 'none';

    const nIndicator = document.querySelector('body > div[style*="bottom: 0px"][style*="left: 0px"]');
    if (nIndicator) nIndicator.style.display = 'none';
  }, []);

  // Suppress hydration warnings only on client (in effect)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const originalError = console.error;
    // eslint-disable-next-line no-console
    console.error = (...args) => {
      // try {
      //   if (typeof args[0] === 'string' && /hydration/i.test(args[0])) {
      //     return;
      //   }
      // } catch { }
      return originalError?.(...args);
    };
    return () => {
      // restore
      // eslint-disable-next-line no-console
      console.error = originalError;
    };
  }, []);
  console.warn("[ClientProviders] mounted");



  return (
    <Provider store={store}>
      <WebsiteInfoProvider>
        <AuthProvider>
          <CategoryMegaMenuProvider>
            <CartProvider>
              <ProductProvider>
                <SettingsProvider>
                  <ThemeProvider>
                    <Suspense fallback={<InlineLoader size={40} />}>
                      <NavigationProvider>
                        <LoadingProvider>
                          <GlobalLoader />
                          <ProgressBar />
                          <SnackbarProvider>
                          {React.Children.toArray(modal).map((child, index) => 
                            React.isValidElement(child) ? React.cloneElement(child, { key: `modal-${index}` }) : child
                          )}
                          {React.Children.toArray(children).map((child, index) => 
                            React.isValidElement(child) ? React.cloneElement(child, { key: `child-${index}` }) : child
                          )}
                          </SnackbarProvider>
                        </LoadingProvider>
                      </NavigationProvider>
                    </Suspense>
                  </ThemeProvider>
                </SettingsProvider>
              </ProductProvider>
            </CartProvider>
          </CategoryMegaMenuProvider>
        </AuthProvider>
      </WebsiteInfoProvider>
    </Provider>
  );
}


