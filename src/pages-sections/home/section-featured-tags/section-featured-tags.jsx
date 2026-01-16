"use client";
import { useMemo } from "react";
import { Box, Card, CardActionArea, CardContent, Container, Typography, Skeleton } from "@mui/material";
import { useGetFeaturedTagsQuery } from "app/store/services";
import { useRouter } from "next/navigation";
import HomeSectionHeader from "components/section-header/home-section-header";

export default function SectionFeaturedTags() {
  const { data, isLoading } = useGetFeaturedTagsQuery({ limit: 20 });
  const router = useRouter();

  const tags = useMemo(() => Array.isArray(data?.data) ? data.data : [], [data?.data]);

  // Build a single group long enough to fill the marquee nicely.
  // We'll render the group twice to create a seamless continuous loop.
  const groupTags = useMemo(() => {
    if (!tags?.length) return [];
    let group = [...tags];
    while (group.length < 10) group = group.concat(tags);
    return group;
  }, [tags]);

  // Marquee speed: scale with item count, but keep within a sensible range.
  const marqueeDurationSec = useMemo(() => {
    const groupLen = Math.max(1, groupTags?.length || 0);
    const base = Math.max(18, Math.min(60, groupLen * 2.2));
    return `${base}s`;
  }, [groupTags?.length]);

  const handleClick = (tagName) => {
    router.push(`/products/search?tag=${encodeURIComponent(tagName)}`);
  };

  return (
    <section
      className="mt-4 mb-4"
      style={{ backgroundColor: "#FFFFFF", overflow: "visible" }}
    >
      <Container
        maxWidth={false}
        sx={{
          py: { xs: 4, md: 8 },
          px: { xs: 2, sm: 3 },
          overflow: "visible",
          maxWidth: 1240,
          mx: "auto",
        }}
      >
        <HomeSectionHeader
          subtitle="FEATURED TAGS"
          title="Featured Tags"
          description="Explore our exquisite collection of authentic gemstones"
          actionLabel="GO TO SHOP"
          actionHref="/allProducts"
        />

        {isLoading ? (
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              py: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "max-content",
              }}
            >
              {Array.from({ length: 10 }).map((_, idx) => (
                <Card key={idx} sx={{ width: { xs: 150, sm: 190, md: 220 }, p: 2, flex: "0 0 auto" }}>
                  <Box>
                    <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 1, mb: 1 }} />
                    <Skeleton variant="text" width="70%" />
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              py: 1,
              // soft fade at edges (news-ticker style)
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",

              "@keyframes featuredTagsMarquee": {
                "0%": { transform: "translateX(0)" },
                "100%": { transform: "translateX(-50%)" },
              },

              // Pause animation on hover for usability.
              "&:hover .featured-tags-marquee-track": {
                animationPlayState: "paused",
              },

              // Respect reduced-motion users.
              "@media (prefers-reduced-motion: reduce)": {
                "& .featured-tags-marquee-track": {
                  animation: "none",
                  transform: "none",
                },
              },
            }}
          >
            <Box
              className="featured-tags-marquee-track"
              sx={{
                display: "flex",
                width: "max-content",
                animation: `featuredTagsMarquee ${marqueeDurationSec} linear infinite`,
              }}
            >
              {[0, 1].map((groupIndex) => (
                <Box
                  key={groupIndex}
                  sx={{
                    display: "flex",
                    flex: "0 0 auto",
                    gap: { xs: 1.5, sm: 2, md: 2.5 },
                    // Add end padding so spacing between the last and first item matches the gap.
                    pr: { xs: 1.5, sm: 2, md: 2.5 },
                  }}
                >
                  {groupTags.map((tag, idx) => (
                    <Card
                      key={`${groupIndex}-${tag?._id || tag?.name || "tag"}-${idx}`}
                      elevation={0}
                      sx={(theme) => ({
                        width: { xs: 150, sm: 190, md: 220 },
                        flex: "0 0 auto",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        border: `1px solid ${theme.palette.grey[200]}`,
                        background: theme.palette.background.paper,
                        borderRadius: 2,
                        boxShadow: "none",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          border: `1px solid ${theme.palette.primary.main}`,
                          boxShadow: "0px 4px 20px rgba(39, 30, 3, 0.12)",
                          "& .tag-name": {
                            color: theme.palette.primary.main,
                          },
                        },
                        "&:hover .tag-image": {
                          transform: "scale(1.1)",
                        },
                      })}
                    >
                      <CardActionArea onClick={() => handleClick(tag.name)} sx={{ height: "100%" }}>
                        <Box>
                          <Box
                            className="tag-image"
                            component="img"
                            src={tag.image || "/assets/images/logo.jpeg"}
                            alt={tag.name}
                            loading="lazy"
                            onError={(e) => {
                              // Fallback to logo if image fails to load
                              if (e.target.src !== "/assets/images/logo.jpeg") {
                                e.target.src = "/assets/images/logo.jpeg";
                              }
                            }}
                            sx={{
                              width: "100%",
                              height: { xs: 120, sm: 140 },
                              objectFit: "contain",
                              transition: "transform 0.3s ease",
                              display: "block",
                            }}
                          />
                          <CardContent sx={{ pt: 1.25, pb: 1.5 }}>
                            <Typography
                              className="tag-name"
                              align="center"
                              variant="subtitle2"
                              sx={{
                                fontWeight: 500,
                                fontSize: "14px",
                                fontFamily: "Inter, sans-serif",
                                color: "#271E03",
                                letterSpacing: "0%",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                                minHeight: 40,
                                transition: "color 0.3s ease",
                              }}
                            >
                              {tag.name}
                            </Typography>
                          </CardContent>
                        </Box>
                      </CardActionArea>
                    </Card>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </section>
  );
}


