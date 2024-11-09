import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import { InvestorRow } from "./components/InvestorRow";
import { data } from "./data";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end',
        mb: 4,
        gap: 2
      }}>
        <SignedOut>
          <Button
            component={SignInButton}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3
            }}
          >
            Sign In
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: {
                  width: 40,
                  height: 40
                }
              }
            }}
          />
        </SignedIn>
      </Box>
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

      <Stack spacing={2}>
        {filteredData.map((investor) => (
          <InvestorRow key={investor["S.no"]} investor={investor} />
        ))}
      </Stack>
    </Container>
  );
}

export default App;
