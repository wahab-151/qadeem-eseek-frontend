"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import styled from "@mui/material/styles/styled";

// LOCAL CUSTOM COMPONENTS
import GeneralForm from "../general-form";
import BannerSlider from "../banner-slider";
import ShippingVatForm from "../shipping-vat-form";
import SocialLinksForm from "../social-links-form";
import { useGetWebsiteInfoQuery, useUpdateWebsiteInfoMutation } from "app/store/services";
import { CircularProgress } from "@mui/material";
import PoliciesForm from "../policies-form";
import HomepageBannersForm from "../homepage-banners-form";
import PromotionalDetailsForm from "../promotional-details-form";


// STYLED COMPONENTS
const StyledTabPanel = styled(TabPanel)({
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0
});
const StyledTabList = styled(TabList)(({
  theme
}) => ({
  "& .MuiTab-root": {
    color: "#6B5D4F", // Medium brown for inactive tabs
    fontWeight: 500,
    fontSize: "14px",
    textTransform: "capitalize",
    transition: "color 0.2s ease",
  },
  "& .MuiTab-root.Mui-selected": {
    color: "#8B7548", // Heritage bronze for active tab
    fontWeight: 600,
  },
  "& .MuiTabs-indicator": {
    background: "#8B7548", // Heritage bronze indicator
    height: 3,
    borderRadius: "3px 3px 0 0"
  }
}));
export default function SiteSettingsPageView() {

  const {
    data: websiteInfo,
    isLoading: websiteInfoLoading,
    error: websiteInfoError,
  } = useGetWebsiteInfoQuery();


const [uploadInfo, { isLoading: uploadInfoLoading, error: uploadInfoError }] =
    useUpdateWebsiteInfoMutation();

const content = websiteInfo?.data?.content;

const {
  description,
  aboutUs,
  shippingAndReturnPolicy,
  privacyPolicy,
  termsAndConditions,
  bulkPurchasing,
  contact,
  socialLinks,
} = content || {}; // fallback to empty object if undefined
const policiesData={
  aboutUs,
  shippingAndReturnPolicy,
  privacyPolicy,
  termsAndConditions,
  bulkPurchasing,
}
const [contentData, setContentData] = useState({})

useEffect(() => {
  if (websiteInfo?.data?.content) {
    const content = websiteInfo.data.content;
    setContentData({
      description: content.description || "",
      contact: content.contact || {},
      aboutUs: content.aboutUs || {},
      shippingAndReturnPolicy: content.shippingAndReturnPolicy || {},
      privacyPolicy: content.privacyPolicy || {},
      termsAndConditions: content.termsAndConditions || {},
      bulkPurchasing: content.bulkPurchasing || {},
      homepageBanners: content.homepageBanners || [],
      promotionalDetails: content.promotionalDetails || { title: "", label: "" },
      tickerTitle: content.tickerTitle || "",
      tickeLable: content.tickeLable || "",
    });
  }
}, [websiteInfo]);


  const [selectTab, setSelectTab] = useState("general");
  return <Box py={4}>
      <Card sx={{
      px: 3,
      py: 2
    }}>
      {websiteInfoLoading ?    <Box className="flex items-center align-middle"><CircularProgress size={24} /> </Box> :
        <TabContext value={selectTab}>
          <Box sx={{
          borderBottom: 1,
          borderColor: "#EFE6D5" // Light heritage border
        }}>
            <StyledTabList onChange={(_, value) => setSelectTab(value)} variant="scrollable">
              <Tab label="General" value="general" disableRipple />
              {/* <Tab label="Topbar" value="topbar" disableRipple /> */}
              <Tab label="Promotional Details" value="promotional-details" disableRipple />
              <Tab label="Policies" value="policies" disableRipple />
              <Tab label="Homepage Banners" value="homepage-banners" disableRipple />
              {/* <Tab label="Social Links" value="social-links" disableRipple /> */}
              {/* <Tab label="Banner Slider" value="banner-slider" disableRipple /> */}
              {/* <Tab label="Shipping & Vat" value="shipping-vat" disableRipple /> */}
            </StyledTabList>
          </Box>

          <StyledTabPanel value="general">
            <GeneralForm contentData={contentData}  description={description} contact={contact} uploadInfo={uploadInfo} uploadInfoLoading={uploadInfoLoading} uploadInfoError={uploadInfoError} websiteInfoLoading={websiteInfoLoading} />
          </StyledTabPanel>


          <StyledTabPanel value="promotional-details">
            <PromotionalDetailsForm contentData={contentData} uploadInfo={uploadInfo} uploadInfoLoading={uploadInfoLoading} uploadInfoError={uploadInfoError} websiteInfoLoading={websiteInfoLoading} />
          </StyledTabPanel>

          <StyledTabPanel value="policies">
            <PoliciesForm  contentData={contentData}  policiesData={policiesData} uploadInfo={uploadInfo} uploadInfoLoading={uploadInfoLoading} uploadInfoError={uploadInfoError} websiteInfoLoading={websiteInfoLoading} />
          </StyledTabPanel>

          <StyledTabPanel value="homepage-banners">
            <HomepageBannersForm contentData={contentData} uploadInfo={uploadInfo} uploadInfoLoading={uploadInfoLoading} uploadInfoError={uploadInfoError} websiteInfoLoading={websiteInfoLoading} />
          </StyledTabPanel>

          {/* <StyledTabPanel value="social-links">
            <SocialLinksForm contentData={contentData}  uploadInfo={uploadInfo} uploadInfoLoading={uploadInfoLoading} uploadInfoError={uploadInfoError}  websiteInfoLoading={websiteInfoLoading}/>
          </StyledTabPanel> */}

          {/* <StyledTabPanel value="banner-slider">
            <BannerSlider />
          </StyledTabPanel> */}

          {/* <StyledTabPanel value="shipping-vat">
            <ShippingVatForm />
          </StyledTabPanel> */}
        </TabContext>}
      </Card>
    </Box>;
}