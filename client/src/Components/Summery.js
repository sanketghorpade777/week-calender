import React, { useEffect, useState } from "react";


import moment from "moment";

function Summery() {
  const BASE_URL = process.env.APP_BASE_URL || "http://localhost:3000";
  const [appointments, setAppointments] = useState([]);
  console.log(appointments);
  useEffect(() => {
    async function fetchAppointments() {
      const response = await fetch(`${BASE_URL}/summery`);
      const data = await response.json();
      setAppointments(data);
    }
    fetchAppointments();
  }, []);
  return (
    <div>
      <h2 style={{padding:'5px',borderBottom:'2px solid black'}}> Appointments Summery</h2>
    
<ol>
  {appointments.map((appt) => (
          <li key={appt.id} style={{padding:'5px',borderBottom:'2px solid black'}}>
           <b><strong>{appt.title}</strong> </b> - {moment(appt.start).format("LLLL")}
          </li>
        ))}


    </ol>
    </div>
  );
}

export default Summery;
