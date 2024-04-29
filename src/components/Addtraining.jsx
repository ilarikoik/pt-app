import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);

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
  };

  const addTraining = () => {
    props.handleSave(trainings); // Call handleSave from props
    handleClose();
  };

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
          {/* 
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            required
            margin="dense"
            name="date"
            value={trainings.date}
            onChange={(e) => handleInputChange(e)}
            label="Päivä"
            variant="standard"
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
