"use client";
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Pagination,
  CircularProgress,
  Card,
  CardContent,
  Button,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  ArrowForward as ArrowForwardIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import useGuardedRouter from "hooks/useGuardedRouter";
import Image from "next/image";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  useGetAllBlogsQuery,
  useGetBlogCategoriesQuery,
} from "app/store/services";

const BANNER_IMAGE = "/assets/images/blog-hero.png";

const COLORS = {
  primary: "#FAE7AF",
  text: "#2C2416",
  border: "#E0E0E0",
  bgLight: "#FEFAF0",
  secondaryText: "#705D27",
};

export default function BlogListingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [filters, setFilters] = useState({
    search: "",
    category: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { push } = useGuardedRouter();
  const searchParams = useSearchParams();

  // RTK Query hooks
  const { data: blogsData, isLoading: loading } = useGetAllBlogsQuery({
    page: pagination.page,
    limit: pagination.limit,
    status: "published",
    ...filters,
  });

  const { data: categoriesData } = useGetBlogCategoriesQuery();

  // Get data from RTK Query
  const blogs = blogsData?.data?.blogs || [];
  const paginationData = blogsData?.data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
  };
  const categories = categoriesData?.data?.categories || [];

  // Get recent posts (first 4 blogs)
  const recentPosts = blogs.slice(0, 4);

  // Initialize filters from URL on mount
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const page = searchParams.get("page") || "1";

    const initialFilters = { search, category };
    setFilters(initialFilters);
    setPagination((prev) => ({ ...prev, page: parseInt(page) }));
  }, [searchParams]);

  const handleFilterChange = async (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));

    // Update URL
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });

    await push(`/blog?${params.toString()}`);
  };

  const handlePageChange = async (event, page) => {
    setPagination((prev) => ({ ...prev, page }));
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    await push(`/blog?${params.toString()}`);
  };

  const handleBlogClick = async (slug) => {
    await push(`/blog/${slug}`);
  };

  return (
    <Fragment>
      <Box sx={{ bgcolor: "#fff", minHeight: "100vh", pb: { xs: 4, md: 8 } }}>
        {/* Hero Banner */}
        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 200, md: 300, lg: 400 },
            width: "100%",
            backgroundImage: `url(${BANNER_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: { xs: 4, md: 6 },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              color: "#fff",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                color: "#FEFAF0",
                fontSize: { xs: "36px", md: "52px" },
                mb: 2,
                letterSpacing: 1,
              }}
            >
              Blog's
            </Typography>
            <Breadcrumbs
              separator={
                <NavigateNextIcon fontSize="16px" sx={{ color: "#FEFAF0" }} />
              }
              aria-label="breadcrumb"
              sx={{
                justifyContent: "center",
                display: "flex",
                color: "#FEFAF0",
                "& .MuiBreadcrumbs-li": { color: "#FEFAF0" },
              }}
            >
              <Link
                href="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1rem",
                }}
              >
                Home
              </Link>
              <Typography color="inherit" fontSize="1rem">
                Blog
              </Typography>
            </Breadcrumbs>
          </Box>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2, md: 3 } }}>
          {/* Search Box & Filter Button for Mobile */}
          {isMobile && (
            <Box sx={{ px: 2, mb: 3 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Search"
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: COLORS.secondaryText }} />
                      </InputAdornment>
                    ),
                    sx: { height: "48px", borderRadius: 0 },
                  }}
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 0,
                      bgcolor: "#fff",
                      "& fieldset": { borderColor: "#eee" },
                    },
                  }}
                />
                <IconButton
                  onClick={() => setIsDrawerOpen(true)}
                  sx={{
                    width: "48px",
                    height: "48px",
                    borderRadius: 0,
                    border: "1px solid #eee",
                    color: COLORS.text,
                    bgcolor: "#fff",
                    "&:hover": {
                      borderColor: COLORS.text,
                      bgcolor: "#eee",
                    },
                  }}
                >
                  <FilterListIcon />
                </IconButton>
              </Box>

              {/* Applied Filters Chip Row */}
              {(filters.search || filters.category) && (
                <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {filters.search && (
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        bgcolor: "#f5f5f5",
                        border: "1px solid #E0E0E0",
                        borderRadius: 0,
                        px: 1.5,
                        py: 0.5,
                        fontSize: "12px",
                      }}
                    >
                      Search: {filters.search}
                      <Box
                        component="span"
                        onClick={() => handleFilterChange("search", "")}
                        sx={{ ml: 1, cursor: "pointer", fontWeight: "bold" }}
                      >
                        ×
                      </Box>
                    </Box>
                  )}
                  {filters.category && (
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        bgcolor: "#f5f5f5",
                        border: "1px solid #E0E0E0",
                        borderRadius: 0,
                        px: 1.5,
                        py: 0.5,
                        fontSize: "12px",
                      }}
                    >
                      Category: {filters.category}
                      <Box
                        component="span"
                        onClick={() => handleFilterChange("category", "")}
                        sx={{ ml: 1, cursor: "pointer", fontWeight: "bold" }}
                      >
                        ×
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}

          {/* Mobile Filter Drawer */}
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            PaperProps={{
              sx: { width: "280px", p: 3 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "20px",
                }}
              >
                Categories
              </Typography>
              <IconButton onClick={() => setIsDrawerOpen(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              onClick={() => setIsDrawerOpen(false)}
            >
              <Button
                onClick={() => handleFilterChange("category", "")}
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  color:
                    filters.category === "" ? COLORS.secondaryText : "#000",
                  fontWeight: filters.category === "" ? 600 : 400,
                }}
              >
                All Categories
              </Button>
              {categories.map((cat) => {
                const name = cat.name || cat.title || cat._id;
                const isActive = filters.category === name;
                return (
                  <Button
                    key={cat._id}
                    onClick={() => handleFilterChange("category", name)}
                    fullWidth
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      color: isActive ? COLORS.secondaryText : "#000",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {name} ({cat.count || 0})
                  </Button>
                );
              })}
            </Box>
          </Drawer>

          <Grid container spacing={{ xs: 0, md: 6 }}>
            {/* Left Column: Blog Posts */}
            <Grid item xs={12} md={8}>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : blogs.length > 0 ? (
                <>
                  {blogs.map((blog) => (
                    <Card
                      key={blog._id}
                      elevation={0}
                      sx={{
                        mb: { xs: 2, md: 4 }, // Closer together on mobile
                        borderRadius: { xs: "0px", md: "0px" },
                        overflow: "hidden",
                        border: "none",
                        boxShadow: "none",
                        bgcolor: "#fff",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {/* Blog Image */}
                      <Box
                        sx={{
                          position: "relative",
                          height: { xs: 250, md: 500 },
                          borderBottom: "1px solid #eee",
                          border: "1px solid #E0E0E0",
                        }}
                      >
                        {blog.featuredImage ? (
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                              bgcolor: "grey.200",
                            }}
                          >
                            <Image
                              src="/assets/images/logo.jpeg"
                              alt="Logo"
                              width={60}
                              height={60}
                              style={{ objectFit: "contain", opacity: 0.5 }}
                            />
                          </Box>
                        )}
                      </Box>

                      <CardContent sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
                        <Typography
                          fontWeight={600}
                          sx={{
                            mb: 2,
                            lineHeight: 1.3,
                            color: "#271E03",
                            fontSize: { xs: "22px", md: "30px" },
                          }}
                        >
                          {blog.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            fontSize: "0.875rem",
                          }}
                        >
                          {(() => {
                            const text =
                              blog.excerpt ||
                              blog.content?.replace(/<[^>]*>/g, "") ||
                              "Read more to discover the latest insights and trends.";
                            const words = text.split(/\s+/);
                            if (words.length <= 90) return text;
                            return words.slice(0, 90).join(" ") + "...";
                          })()}
                        </Typography>

                        <Button
                          variant="text"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBlogClick(blog.slug);
                          }}
                          sx={{
                            color: "#271E03",
                            textTransform: "none",
                            fontSize: "16px",
                            fontWeight: 400,
                            p: 0,
                            "&:hover": {
                              bgcolor: "transparent",
                              color: COLORS.secondaryText,
                            },
                          }}
                        >
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Pagination */}
                  {paginationData.totalPages > 1 && (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                    >
                      <Pagination
                        count={paginationData.totalPages}
                        page={paginationData.currentPage}
                        onChange={handlePageChange}
                        size={isMobile ? "small" : "medium"}
                        siblingCount={isMobile ? 0 : 1}
                        sx={{
                          "& .MuiPaginationItem-root": {
                            borderRadius: 0,
                            border: "1px solid #E0E0E0",
                            "&.Mui-selected": {
                              bgcolor: COLORS.text,
                              color: "#fff",
                              "&:hover": {
                                bgcolor: COLORS.secondaryText,
                              },
                            },
                          },
                        }}
                      />
                    </Box>
                  )}
                </>
              ) : (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    No blog posts found
                  </Typography>
                </Box>
              )}

              {/* Recent Posts for Mobile (Bottom) */}
              {isMobile && recentPosts.length > 0 && (
                <Box sx={{ mt: 6, px: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "18px",
                      color: COLORS.text,
                      mb: 2,
                      pb: 1,
                      borderBottom: `2px solid ${COLORS.text}`,
                    }}
                  >
                    Recent Posts
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {recentPosts.map((post, index) => (
                      <ListItem
                        key={post?._id || `mobile-recent-${index}`}
                        disablePadding
                        sx={{ mb: 2 }}
                      >
                        <ListItemButton
                          onClick={() => handleBlogClick(post.slug)}
                          sx={{
                            p: 0,
                            display: "flex",
                            gap: 2,
                            "&:hover": { bgcolor: "transparent" },
                          }}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              width: 110,
                              height: 110,
                              flexShrink: 0,
                              bgcolor: "grey.200",
                              border: "1px solid #E0E0E0",
                            }}
                          >
                            {post.featuredImage ? (
                              <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  height: "100%",
                                }}
                              >
                                <Image
                                  src="/assets/images/logo.jpeg"
                                  alt="Logo"
                                  width={30}
                                  height={30}
                                  style={{ objectFit: "contain", opacity: 0.5 }}
                                />
                              </Box>
                            )}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                color: COLORS.text,
                                mb: 0.5,
                                lineHeight: 1.3,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {post.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {new Date(post.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </Typography>
                          </Box>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Grid>

            {/* Right Column: Sidebar (Desktop Only) */}
            {!isMobile && (
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                {/* Search Box */}
                <Box sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    placeholder="Search"
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: COLORS.secondaryText }} />
                        </InputAdornment>
                      ),
                      sx: {
                        height: "52px",
                        borderRadius: 0,
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        "& fieldset": {
                          borderColor: "#ccc",
                        },
                        "&:hover fieldset": {
                          borderColor: "#999",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#000",
                        },
                      },
                    }}
                  />

                  {/* Applied Filters */}
                  {(filters.search || filters.category) && (
                    <Box
                      sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}
                    >
                      {filters.search && (
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            bgcolor: "#f5f5f5",
                            border: "1px solid #E0E0E0",
                            borderRadius: 0,
                            px: 1.5,
                            py: 0.5,
                            fontSize: "13px",
                            color: "#000",
                          }}
                        >
                          Search: "{filters.search}"
                          <Box
                            component="span"
                            onClick={() => handleFilterChange("search", "")}
                            sx={{
                              ml: 1,
                              cursor: "pointer",
                              fontWeight: "bold",
                              "&:hover": {
                                color: COLORS.secondaryText,
                              },
                            }}
                          >
                            ×
                          </Box>
                        </Box>
                      )}
                      {filters.category && (
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            bgcolor: "#f5f5f5",
                            border: "1px solid #E0E0E0",
                            borderRadius: 0,
                            px: 1.5,
                            py: 0.5,
                            fontSize: "13px",
                            color: "#000",
                          }}
                        >
                          Category: {filters.category}
                          <Box
                            component="span"
                            onClick={() => handleFilterChange("category", "")}
                            sx={{
                              ml: 1,
                              cursor: "pointer",
                              fontWeight: "bold",
                              "&:hover": {
                                color: COLORS.secondaryText,
                              },
                            }}
                          >
                            ×
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>

                {/* Categories */}
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "20px",
                      color: "#000",
                      mb: 3,
                    }}
                  >
                    Categories
                  </Typography>
                  <Box
                    sx={{
                      maxHeight: "400px",
                      overflowY: "auto",
                      pr: 1, // Space for scrollbar
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#ccc",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: "#999",
                      },
                    }}
                  >
                    {categories.map((category, index) => (
                      <Button
                        key={category._id}
                        onClick={() =>
                          handleFilterChange(
                            "category",
                            category.name || category.title || category._id,
                          )
                        }
                        fullWidth
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          py: 2,
                          px: 2,
                          textTransform: "none",
                          bgcolor: "transparent",
                          border: "none",
                          borderRadius: 0,
                          "&:hover": {
                            bgcolor: "transparent",
                            "& .category-name": {
                              color: COLORS.secondaryText,
                            },
                          },
                        }}
                      >
                        <Typography
                          className="category-name"
                          sx={{
                            fontSize: "14px",
                            color: "#000",
                            transition: "color 0.2s",
                          }}
                        >
                          {category.name ||
                            category.title ||
                            category._id ||
                            "Unknown Category"}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#000",
                          }}
                        >
                          {category.count || 0}
                        </Typography>
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* Recent Posts */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "18px",
                      color: COLORS.text,
                      mb: 2,
                      pb: 1,
                      borderBottom: `2px solid ${COLORS.text}`,
                    }}
                  >
                    Recent Posts
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {recentPosts.map((post, index) => (
                      <ListItem
                        key={post?._id || `desktop-recent-${index}`}
                        disablePadding
                        sx={{ mb: 2 }}
                      >
                        <ListItemButton
                          onClick={() => handleBlogClick(post.slug)}
                          sx={{
                            p: 0,
                            display: "flex",
                            gap: 2,
                            "&:hover": {
                              bgcolor: "transparent",
                            },
                          }}
                        >
                          {/* Thumbnail */}
                          <Box
                            sx={{
                              position: "relative",
                              width: 110,
                              height: 110,
                              flexShrink: 0,
                              bgcolor: "grey.200",
                              border: "1px solid #E0E0E0",
                            }}
                          >
                            {post.featuredImage ? (
                              <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  height: "100%",
                                }}
                              >
                                <Image
                                  src="/assets/images/logo.jpeg"
                                  alt="Logo"
                                  width={30}
                                  height={30}
                                  style={{ objectFit: "contain", opacity: 0.5 }}
                                />
                              </Box>
                            )}
                          </Box>

                          {/* Post Info */}
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                color: COLORS.text,
                                mb: 0.5,
                                lineHeight: 1.3,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {post.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {new Date(post.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </Typography>
                          </Box>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
}
