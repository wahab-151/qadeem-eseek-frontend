'use client';
import { Fragment, useState, useEffect } from "react";
import { Box, Container, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Pagination, Chip, CircularProgress, Card, CardContent, Button, Stack } from "@mui/material";
import { Search as SearchIcon, FilterList as FilterIcon, ArrowForward as ArrowForwardIcon, PlayArrow as PlayIcon } from "@mui/icons-material";
import BlogCard from "components/blog-cards/blog-card";
import FlexBox from "components/flex-box/flex-box";
import { useSearchParams } from "next/navigation";
import useGuardedRouter from "hooks/useGuardedRouter";
import Image from "next/image";
import {
  useGetAllBlogsQuery,
  useGetBlogCategoriesQuery,
  useGetBlogTagsQuery
} from "app/store/services";

export default function BlogListingPage() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    tag: '',
    featured: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  });

  const { push } = useGuardedRouter();
  const searchParams = useSearchParams();

  // RTK Query hooks
  const {
    data: blogsData,
    isLoading: loading,
    error: blogsError
  } = useGetAllBlogsQuery({
    page: pagination.page,
    limit: pagination.limit,
    status: 'published',
    ...filters
  });

  const { data: categoriesData } = useGetBlogCategoriesQuery();
  const { data: tagsData } = useGetBlogTagsQuery();

  // Get data from RTK Query
  const blogs = blogsData?.data?.blogs || [];
  const paginationData = blogsData?.data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0
  };
  const categories = categoriesData?.data?.categories || [];
  const tags = tagsData?.data?.tags || [];

  // Initialize filters from URL on mount
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const tag = searchParams.get('tag') || '';
    const featured = searchParams.get('featured') || '';
    const page = searchParams.get('page') || '1';

    const initialFilters = { search, category, tag, featured };
    setFilters(initialFilters);
    setPagination(prev => ({ ...prev, page: parseInt(page) }));
  }, [searchParams]);

  const handleFilterChange = async (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));

    // Update URL
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });

    await push(`/blog?${params.toString()}`);
  };

  const handlePageChange = async (event, page) => {
    setPagination(prev => ({ ...prev, page }));
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    await push(`/blog?${params.toString()}`);
  };

  const clearFilters = async () => {
    setFilters({ search: '', category: '', tag: '', featured: '' });
    await push('/blog');
  };

  const handleBlogClick = async (slug) => {
    await push(`/blog/${slug}`);
  };

  return (
    <Fragment>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Main Content Area */}
          <Grid item xs={12} >
            {/* Blog Posts - One per row */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : blogs.length > 0 ? (
              <>
                {blogs.map((blog, index) => (
                  <Card
                    key={blog._id}
                    sx={{
                      mb: 4,
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: '1px solid transparent',
                      transition: 'all 0.3s ease-in-out',
                      cursor: 'pointer',
                      '&:hover': {
                        border: (theme) => `2px solid ${theme.palette.primary.main}`,
                        boxShadow: (theme) => `0 8px 25px ${theme.palette.primary.main}20`,
                        transform: 'translateY(-2px)'
                      }
                    }}
                    onClick={() => handleBlogClick(blog.slug)}
                  >
                    {/* Single Full-Width Image Header */}
                    <Box sx={{ position: 'relative', height: { xs: 250, sm: 300, md: 350 } }}>
                      {blog.featuredImage ? (
                        <Image
                          src={blog.featuredImage}
                          alt={blog.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                          bgcolor: 'grey.200'
                        }}>
                          <Image
                            src="/assets/images/logo.jpeg"
                            alt="Logo"
                            width={80}
                            height={80}
                            sizes="80px"
                            quality={75}
                            style={{
                              objectFit: 'contain',
                              opacity: 0.7,
                            }}
                          />
                        </Box>
                      )}

                      {/* Overlay with gradient */}
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)'
                      }} />

                      {/* Content Overlay */}
                      <Box sx={{
                        position: 'absolute',
                        bottom: { xs: 20, sm: 25, md: 30 },
                        left: { xs: 20, sm: 25, md: 30 },
                        right: { xs: 20, sm: 25, md: 30 },
                        color: 'white',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                      }}>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 1, fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' } }}>
                          {blog.category || 'FEATURED ARTICLE'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' } }}>
                          {blog.readingTime ? `${blog.readingTime} min read` : 'Quick read'}
                        </Typography>
                      </Box>

                      {/* Play Icon */}
                      <Box sx={{
                        position: 'absolute',
                        top: { xs: 20, sm: 25, md: 30 },
                        right: { xs: 20, sm: 25, md: 30 },
                        bgcolor: 'primary.main',
                        width: { xs: 40, sm: 45, md: 50 },
                        height: { xs: 40, sm: 45, md: 50 },
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          bgcolor: 'primary.dark'
                        }
                      }}>
                        <PlayIcon sx={{ color: 'white', fontSize: { xs: 20, sm: 22, md: 24 } }} />
                      </Box>
                    </Box>

                    <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                      <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{
                          mb: 2,
                          lineHeight: 1.2,
                          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }
                        }}
                      >
                        {blog.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' }
                        }}
                      >
                        By {blog.author?.firstName} {blog.author?.lastName} / Posted on {new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} / Posted in {blog.category || 'Blog'}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          mb: 3,
                          lineHeight: 1.6,
                          fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' }
                        }}
                      >
                        {blog.excerpt || 'Read more to discover the latest insights and trends in technology and mobile accessories.'}
                      </Typography>

                      <Button
                        variant="outlined"
                        endIcon={<ArrowForwardIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBlogClick(blog.slug);
                        }}
                        sx={{
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          '&:hover': {
                            borderColor: 'primary.dark',
                            bgcolor: 'primary.light',
                            color: 'primary.dark'
                          },
                          borderRadius: 2,
                          px: { xs: 2, sm: 2.5, md: 3 },
                          py: { xs: 0.5, sm: 0.75, md: 1 },
                          fontSize: { xs: '0.8rem', sm: '0.875rem', md: '0.9rem' }
                        }}
                      >
                        Continue Reading &gt;&gt;&gt;
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination */}
                {paginationData.totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                      count={paginationData.totalPages}
                      page={paginationData.currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                    />
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No blog posts found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search criteria or check back later for new content.
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
