import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState, useEffect } from "react";
import AddTraining from "./Addtraining";

export default function ReferenceDateExplicitDateTimePicker() {
  const [value, setValue] = useState(null);
  const [dateFormat, setDateFormat] = useState("");

  const handleDateChange = (value) => {
    setDateFormat(value.format());
    console.log("Stored value:", dateFormat);
    setValue(value);
  };

  useEffect(() => {
    console.log("Stored value:", dateFormat);
  }, [dateFormat]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AddTraining dateFormat={dateFormat} />
      <Stack spacing={2} sx={{ minWidth: 305 }}>
        <DateTimePicker
          value={value}
          ampm={false}
          onChange={handleDateChange}
        />
        <Typography>
          {dateFormat === null
            ? "null"
            : `Kopioi teksi Päivä ja Aika kenttään: ${dateFormat}`}
        </Typography>
      </Stack>
    </LocalizationProvider>
  );
}
