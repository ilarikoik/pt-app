import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddTraining from "../components/Addtraining";
import EditCustomer from "../components/Editcustomer";

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
    { headerName: "Päivä", field: "date", filter: true, floatingFilter: true },

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
          console.log("ye");
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
          console.log(data), setTrainings(data);
        })
        .then(setLoading(false))
        .catch((err) => console.log(err));
    };
    fetchTranings();
  }, [refresh]);

  const handleSave = (trainings) => {
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
          setRefresh((val) => val + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AddTraining handleSave={handleSave}></AddTraining>
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
