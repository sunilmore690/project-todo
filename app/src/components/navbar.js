import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { login, logout } from "../actions";
const NavBar = function(props) {
  
  if(props.isLoggedIn){
    return (
      <nav class="navbar navbar-dark">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">
              Project Todo
            </a>
          </div>
          
        </div>
      </nav>
    );
  }
  return <div></div>;
};
const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.user
  };
};
export default connect(mapStateToProps)(NavBar);
