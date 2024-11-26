import React, { useState,useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { toast } from "react-hot-toast";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import Summery from "./Summery";
const localizer = momentLocalizer(moment);

const Calender = ({ onAdd, onDelete, onUpdate }) => {
  const DragAndDropCalendar = withDragAndDrop(Calendar);
  const [appointments, setAppointments] = useState([]);
  const [data, setData] = useState([]);
  console.log(appointments);
  const BASE_URL = process.env.APP_BASE_URL || "http://localhost:3000";
  // Fetch appointments from the database
  // useEffect(() => {
  //   async function fetchAppointments() {

  //     const allAppointments = await axios.get('/summery');

  //     const data = allAppointments.data;

  //     setAppointments(data);
  //   }
  //   fetchAppointments();
  // }, []);

  // Handle adding appointments
  const handleSelectSlot = async (slotInfo) => {
    const title = prompt("Enter appointment title:");
    if (title) {
      const newAppointment = {
        id: Date.now(),
        title,
        start: slotInfo.start,
        end: slotInfo.end,
      };
      setAppointments([...appointments, newAppointment]);

      const response = await axios.post(`${BASE_URL}/Add-appointment`, newAppointment);
      setData(response.data);
      if (response.data.status === 200) {
        toast.success(response.data.message);
      }
    }
  };

  // Handle deleting appointments
  const handleEventDelete = async (appointmentId) => {
    setAppointments(appointments.filter((appt) => appt.id !== appointmentId));

    const response = await axios.post(`${BASE_URL}/Delete-appointment`, appointmentId);
    if (response.data.status === 200) {
      toast.success(response.data.message);
    }
  };

  const handleEventDrop = async ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };

    setAppointments((prev) =>
      prev.map((appt) => (appt.id === event.id ? updatedEvent : appt))
    );

    const response = await axios.post(`${BASE_URL}/Update-appointment`, updatedEvent);
    if (response.data.status === 200) {
      toast.success(response.data.message);
    }
  };

  return (
    <div style={{display:'flex'}}>
      <DragAndDropCalendar
        localizer={localizer}
        events={appointments}
        defaultView="week"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) =>
          window.confirm("Delete this appointment?") &&
          handleEventDelete(event.id)
        }
        resizable
        onEventDrop={handleEventDrop}
        onEventResize={handleEventDrop}
        style={{ height: "90vh" ,width:'90%'}}
      />
      <Summery/>
    </div>
  );
};

export default Calender;
