import "./App.css";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
  TextField,
  IconButton,
  Chip,
  Link,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Avatar,
} from "@mui/material";
import {
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon,
  Language as WebsiteIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { data } from "./data";

// Get unique locations for filter
const locations = [...new Set(data.map((investor) => investor.Location))];
const fundTypes = [...new Set(data.map((investor) => investor["Fund Type"]))];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [fundTypeFilter, setFundTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  // Filter and sort data
  let filteredData = data.filter((investor) =>
    investor["Investor Name"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (locationFilter !== "all") {
    filteredData = filteredData.filter(
      (investor) => investor.Location === locationFilter
    );
  }

  if (fundTypeFilter !== "all") {
    filteredData = filteredData.filter(
      (investor) => investor["Fund Type"] === fundTypeFilter
    );
  }

  // Sort data
  switch (sortBy) {
    case "investments":
      filteredData.sort(
        (a, b) =>
          Number(b["Number of Investments"]) -
          Number(a["Number of Investments"])
      );
      break;
    case "exits":
      filteredData.sort(
        (a, b) => Number(b["Number of Exits"]) - Number(a["Number of Exits"])
      );
      break;
    case "name":
      filteredData.sort((a, b) =>
        a["Investor Name"].localeCompare(b["Investor Name"])
      );
      break;
    case "year":
      filteredData.sort(
        (a, b) => Number(b["Founding Year"]) - Number(a["Founding Year"])
      );
      break;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4, color: "text.primary" }}
      >
        Investor Directory
      </Typography>

      <Stack spacing={3} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search investors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={locationFilter}
                label="Location"
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <MenuItem value="all">All Locations</MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Fund Type</InputLabel>
              <Select
                value={fundTypeFilter}
                label="Fund Type"
                onChange={(e) => setFundTypeFilter(e.target.value)}
              >
                <MenuItem value="all">All Fund Types</MenuItem>
                {fundTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="investments">Number of Investments</MenuItem>
                <MenuItem value="exits">Number of Exits</MenuItem>
                <MenuItem value="name">Company Name</MenuItem>
                <MenuItem value="year">Founding Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Stack>

      <Grid container spacing={3}>
        {filteredData.map((investor) => (
          <Grid item xs={12} md={6} key={investor["S.no"]}>
            <Card elevation={3}>
              <CardContent sx={{ display: "flex", gap: 3, p: 3 }}>
                {/* Left Column - Logo and Company Info */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: "180px",
                    borderRight: "1px solid",
                    borderColor: "grey.200",
                    pr: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: "grey.100",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "grey.300",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h3" color="primary.main">
                      {investor["Investor Name"].charAt(0)}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    component="h2"
                    align="center"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      lineHeight: 1.2,
                    }}
                  >
                    {investor["Investor Name"]}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    Est. {investor["Founding Year"]}
                  </Typography>
                </Box>

                {/* Right Column - Details */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ mb: 2.5, display: "flex", gap: 1 }}>
                    <Chip
                      label={investor["Fund Type"]}
                      sx={{
                        color: "primary.dark",
                        fontWeight: 500,
                      }}
                    />
                    <Chip
                      label={investor["Fund Stage"]}
                      sx={{
                        color: "secondary.dark",
                        fontWeight: 500,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2.5,
                      color: "text.primary",
                      lineHeight: 1.6,
                    }}
                  >
                    {investor["Fund Description"]}
                  </Typography>

                  <Box sx={{ mb: 2.5 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Focus Areas
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                      {investor["Fund Focus (Sectors)"]
                        .split(";")
                        .map((sector, index) => (
                          <Chip
                            key={index}
                            label={sector}
                            size="small"
                            sx={{
                              bgcolor: "grey.100",
                              "&:hover": { bgcolor: "grey.200" },
                            }}
                          />
                        ))}
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2.5 }}>
                    <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
                      <Typography variant="body2">
                        <strong>Location:</strong> {investor.Location}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Investments:</strong>{" "}
                        {investor["Number of Investments"]}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Exits:</strong> {investor["Number of Exits"]}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      borderTop: "1px solid",
                      borderColor: "grey.200",
                      pt: 2,
                    }}
                  >
                    <IconButton
                      component={Link}
                      href={investor.Website}
                      target="_blank"
                      size="small"
                      sx={{
                        color: "grey.600",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      <WebsiteIcon />
                    </IconButton>
                    <IconButton
                      component={Link}
                      href={investor["Twitter Link"]}
                      target="_blank"
                      size="small"
                      sx={{
                        color: "grey.600",
                        "&:hover": { color: "#1DA1F2" },
                      }}
                    >
                      <TwitterIcon />
                    </IconButton>
                    <IconButton
                      component={Link}
                      href={investor["LinkedIn Link"]}
                      target="_blank"
                      size="small"
                      sx={{
                        color: "grey.600",
                        "&:hover": { color: "#0A66C2" },
                      }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton
                      component={Link}
                      href={investor["Facebook Link"]}
                      target="_blank"
                      size="small"
                      sx={{
                        color: "grey.600",
                        "&:hover": { color: "#1877F2" },
                      }}
                    >
                      <FacebookIcon />
                    </IconButton>
                    <IconButton
                      component={Link}
                      href={`mailto:${investor["Partner Email"]}`}
                      size="small"
                      sx={{
                        color: "grey.600",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      <EmailIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
