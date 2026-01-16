"use client";
import { Fragment } from "react";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";

// LOCAL CUSTOM COMPONENT
import BlogCard from "components/blog-cards/blog-card";
import HomeSectionHeader from "components/section-header/home-section-header";
import { useGetAllBlogsQuery } from "app/store/services";

export default function Section7() {
  const router = useRouter();

  // RTK Query hook - Get at least 3 blogs
  const {
    data: blogsData,
    isLoading: loading,
    error: blogsError,
  } = useGetAllBlogsQuery({
    limit: 6, // Get more to ensure we have at least 3
    status: "published",
  });

  // Get blogs from RTK Query and ensure we have at least 3
  const allBlogs = blogsData?.data?.blogs || [];
  const blogs = allBlogs.slice(0, Math.max(3, allBlogs.length)); // Show at least 3 blogs

  const handleViewAllPosts = () => {
    router.push("/blog");
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
          subtitle="BLOG"
          title="Get Ideas from our Blog"
          description="Discover inspiration, tips, and stories from our blog. Stay updated with the latest trends, guides, and insights."
          actionLabel="VIEW ALL POSTS"
          actionHref="/blog"
        />

        {/* Blog Cards Section */}
        <Box
          sx={{
            width: "100%",
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : blogs.length > 0 ? (
            <Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
              {blogs.map((blog) => (
                <Grid size={{ md: 4, sm: 6, xs: 12 }} key={blog._id}>
                  <BlogCard blog={blog} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: "left", py: 4 }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "16px",
                  lineHeight: "26px",
                  color: "#271E03",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0%",
                }}
              >
                No blog posts available at the moment. Check back later for new
                content.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </section>
  );
}
