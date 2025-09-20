import { useEffect, useState } from "react";
import chroma from "chroma-js";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../app/layout/styles.css";
import type { FeatureCollection } from "geojson";
import {
  Box,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
  type SelectChangeEvent,
} from "@mui/material";

type Props = {
  metrics: { key: string; label: string }[];
  palette: string[];
};

export default function NYCMap({ metrics, palette }: Props) {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [property, setProperty] = useState(metrics[0].key);
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent) => {
    setProperty(event.target.value as string);
  };

  const getColor = (
    value: number,
    min: number,
    max: number,
    palette: string[]
  ) => {
    const scale = chroma.scale(palette).domain([min, max]);
    return scale(value).hex();
  };

  // Get current data statistics for the selected property
  const getDataStats = () => {
    if (!geoData) return { min: 0, max: 0, mean: 0, count: 0 };

    const values = geoData.features
      .map((f) => f.properties?.[property] || 0)
      .filter((v) => v > 0);

    const min = Math.min(...values);
    const max = Math.max(...values);
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;

    return { min, max, mean, count: values.length };
  };

  const stats = getDataStats();

  // Create color legend component
  const ColorLegend = () => {
    if (!geoData || stats.count === 0) return null;

    const legendSteps = 5;
    const step = (stats.max - stats.min) / (legendSteps - 1);

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          Data Range
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
          {Array.from({ length: legendSteps }, (_, i) => {
            const value = stats.min + step * i;
            const color = getColor(value, stats.min, stats.max, palette);

            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 16,
                    backgroundColor: color,
                    border: "1px solid var(--template-palette-divider)",
                    borderRadius: 1,
                    flexShrink: 0,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  {value.toFixed(2)}
                </Typography>
              </Box>
            );
          }).reverse()}
        </Box>
      </Box>
    );
  };

  const getFeatureStyle = (property: string) => (feature?: GeoJSON.Feature) => {
    if (!geoData || !feature)
      return {
        color: "var(--template-palette-text-secondary)",
        weight: 0.8,
        fillOpacity: 0.2,
        fillColor: "var(--template-palette-grey-300)",
        className: "zone-feature-empty",
      };

    const value = feature.properties?.[property] || 0;

    // Find min/max values for normalization
    const values = geoData.features
      .map((f) => f.properties?.[property] || 0)
      .filter((v) => v > 0);

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const fillColor = getColor(value, minValue, maxValue, palette);

    return {
      color: "var(--template-palette-text-secondary)",
      weight: 0.8,
      fillOpacity: 0.85,
      fillColor: fillColor,
      className: "zone-feature",
    };
  };

  useEffect(() => {
    console.log("Fetching GeoJSON data...");
    fetch("/merged.geojson")
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: FeatureCollection) => {
        console.log("GeoJSON data loaded:", data);
        console.log("Number of features:", data.features?.length);
        setGeoData(data);
      })
      .catch((err) => {
        console.error("Error loading GeoJSON:", err);
      });
  }, []);

  return (
    <Box
      sx={{
        background: "var(--template-palette-background-default)",
        maxWidth: "100%",
        m: 2
      }}
    >
      <Card
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid var(--template-palette-divider)",
        }}
      >
        <Box sx={{ p: 3, pb: 0 }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: "var(--template-palette-text-primary)",
            }}
          >
            NYC Taxi Zone Heatmap
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Interactive visualization of taxi metrics across NYC zones
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: "flex", 
            gap: 3, 
            p: 3, 
            pt: 0,
            height: "800px" 
          }}
        >
          {/* Map Container */}
          <Box sx={{ flex: 1 }}>
            <MapContainer
              center={[40.7128, -74.006]}
              zoom={11}
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "var(--template-palette-background-default)",
                borderRadius: "8px"
              }}
            >
              {geoData && (
                <GeoJSON
                  key={property}
                  data={geoData}
                  style={getFeatureStyle(property)}
                  onEachFeature={(feature, layer) => {
                    const zoneName =
                      feature.properties?.zone ||
                      feature.properties?.name ||
                      "Unknown Zone";
                    const borough = feature.properties?.borough || "";
                    const selectedValue = feature.properties?.[property] || 0;

                    layer.bindTooltip(
                      `
                      <div>
                        <strong>${zoneName}</strong><br/>
                        ${borough ? `${borough}<br/>` : ""}
                        ${property}: ${
                        typeof selectedValue === "number"
                          ? selectedValue.toFixed(6)
                          : selectedValue
                      }<br/>
                      </div>
                    `,
                      {
                        permanent: false,
                        direction: "center",
                        className: "zone-tooltip",
                      }
                    );
                  }}
                />
              )}
            </MapContainer>
          </Box>

          {/* Controls Panel */}
          <Box
            sx={{
              minWidth: 320,
              maxWidth: 360,
              background: `linear-gradient(135deg, 
                ${theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff"} 0%, 
                ${theme.palette.mode === "dark" ? "#2a2a2a" : "#f8f9fa"} 100%)`,
              border: `1px solid ${
                theme.palette.mode === "dark" ? "#444" : "#e0e0e0"
              }`,
              borderRadius: 2,
              p: 3,
              height: "fit-content",
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{
                fontWeight: 700,
                background:
                  "linear-gradient(45deg, var(--template-palette-primary-main), var(--template-palette-secondary-main))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Map Controls
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Select a metric to visualize on the heatmap
            </Typography>

            <FormControl fullWidth>
              <InputLabel
                id="metric-select-label"
                sx={{
                  fontWeight: 500,
                  "&.Mui-focused": {
                    color: "var(--template-palette-primary-main)",
                  },
                }}
              >
                Select Metric
              </InputLabel>
              <Select
                labelId="metric-select-label"
                id="metric-select"
                value={property}
                label="Select Metric"
                onChange={handleChange}
                sx={{
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: "var(--template-palette-primary-main)",
                      borderWidth: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--template-palette-primary-main)",
                      borderWidth: 2,
                      boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.1)",
                    },
                  },
                  "& .MuiSelect-select": {
                    fontWeight: 500,
                  },
                }}
              >
                {metrics.map((metric) => (
                  <MenuItem
                    key={metric.key}
                    value={metric.key}
                    sx={{
                      borderRadius: 1,
                      mx: 1,
                      my: 0.5,
                      "&:hover": {
                        backgroundColor:
                          "var(--template-palette-primary-light)",
                        color:
                          "var(--template-palette-primary-contrastText)",
                      },
                    }}
                  >
                    {metric.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Divider
              sx={{ my: 3, borderColor: "var(--template-palette-divider)" }}
            />

            <ColorLegend />
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
