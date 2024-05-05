import { useState, useEffect } from "react";
import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { each } from "chart.js/helpers";
import { duration } from "@mui/material";

const Chart = () => {
  const [training, setTraining] = useState([
    {
      activity: "",
      duration: 0,
    },
  ]);

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
          setTraining(data);
        })
        // .then(setLoading(false))
        .catch((err) => console.log(err));
    };
    fetchTranings();
  }, []);

  //   const mergedTraining = training.reduce((acc, curr) => {
  //     const existingActivity = acc.find(
  //       (item) => item.activity === curr.activity
  //     );
  //     if (existingActivity) {
  //       existingActivity.duration += curr.duration; // Yhdistetään kestot
  //     } else {
  //       acc.push({ activity: curr.activity, duration: curr.duration }); // Lisätään uusi toiminto
  //     }
  //     return acc;
  //   }, []);

  //   console.log(mergedTraining);

  const map = new Map();
  for (let i = 0; i < training.length; i++) {
    let activity = training[i].activity;
    let duration = training[i].duration;

    if (map.has(activity)) {
      //jos on nii haetaa se activityn arvo, tää on sama ku hashmapissa hakis map.get(key), palauttaa sen arvon
      let currentDuration = map.get(activity);
      map.set(activity, currentDuration + duration);
    } else {
      // jos ei oo nii lisätää
      map.set(activity, duration);
    }
  }

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div style={{ flex: 1, backgroundColor: "white" }}>
        <Bar
          data={{
            labels: Array.from(map.keys()),
            datasets: [
              {
                label: "Minutes",
                data: Array.from(map.values()),
                backgroundColor: "#242424",
                borderRadius: 10,
              },
            ],
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          height: "500px",
          backgroundColor: "darkgray",
        }}
      >
        <Doughnut
          data={{
            labels: Array.from(map.keys()),
            datasets: [
              {
                label: "Minutes",
                data: Array.from(map.values()),
                backgroundColor: ["#F2613F"],
                borderRadius: 10,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
