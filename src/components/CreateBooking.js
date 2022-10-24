import React, { useState } from "react";
import { Validation } from "./Validation";

import axios from "axios";

const BookingComponent = (props) => {
  const [state, setState] = useState({
    buffetName: "",
    bookedOn: "",
    emailId: "",
    plateCount: "",
  });
  const [formErrors, setFormErrors] = useState({
    emailIdError: "",
    plateCountError: "",
    bufferNameError: "",
    bookedOnError: "",
  });
  const [mandatory, setMandatory] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [valid, setValid] = useState(false);

  const [messages] = useState({
    EMAIL_ID_Error: "Please enter a valid email",
    PLATE_COUNT_ERROR: "Please count(s) should be 1 or more",
    BUFFET_NAME_ERROR: "Please select buffet type",
    BOOKED_ON_ERROR: "Booking date should be after today's date",
    ERROR: "Something went wrong",
    MANDATORY: "Enter all the form fields",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (event) => {
    if (event.target.name == "buffetName") {
      setState({ ...state, buffetName: event.target.value });
    }
    if (event.target.name == "emailId") {
      setState({ ...state, emailId: event.target.value });
    }
    if (event.target.name == "plateCount") {
      setState({ ...state, plateCount: event.target.value });
    }
    if (event.target.name == "bookedOn") {
      setState({ ...state, bookedOn: event.target.value });
    }
    validateField(event.target.name, event.target.value);
  };

  const validateField = (name, value) => {
    let errors = formErrors;
    setValid(true);
    switch (name) {
      case "buffetName":
        if (!Validation.validateBuffet(value)) {
          errors.validateBuffet = messages.BUFFET_NAME_ERROR;
          //setErrorMessage("Please select buffer type");
          setValid(false);
        }
        break;
      case "emailId":
        if (!Validation.validateEmail(value)) {
          errors.validateEmail = messages.EMAIL_ID_Error;
          //setErrorMessage("Please enter valid email");
          setValid(false);
        }
        break;
      case "plateCount":
        if (!Validation.validPlateCount(value)) {
          errors.plateCount = messages.PLATE_COUNT_ERROR;
          //setErrorMessage("Please count(s) should be 1 or more");
          setValid(false);
        }
        break;
      case "bookedOn":
        if (!Validation.validateDate(value)) {
          errors.validateDate = messages.BOOKED_ON_ERROR;
          //setErrorMessage("Booked date should be after today's a dates");
          setValid(false);
        }
        break;
      default:
        setValid(false);
        break;
    }
    setFormErrors(errors);
  };
  return (
    <div>
      <form>
        <label> Buffet Name</label>
        <select
          name="buffetName"
          value={state.buffetName}
          onChange={(e) => handleChange(e)}>
          <option value="" disabled>
            Select a buffet
          </option>
          <option value="SouthIndianFestivalSpecial">
            South Indian Festival Special
          </option>
          <option value="NorthIndianFestivalSpecial">
            North Indian Festival Special
          </option>
        </select>
        <label> Email Id</label>
        <input
          type="email"
          name="emailId"
          value={state.emailId}
          placeholder="Enter your email"
          onChange={(e) => handleChange(e)}
          required></input>
        <label> Plate Count</label>
        <input
          type="number"
          name="plateCount"
          value={state.plateCount}
          placeholder="Enter your count"
          onChange={(e) => handleChange(e)}
          required></input>

        <label> Booking Date</label>
        <input
          type="date"
          name="bookedOn"
          value={state.bookedOn}
          placeholder="Enter your Date"
          onChange={(e) => handleChange(e)}
          required></input>

        <button type="submit" name="active" className="btn btn-primary">
          Book Buffet
        </button>
        <div className="text-danger"></div>
        <div className="text-danger"></div>
        <div className="text-success"></div>
      </form>
    </div>
  );
};

export default BookingComponent;
