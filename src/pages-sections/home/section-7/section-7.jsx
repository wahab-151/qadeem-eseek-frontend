'use client';
import { Fragment } from "react";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";

// LOCAL CUSTOM COMPONENT
import BlogCard from "components/blog-cards/blog-card";
import { useGetAllBlogsQuery } from "app/store/services";

export default function Section7() {
  const router = useRouter();
  
  // RTK Query hook - Get at least 3 blogs
  const { 
    data: blogsData, 
    isLoading: loading, 
    error: blogsError 
  } = useGetAllBlogsQuery({
    limit: 6, // Get more to ensure we have at least 3
    status: 'published'
  });

  // Get blogs from RTK Query and ensure we have at least 3
  const allBlogs = blogsData?.data?.blogs || [];
  const blogs = allBlogs.slice(0, Math.max(3, allBlogs.length)); // Show at least 3 blogs

  const handleViewAllPosts = () => {
    router.push('/blog');
  };

  return (
    <Container className="mt-4 mb-4">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="h2"
          sx={{
            mb: "2rem",
            lineHeight: 1,
            color: (theme) => theme.palette.secondary.main,
            textShadow: "3px 3px 8px rgba(0,0,0,0.2)",
          }}
        >
          Get Ideas from our Blog
        </Typography>
        <Button 
          variant="outlined" 
          onClick={handleViewAllPosts}
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
          View All Posts
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : blogs.length > 0 ? (
        <Grid container spacing={3}>
          {blogs.map(blog => (
            <Grid size={{ md: 4, sm: 6, xs: 12 }} key={blog._id}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No blog posts available at the moment
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Check back later for new content
          </Typography>
        </Box>
      )}
    </Container>
  );
}