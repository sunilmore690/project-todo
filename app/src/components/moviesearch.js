import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
function MovieSearch({ getProducts }) {
  let search = "";
  const handleSearch = function() {
    //alert(search);
    getProducts(search);
  };
  const onChange = function(e) {
    search = e.target.value;
  };
  return (
    <div className="col-sm-10">
      <div class="form-group has-search">
        <span class="form-control-feedback">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          type="text"
          className="form-control"
          onChange={onChange}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              handleSearch();
            }
          }}
          placeholder="Enter Book Name"
        />
      </div>
    </div>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    searchM: search => {
      dispatch(getProducts(search));
    }
  };
};
export default connect(
  null,
  { getProducts }
)(MovieSearch);
