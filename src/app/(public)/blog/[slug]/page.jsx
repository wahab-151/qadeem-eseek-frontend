'use client';
import { Fragment, useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Chip, Avatar, Divider, CircularProgress, Alert, Button } from "@mui/material";
import { CalendarToday, Person, Visibility, AccessTime, Share, ArrowBack, List } from "@mui/icons-material";
import BlogCard from "components/blog-cards/blog-card";
import FlexBox from "components/flex-box/flex-box";
import { useParams } from "next/navigation";
import useGuardedRouter from "hooks/useGuardedRouter";
import Image from "next/image";
import { useGetBlogBySlugQuery, useGetAllBlogsQuery } from "app/store/services";
import { useSnackbar } from "notistack";

export const dynamic = 'force-dynamic';

export default function BlogDetailsPage() {
  const { push, back } = useGuardedRouter();
  const params = useParams();
  const { slug } = params;
  const { enqueueSnackbar } = useSnackbar();

  // RTK Query hooks
  const { 
    data: blogData, 
    isLoading: loading, 
    error: blogError 
  } = useGetBlogBySlugQuery(slug, {
    skip: !slug
  });

  const { 
    data: relatedBlogsData 
  } = useGetAllBlogsQuery({
    limit: 3,
    status: 'published',
    category: blogData?.data?.blog?.category
  }, {
    skip: !blogData?.data?.blog?.category
  });

  // Get data from RTK Query
  const blog = blogData?.data?.blog || null;
  const relatedBlogs = relatedBlogsData?.data?.blogs || [];
  const error = blogError?.data?.message || null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
        enqueueSnackbar('Blog shared successfully!', { variant: 'success' });
      } catch (error) {
        console.log('Error sharing:', error);
        enqueueSnackbar('Failed to share blog', { variant: 'error' });
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        enqueueSnackbar('Blog URL copied to clipboard!', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Failed to copy URL', { variant: 'error' });
      }
    }
  };

  // Show error toast if there's an error - MUST be before any early returns
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }, [error, enqueueSnackbar]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 , }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !blog) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">
          {error || 'Blog post not found'}
        </Alert>
      </Container>
    );
  }

  return (
    <Fragment>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Navigation Buttons */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' , justifyContent: 'space-between'}}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => back()}
            sx={{
              textTransform: 'none',
              px: 3,
              py: 1.5,
              borderRadius: 2,
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                bgcolor: 'primary.light',
                color: 'primary.dark'
              }
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            startIcon={<List />}
            onClick={async () => await push('/blog')}
            sx={{
              textTransform: 'none',
              px: 3,
              py: 1.5,
              borderRadius: 2,
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          >
            View All Posts
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={9}>
            <Box sx={{ 
              mb: 4, 
              p: { xs: 2, sm: 3, md: 4 },
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 3,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              {/* Category */}
              {blog.category && (
                <Chip
                  label={blog.category}
                  sx={{
                    mb: 3,
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    border: (theme) => `1px solid ${theme.palette.primary.main}40`,
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    }
                  }}
                />
              )}

              {/* Title */}
              <Typography
                variant="h3"
                fontWeight={700}
                sx={{
                  mb: 3,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  lineHeight: 1.2,
                  color: 'text.primary',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {blog.title}
              </Typography>

              {/* Meta Information */}
              <FlexBox alignItems="center" gap={3} sx={{ 
                mb: 4, 
                flexWrap: 'wrap',
                p: 2,
                bgcolor: 'rgba(248, 249, 250, 0.8)',
                borderRadius: 2,
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <FlexBox alignItems="center" gap={1.5}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      border: (theme) => `2px solid ${theme.palette.primary.main}40`
                    }}
                  >
                    {blog.author?.firstName?.charAt(0) || 'A'}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={500} color="text.primary">
                      {blog.author?.firstName} {blog.author?.lastName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Author
                    </Typography>
                  </Box>
                </FlexBox>

                <FlexBox alignItems="center" gap={1}>
                  <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(blog.publishedAt)}
                  </Typography>
                </FlexBox>

                <FlexBox alignItems="center" gap={1}>
                  <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {blog.readingTime} min read
                  </Typography>
                </FlexBox>

                <FlexBox alignItems="center" gap={1}>
                  <Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {blog.viewCount} views
                  </Typography>
                </FlexBox>

                <FlexBox alignItems="center" gap={1}>
                  <Share 
                    sx={{ 
                      fontSize: 16, 
                      color: 'text.secondary', 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'scale(1.1)'
                      }
                    }} 
                    onClick={handleShare} 
                  />
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }} 
                    onClick={handleShare}
                  >
                    Share
                  </Typography>
                </FlexBox>
              </FlexBox>

              {/* Featured Image */}
              {blog.featuredImage && (
                <Box sx={{ 
                  mb: 4, 
                  borderRadius: 3, 
                  overflow: 'hidden',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}>
                  <Image
                    width={800}
                    height={400}
                    alt={blog.title}
                    src={blog.featuredImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                    quality={85}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              )}

              {/* Excerpt */}
              {blog.excerpt && (
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    p: 3,
                    bgcolor: 'rgba(248, 249, 250, 0.5)',
                    borderRadius: 2,
                    borderLeft: (theme) => `4px solid ${theme.palette.primary.main}`
                  }}
                >
                  {blog.excerpt}
                </Typography>
              )}

              {/* Content */}
              <Box
                sx={{
                  '& h1, & h2, & h3, & h4, & h5, & h6': {
                    mt: 4,
                    mb: 2,
                    fontWeight: 600,
                    color: 'text.primary',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  },
                  '& p': {
                    mb: 2.5,
                    lineHeight: 1.8,
                    color: 'text.primary',
                    fontSize: '1.1rem'
                  },
                  '& ul, & ol': {
                    mb: 2.5,
                    pl: 3,
                  },
                  '& li': {
                    mb: 1,
                    lineHeight: 1.7
                  },
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    my: 3,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  },
                  '& blockquote': {
                    borderLeft: (theme) => `4px solid ${theme.palette.primary.main}`,
                    pl: 3,
                    my: 3,
                    fontStyle: 'italic',
                    color: 'text.secondary',
                    bgcolor: (theme) => `${theme.palette.primary.main}10`,
                    p: 2,
                    borderRadius: '0 8px 8px 0'
                  },
                  '& code': {
                    bgcolor: 'rgba(0,0,0,0.05)',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    color: 'primary.main'
                  },
                  '& pre': {
                    bgcolor: 'rgba(0,0,0,0.05)',
                    p: 3,
                    borderRadius: 2,
                    overflow: 'auto',
                    my: 3,
                    border: '1px solid rgba(0,0,0,0.1)'
                  },
                }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <Box sx={{ 
                  mt: 5, 
                  p: 3,
                  bgcolor: 'rgba(248, 249, 250, 0.5)',
                  borderRadius: 2,
                  border: '1px solid rgba(0,0,0,0.05)'
                }}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                    Tags
                  </Typography>
                  <FlexBox gap={1} flexWrap="wrap">
                    {blog.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: (theme) => `${theme.palette.primary.main}40`,
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: 'primary.light',
                            borderColor: 'primary.main'
                          }
                        }}
                        onClick={async () => await push(`/allProducts?tag=${encodeURIComponent(tag)}&view=grid`)}
                      />
                    ))}
                  </FlexBox>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={3}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              {/* Related Blogs */}
              {relatedBlogs.length > 0 && (
                <Box sx={{ 
                  mb: 4,
                  p: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}>
                  <Typography 
                    variant="h5" 
                    fontWeight={600} 
                    sx={{ 
                      mb: 3,
                      color: 'text.primary',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    Related Articles
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {relatedBlogs.map((relatedBlog) => (
                      <Box 
                        key={relatedBlog._id} 
                        sx={{ 
                          transform: 'scale(0.95)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <BlogCard blog={relatedBlog} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Author Info */}
              {blog.author && (
                <Box sx={{ 
                  p: 3, 
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                    transform: 'translateY(-2px)'
                  }
                }}>
                  <Typography 
                    variant="h6" 
                    fontWeight={600} 
                    sx={{ 
                      mb: 3,
                      color: 'text.primary',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    About the Author
                  </Typography>
                  <FlexBox alignItems="center" gap={2} sx={{ mb: 2 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                        border: (theme) => `3px solid ${theme.palette.primary.main}40`,
                        fontSize: '1.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: (theme) => `0 4px 15px ${theme.palette.primary.main}40`
                        }
                      }}
                    >
                      {blog.author.firstName?.charAt(0) || 'A'}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={500} color="text.primary">
                        {blog.author.firstName} {blog.author.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {blog.author.email}
                      </Typography>
                    </Box>
                  </FlexBox>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
