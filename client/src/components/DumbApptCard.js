import React from "react";
import { Card, Button } from "react-materialize";
import "jquery";
import "materialize-css/dist/js/materialize.js";
import "materialize-css/dist/css/materialize.css";

import EmpApptUpdateModal from "./EmpApptUpdateModal.js"
const Appointment = props => (


  <Card
    className="blue-grey darken-1"
    textClassName="white-text"

  >

    <h4>{props.firstName} {props.lastName}</h4>
    <h5 >At {props.time}</h5>
    <Button style={{ marginBottom: "10px" }} className="red" value={props.id}
      onClick={props.delete}
    >X
         </Button>
  
    < EmpApptUpdateModal
      key={props.all.phone}

      firstName={props.all.firstName}
      lastName={props.all.lastName}
      id={props.all.id}
      time={props.all.time}
      date={props.all.date}
      email={props.customer.email}
      street={props.customer.street}
      city={props.customer.city}
      state={props.customer.state}
      zip={props.customer.zip}
      telephone={props.customer.telephone}
    />
  </Card>




);
export default Appointment

