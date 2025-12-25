"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { WebsiteInfoContext } from "contexts/websiteInfo";

// ============================================================

// SET "rtl" OR "ltr" HERE

// THEN GOTO BROWSER CONSOLE AND RUN localStorage.clear() TO CLEAR LOCAL STORAGE
const initialSettings = {
  direction: "ltr",
  homepageBanners: []
};

export const SettingsContext = createContext({
  settings: initialSettings,
  updateSettings: arg => {}
});

export default function SettingsProvider({
  children
}) {
  const [settings, setSettings] = useState(initialSettings);
  
  // Get website info from WebsiteInfoContext instead of making duplicate API call
  const { state: websiteInfoState } = useContext(WebsiteInfoContext);
  
  const updateSettings = updatedSetting => {
    setSettings(updatedSetting);
    window.sessionStorage.setItem("settings", JSON.stringify(updatedSetting));
  };
  
  useEffect(() => {
    if (!window) return;
    const getItem = window.sessionStorage.getItem("settings");
    if (getItem) {
      const parsed = JSON.parse(getItem);
      setSettings(parsed);
    } else {
      setSettings(initialSettings);
    }
  }, []);
  
  // Update settings with homepage banners from WebsiteInfoContext
  // This eliminates the duplicate API call - data comes from shop-layout-1's single fetch
  useEffect(() => {
    if (websiteInfoState?.homepageBanners) {
      setSettings(prev => ({
        ...prev,
        homepageBanners: websiteInfoState.homepageBanners
      }));
    }
  }, [websiteInfoState?.homepageBanners]);
  
  // Determine loading state: if websiteInfoState exists and has been populated (has description or other fields),
  // then we're not loading. Otherwise, assume we're still loading.
  // Note: This is a best-effort check since we don't have direct access to the query loading state.
  // The actual loading state is managed in shop-layout-1, but we need to provide a reasonable fallback.
  const isLoading = !websiteInfoState || 
    (!websiteInfoState.description && websiteInfoState.homepageBanners === undefined);
  
  return <SettingsContext.Provider value={{
    settings,
    updateSettings,
    isLoading
  }}>
      {children}
    </SettingsContext.Provider>;
}