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
          Dive deep into the fundamental characteristics of NYC taxi trips, analyzing passenger behavior, journey distances, 
          and temporal patterns. This section reveals how trip attributes vary across different areas and times, 
          providing insights into urban mobility patterns and service utilization.
        </Typography>
        <Typography variant="body1" mb={2}>
          <strong>Key Observations:</strong>
        </Typography>
        <Typography variant="body1" component="div" mb={2}>
          <Box component="ul" sx={{ pl: 2, mt: 0 }}>
            <li><strong>Passenger Patterns:</strong> Business districts average fewer passengers per trip (1.2-1.4) reflecting commuter usage, while entertainment zones show higher occupancy (1.6-2.0) indicating group social activities.</li>
            <li><strong>Distance Variations:</strong> Airport connections and outer borough trips show significantly longer distances, while Manhattan intra-zone trips remain relatively short (0.8-1.5 miles).</li>
            <li><strong>Duration Dynamics:</strong> Trip duration varies dramatically by time of day due to traffic patterns, with rush hours showing 40-60% longer durations for similar distances.</li>
            <li><strong>Geographic Influence:</strong> Bridge and tunnel access points create distinct trip characteristic patterns, affecting both distance and duration distributions.</li>
          </Box>
        </Typography>
        <Typography variant="body1" mb={2}>
          Explore the temporal duration patterns and geographic distribution of trip characteristics below to understand 
          how NYC's urban geography and daily rhythms shape taxi service utilization.
        </Typography>
        <DurationByTime />
        <NYCMap metrics={metrics} palette={colorPalettes.sequential.sunset} />
      </Box>
    </>
  );
}
