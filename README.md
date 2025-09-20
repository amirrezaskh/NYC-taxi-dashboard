# NYC Taxi Analytics Dashboard

A comprehensive end-to-end data analytics project that processes NYC taxi trip data and presents insights through an interactive React dashboard. This project combines Python-based data analysis with modern web visualization to explore taxi trip patterns, revenue metrics, and geographic distributions across New York City.

## 🌟 Project Overview

This project consists of two main components:
1. **Data Processing Pipeline** - Python-based analysis of NYC TLC taxi data
2. **Interactive Dashboard** - React-based web application for data visualization

The dashboard provides insights into:
- **Revenue Analysis** - Average tips, total amounts, and revenue by zone
- **Trip Demand** - Pickup/dropoff patterns and flow analysis
- **Trip Characteristics** - Duration, distance, and passenger patterns
- **Geographic Visualization** - Interactive heatmaps of NYC taxi zones

## 🏗️ Architecture

```
NYC Taxi Analytics Project
├── Data Processing (Python)          ├── Web Dashboard (React)
│   ├── Raw Parquet Files            │   ├── Interactive Heatmaps
│   ├── Jupyter Notebooks            │   ├── Flow Diagrams
│   ├── Processing Scripts            │   ├── Time Series Charts
│   └── Generated CSV/GeoJSON         │   └── Material-UI Interface
│                                     │
└── Data Flow: Raw Data → Processing → CSV/GeoJSON → React Visualization
```

## 📊 Data Analysis Pipeline

### Data Sources
- **NYC TLC Trip Record Data** - Yellow and Green taxi trips
- **NYC Taxi Zone Shapefiles** - Geographic boundaries (263 zones)
- **Time Period** - January-February 2025
- **Data Format** - Parquet files for efficient processing

### Key Metrics Generated
- `avg_tip_amount.csv` - Average tip amounts by pickup location
- `avg_tip_fare.csv` - Average tip-to-fare ratios by location
- `revenue_per_pickup.csv` - Total revenue generated per pickup zone
- `trips_by_time_of_day.csv` - Trip patterns throughout the day
- `duration_by_time_of_day.csv` - Trip duration patterns by time
- `dropoff_by_pickup_*.csv` - Pickup-dropoff flow relationships
- `merged.geojson` - Geographic data with attached metrics

### Analysis Features
- **Temporal Analysis** - 30-minute interval aggregations
- **Spatial Analysis** - Zone-based geographic visualization
- **Business Metrics** - Revenue, tips, passenger counts
- **Flow Analysis** - Origin-destination relationships

## 🖥️ React Dashboard

### Technology Stack
- **Frontend Framework** - React 19 with TypeScript
- **Build Tool** - Vite for fast development and building
- **UI Library** - Material-UI v7 with custom theming
- **Visualization** - Plotly.js for interactive charts
- **Mapping** - React Leaflet for geographic visualization
- **Styling** - Emotion for CSS-in-JS styling
- **Routing** - React Router for navigation

### Key Components

#### 🗺️ Interactive Map Component (`NYCMap.tsx`)
- **Dynamic Heatmaps** - Color-coded zones based on selected metrics
- **Interactive Controls** - Dropdown for metric selection
- **Data Legend** - Color scale with statistical information
- **Hover Tooltips** - Zone details and metric values
- **Theme Integration** - Dark/light mode support

#### 📈 Visualization Components
- **TripsByTime** - Line chart showing trip volume patterns
- **TaxiSankey** - Flow diagram for pickup-dropoff relationships
- **DurationByTime** - Trip duration analysis by time of day
- **Revenue Heatmaps** - Geographic distribution of financial metrics

#### 🎨 Design System
- **Color Palettes** - Centralized color scheme management
- **Theme System** - Material-UI v6 with CSS variables
- **Responsive Design** - Mobile-friendly layouts
- **Dark/Light Mode** - Automatic theme switching

### Features Dashboard Sections

#### 1. Revenue & Tips Analysis
```typescript
// Metrics: avg_tip_amount, avg_total_amount, revenue_per_pickup
const metrics = [
  { key: "avg_tip_amount", label: "Average Tip Amount" },
  { key: "avg_total_amount", label: "Average Total Amount" },
  { key: "revenue_per_pickup", label: "Revenue per Pickup Zone" }
];
```

#### 2. Trip Demand Analysis
```typescript
// Metrics: pickup_trips, dropoff_trips
const metrics = [
  { key: "pickup_trips", label: "Picked Up Trips" },
  { key: "dropoff_trips", label: "Dropped Off Trips" }
];
```

#### 3. Trip Characteristics
```typescript
// Metrics: avg_passenger_count, avg_trip_distance
const metrics = [
  { key: "avg_passenger_count", label: "Average Passenger Count" },
  { key: "avg_trip_distance", label: "Average Trip Distance" }
];
```

## 🚀 Getting Started

### Prerequisites
```bash
# Python Dependencies (for data processing)
pip install pandas numpy matplotlib folium geopandas pyarrow

# Node.js and npm (for React dashboard)
node >= 18.0.0
npm >= 9.0.0
```

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd nyc-trips-dashboard
```

#### 2. Data Processing Setup
```bash
# Install Python dependencies
pip install pandas numpy matplotlib folium geopandas pyarrow

# Run data processing notebooks
jupyter notebook main.ipynb
jupyter notebook preprocess.ipynb

# Generate processed data
python process.py
python merge.py
```

#### 3. Dashboard Setup
```bash
# Install Node.js dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Commands
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Data Processing
jupyter notebook     # Open Jupyter for data analysis
python process.py    # Process taxi zone data
python merge.py      # Merge all metrics
```

## 📁 Project Structure

```
nyc-trips-dashboard/
├── public/                         # Static assets and processed data
│   ├── merged.geojson             # Geographic data with metrics
│   ├── dropoff_by_pickup_*.csv    # Flow analysis data
│   ├── trips_by_time_of_day.csv   # Temporal patterns
│   └── duration_by_time_of_day.csv
├── src/
│   ├── app/                       # Application core
│   │   ├── layout/                # Layout components
│   │   │   ├── App.tsx           # Main app component
│   │   │   ├── Navbar.tsx        # Navigation bar
│   │   │   └── styles.css        # Global styles
│   │   └── router/                # Routing configuration
│   │       └── routes.tsx        # Route definitions
│   ├── features/                  # Feature-based components
│   │   ├── about/                # About page
│   │   ├── characteristic/       # Trip characteristics
│   │   │   ├── TripCharacteristic.tsx
│   │   │   └── DurationByTime.tsx
│   │   ├── demand/               # Trip demand analysis
│   │   │   ├── Demand.tsx
│   │   │   ├── TripsByTime.tsx
│   │   │   └── TaxiSankey.tsx
│   │   ├── home/                 # Homepage
│   │   │   └── HomePage.tsx
│   │   ├── map/                  # Interactive map
│   │   │   └── NYCMap.tsx
│   │   └── revenue/              # Revenue analysis
│   │       └── RevenueTips.tsx
│   ├── theme/                    # Design system
│   │   ├── AppTheme.tsx         # Theme provider
│   │   ├── palettes.ts          # Color palettes
│   │   ├── themePrimitives.ts   # Theme primitives
│   │   └── customizations/      # Component customizations
│   └── main.tsx                 # Application entry point
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
└── README.md                   # Project documentation
```





## 📈 Performance Optimizations

### Data Loading
- **CSV Parsing** - Client-side parsing with Papa Parse
- **Lazy Loading** - Components load data on mount
- **Caching** - Browser caches static CSV files
- **Efficient Formats** - GeoJSON for geographic data

### Rendering Optimizations
- **React.memo** - Prevent unnecessary re-renders
- **useMemo** - Cache expensive calculations
- **Efficient State Updates** - Minimize state changes
- **Code Splitting** - Route-based lazy loading

### Build Optimizations
- **Vite** - Fast development and optimized builds
- **Tree Shaking** - Remove unused code
- **Asset Optimization** - Compressed images and fonts
- **TypeScript** - Static type checking

## 🧪 Data Quality & Validation

### Data Processing Validation
- **Missing Value Handling** - Interactive prompts for data cleaning
- **Data Type Validation** - Ensure correct numeric types
- **Coordinate System Conversion** - EPSG:2263 to WGS84
- **Statistical Validation** - Min/max bounds checking

### Geographic Data Integrity
- **Zone Coverage** - All 263 NYC taxi zones included
- **Coordinate Accuracy** - Proper projection handling
- **Boundary Validation** - Shapefile integrity checks
- **Attribute Completeness** - Zone names and borough data



## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
