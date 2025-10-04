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
          Explore the financial landscape of NYC's taxi ecosystem through comprehensive revenue and tipping analysis. 
          This section reveals how monetary patterns vary across different neighborhoods and zones, providing insights 
          into customer behavior, service quality, and economic activity distribution.
        </Typography>
        <Typography variant="body1" mb={2}>
          <strong>Key Insights:</strong>
        </Typography>
        <Typography variant="body1" component="div" mb={2}>
          <Box component="ul" sx={{ pl: 2, mt: 0 }}>
            <li><strong>Manhattan Premium:</strong> Midtown and Financial District typically show the highest average tip amounts, reflecting premium service expectations and higher disposable income.</li>
            <li><strong>Airport Zones:</strong> JFK and LaGuardia pickup zones often generate higher total revenue due to longer-distance trips and airport surcharges.</li>
            <li><strong>Tip Percentage Patterns:</strong> Business districts show higher tip percentages during weekdays, while entertainment zones peak during weekends.</li>
            <li><strong>Revenue Concentration:</strong> Despite covering less geographic area, Manhattan zones account for a disproportionate share of total taxi revenue.</li>
          </Box>
        </Typography>
        <Typography variant="body1" mb={2}>
          The interactive heatmap below allows you to explore these financial metrics across all 263 NYC taxi zones, 
          revealing the economic geography of the city's transportation network.
        </Typography>
      </Box>

      <NYCMap metrics={metrics} palette={colorPalettes.sequential.sunset} />
    </Box>
  );
}
