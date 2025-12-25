
import { WebsiteInfoContext } from "contexts/websiteInfo";
import { useContext } from "react";


export default function useWebsiteInfo() {
  const context = useContext(WebsiteInfoContext);

  if (!context) {
    throw new Error("useWebsiteInfo must be used within a WebsiteInfoProvider");
  }

  return context; // returns { state, dispatch }
}