import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
  });

  const handleClickOpen = () => {
    console.log(props.training);
    setTraining({
      date: props.training.date,
      duration: props.training.duration,
      activity: props.training.activity,
    });
    console.log(props.training._links.trainings.href);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const editCustomer = () => {
    props.updateTraining(training, props.trainings._links.training.href);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginBottom: "10px", width: "100%" }}
      >
        Muokkaa
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Päivitä tietoja</DialogTitle>
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
            value={training.date}
            onChange={(e) => handleInputChange(e)}
            label="Päivä"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={(e) => handleInputChange(e)}
            label="kesto"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={(e) => handleInputChange(e)}
            label="Treeni"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
