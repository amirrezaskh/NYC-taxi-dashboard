# NYC Taxi Data Analysis & Processing

This project contains the data processing pipeline and analysis scripts for NYC taxi trip data. It queries taxi trip data from Google BigQuery (NYC TLC public dataset) and generates various metrics and visualizations for use in the React dashboard application.

## 📊 Overview

The project analyzes NYC taxi trip data to generate insights about:
- Average tip amounts by pickup location
- Trip patterns by time of day
- Traffic congestion metrics
- Revenue analysis by zone
- Passenger count patterns
- Trip duration and distance analysis

## 🗂️ Project Structure

```
nyc-taxi/
├── credentials/                    # BigQuery authentication
│   └── service-account-key.json   # Google Cloud service account
├── zones/                          # NYC taxi zone shapefiles
│   ├── taxi_zones.shp
│   ├── taxi_zones.dbf
│   └── ...
├── main.ipynb                      # Main analysis notebook
├── preprocess.ipynb               # Data preprocessing notebook
├── process.py                     # Zone name processing script
├── merge.py                       # Data merging script
├── merged.geojson                 # Final merged geographic data
├── nyc_tips_heatmap.html         # Interactive tip heatmap
└── *.csv                         # Generated analysis results
```

## 📁 Generated Data Files

The analysis generates several CSV files with processed metrics:

- `avg_tip_amount.csv` - Average tip amounts by pickup location
- `avg_tip_fare.csv` - Average tip-to-fare ratios by location
- `avg_total_amount.csv` - Average total trip amounts by location
- `revenue_per_pickup.csv` - Total revenue generated per pickup zone
- `trips_by_pickup.csv` - Trip counts by pickup location
- `trips_by_dropoff.csv` - Trip counts by dropoff location
- `passengers_per_pickup.csv` - Average passenger counts by pickup zone
- `trips_distance_pickup.csv` - Average trip distances by pickup zone
- `dropoff_by_pickup_*.csv` - Pickup-dropoff location relationships
- `trips_by_time_of_day.csv` - Trip patterns throughout the day
- `duration_by_time_of_day.csv` - Trip duration patterns by time

## 🛠️ Dependencies

### Python Dependencies
```bash
pip install pandas numpy matplotlib folium geopandas google-cloud-bigquery
```

### Required Libraries
- **pandas** - Data manipulation and analysis
- **numpy** - Numerical computations
- **matplotlib** - Static plotting and visualization
- **folium** - Interactive mapping
- **geopandas** - Geographic data processing
- **google-cloud-bigquery** - BigQuery client for data querying

### JavaScript Dependencies (for React integration)
```json
{
  "dependencies": {
    "plotly.js": "^3.1.0",
    "react-plotly.js": "^2.6.0"
  }
}
```

## 🔐 BigQuery Setup

### Authentication
To access the NYC TLC data in BigQuery, you'll need to set up Google Cloud authentication:

1. **Create a Google Cloud Project**
   ```bash
   gcloud projects create your-project-id
   gcloud config set project your-project-id
   ```

2. **Enable BigQuery API**
   ```bash
   gcloud services enable bigquery.googleapis.com
   ```

3. **Set up Authentication** (Choose one method):
   
   **Option A: Service Account Key**
   ```bash
   # Create service account
   gcloud iam service-accounts create bigquery-reader
   
   # Grant BigQuery permissions
   gcloud projects add-iam-policy-binding your-project-id \
     --member="serviceAccount:bigquery-reader@your-project-id.iam.gserviceaccount.com" \
     --role="roles/bigquery.user"
   
   # Download key file
   gcloud iam service-accounts keys create credentials/service-account-key.json \
     --iam-account=bigquery-reader@your-project-id.iam.gserviceaccount.com
   ```
   
   **Option B: Application Default Credentials**
   ```bash
   gcloud auth application-default login
   ```

### BigQuery Configuration
```python
from google.cloud import bigquery

# Initialize client
client = bigquery.Client(project='your-project-id')

# Example query to NYC taxi data
query = """
SELECT 
  PULocationID,
  AVG(tip_amount) as avg_tip,
  COUNT(*) as trip_count
FROM `bigquery-public-data.new_york_taxi_trips.tlc_yellow_trips_2025`
WHERE DATE(pickup_datetime) BETWEEN '2025-01-01' AND '2025-02-28'
GROUP BY PULocationID
"""
```

## 🚀 Usage

### 1. BigQuery Setup

First, set up your Google Cloud credentials:
```bash
# Set up authentication
export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account-key.json"

# Or authenticate using gcloud CLI
gcloud auth application-default login
```

### 2. Data Processing Pipeline

Run the main analysis notebook:
```bash
jupyter notebook main.ipynb
```

Or run the preprocessing notebook:
```bash
jupyter notebook preprocess.ipynb
```

### 3. Generate Zone-Enhanced Data
```bash
python process.py
```

### 4. Merge All Metrics
```bash
python merge.py
```

## 📈 Key Analysis Features

### Data Cleaning
- Automated handling of missing values via BigQuery SQL
- Interactive prompts for data cleaning decisions
- Data type optimization and validation

### BigQuery Integration
- Direct SQL queries to NYC TLC public dataset
- Efficient aggregation using BigQuery's distributed processing
- Cost-optimized queries with proper filtering and partitioning

### Temporal Analysis
- Trip patterns by time of day (30-minute intervals)
- Duration analysis across different times
- Congestion metrics calculation

### Spatial Analysis
- Geographic visualization using NYC taxi zones
- Choropleth maps for various metrics
- Interactive heatmaps with tooltips

### Business Metrics
- Revenue analysis by location
- Tip amount patterns
- Passenger count statistics
- Trip distance analytics

## 🗺️ Geographic Data

The project uses official NYC Taxi Zone shapefiles:
- 263 taxi zones covering all 5 boroughs
- Zone boundaries align with TLC pickup/dropoff location IDs
- Includes zone names and borough information

## 📊 Output Formats

### Static Visualizations
- Matplotlib plots for time series analysis
- Geographic plots using GeoPandas

### Interactive Maps
- Folium-based choropleth maps
- HTML exports for web integration
- Hover tooltips with zone information

### Data Exports
- CSV files for React dashboard consumption
- GeoJSON files for geographic visualization
- Structured data ready for API integration

## 🔄 Integration with React Dashboard

This data processing pipeline generates the following outputs for the React visualization dashboard:

1. **CSV Metrics** - Processed data ready for chart generation
2. **GeoJSON Files** - Geographic boundaries with attached metrics
3. **Interactive Maps** - Pre-generated HTML visualizations
4. **Time Series Data** - Temporal patterns for dynamic charts

## 📝 Notes

- Data source: NYC TLC Trip Record Data via Google BigQuery public dataset
- Dataset: `bigquery-public-data.new_york_taxi_trips`
- Time interval: 30-minute buckets for temporal analysis
- Geographic scope: All 5 NYC boroughs (263 taxi zones)
- Data processing: BigQuery SQL for efficient large-scale analysis
- Coordinate system: WGS84 (EPSG:4326)

### BigQuery Dataset Details
- **Yellow Taxi**: `bigquery-public-data.new_york_taxi_trips.tlc_yellow_trips_*`
- **Green Taxi**: `bigquery-public-data.new_york_taxi_trips.tlc_green_trips_*`
- **Date Range**: Configurable via SQL queries (default: January-February 2025)
- **Processing**: Server-side aggregation for optimal performance

## 🤝 Contributing

When adding new analysis features:
1. Update the main analysis notebook
2. Add new data exports to the merge script
3. Document new metrics in this README
4. Ensure React dashboard compatibility

---

*This project serves as the data processing backend for the NYC Taxi Analytics Dashboard. All processed data and visualizations are designed for seamless integration with the React frontend application.*