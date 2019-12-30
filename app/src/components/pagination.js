import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { getProjects } from "../actions";
function Pagination({ projects, getProjects }) {
  console.log(typeof getProducts);
  const { total = 0,limit=10 } = projects;
  let pages = total / limit;
  console.log(pages);
  function handlePageChange(e) {
    console.log(e.target.value);
   
    getProjects();
  }
  return (
    <div className="col-sm-2">
      <select className="form-control" onChange={handlePageChange}>
        {_.range(1, pages + 1).map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
const mapStateToProps = state => {
  let projects = state.projects;
  return {
    projects:projects.data
  };
};

export default connect(mapStateToProps, { getProjects })(Pagination);
