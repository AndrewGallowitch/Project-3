import React, { Component } from "react";
import EmployeeSchedule from "./employeeSchedule";

// import { Link, Route } from "react-router-dom";
import "jquery";
import "materialize-css/dist/js/materialize.js";
import "materialize-css/dist/css/materialize.css";
import "./PortalContainer.css";

class PortalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };
  }

  render() {
    return (
      <div className="container employeePortal rounded">
        <div
          className=" row z-depth-5 employeePortal"
          style={{ marginTop: "25px" }}
        >
          <h3
            s={12}
            className="white-text black z-depth-4 center rounded title"
          >
            Upcoming Appointments
          </h3>
          {/*  insert the appropriate manager component here */}
          <EmployeeSchedule user={this.props.user} />
        </div>
      </div>
    );
  }
}
export default PortalContainer;
