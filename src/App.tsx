import { RedirectToSignIn, useAuth, UserButton } from "@clerk/clerk-react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import { InvestorRow } from "./components/InvestorRow";
import { data } from "./data";

// Get unique locations for filter
const locations = [...new Set(data.map((investor) => investor.Location))];
const fundTypes = [...new Set(data.map((investor) => investor["Fund Type"]))];

function App() {
  const { isLoaded, isSignedIn } = useAuth();

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

  // Show loading state
  if (!isLoaded) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  // Redirect to sign in if not authenticated
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  // Show the main app content if authenticated
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", sm: "flex-start" },
          mb: { xs: 3, md: 4 },
          gap: 2,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: "text.primary",
            fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Investor Directory
        </Typography>

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                width: { xs: 32, md: 40 },
                height: { xs: 32, md: 40 },
              },
            },
          }}
        />
      </Box>

      <Stack
        spacing={{ xs: 2, md: 3 }}
        sx={{
          mb: { xs: 3, md: 4 },
          width: "100%",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search investors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: { xs: 1, md: 2 },
            },
          }}
        />

        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
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

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
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

          <Grid item xs={12} sm={12} md={4}>
            <FormControl fullWidth size="small">
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

      <Stack spacing={{ xs: 1.5, md: 2 }}>
        {filteredData.map((investor) => (
          <InvestorRow key={investor["S.no"]} investor={investor} />
        ))}
      </Stack>
    </Container>
  );
}

export default App;
