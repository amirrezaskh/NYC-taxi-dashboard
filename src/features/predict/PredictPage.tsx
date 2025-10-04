import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, Stack, styled, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MuiCard from '@mui/material/Card';
import Papa from "papaparse";

import { useEffect, useReducer, useState } from "react";

import { Dayjs } from 'dayjs';
// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

type ZoneData = {
  LocationID: number;
  name: string;
  borough: string;
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const Container = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function PredictPage() {
  const [trip, changeTrip] = useReducer(
    (trip, e) => ({
      ...trip,
      [e.target.name]: e.target.value
    }), {
      passengerCount: 1,
      pickupLocationID: "",
      dropoffLocationID: ""
    }
  )

  console.log(trip)


  const [data, setData] = useState<ZoneData[]>([]);
  const [tripDateTime, setTripDateTime] = useState<Dayjs | null>(null);

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();

    const formattedDueDate = tripDateTime ? tripDateTime.format('YYYY-MM-DD HH:mm:ssZ') : null;

    const requestData = {
      passengerCount: trip.passengerCount,
      pickupLocationID: trip.pickupLocationID,
      dropoffLocationID: trip.dropoffLocationID,
      tripDateTime: formattedDueDate,
    };
    
    console.log(requestData)
    
    // const response = await fetch(`${BASE_URL}/api/predict/`, {
    //     method: "POST",
    //     headers: { 
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(requestData),
    // });

    // if (response.status === 201) {
    //   // TODO: Handle prediction
    //   console.log("predicted!")
    // }
  }

  useEffect(() => {
      Papa.parse("/data/zones.csv", {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          // Ensure trips is number
          const formattedData = results.data.map((row) => {
            const typedRow = row as ZoneData;
            return {
              LocationID: Number(typedRow.LocationID),
              name: typedRow.name,
              borough: typedRow.borough
            };
          });
          setData(formattedData);
        },
        error: (err) => console.error("Error parsing CSV:", err)
      });
    }, []);

  return (
    <>
      <Container direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            variant="h4"
            sx={{ width: "100%" }}
          >
            Predict Taxi Charge
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: 2,
              width: "100%",
              overflow: 'visible',
            }}
          >
            <FormControl fullWidth>
              <InputLabel
                id="pickup-select-label"
                sx={{
                  fontWeight: 500,
                  "&.Mui-focused": {
                    color: "var(--template-palette-primary-main)",
                  },
                }}
              >
                Select Pickup Location
              </InputLabel>
              <Select
                labelId="pickup-select-label"
                id="pickupLocationID"
                name="pickupLocationID"
                value={trip.pickupLocationID}
                label="Select Pickup"
                onChange={changeTrip}
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
                {data.map((zone) => (
                  <MenuItem
                    key={zone.LocationID}
                    value={zone.LocationID}
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
                    {`${zone.name} (${zone.borough})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel
                id="dropoff-select-label"
                sx={{
                  fontWeight: 500,
                  "&.Mui-focused": {
                    color: "var(--template-palette-primary-main)",
                  },
                }}
              >
                Select Dropoff Location
              </InputLabel>
              <Select
                labelId="dropoff-select-label"
                id="dropoffLocationID"
                name="dropoffLocationID"
                value={trip.dropoffLocationID}
                label="Select Dropoff"
                onChange={changeTrip}
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
                {data.map((zone) => (
                  <MenuItem
                    key={zone.LocationID}
                    value={zone.LocationID}
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
                    {`${zone.name} (${zone.borough})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="passengerCount">Number of Passengers</FormLabel>
              <TextField
                type="number"
                value={trip.passengerCount}
                autoComplete="passengerCount"
                name="passengerCount"
                required
                fullWidth
                
                id="passengerCount"
                placeholder="1"
                onChange={changeTrip}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="due_date">Trip Date & Time</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Select date & time"
                  value={tripDateTime}
                  onChange={(newValue: Dayjs | null) => setTripDateTime(newValue)}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Predict
            </Button>
          </Box>
        </Card>x
      </Container>
    </>
  )
}