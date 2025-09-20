import { useEffect, useState } from "react";
import Papa from "papaparse";
import Plot from "react-plotly.js";
import { 
  Box, 
  Card, 
  Typography, 
  useTheme 
} from "@mui/material";
import { colorPalettes } from "../../theme/palettes";

type TripData = {
  time_of_day: string;
  trips: number;
};

export default function TripsByTime() {
  const [data, setData] = useState<TripData[]>([]);
  const theme = useTheme();

  useEffect(() => {
    Papa.parse("/trips_by_time_of_day.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        // Ensure trips is number
        const formattedData = results.data.map((row) => {
          const typedRow = row as TripData;
          return {
            time_of_day: typedRow.time_of_day,
            trips: Number(typedRow.trips)
          };
        });
        setData(formattedData);
      },
      error: (err) => console.error("Error parsing CSV:", err)
    });
  }, []);

  if (data.length === 0) return <div>Loading...</div>;

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
            Trip Volume by Time of Day
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Distribution of taxi trips throughout the day
          </Typography>
        </Box>
        
        <Plot
          data={[
            {
              x: data.map(d => d.time_of_day),
              y: data.map(d => d.trips),
              type: "scatter",
              mode: "lines+markers",
              line: { 
                color: colorPalettes.nyc.taxi[1], // Orange color from NYC taxi palette
                width: 3,
                shape: 'spline'
              },
              marker: { 
                color: colorPalettes.nyc.taxi[0], // Gold color from NYC taxi palette
                size: 8,
                line: {
                  color: colorPalettes.nyc.taxi[1],
                  width: 2
                }
              },
              fill: "tonexty",
              fillcolor: colorPalettes.nyc.taxi[0] + '20', // Add transparency
              hovertemplate: "<b>%{x}</b><br>Trips: %{y:,.0f}<extra></extra>",
              name: "Trip Count"
            }
          ]}
          layout={{
            title: {
              text: '',
              font: { 
                size: 16,
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }
            },
            xaxis: { 
              title: { 
                text: "Time of Day",
                font: {
                  size: 14,
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                }
              },
              gridcolor: theme.palette.mode === 'dark' ? '#444444' : '#e0e0e0',
              tickfont: {
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }
            },
            yaxis: { 
              title: { 
                text: "Number of Trips",
                font: {
                  size: 14,
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                }
              },
              gridcolor: theme.palette.mode === 'dark' ? '#444444' : '#e0e0e0',
              tickfont: {
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
              }
            },
            margin: { t: 20, l: 60, r: 20, b: 60 },
            paper_bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#ffffff',
            plot_bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#ffffff',
            font: { 
              size: 12,
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
            },
            showlegend: false,
            hovermode: 'x unified'
          }}
          style={{ 
            width: "100%", 
            height: "450px"
          }}
          config={{
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d', 'autoScale2d'],
            responsive: true
          }}
        />
      </Card>
    </Box>
  );
}
