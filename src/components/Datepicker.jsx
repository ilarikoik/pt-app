import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import AddTraining from "./Addtraining";

export default function ReferenceDateExplicitDateTimePicker() {
  const [value, setValue] = useState(null);
  const [date, setDate] = useState("");

  const handleDateChange = (value) => {
    console.log("-----" + value);
    console.log("-----" + value.format());
    setDate(value.format());
    console.log("......" + date);
    setValue(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AddTraining date={date} />
      <Stack spacing={2} sx={{ minWidth: 305 }}>
        <DateTimePicker
          value={value}
          ampm={false}
          onChange={handleDateChange}
        />
        <Typography>
          Stored value: {value == null ? "null" : value.format()}
        </Typography>
      </Stack>
    </LocalizationProvider>
  );
}
