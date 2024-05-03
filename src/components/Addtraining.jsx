import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker, pickersMonthClasses } from "@mui/x-date-pickers";
import Datepicker from "../components/Datepicker";
import { PopoverRoot } from "@mui/material";
import dayjs from "dayjs";

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [hmm, setHmm] = useState("");

  const [trainings, setTrainings] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: "",
  });

  const handleClickOpen = () => {
    console.log(props.customerLink);
    setTrainings({ ...trainings, customer: props.customerLink });
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
    handleSavet(trainings);
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

  //props date ei toiminu handleinputchangessa jostai syystä ja tää pitää olla useeffecti sisäl muute ikuine looppi eli errori
  // useEffect(() => {
  //   const newDate = new Date(props.date);
  //   // Check if newDate is a valid date
  //   if (!isNaN(newDate.getTime())) {
  //     setTrainings({ ...trainings, date: newDate });
  //     console.log("VVVIVIIV " + trainings.date);
  //     console.log(trainings);
  //     console.log("-- - - - " + newDate.toISOString());
  //   } else {
  //     console.error("Invalid date:", props.date);
  //   }
  // }, [props.date]);

  console.log("vaaaaaaaaaaat " + props.dateFormat);

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
          <Datepicker
            value={props.dateFormat}
            onChange={(e) =>
              setTrainings({ ...trainings, date: e.target.value })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="date"
            value={props.dateFormat}
            onChange={(e) => handleInputChange(e)}
            label="Päivä ja Aika"
            variant="standard"
            // defaultValue={}
          />

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
