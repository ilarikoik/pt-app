import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function Tunnit() {
  const [show, setShow] = useState(false);
  const [link, setLink] = useState("");
  const [trainings, setTrainings] = useState([
    {
      date: "",
      time: "",
      duration: "",
      activity: "",
      firstname: "",
      lastname: "",
    },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Päivä", field: "date", filter: true, floatingFilter: true },
    {
      headerName: "Kellonaika",
      field: "time",
      filter: true,
      floatingFilter: true,
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
      field: "asiakas",
      filter: true,
      floatingFilter: true,
      valueGetter: (params) => {
        return params.data.firstname + " " + params.data.lastname;
      },
    },
    {
      headerName: "Osallistujat",
      cellRenderer: (params) => {
        return (
          <Button
            onClick={() => handleClick(params)}
            variant="contained"
            color="warning"
          >
            WHO JOINED
          </Button>
        );
      },
      width: 170,
    },
  ]);

  const handleClick = (params) => {
    const customerlink = params.data._links.customer;
    console.log(customerlink);
    setLink(customerlink);
    setShow(false);
  };
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(
          "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const trainingPromises = data._embedded.trainings.map(
          async (training) => {
            const customerResponse = await fetch(training._links.customer.href);
            if (!customerResponse.ok) {
              throw new Error("Failed to fetch customer data");
            }
            const customerData = await customerResponse.json();
            const firstname = customerData.firstname;
            const lastname = customerData.lastname;

            const formattedDate = new Date(training.date).toLocaleDateString();
            const formattedTime = training.date.substring(11, 16);

            return {
              ...training,
              date: formattedDate,
              time: formattedTime,
              firstname: firstname,
              lastname: lastname,
            };
          }
        );

        const updatedTrainings = await Promise.all(trainingPromises);
        setTrainings(updatedTrainings);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };
    fetchTrainings();
  }, []);

  return (
    <>
      <div className="ag-theme-material" style={{ width: "100%", height: 600 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={100}
          paginationPageSizeSelector={[2, 10, 50, 100]}
        />
      </div>
    </>
  );
}
