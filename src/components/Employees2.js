import React, { useEffect, useState } from "react";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

// "http://localhost:8000/employees";

const Employees2 = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/employees")
      .then((res) => {
        console.log("Axios GET call");
        setEmployees(res.data);
      })
      .catch((res) => {
        console.log("Error Get call");
      });
  }, []);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [addFlag, setAddFlag] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const [formErrors, setFormErrors] = useState({
    empNameError: "",
    designationError: "",
  });

  const [messages1] = useState({
    EmpName_Error: "Please enter a valid Emp Name",
    Designation_Error: "Please enter a valid Designation",
  });

  const onEmpNameChangeHandler = (e) => {
    setName(e.target.value);
    setMessage("");
  };

  const onDesignationChangeHandler = (e) => {
    setDesignation(e.target.value);
    setMessage("");
  };

  const addEmployee = (event) => {
    event.preventDefault();
    setMessage("");
    if (name === "" && designation === "") {
      setMessage("Please enter the values");
    } else {
      setMessage("");
      setAddFlag(false);
      let newEmployee = { name: name, designation: designation };
      axios
        .post("http://localhost:8000/employees", newEmployee)
        .then((res) => {
          setEmployees([...employees, res.data]);
          setSuccess(`New employee has been added with the id ${res.data.id}`);
        })
        .catch((res) => {
          console.log("Error Post call");
        });
      setName("");
      setDesignation("");
    }
  };

  const deleteEmployee = (empId) => {
    setEmployees([]);
    axios.delete("http://localhost:8000/employees" + empId).then((res) => {
      axios.get("http://localhost:8000/employees").then((res) => {
        setEmployees(res.data);
      });
    });
  };

  return (
    <div>
      <table style={{ width: "70%" }} className="table table-bordered">
        <thead>
          <tr>
            <th>EmpID</th>
            <th>EmpName</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => {
              return (
                <tr>
                  <td>{emp.empId}</td>
                  <td>{emp.name}</td>
                  <td>{emp.designation}</td>
                  <td>
                    <button onClick={() => deleteEmployee(emp.id)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <div>"No data found"</div>
          )}
        </tbody>
      </table>
      <button
        className="btn-primary"
        onClick={() => setAddFlag(!addFlag)}></button>
      <br />
      <br />
      <div className="text-success">{success}</div>
      {addFlag ? (
        <form>
          {}
          EmpName:
          <input
            type="text"
            value={name}
            onChange={(e) => onEmpNameChangeHandler(e)}></input>
          Designation:
          <input
            type="text"
            value={name}
            onChange={onDesignationChangeHandler}></input>
          <br />
          <button className="btn-primary" onClick={addEmployee}>
            Add
          </button>
          <div className="text-dander">{message}</div>
        </form>
      ) : (
        //<div className="text-success">{success} "Form"</div>
        <div className="text-success">{messages1.EmpName_Error} "Form"</div>
      )}
    </div>
  );
};

export default Employees2;
/* {employees.map((emp) => {
            return (
              <tr>
                <td>{emp.empId}</td>
                <td>{emp.name}</td>
                <td>{emp.designation}</td>
                <td>
                  <button onClick={() => deleteEmployee(emp.id)}>
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })} */

/*       <button onClick={() => deleteEmployee(emp.id)}>
            <i className="fa fa-trash"></i>
          </button>; */
