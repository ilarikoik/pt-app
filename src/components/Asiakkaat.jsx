import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function Asiakkaat() {
  const [customers, setCustomers] = useState([
    {
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: "",
    },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "asiakkaiden sivut",
      cellRenderer: (params) => {
        return (
          <Button onClick={customersInfo()} variant="contained">
            VARAUKSET
          </Button>
        );
      },
      width: 150,
    },
    {
      headerName: "Nimi",
      valueGetter: (params) => {
        return params.data.firstname + " " + params.data.lastname;
      },
      filter: true,
      floatingFilter: true,
    },
    // { field: "lastname", filter: true, floatingFilter: true },
    {
      headerName: "Osoite",
      field: "streetaddress",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Postinumero",
      field: "postcode",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Kaupunki",
      field: "city",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Sähköposti",
      field: "email",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Puh. Numero",
      field: "phone",
      filter: true,
      floatingFilter: true,
    },
  ]);

  const customersInfo = () => {};

  useEffect(() => {
    const fetchCustomers = () => {
      fetch(
        `https://customerrestservice-personaltraining.rahtiapp.fi/api/customers`
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(console.log(res.statusText));
          }
          return res.json();
        })
        .then((data) => setCustomers(data._embedded.customers))
        .catch((err) => console.log(err));
    };
    fetchCustomers();
  }, []);

  console.log(customers);

  return (
    <>
      <div className="ag-theme-material" style={{ width: "100%", height: 600 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={100}
          paginationPageSizeSelector={[2, 10, 50, 100]}
        />
      </div>
    </>
  );
}
