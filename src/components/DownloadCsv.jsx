import { useState, useEffect } from "react";
import exportFromJSON from "export-from-json";
import { Button } from "@mui/material";

const downloadCsv = () => {
  const downloadCustomersCsv = () => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/customers"
    )
      .then((res) => res.json())
      .then((response) => {
        const fileName = "customersData";
        const exportType = exportFromJSON.types.csv;
        exportFromJSON({
          data: response._embedded.customers,
          fileName,
          fields: [
            "firstname",
            "lastname",
            "streetaddress",
            "postcode",
            "email",
            "phone",
          ],
          exportType,
        });
      });
  };
  const downloadClassCsv = () => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings"
    )
      .then((res) => res.json())
      .then((response) => {
        const fileName = "classesData";
        const exportType = exportFromJSON.types.csv;
        exportFromJSON({
          data: response._embedded.trainings,
          fileName,
          fields: ["date", "duration", "activity"],
          exportType,
        });
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        style={{ width: "300px" }}
        variant="contained"
        color="success"
        onClick={downloadCustomersCsv}
      >
        ASIAKKAT. CSV
      </Button>
      <Button
        style={{ width: "300px" }}
        variant="contained"
        color="success"
        onClick={downloadClassCsv}
      >
        TUNNIT. CSV
      </Button>
    </div>
  );
};

export default downloadCsv;
