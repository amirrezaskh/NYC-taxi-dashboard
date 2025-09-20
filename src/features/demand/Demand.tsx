import { Box, Typography } from "@mui/material";
import TripsByTime from "./TripsByTime";
import TaxiSankey from "./TaxiSankey";
import { colorPalettes } from "../../theme/palettes";
import NYCMap from "../map/NYCMap";

export default function Demand() {
  const metrics: Metric[] = [
    { key: "pickup_trips", label: "Picked Up Trips" },
    { key: "dropoff_trips", label: "Dropped Off Trips" },
  ];

  return (
    <>
      <Box mb={10}>
        <Typography variant="h2" mb={2}>
          Trip Demand
        </Typography>
        <Typography variant="body1" mb={2}>
          We can assess the NYC taxi trips data with a monetary view by looking
          at the average tip or total amount of trips across all zones, total
          revenue of each zone, and average tip percentage.
        </Typography>
        <Typography variant="body1" mb={2}>
          Below you can find a heatmap demonstrating each of these metrics
          across all zones of NYC.
        </Typography>
        <TripsByTime />
        <TaxiSankey />
        <NYCMap metrics={metrics} palette={colorPalettes.sequential.sunset} />
      </Box>
    </>
  );
}
