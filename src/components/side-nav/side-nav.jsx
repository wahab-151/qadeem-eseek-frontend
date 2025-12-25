import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";

// GLOBAL CUSTOM COMPONENT
import OverlayScrollbar from "components/overlay-scrollbar";


// ================================================================


// ================================================================

// export default function SideNav(props) {
//   const {
//     position = "left",
//     open = false,
//     width = 280,
//     children,
//     handler,
//     toggle
//   } = props;
//   const [sideNavOpen, setSideNavOpen] = useState(open);
//   const handleToggleSideNav = () => setSideNavOpen(!sideNavOpen);
//   useEffect(() => setSideNavOpen(open), [open]);
//   const handleClose = toggle || handleToggleSideNav;
//   return <div>
//       <Drawer anchor={position} open={sideNavOpen} onClose={handleClose} SlideProps={{
//       style: {
//         width
//       }
//     }} sx={{
//       zIndex: 15001
//     }}>
//         <OverlayScrollbar>{children}</OverlayScrollbar>
//       </Drawer>

//       {handler(handleClose)}
//     </div>;
// }

export default function SideNav({
  position = "left",
  width = 280,
  children,
  handler,
}) {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // Open Drawer
  const handleOpen = () => setSideNavOpen(true);

  // Close Drawer safely
  const handleClose = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur(); // ✅ Prevent aria-hidden focus trap
    }
    setSideNavOpen(false);
  };

  return (
    <>
      {/* Drawer */}
      <Drawer
        anchor={position}
        open={sideNavOpen}
        onClose={handleClose}
        SlideProps={{
          style: { width },
        }}
        sx={{
          zIndex: 15001,
          display: { xs: "block", sm: "block", md: "block" }, // ✅ Always visible on all screen sizes when open
        }}
        ModalProps={{
          keepMounted: true, // ✅ Prevent unmount flicker
        }}
        PaperProps={{
          sx: {
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
          }
        }}
      >
        <OverlayScrollbar sx={{ height: '100dvh', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>{children}</OverlayScrollbar>
      </Drawer>

      {/* Trigger Button (hamburger, etc.) */}
      {typeof handler === 'function'
        ? (handler.length <= 1
            ? handler(handleClose)
            : handler({ open: handleOpen, close: handleClose }))
        : null}
    </>
  );
}