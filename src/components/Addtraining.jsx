import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(new Date());

  const [trainings, setTrainings] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: "",
  });

  const handleClickOpen = () => {
    setTrainings({
      ...trainings,
      customer: props.customerLink,
      date: value,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTrainings({ ...trainings, [event.target.name]: event.target.value });

    console.log(trainings);
  };

  const addTraining = () => {
    const newTrainings = { ...trainings, date: value };
    handleSavet(newTrainings);
    handleClose();
  };

  const handleSavet = (trainings) => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainings),
      }
    )
      .then((res) => {
        if (res.ok) {
          // setRefresh((val) => val + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  console.log("vvvvvvvvvvvvvvvvv " + props.dateFormat);
  console.log("aaaaaaaaaaaaaaaaa " + trainings.date);
  console.log("qqqqqq " + value);

  return (
    <div>
      <Button
        variant="contained"
        color="warning"
        onClick={handleClickOpen}
        style={{ marginBottom: "10px", width: "100%" }}
      >
        Lisää harjoitus
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uusi harjoitus</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Controlled field"
              ampm={false}
              onChange={(newValue) => setValue(newValue.toISOString())}
            />
          </LocalizationProvider>
          <br />
          {/* <TextField
            autoFocus
            required
            margin="dense"
            name="date"
            value={trainings.date}
            onChange={(e) => handleInputChange(e)}
            label="Päivä ja Aika"
            variant="standard"
          /> */}

          <TextField
            autoFocus
            required
            margin="dense"
            name="duration"
            value={trainings.duration}
            onChange={(e) => handleInputChange(e)}
            label="Kesto"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="activity"
            value={trainings.activity}
            onChange={(e) => handleInputChange(e)}
            label="Harjoitus"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="customer"
            value={trainings.customer}
            onChange={(e) => handleInputChange(e)}
            label="Asiakas"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
