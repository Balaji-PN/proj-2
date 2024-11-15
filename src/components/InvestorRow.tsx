import { useState } from "react";
import {
  Box,
  Collapse,
  Chip,
  IconButton,
  Typography,
  Stack,
  Link,
  Tooltip,
} from "@mui/material";
import {
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon,
  Language as WebsiteIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

export const InvestorRow = ({ investor }: { investor: any }) => {
  const [expanded, setExpanded] = useState(false);

  const socialLinks = [
    {
      icon: <WebsiteIcon />,
      link: investor.Website,
      label: "Website",
      color: "#2196F3",
    },
    {
      icon: <TwitterIcon />,
      link: investor["Twitter Link"],
      label: "Twitter",
      color: "#1DA1F2",
    },
    {
      icon: <LinkedInIcon />,
      link: investor["LinkedIn Link"],
      label: "LinkedIn",
      color: "#0A66C2",
    },
    {
      icon: <FacebookIcon />,
      link: investor["Facebook Link"],
      label: "Facebook",
      color: "#1877F2",
    },
    {
      icon: <EmailIcon />,
      link: `mailto:${investor["Partner Email"]}`,
      label: "Email",
      color: "#EA4335",
    },
  ];

  // Helper function to check if string is meaningful content
  const isValidContent = (str: string) => {
    const meaninglessPatterns = [
      /Company [A-Z]/, // Matches "Company A", "Company B", etc.
      /Investing in high-growth/,
      /Investment Profile/,
    ];

    return (
      str &&
      str.length > 0 &&
      !meaninglessPatterns.some((pattern) => pattern.test(str))
    );
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: { xs: 1, md: 2 },
        boxShadow: 1,
        '&:hover': {
          boxShadow: 2,
        },
      }}
    >
      {/* Main Row Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'center', sm: 'flex-start' },
          p: { xs: 2, sm: 2 },
          gap: { xs: 1.5, sm: 2 },
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            width: { xs: 60, sm: 60 },
            height: { xs: 60, sm: 60 },
            borderRadius: 1,
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <img
            src={`https://placehold.co/60x60?text=${investor["Investor Name"].charAt(0)}`}
            alt={investor["Investor Name"]}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        {/* Company Info - Centered on mobile */}
        <Box sx={{ 
          textAlign: { xs: 'center', sm: 'left' },
          flex: 1 
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {investor["Investor Name"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {investor.Location} • Founded {investor["Founding Year"]}
          </Typography>
        </Box>

        {/* Fund Type & Stage */}
        <Stack 
          direction={{ xs: 'row', sm: 'row' }} 
          spacing={1}
          sx={{ 
            flexWrap: 'wrap',
            gap: 0.5,
          }}
        >
          <Chip
            label={investor["Fund Type"]}
            size="small"
            sx={{ 
              bgcolor: 'primary.light',
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
            }}
          />
          <Chip
            label={investor["Fund Stage"]}
            size="small"
            sx={{ 
              bgcolor: 'secondary.light',
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
            }}
          />
        </Stack>

        {/* Social Links */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flex: { xs: 'none', sm: 1 },
            justifyContent: 'flex-end',
            mt: { xs: 1, sm: 0 },
          }}
        >
          {socialLinks.map((social, index) => (
            <Tooltip key={index} title={social.label}>
              <IconButton
                size="small"
                component={Link}
                href={social.link}
                target="_blank"
                sx={{
                  color: 'grey.500',
                  '&:hover': { color: social.color },
                  padding: { xs: 0.5, sm: 1 },
                }}
              >
                {social.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>

        {/* Toggle Button */}
        <Tooltip title={expanded ? "Show less" : "Show more"}>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            size="small"
            sx={{
              ml: { xs: 0, sm: 1 },
              bgcolor: expanded ? 'primary.light' : 'grey.100',
              '&:hover': {
                bgcolor: expanded ? 'primary.light' : 'grey.200',
              },
            }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Expanded Content */}
      <Collapse in={expanded}>
        <Box
          sx={{
            p: { xs: 1.5, sm: 2, md: 3 },
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: 'grey.50',
          }}
        >
          {/* Description */}
          {isValidContent(investor["Fund Description"]) && (
            <Typography 
              variant="body2" 
              paragraph
              sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
            >
              {investor["Fund Description"]}
            </Typography>
          )}

          {/* Investment Details */}
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="subtitle2" 
              gutterBottom
              sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
            >
              Investment Profile
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3}
            >
              {investor["Number of Investments"] && (
                <Typography variant="body2">
                  <strong>Total Investments:</strong>{" "}
                  {investor["Number of Investments"]}
                </Typography>
              )}
              {investor["Number of Exits"] && (
                <Typography variant="body2">
                  <strong>Successful Exits:</strong>{" "}
                  {investor["Number of Exits"]}
                </Typography>
              )}
              {isValidContent(investor["Partner Name"]) && (
                <Typography variant="body2">
                  <strong>Partner:</strong> {investor["Partner Name"]}
                </Typography>
              )}
            </Stack>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
