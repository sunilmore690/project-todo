import React, { useEffect } from "react";
import { BulletList, Facebook } from "react-content-loader";
import { connect } from "react-redux";
import { getProjects } from "../actions/index";
import {Link} from 'react-router-dom'
function ProjectUnit({ project }) {
  return (
    <div className="col-sm-4">
      <div className="card">
        <h5>{project.name}</h5>

        Developers: {project.users.length}
        <Link to={"/project/" + project._id}>view</Link>
      </div>
    </div>
  );
}
function ProjectList({ projects, fetchProjects,openModal }) {
  console.log("projects", projects);
  useEffect(() => {
    fetchProjects();
  }, []);
  if (!projects.docs) {
    return <div />;
  }

  return (
    <div>
      <div>
        <h4>My Projects</h4>
        <button class='btn btn-info btn-sm' style={{float:'right'}} onClick={e=>openModal()}>Create Project</button>
      </div>
      <div className="row project-list">
        {projects.docs.map(project => (
          <ProjectUnit project={project} />
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  let projects = state.projects;
  return {
    projects: projects.data
  };
};
const mapDisptachToProps = dispatch => {
  return {
    fetchProjects: () => dispatch(getProjects())
  };
};
export default connect(mapStateToProps, mapDisptachToProps)(ProjectList);
