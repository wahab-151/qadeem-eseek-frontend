"use client";
import Link from "next/link";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HoverBox from "components/HoverBox";
import FlexBox from "components/flex-box/flex-box";

export default function BlogCard({ blog = {} }) {
  const {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author,
    publishedAt,
    category,
    tags = [],
    readingTime,
    viewCount
  } = blog;
  // console.log("bllog for card", blog);

  const theme = useTheme();
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/blog/${slug}`);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <Box
      onClick={handleCardClick}
      sx={{
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 2,
        overflow: 'hidden',
        transition: "all 0.3s ease",
        cursor: "pointer",
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        "&:hover": {
          border: (theme) => `2px solid ${theme.palette.secondary[500]}`,
          boxShadow: (theme) => `0 4px 20px ${theme.palette.grey[300]}`,
        },
      }}
    >
      {/* Featured Image */}
      <HoverBox overflow="hidden" sx={{ height: 200, position: 'relative' }}>
        {featuredImage ? (
          <Image
            fill
            alt={title}
            src={featuredImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            quality={85}
            loading="lazy"
            style={{
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: (theme) => theme.palette.grey[100],
            }}
          >
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
      </HoverBox>

      {/* Content */}
      <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Category */}
        {category && (
          <Chip
            label={category}
            size="small"
            sx={{
              mb: 2,
              alignSelf: 'flex-start',
              bgcolor: (theme) => theme.palette.primary.main,
              color: 'white',
              fontSize: '0.75rem',
            }}
          />
        )}

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            mb: 1.5,
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            color: (theme) => theme.palette.text.primary,
            '&:hover': {
              color: (theme) => theme.palette.primary.main,
            }
          }}
        >
          {title}
        </Typography>

        {/* Excerpt */}
        {excerpt && (
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              color: (theme) => theme.palette.text.secondary,
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {truncateText(excerpt, 150)}
          </Typography>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.7rem',
                  height: 24,
                }}
              />
            ))}
            {tags.length > 3 && (
              <Chip
                label={`+${tags.length - 3}`}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.7rem',
                  height: 24,
                }}
              />
            )}
          </Box>
        )}

        {/* Author and Meta Info - HIDDEN ON FRONTEND */}
        {/* <Box sx={{ mt: 'auto' }}>
          <FlexBox alignItems="center" justifyContent="space-between" mb={1}>
            <FlexBox alignItems="center" gap={1}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: (theme) => theme.palette.primary.main,
                  fontSize: '0.875rem',
                }}
              >
                {author?.firstName?.charAt(0) || 'A'}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  {author?.firstName} {author?.lastName}
                </Typography>
              </Box>
            </FlexBox>
          </FlexBox>

          <FlexBox alignItems="center" justifyContent="space-between">
            <Typography variant="caption" color="text.secondary">
              {formatDate(publishedAt)}
            </Typography>
            <FlexBox alignItems="center" gap={2}>
              {readingTime && (
                <Typography variant="caption" color="text.secondary">
                  {readingTime} min read
                </Typography>
              )}
              {viewCount > 0 && (
                <Typography variant="caption" color="text.secondary">
                  {viewCount} views
                </Typography>
              )}
            </FlexBox>
          </FlexBox>
        </Box> */}
      </Box>
    </Box>
  );
}
