import React, { Component } from "react";
import { Row, Col, CardPanel, Input, Icon } from "react-materialize";
import ManagerPortalModal from "./managerPortalModal";
import "jquery";
import "materialize-css/dist/js/materialize.js";

import moment from "moment";
import API from "../utils/API";
import "./managerPortal.css";

class ManagerPortal extends Component {
  state = {
    date: moment().format("DD MMMM, YYYY"),
    Appointments: [],
    appt: [],
    Customers: [],
    filtered: [],
    employees: [],
    employee: [],
    custName: ""
  };

  componentDidMount() {
    this.loadEmployees();
    this.loadAppointments();
    this.getCustomers();
  }

  getCustomers = () => {
    API.getCustomers()
      .then(res => this.setState({ Customers: res.data }))
      .catch(err => console.log(err));
  };

  loadEmployees = () => {
    API.getEmployees()
      .then(res => this.setState({ employees: res.data }))
      .catch(err => console.log(err));
  };

  changeEmployee = employee => {
    this.setState({ employee: employee });
  };

  deleteEmployee = id => {
    API.deleteEmployee(id)
      .then(res => {
        this.loadEmployees();
      })
      .then(res => {
        this.setState({ employee: [] });
      })
      .catch(err => console.log(err));
  };

  // Updating employees appointments
  // ====================================================================

  loadAppointments = () => {
    API.getAppointments()
      .then(res => this.setState({ Appointments: res.data }))
      .catch(err => console.log(err));
  };

  deleteAppointment = id => {
    API.deleteAppointment(id)
      .then(res => this.loadAppointments())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    event.preventDefault();
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    console.log(this.state.filtered);
    // Updating the input's state
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  render() {
    const filteredAppointments = this.state.Appointments.filter(appointment => {
      return (
        appointment.date === this.state.date &&
        appointment.EmployeeId === this.state.employee.id
      );
    });

    return (
      <div className="container white">
        <div
          className="row z-depth-5 manager white"
          style={{ marginTop: "25px", marginBottom: "25px" }}
        >
          <ul
            id="tabs-swipe-demo"
            className="tabs black white-text managerTabs z-depth-5"
          >
            <li className="tab col s3">
              <a className="white-text" href="#employeeInfo">
                Employee Information
              </a>
            </li>
            <li className="tab col s3">
              <a className="white-text" href="#employeeSchedule">
                Employee Schedule
              </a>
            </li>
          </ul>
          <div>
            <Row>
              <Col style={{ marginLeft: "5px", marginTop: "10px" }}>
                <ManagerPortalModal loadEmployees={this.loadEmployees} />
              </Col>
            </Row>

            <Row>
              <Col
                s={12}
                m={4}
                className="lighten-4 black-text center employeeList"
              >
                {this.state.employees.length ? (
                  <ul className="collection with-header center  z-depth-1 ">
                    <li className="collection-header blue white-text center">
                      <h5 className="center">Employees</h5>
                    </li>
                    {this.state.employees.map(employee => (
                      <li
                        className="collection-item col s12"
                        style={{ padding: "0" }}
                        key={employee.id}
                      >
                        <div
                          style={{ fontSize: "1.3rem", marginTop: "7px" }}
                          className="left"
                          onClick={() => this.changeEmployee(employee)}
                          href={"/employees/" + employee.id}
                        >
                          {employee.first_name} {employee.last_name}
                          <span className="secondary-content"> </span>
                        </div>
                        <span
                          style={{ marginRight: "10px" }}
                          waves="light"
                          className="material-icons red-text right"
                          onClick={() => this.deleteEmployee(employee.id)}
                        >
                         <i className="material-icons red-text">
                                    clear
                                  </i>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ marginLeft: "5px" }} className="left">
                    No Employees to Display
                  </p>
                )}
              </Col>

              <Col
                s={12}
                m={8}
                id="employeeInfo"
                className="lighten-4 black-text"
                
              >
                <CardPanel className="z-depth-2" style={{ marginRight: "10px" }}>
                  {this.state.employee ? (
                    <div>
                      <h4>Employee Information</h4>
                      <h5>
                        Name: {this.state.employee.first_name}{" "}
                        {this.state.employee.last_name}
                      </h5>
                      <h5>Phone: {this.state.employee.phone}</h5>
                      <h5>E-Mail: {this.state.employee.email}</h5>
                      <h5>
                        Address: {this.state.employee.street}{" "}
                        {this.state.employee.city} {this.state.employee.state}
                      </h5>
                    </div>
                  ) : (
                    <div>
                      <h5>Name:</h5>
                      <h5>Phone:</h5>
                      <h5>E-Mail:</h5>
                      <h5>Address:</h5>
                    </div>
                  )}
                </CardPanel>
              </Col>
              <Col
                s={12}
                m={8}
                id="employeeSchedule"
                className="lighten-4 black-text"
              >
                <CardPanel className="z-depth-2 employeeSchedule" style={{ marginRight: "10px" }}>
                  <Row className="employeeSchedule">
                    <h4>Employee Schedule</h4>

                    <Col className="date center" s={12}>
                      {" "}
                      <Col s={1} m={2} l={2} />
                      <Input
                        s={12}
                        l={8}
                        className="center "
                        name="date"
                        type="date"
                        placeholder={this.state.date}
                        value={this.state.date}
                        onChange={this.handleInputChange}
                      >
                        <Icon>date_range</Icon>
                      </Input>{" "}
                      <Col s={1} m={2} l={2} />
                    </Col>
                  </Row>

                  <Row className="center">
                    <Col s={12} className="lighten-4 black-text ">
                      {filteredAppointments.length ? (
                        <ul className="collection with-header">
                          {filteredAppointments.map(appointment => (
                            <li
                              className="collection-item"
                              key={appointment.id}
                            >
                              <div className="row">
                                {this.state.Customers.filter(customer => {
                                  return customer.id === appointment.CustomerId;
                                }).map(cust => (
                                  <div className="col m4 s12" style={{ fontSize: "1.3rem" }}>
                                    {cust.first_name} {cust.last_name}
                                  </div>
                                ))}
                                <div className="col m6 s12" style={{ fontSize: "1.3rem" }}>
                                  {appointment.date} {appointment.time}
                                </div>
                                <span
                                className="col m2 s12"
                                  onClick={() =>
                                    this.deleteAppointment(appointment.id)
                                  }
                                  className="secondary-content"
                                >
                                  <i className="material-icons red-text">
                                    clear
                                  </i>
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <h5>No Schedule to Display</h5>
                      )}
                    </Col>
                  </Row>
                </CardPanel>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
export default ManagerPortal;
