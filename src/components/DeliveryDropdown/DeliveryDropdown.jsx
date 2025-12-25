
"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Radio,
  Paper,
  Avatar,
  Popper,
  Fade,
  useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";

const deliveryOptions = [
  {
    carrier: "UPS",
    label: "UPS Ground",
    time: 11 * 3600,
    logo: "/assets/images/ups.svg",
  }
];

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, "0")} : ${mins
    .toString()
    .padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`;
}

function getNextCutoffSeconds() {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
  const currentTime = now.getTime();

  let cutoff = new Date(now); // start with now

  if (currentDay === 6) {
    // Saturday
    // Move to Monday at 5pm
    cutoff.setDate(cutoff.getDate() + 2);
    cutoff.setHours(17, 0, 0, 0);
  } else if (currentDay === 0) {
    // Sunday
    // Move to Monday at 5pm
    cutoff.setDate(cutoff.getDate() + 1);
    cutoff.setHours(17, 0, 0, 0);
  } else {
    // Weekday
    cutoff.setHours(17, 0, 0, 0);
    if (now.getTime() > cutoff.getTime()) {
      // It's past 5pm, set cutoff to tomorrow at 5pm
      cutoff.setDate(cutoff.getDate() + 1);
      if (cutoff.getDay() === 6) {
        // Saturday -> Monday
        cutoff.setDate(cutoff.getDate() + 2);
      } else if (cutoff.getDay() === 0) {
        // Sunday -> Monday
        cutoff.setDate(cutoff.getDate() + 1);
      }
    }
  }

  const diffInSeconds = Math.floor((cutoff.getTime() - currentTime) / 1000);
  return diffInSeconds;
}

function isWeekendMode() {
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  
  // Friday after 5pm until Monday 00:00:00
  return (currentDay === 5 && currentHour >= 17) || 
         currentDay === 6 || 
         (currentDay === 0 && now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() < 5);
}

export default function DeliveryCutoffDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [hovering, setHovering] = useState(false);
  let hoverTimeout = null;
  const [selected, setSelected] = useState("UPS Ground");
  const [times, setTimes] = useState(null);
  const [weekendMode, setWeekendMode] = useState(isWeekendMode());

  useEffect(() => {
    setTimes([getNextCutoffSeconds()]);
    setWeekendMode(isWeekendMode());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();
      
      // Check if we need to enter or exit weekend mode
      const newWeekendMode = isWeekendMode();
      if (newWeekendMode !== weekendMode) {
        setWeekendMode(newWeekendMode);
      }
      
      // If it's exactly midnight on Monday (00:00:00 to 00:00:04)
      if (currentDay === 1 && currentHour === 0 && currentMinutes === 0 && currentSeconds < 5) {
        setTimes([getNextCutoffSeconds()]);
      }

      setTimes((prev) =>
        prev ? prev.map((t) => {
          const nextTime = Math.max(0, t - 1);
          if (nextTime === 0) return getNextCutoffSeconds();
          return nextTime;
        }) : [getNextCutoffSeconds()]
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [weekendMode]);

  const handleMouseEnter = (event) => {
    clearTimeout(hoverTimeout);
    setAnchorEl(event.currentTarget);
    setHovering(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setHovering(false);
    }, 200);
  };

  const open = Boolean(anchorEl) && hovering;
  const id = open ? "delivery-popper" : undefined;
  const theme = useTheme();

  return (
    <Box position="relative" display="inline-block">
      <Button
        variant="outlined"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: 5,
          textTransform: "none",
          boxShadow: 2,
          display: "flex",
          alignItems: "center",
          gap: { xs: 0, lg: 2 },
          px: { xs: 0.5, sm: 0.5, md: 0.75, lg: 2 },
          py: 1,
          height: 40,
          width: { xs: 40, sm: 44, md: 48, lg: 220 },
          backgroundColor: theme.palette.secondary.main,
          justifyContent: { xs: 'center', lg: 'flex-start' },
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "white",
          },
        }}
      >
        <Avatar
          variant="rounded"
          src={deliveryOptions
            .find((opt) => opt.label === selected)
            ?.logo.replace("./", "/assets/images/")}
          sx={{
            width: { xs: 22, sm: 24, md: 26, lg: 42 },
            height: { xs: 22, sm: 24, md: 26, lg: 28 },
            borderRadius: "20px",
            objectFit: "contain",
            backgroundColor: "#fff",
            padding: { xs: 0.25, lg: 0.5 },
          }}
        />

        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          flex={{ xs: 0, lg: 1 }}
          marginTop={0.5}
          sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }}
        >
          {times && (
            weekendMode ? (
              <Typography
                variant="body2"
                fontWeight={600}
                fontSize={11}
                sx={{ whiteSpace: "nowrap" }}
              >
                Orders ship Monday
              </Typography>
            ) : (
              <Typography
                variant="body2"
                fontFamily="monospace"
                fontWeight={600}
                fontSize={11}
              >
                {formatTime(
                  times[deliveryOptions.findIndex((opt) => opt.label === selected)]
                )}
              </Typography>
            )
          )}

          <Box width="100%" height="1px" bgcolor="grey.300" />

          <Typography
            variant="caption"
            fontWeight={500}
            fontSize={12}
            sx={{ whiteSpace: "nowrap" }}
          >
            {selected}
          </Typography>
        </Box>
      </Button>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        disablePortal
        PaperProps={{
          onMouseEnter: () => {
            clearTimeout(hoverTimeout);
            setHovering(true);
          },
          onMouseLeave: handleMouseLeave,
          sx: {
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            minWidth: 280,
            backgroundColor: "#fdfdfd",
          },
        }}
        sx={{ mt: 2, zIndex: 10000 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Paper
              elevation={10}
              sx={{
                mt: 1,
                width: 440,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <Box>
                <Box
                  height={56}
                  sx={{
                    backgroundImage: "url(/assets/images/service-bg.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    pt: 1,
                  }}
                >
                  <Typography
                    fontWeight={600}
                    fontSize={16}
                    color={theme.palette.secondary.main}
                    sx={{ maxWidth: "60%" }}
                  >
                    {weekendMode 
                      ? "Weekend orders will ship on Monday" 
                      : ""}
                  </Typography>

                  <Box
                    component="img"
                    src="/assets/images/cutoff.png"
                    alt="Truck"
                    sx={{
                      height: 60,
                      width: "auto",
                    }}
                  />
                </Box>
              
                {!weekendMode && (
                  <Box p={1.5} display="flex" flexDirection="column" gap={1.2}>
                    {deliveryOptions.map((opt, idx) => (
                      <Box
                        key={opt.label}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        px={2}
                        py={1.2}
                        borderRadius="999px"
                        boxShadow={selected === opt.label ? 4 : 1}
                        border={`1px solid ${
                          selected === opt.label
                            ? theme.palette.primary.light
                            : "#e0e0e0"
                        }`}
                        bgcolor={selected === opt.label ? "#f9f9f9" : "#ffffff"}
                        sx={{
                          cursor: "pointer",
                          transition: "all 0.25s ease-in-out",
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                            boxShadow: 3,
                          },
                        }}
                        onClick={() => setSelected(opt.label)}
                      >
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Radio
                            checked={selected === opt.label}
                            value={opt.label}
                            size="small"
                            sx={{
                              padding: 0,
                              color: theme.palette.primary.main,
                              "&.Mui-checked": {
                                color: theme.palette.primary.main,
                              },
                            }}
                          />
                          <Avatar
                            src={opt.logo}
                            sx={{
                              width: 28,
                              height: 28,
                              backgroundColor: "#fff",
                              borderRadius: "10px",
                              p: 0.5,
                            }}
                            variant="rounded"
                          />
                          <Typography variant="body2" fontWeight={500}>
                            {opt.label}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          fontFamily="monospace"
                          fontWeight={600}
                          sx={{ minWidth: 75, textAlign: "right" }}
                        >
                          {times && times[idx] ? formatTime(times[idx]) : "00:00:00"}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Removed free shipping banner per request */}
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}

