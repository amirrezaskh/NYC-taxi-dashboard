import Papa from "papaparse";
import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { 
  Box, 
  Card, 
  Typography, 
  useTheme 
} from "@mui/material";
import { colorPalettes } from "../../theme/palettes";

type Row = {
  pickup_zone: string;
  dropoff_zone: string;
  trips: number;
};

export default function TaxiSankey() {
  const [data, setData] = useState<Row[]>([]);
  const theme = useTheme();

  useEffect(() => {
    // 👇 replace with your actual CSV file path (public folder or URL)
    Papa.parse("/dropoff_by_pickup_with_zones_20.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setData(result.data as Row[]);
      }
    });
  }, []);

  if (data.length === 0) {
    return (
      <Card 
        elevation={3}
        sx={{ 
          p: 4, 
          textAlign: 'center',
          borderRadius: 2
        }}
      >
        <Typography variant="body1" color="error">
          No data available
        </Typography>
      </Card>
    );
  }
  const allNodes = Array.from(
    new Set(data.flatMap((row) => [row.pickup_zone, row.dropoff_zone]))
  );

  const nodeIndices: Record<string, number> = {};
  allNodes.forEach((node, i) => {
    nodeIndices[node] = i;
  });

  // Step 2: Build Sankey links
  const sources = data.map((row) => nodeIndices[row.pickup_zone]);
  const targets = data.map((row) => nodeIndices[row.dropoff_zone]);
  const values = data.map((row) => row.trips);

  // Enhanced color scheme using our palette system
  const nodeColors = allNodes.map((_, index) => {
    return colorPalettes.categorical.vibrant[index % colorPalettes.categorical.vibrant.length];
  });

  // Create link colors with transparency
  const linkColors = sources.map((sourceIndex) => {
    const baseColor = nodeColors[sourceIndex];
    return baseColor + '40'; // Add 40% opacity
  });

  return (
    <Box 
      sx={{ 
        p: 2,
        background: 'var(--template-palette-background-default)'
      }}
    >
      <Card 
        elevation={3}
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid var(--template-palette-divider)'
        }}
      >
        <Box sx={{ p: 3, pb: 0 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: 'var(--template-palette-text-primary)'
            }}
          >
            Taxi Trip Flow Analysis
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Flow diagram showing pickup to dropoff zone relationships
          </Typography>
        </Box>
        
        <Plot
          data={[
            {
              type: "sankey",
              orientation: "h",
              node: {
                pad: 20,
                thickness: 25,
                line: { 
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', 
                  width: 1 
                },
                label: allNodes,
                color: nodeColors
              },
              link: {
                source: sources,
                target: targets,
                value: values,
                color: linkColors,
                line: {
                  color: theme.palette.mode === 'dark' ? '#555555' : '#cccccc',
                  width: 0.5
                }
              },
            },
          ]}
          layout={{
            title: {
              text: '',
              font: { 
                size: 16,
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }
            },
            font: { 
              size: 11,
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
            },
            paper_bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#ffffff',
            plot_bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#ffffff',
            margin: { l: 10, r: 10, t: 10, b: 10 },
          }}
          style={{ 
            width: "100%", 
            height: "650px"
          }}
          config={{
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
            responsive: true
          }}
        />
      </Card>
    </Box>
  );
}
