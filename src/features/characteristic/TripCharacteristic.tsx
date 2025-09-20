import { Box, Typography } from "@mui/material";
import { colorPalettes } from "../../theme/palettes";
import NYCMap from "../map/NYCMap";
import DurationByTime from "./DurationByTime";

export default function TripCharacteristic() {
  const metrics: Metric[] = [
    { key: "avg_passenger_count", label: "Average Passenger Count" },
    { key: "avg_trip_distance", label: "Average Trip Distance" },
  ];

  return (
    <>
      <Box mb={10}>
        <Typography variant="h2" mb={2}>
          Trip Characteristics
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
        <DurationByTime />
        <NYCMap metrics={metrics} palette={colorPalettes.sequential.sunset} />
      </Box>
    </>
  );
}
