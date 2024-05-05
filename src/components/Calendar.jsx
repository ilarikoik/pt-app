import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import { duration } from "@mui/material";
import { iterate } from "localforage";

const Calendar = () => {
  const [trainings, setTrainings] = useState([
    {
      date: "",
      title: "",
      duration: "",
      customer: "",
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
          const newTrainings = data.map((item) => ({
            //start ja title on fullcalendarin jutut ja niihi pitänee laittaa noi tiedot?
            start: item.date,
            title: `${item.activity} ${item.duration} ${item.customer.firstname} ${item.customer.lastname} `,
          }));
          setTrainings(newTrainings);
        })
        .catch((error) => console.error("Error fetching trainings:", error));
    };

    fetchTranings();
  }, []);

  return (
    <div style={{ backgroundColor: "white" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="90vh"
        events={trainings}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        }}
      />
    </div>
  );
};
export default Calendar;
