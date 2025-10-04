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
          Understand the dynamic patterns of taxi demand across NYC through temporal analysis and geographic flow visualization. 
          This section reveals when, where, and how New Yorkers use taxi services, uncovering the rhythms of urban mobility.
        </Typography>
        <Typography variant="body1" mb={2}>
          <strong>Key Findings:</strong>
        </Typography>
        <Typography variant="body1" component="div" mb={2}>
          <Box component="ul" sx={{ pl: 2, mt: 0 }}>
            <li><strong>Rush Hour Peaks:</strong> Demand spikes during morning (7-9 AM) and evening (5-7 PM) commute hours, with distinct patterns for pickup vs. dropoff zones.</li>
            <li><strong>Weekend Shifts:</strong> Late-night demand (10 PM - 2 AM) concentrates in entertainment districts like East Village, SoHo, and Times Square.</li>
            <li><strong>Commuter Flows:</strong> Clear directional patterns emerge - residential areas generate morning pickups while business districts see evening pickups.</li>
            <li><strong>Seasonal Variations:</strong> Weather events, holidays, and special events create significant demand fluctuations across different zones.</li>
          </Box>
        </Typography>
        <Typography variant="body1" mb={2}>
          The visualizations below show temporal demand patterns, origin-destination flows, and geographic distribution of trip volumes, 
          providing a comprehensive view of NYC's taxi utilization patterns.
        </Typography>
        <TripsByTime />
        <TaxiSankey />
        <NYCMap metrics={metrics} palette={colorPalettes.sequential.sunset} />
      </Box>
    </>
  );
}
