

"use client";

import { useState } from "react";

// MUI
import IconButton from "@mui/material/IconButton";

// TRANSLATION
import { useTranslation } from "react-i18next";

// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

// STYLED COMPONENTS
import { LeftContent, StyledChip, StyledContainer, StyledRoot } from "./styles";
import { useTheme } from "@mui/material";


export default function Topbar({
  // title= "test title",
  // label="test label",
  // bgColor = "white",
  data,
  children
}) {
const title = data?.title;
const label = data?.label;

// console.log(data);
const theme =useTheme()
  const {
    t
  } = useTranslation();
  const [expand, setExpand] = useState(false);
  return <StyledRoot bgColor={'#F3F5F9'} expand={expand}>
      <StyledContainer>
        <LeftContent>
          {(title || label) ? (
            <>
              <div className="tag">
                {label ? <StyledChip label={t(label)} size="small" /> : null}
                {/* Ticker viewport with scrolling content */}
                {title ? (
                  <div className="ticker">
                    <div className="tickerViewport">
                      <div className="tickerContent">
                        <span style={{ color: theme.palette.text.primary, paddingRight: 32 }} className="title">{t(title)}</span>
                        <span style={{ color: theme.palette.text.primary, paddingRight: 32 }} className="title">{t(title)}</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <IconButton disableRipple className="expand" onClick={() => setExpand(state => !state)}>
                {expand ? <Remove /> : <Add />}
              </IconButton>
            </>
          ) : null}
        </LeftContent>

        {children}
      </StyledContainer>
    </StyledRoot>;
}
Topbar.Right = function ({
  children
}) {
  return <div className="topbarRight">{children}</div>;
};

Topbar.Right.displayName = 'Topbar.Right';
