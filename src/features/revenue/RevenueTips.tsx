import { Box, Typography } from "@mui/material";
import { colorPalettes } from "../../theme/palettes";
import NYCMap from "../map/NYCMap";

export default function RevenueTips() {
  const metrics: Metric[] = [
    { key: "avg_tip_amount", label: "Average Tip Amount" },
    { key: "avg_total_amount", label: "Average Total Amount" },
    { key: "avg_tip_fare", label: "Average Tip Percentage" },
    { key: "revenue", label: "Total Revenue" },
  ];

  return (
    <Box mb={10}>
      <Box>
        <Typography variant="h2" mb={2}>Revenue & Tips</Typography>
        <Typography variant="body1" mb={2}>
          We can assess the NYC taxi trips data with a monetary view by looking
          at the average tip or total amount of trips across all zones, total
          revenue of each zone, and average tip percentage.
        </Typography>
        <Typography variant="body1" mb={2}>
          Below you can find a heatmap demonstrating each of these metrics across all zones of NYC.
        </Typography>
        
      </Box>

      <NYCMap metrics={metrics} palette={colorPalettes.sequential.sunset} />
    </Box>
  );
}
