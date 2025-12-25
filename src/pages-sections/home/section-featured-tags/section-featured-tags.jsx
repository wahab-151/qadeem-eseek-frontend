"use client";
import { useMemo } from "react";
import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography, Skeleton } from "@mui/material";
import { useGetFeaturedTagsQuery } from "app/store/services";
import { useRouter } from "next/navigation";

export default function SectionFeaturedTags() {
  const { data, isLoading } = useGetFeaturedTagsQuery({ limit: 20 });
  const router = useRouter();

  const tags = useMemo(() => Array.isArray(data?.data) ? data.data : [], [data?.data]);

  const handleClick = (tagName) => {
    router.push(`/products/search?tag=${encodeURIComponent(tagName)}`);
  };

  return (
    <div className="mt-4 mb-4">
      <Box
        sx={(theme) => ({
          py: 4,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 100%)'
            : 'linear-gradient(180deg, rgba(2,6,23,0.03) 0%, rgba(2,6,23,0.015) 100%)',
          borderTop: `1px solid ${theme.palette.divider}`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
      <Container>
        <Typography
          variant="h2"
          sx={{
            mb: "2rem",
            lineHeight: 1,
            color: (theme) => theme.palette.secondary.main,
            textShadow: "3px 3px 8px rgba(0,0,0,0.2)",
          }}
        >
          Featured Tags
        </Typography>

        {isLoading ? (
          <Grid container spacing={2} columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 5 }}>
            {Array.from({ length: 10 }).map((_, idx) => (
              <Grid item key={idx} xs={1}>
                <Card sx={{ p: 2 }}>
                  <Box>
                    <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 1, mb: 1 }} />
                    <Skeleton variant="text" width="70%" />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }} columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 5 }}>
            {tags.map((tag, idx) => (
              <Grid item key={tag.name} xs={1}>
                <Card
                  elevation={0}
                  sx={(theme) => {
                    const palette = [
                      theme.palette.primary.main,
                      theme.palette.secondary.main,
                      // theme.palette.info.main,
                      theme.palette.success.main,
                      theme.palette.warning.main,
                      theme.palette.error.main,
                    ];
                    const accent = palette[idx % palette.length];
                    const tint = theme.palette.mode === 'dark' ? '2A' : '2A'; // stronger alpha for filled look
                    return {
                      height: '100%',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      border: `1px solid ${theme.palette.divider}`,
                      background: theme.palette.background.paper,
                      borderRadius: 2,
                      boxShadow: 'none',
                      overflow: 'hidden',
                      transition: 'transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 6,
                        borderColor: `${accent}66`,
                      },
                      '&:hover .tag-image': {
                        transform: 'scale(1.025)',
                      },
                    };
                  }}
                >
                  <CardActionArea
                    onClick={() => handleClick(tag.name)}
                    sx={{ height: '100%' }}
                  >
                    <Box>
                      <Box
                        className="tag-image"
                        component="img"
                        src={tag.image || "/assets/images/logo.jpeg"}
                        alt={tag.name}
                        loading="lazy"
                        sx={{
                          width: '100%',
                          height: 140,
                          objectFit: 'contain',
                          transition: 'transform 220ms ease',
                          display: 'block'
                        }}
                      />
                      <CardContent sx={{ pt: 1.25, pb: 1.5 }}>
                        <Typography
                          align="center"
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            letterSpacing: 0.2,
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                            minHeight: 40,
                          }}
                        >
                          {tag.name}
                        </Typography>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      </Box>
    </div>
  );
}


