import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";

// MUI ICON COMPONENTS
import AccessTime from "@mui/icons-material/AccessTime";
import CommentOutlined from "@mui/icons-material/CommentOutlined";

// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import FlexBox from "components/flex-box/flex-box";
import { NavLink2 } from "components/nav-link";

// CUSTOM DATA MODEL


// ===========================================================


// ===========================================================

const ICON_STYLE = {
  fontSize: "1rem",
  color: "#666666"
};
export default function BlogCard({
  blog
}) {
  const theme = useTheme();
  
  // Use featuredImage if thumbnail doesn't exist (for backward compatibility)
  const imageUrl = blog.thumbnail || blog.featuredImage;
  // Use description if excerpt doesn't exist (for backward compatibility)
  const description = blog.description || blog.excerpt;
  // Use createdAt or publishedAt
  const date = blog.createdAt || blog.publishedAt;
  
  return <Box 
      overflow="hidden" 
      borderRadius={3}
      sx={{
        border: `1px solid ${theme.palette.grey[200]}`,
        transition: "all 0.3s ease",
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          border: `2px solid ${theme.palette.primary.main}`,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          "& .blog-title": {
            color: theme.palette.primary.main,
          },
          "& .blog-image-container img": {
            transform: "scale(1.1)",
          },
        },
      }}
    >
      <Box
        className="blog-image-container"
        sx={{
          overflow: "hidden",
          position: "relative",
          height: 272,
          "& img": {
            transition: "transform 0.3s ease",
            objectFit: "cover",
          },
        }}
      >
        <LazyImage 
          width={588} 
          height={272} 
          alt="blog-image" 
          src={imageUrl}
        />
      </Box>

      <Box py={3}>
        <Typography 
          variant="h3" 
          className="blog-title"
          sx={{
            lineHeight: 1.3,
            color: theme.palette.text.primary,
            transition: "color 0.3s ease",
            fontWeight: 500,
          }}
        >
          {blog.title}
        </Typography>

        <FlexBox alignItems="center" mt="5px" gap={3}>
          <FlexBox alignItems="center" gap={0.5}>
            <AccessTime sx={ICON_STYLE} />
            <Typography variant="body1">
              {date ? format(new Date(date), "dd MMMM, yyyy") : ""}
            </Typography>
          </FlexBox>

          {blog.comments !== undefined && (
            <FlexBox alignItems="center" gap={0.5}>
              <CommentOutlined sx={ICON_STYLE} />
              <Typography variant="body1">{blog.comments} comments</Typography>
            </FlexBox>
          )}
        </FlexBox>

        {description && (
          <Typography 
            variant="body1" 
            sx={{
              mt: "1.2rem",
              mb: "0.7rem",
              color: "#666666",
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        )}

        <Box sx={{ mt: "auto" }}>
          <NavLink2 
            title="CONTINUE READING" 
            url={blog.slug ? `/blog/${blog.slug}` : "#"}
            color={theme.palette.primary.main}
            borderColor={theme.palette.primary.main}
          />
        </Box>
      </Box>
    </Box>;
}