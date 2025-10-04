import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import {
  Analytics,
  Map,
  Timeline,
  AccountBalance,
  DirectionsCar,
  Schedule,
  Place,
  TrendingUp
} from "@mui/icons-material";

export default function AboutPage() {
  const technologies = [
    "React", "TypeScript", "Material-UI", "Plotly.js", "Leaflet",
    "Python", "BigQuery", "Pandas", "GeoPandas", "Jupyter"
  ];

  const features = [
    {
      icon: <Map color="primary" />,
      title: "Interactive Heatmaps",
      description: "Color-coded NYC taxi zones showing revenue, tips, and trip patterns"
    },
    {
      icon: <Timeline color="primary" />,
      title: "Time Series Analysis",
      description: "Trip volume and duration patterns throughout the day"
    },
    {
      icon: <Analytics color="primary" />,
      title: "Flow Visualization",
      description: "Sankey diagrams showing pickup-dropoff relationships"
    },
    {
      icon: <TrendingUp color="primary" />,
      title: "Revenue Analytics",
      description: "Financial insights including tips, fares, and zone profitability"
    }
  ];

  const dataPoints = [
    {
      icon: <Schedule color="secondary" />,
      title: "Pickup DateTime",
      description: "Temporal analysis of trip patterns across 30-minute intervals"
    },
    {
      icon: <DirectionsCar color="secondary" />,
      title: "Passenger Count",
      description: "Average passengers per trip across different zones and times"
    },
    {
      icon: <Place color="secondary" />,
      title: "Pickup Location ID",
      description: "263 NYC taxi zones for spatial analysis and heatmap generation"
    },
    {
      icon: <Place color="secondary" />,
      title: "Dropoff Location ID",
      description: "Destination patterns for flow analysis and origin-destination insights"
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box mb={6}>
        <Typography variant="h1" component="h1" gutterBottom>
          About NYC Taxi Analytics
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          A comprehensive data analytics platform that transforms NYC taxi trip data 
          into actionable insights through interactive visualizations and advanced analytics.
        </Typography>
      </Box>

      {/* Project Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Project Overview
          </Typography>
          <Typography variant="body1" paragraph>
            This project combines the power of big data processing with modern web technologies 
            to analyze millions of NYC taxi trips. By leveraging Google BigQuery's public 
            datasets and React-based visualizations, we provide insights into transportation 
            patterns, revenue metrics, and geographic distributions across New York City's 
            263 taxi zones.
          </Typography>
          <Typography variant="body1" paragraph>
            The platform serves data analysts, urban planners, transportation researchers, 
            and anyone interested in understanding NYC's taxi ecosystem through data-driven insights.
          </Typography>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Key Features
        </Typography>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
          {features.map((feature, index) => (
            <Card sx={{ height: '100%' }} key={index}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  {feature.icon}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Data Sources */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <AccountBalance color="primary" sx={{ mr: 1 }} />
            <Typography variant="h4">
              Data Sources & Key Metrics
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            Our analysis processes NYC TLC (Taxi and Limousine Commission) trip records 
            from Google BigQuery's public datasets, covering yellow and green taxi trips 
            across all five boroughs.
          </Typography>
          
          <List>
            {dataPoints.map((point, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {point.icon}
                </ListItemIcon>
                <ListItemText
                  primary={point.title}
                  secondary={point.description}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Technology Stack
          </Typography>
          <Typography variant="body1" paragraph>
            Built with modern web technologies and data processing tools for 
            optimal performance and user experience.
          </Typography>
          
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Frontend Technologies
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
              {technologies.slice(0, 5).map((tech) => (
                <Chip key={tech} label={tech} variant="outlined" color="primary" />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Data Processing & Analysis
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {technologies.slice(5).map((tech) => (
                <Chip key={tech} label={tech} variant="outlined" color="secondary" />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Architecture */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Architecture
          </Typography>
          <Typography variant="body1" paragraph>
            The platform follows a modern data pipeline architecture:
          </Typography>
          
          <Box sx={{ 
            bgcolor: 'background.paper', 
            p: 3, 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', lineHeight: 1.6 }}>
              BigQuery Public Dataset → Python Processing → CSV/GeoJSON → React Visualization
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mt: 2 }}>
            This end-to-end pipeline ensures data integrity, optimal performance, 
            and seamless integration between data processing and visualization layers.
          </Typography>
        </CardContent>
      </Card>

      {/* Impact & Insights */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Impact & Insights
          </Typography>
          <Typography variant="body1" paragraph>
            This platform enables stakeholders to:
          </Typography>
          
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
            <Box>
              <List dense>
                <ListItem>
                  <ListItemText primary="• Identify high-revenue taxi zones" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Analyze temporal trip patterns" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Understand passenger behavior" />
                </ListItem>
              </List>
            </Box>
            <Box>
              <List dense>
                <ListItem>
                  <ListItemText primary="• Optimize fleet distribution" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Plan transportation infrastructure" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Make data-driven policy decisions" />
                </ListItem>
              </List>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}