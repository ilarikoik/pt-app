import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddCustomer from "../components/Addcustomer";
import EditCustomer from "../components/Editcustomer";
import AddTraining from "../components/Addtraining";

export default function Customer() {
  const [refresh, setRefresh] = useState(0);

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
      headerName: "EDIT",
      cellRenderer: (params) => {
        return (
          <EditCustomer
            customer={params.data}
            updateCustomer={updateCustomer}
          ></EditCustomer>
        );
      },
      width: 150,
    },
    // {
    //   headerName: "",
    //   cellRenderer: (params) => {
    //     return (
    //       <AddTraining
    //         handleClick={() => handleClick(params.data)}
    //       ></AddTraining>
    //     );
    //   },
    //   width: 180,
    // },
    {
      headerName: "Nimi",
      valueGetter: (params) => {
        return params.data.firstname + " " + params.data.lastname;
      },
      filter: true,
      floatingFilter: true,
    },
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
    {
      headerName: "Poista",
      cellRenderer: (params) => {
        return (
          <Button
            onClick={() => deleteCustomer(params)}
            variant="contained"
            color="error"
          >
            DELETE
          </Button>
        );
      },
      width: 150,
    },
  ]);

  const handleClick = (data) => {
    console.log(data);
  };
  const deleteCustomer = (params) => {
    console.log("----" + params.data._links.customer.href);
    fetch(params.data._links.customer.href, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          /* setMsgSnackBar('success') */
          console.log("ye");
          setRefresh((val) => val + 1);
        } else {
          window.alert("NO delete");
        }
      })
      .catch((error) => console.log(error));
  };

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
  }, [refresh]);

  console.log(customers);

  // tätä kutsutaa Addcustomer komponentissa propsin kautta
  const handleSave = (customer) => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/customers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      }
    )
      .then((res) => {
        if (res.ok) {
          setRefresh((val) => val + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => {
        if (res.ok) {
          setRefresh((val) => val + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <br />
      <br />

      <AddCustomer handleSave={handleSave}></AddCustomer>
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
