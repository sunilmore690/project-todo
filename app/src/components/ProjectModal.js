import React from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { getProjects } from "../actions/index";
import axios_instance from "../api";
function ProjectModal(props) {
  const { project = {} } = props;
  console.log('user',props.user)
  let users = [];
  async function createProject(e) {
    e.preventDefault();
    console.log("data");
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data));
    let projectdata = Object.fromEntries(data);
    projectdata = { ...projectdata, users, createdBy: props.user._id };
    console.log("projectdata", projectdata);
    if (project._id) {
      await axios_instance.put("/projects/" + project._id, projectdata);
    } else {
      await axios_instance.post("/projects/", projectdata);
    }
    props.getProjects()
  }
  function handleInputChange(e) {
    if (e.target.name) console.log(e.target.value);
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    users = value
    console.log(value);
  }
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {project.id ? "Edit " + project.name : "New"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form class="form-horizontal" onSubmit={createProject}>
            <div class="form-group">
              <label for="email">Name</label>
              <input type="text" class="form-control" name="name" />
            </div>
            <div class="form-group">
              <label for="pwd">Developers:</label>
              <select
                className="form-control"
                multiple
                name="users"
                onChange={handleInputChange}
              >
                {props.users.map(user => (
                  <option value={user._id}>{user.name}</option>
                ))}
              </select>
            </div>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <input
              type="submit"
              className="btn btn-info"
              value="Submit"
            ></input>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
const mapStateToProps = state => {
  return {
    user: state.user.user
  };
  //user:state.user.user
};
export default connect(mapStateToProps, { getProjects })(ProjectModal);
