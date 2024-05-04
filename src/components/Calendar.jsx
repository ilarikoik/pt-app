import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";

const Calendar = () => {
  const [trainings, setTrainings] = useState([
    {
      date: "",
      title: "",
      duration: "",
      customer: "",
    },
  ]);

  // VAIHA TÄÄ https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings , ei tartte tota säätöö
  useEffect(() => {
    const fetchTranings = () => {
      fetch(
        `https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings`
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(console.log(res.statusText));
          }
          return res.json();
        })
        .then((data) => {
          const trainingPromises = data._embedded.trainings.map((training) => {
            // pitää tehää uus fetchi jokaselle muute se ei pääse käsiks customer objektii?
            return (
              fetch(training._links.customer.href)
                .then((res) => {
                  if (!res.ok) {
                    throw Error(console.log(res.statusText));
                  }
                  return res.json();
                })
                // palauttaa customer objektin
                .then((customer) => {
                  return {
                    ...training,
                    title: [
                      `${training.activity}`,
                      ` /  ${training.duration}`,
                      ` /   ${customer.firstname} ${customer.lastname}`,
                    ].join(", "),
                    start: training.date,
                    allDay: false,
                  };
                })
            );
          });
          // odottaa että kaikki on ladattu ja asetettu ilman erroreita ja sitten kerraalla asettaa uudet tilat
          Promise.all(trainingPromises)
            .then((trainingsWithActivity) => {
              setTrainings(trainingsWithActivity);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
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
