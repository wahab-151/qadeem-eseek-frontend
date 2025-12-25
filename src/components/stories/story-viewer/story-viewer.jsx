"use client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import dynamic from "next/dynamic";
const Stories = dynamic(() => import("react-insta-stories"), {
  ssr: false,
  loading: () => (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight={200}>
      <CircularProgress />
    </Box>
  ),
});

// STYLED COMPONENTS
import { ModalWrapper } from "./styles";


// ==============================================================


// ==============================================================

export default function StoryViewer({
  open,
  handleClose,
  stories,
  currentIndex
}) {
  return <Modal open={open} onClose={handleClose}>
      <ModalWrapper>
        <Stories stories={stories} currentIndex={currentIndex} onAllStoriesEnd={handleClose} progressStyles={{
        height: 3,
        borderRadius: 10
      }} progressWrapperStyles={{
        height: 3,
        borderRadius: 10,
        background: "#373F50"
      }} />
      </ModalWrapper>
    </Modal>;
}