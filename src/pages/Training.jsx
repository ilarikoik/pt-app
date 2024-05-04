import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddTraining from "../components/Addtraining";
import EditCustomer from "../components/Editcustomer";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function Training() {
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);

  const [trainings, setTrainings] = useState([
    {
      date: "",
      duration: "",
      activity: "",
      customer: "",
    },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Päivä",
      field: "date",
      filter: true,
      floatingFilter: true,
      valueGetter: (params) => {
        const parsDate = params.data.date;
        const pvm = dayjs(parsDate);
        return pvm.format("DD-MM-YYYY");
      },
    },
    {
      headerName: "Kellonaika",
      field: "date",
      filter: true,
      floatingFilter: true,
      valueGetter: (params) => {
        const parsDate = dayjs(params.data.date);
        let hour = parsDate.hour();
        let minute = parsDate.minute();
        if (hour < 10) {
          hour = "0" + hour;
        }
        if (minute < 10) {
          minute = "0" + minute;
        }
        return `${hour}:${minute}`;
      },
    },

    {
      headerName: "Kesto",
      field: "duration",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Mitä tehdään",
      field: "activity",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Asiakas",
      field: "customer",
      filter: true,
      floatingFilter: true,
      valueGetter: (params) => {
        const customer = params.data.customer;
        if (customer && customer.firstname && customer.lastname) {
          return customer.firstname + " " + customer.lastname;
        } else {
          return "";
        }
      },
    },
    {
      headerName: "",
      cellRenderer: (params) => {
        console.log(params.data);
        return (
          <Button
            onClick={() => deleteTraining(params)}
            variant="contained"
            color="error"
          >
            Poista
          </Button>
        );
      },
      width: 170,
    },
  ]);

  // otetaa id ja poistetaa sen perusteella
  const deleteTraining = (params) => {
    console.log("----" + params.data.id);
    const id = params.data.id;
    fetch(
      `https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${id}`,
      { method: "DELETE" }
    )
      .then((res) => {
        if (res.ok) {
          setRefresh((val) => val + 1);
        } else {
          window.alert("NO delete");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const fetchTranings = () => {
      fetch(
        `https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings`
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(console.log(res.statusText));
          }
          return res.json();
        })
        .then((data) => {
          setTrainings(data);
        })
        .then(setLoading(false))
        .catch((err) => console.log(err));
    };
    fetchTranings();
  }, [refresh]);

  return (
    <div>
      {!loading ? (
        <div
          className="ag-theme-material"
          style={{ width: "100%", height: 600 }}
        >
          <AgGridReact
            rowData={trainings}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={100}
            paginationPageSizeSelector={[2, 10, 50, 100]}
          />
        </div>
      ) : (
        <p>loading......</p>
      )}
    </div>
  );
}
